---

sidebar_position: 10
description: "ADR 020: Perché Zenzic usa wait(FIRST_COMPLETED) per la raccolta parallela dei risultati e come funziona il coordinatore fail-fast senza violare il Pilastro 3."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# ADR 020: Completezza Audit Parallelo vs. Fail-Fast

**Stato:** Attivo (v0.8.x)
**Decisore:** Architecture Lead
**Data:** 2026-05-02

---

## Contesto

Zenzic usa un `ProcessPoolExecutor` per scansionare i file di documentazione in
parallelo quando un repository contiene 50 o più file Markdown
(`ADAPTIVE_PARALLEL_THRESHOLD` in `core/scanner.py`). Ogni worker esegue
`_scan_single_file()` in modo indipendente e restituisce un `IntegrityReport`
contenente eventuali findings, inclusi gli oggetti `SecurityFinding` emessi dallo
credential scanner (Z201/Z202/Z203).

Nell'implementazione precedente, il coordinatore raccoglieva i
risultati iterando su `futures_map.items()` **nell'ordine di submission**,
chiamando `fut.result(timeout=30)` su ogni future in sequenza. Questo design
aveva due conseguenze:

1. **Nessuna terminazione anticipata.** Se il file 1 di 500 conteneva una
   credenziale (Z201, Exit Code 2), tutti i 499 worker rimanenti continuavano
   fino al completamento prima che la CLI potesse segnalare la violazione. Nei
   repository di grandi dimensioni, questo sprecava significativo tempo di
   computazione CI.

2. **Raccolta sequenziale dei risultati.** Un worker lento in posizione 2
   bloccava la raccolta di tutti i risultati successivi fino al suo completamento
   o timeout, anche se i worker 3–500 avevano già terminato.

Prima della soluzione adottata sono stati valutati due meccanismi di abort:

**`multiprocessing.Manager().Event()`** — un flag booleano condiviso visibile
sia al coordinatore che ai worker. **Rigettato.** Passare un manager event a
`_worker()` lo rende stateful: il suo output dipenderebbe da stato esterno
condiviso anziché esclusivamente dai suoi input (`md_file`, `config`,
`rule_engine`). Questo viola il **Pilastro 3: Pure Functions First** — un
invariante fondante dell'architettura Zenzic. `_worker()` deve rimanere una
funzione pura.

**`concurrent.futures.as_completed()`** — un iteratore che restituisce i future
nell'ordine di completamento. **Valutato e sostituito.** `as_completed()` non
fornisce garanzie di timeout per batch. Un worker finale in deadlock bloccherebbe
il generatore indefinitamente. La protezione ZRT-002 (Z902 per i worker in
deadlock) non può essere preservata senza introdurre un meccanismo di timeout
per-future separato che vanifica il vantaggio di semplicità di `as_completed()`.

---

## Decisione

> **Il coordinatore parallelo usa `concurrent.futures.wait()` con
> `return_when=FIRST_COMPLETED` e un flag locale `_abort`. Al primo
> `SecurityFinding` nel risultato di un worker completato, tutti i task ancora
> in coda (`PENDING`) vengono cancellati immediatamente. Il deadlock guard
> ZRT-002 è preservato.**

L'implementazione sostituisce il loop `for fut, md_file in futures_map.items()`
con un loop `while _pending`. Ogni iterazione chiama:

```python
done, _pending = concurrent.futures.wait(
    _pending,
    timeout=_WORKER_TIMEOUT_S,
    return_when=concurrent.futures.FIRST_COMPLETED,
)
```

Quando un report completato contiene `security_findings`, il coordinatore imposta
`_abort = True` e chiama `pending_fut.cancel()` su ogni future ancora in
`_pending`. Le iterazioni successive scartano i risultati silenziosamente.

**Cambiamenti comportamentali dopo il redesign del coordinatore:**

| Scenario | Implementazione precedente | Coordinatore ridisegnato |
|---|---|---|
| Nessuna violazione di sicurezza | Tutti i file scansionati | Tutti i file scansionati (invariato) |
| Violazione nel file 1/500 | Tutti i 500 file scansionati | Violazione rilevata; task pendenti cancellati |
| Worker in deadlock | Z902 dopo 30 s per-worker | Z902 se nessun worker completa in 30 s |
| Ordine dei risultati | Ordine di submission → ordinato | Ordine di completamento → ordinato |

**Semantica di cancellazione:** `future.cancel()` opera solo sui task non ancora
inviati a un processo worker (stato `PENDING`). I task già `RUNNING` non possono
essere interrotti — completano e i loro risultati vengono silenziosamente
scartati (non aggiunti al report). Il fail-fast è quindi una
**ottimizzazione CI best-effort**, non una garanzia di esecuzione assoluta.

**Preservazione ZRT-002:** Se `concurrent.futures.wait()` restituisce un insieme
`done` vuoto (nessun worker ha completato entro `_WORKER_TIMEOUT_S` secondi),
tutti i future pendenti vengono cancellati e un finding Z902 viene emesso per
ogni file bloccato. Questo protegge da pattern ReDoS in `[[custom_rules]]` che
bypassano il canary di avvio (`_assert_regex_canary()`).

---

## Motivazione

### 1. Pilastro 3 Preservato

Il fail-fast è implementato interamente nel coordinatore, che è logica di
orchestrazione — non logica di analisi. Il coordinatore è l'unico scope dove
più future sono visibili simultaneamente. Nessuna funzione di analisi è a
conoscenza dello stato di abort.

`_worker()` e `_scan_single_file()` sono **invariati** in questo design. A parità

di input, producono lo stesso output. Non hanno dipendenze da stato condiviso.
Questa purezza funzionale è ciò che li rende deterministici in isolamento e
facilmente testabili.

### 2. Semantica Audit-Completo per i Worker in Esecuzione

I worker già in esecuzione quando viene rilevata una violazione vengono lasciati
completare naturalmente. I loro risultati vengono scartati dal coordinatore.
Questo previene lo scenario in cui un `IntegrityReport` parzialmente scritto
(da un worker interrotto durante l'esecuzione) corrompe la lista dei findings
o lascia file handle aperti.

### 3. Output Deterministico

La lista finale `reports` è sempre ordinata per `file_path` dopo la raccolta.
L'output della CLI è riproducibile indipendentemente dall'ordine di completamento
dei worker, dalla dimensione del pool o da quanti file sono stati scansionati
prima dell'abort.

### 4. `wait(FIRST_COMPLETED)` vs `as_completed()`

`as_completed()` era il meccanismo inizialmente proposto. È stato sostituito da
`wait(return_when=FIRST_COMPLETED)` per un motivo specifico: il deadlock guard
ZRT-002. Con `as_completed()`, un worker finale in deadlock fa bloccare il
generatore indefinitamente senza modo di imporre un timeout per batch pendente.
Con `wait(timeout=_WORKER_TIMEOUT_S)`, un insieme `done` vuoto dopo 30 secondi
attiva incondizionatamente il guard Z902 — senza meccanismi aggiuntivi.

---

## Invarianti

- `_worker()` deve rimanere una funzione pura e stateless. Nessuno stato
  condiviso, coda o event può essere passato ad essa.
- Il flag `_abort` è una variabile locale nel loop del coordinatore. Non è
  esportato, non è condiviso con i worker e non è visibile fuori dal blocco
  `with executor`.
- I risultati sono sempre ordinati per `file_path` prima di essere restituiti.
  L'ordine di completamento da `wait()` non è mai l'ordine di output finale.
- Deadlock guard ZRT-002: se nessun future completa entro `_WORKER_TIMEOUT_S`
  secondi, tutti i future rimanenti vengono cancellati e un finding Z902 viene
  emesso per ogni file bloccato.

---

## Conseguenze

- Nei repository con una violazione di sicurezza nei primi file, il tempo di
  esecuzione CI si riduce proporzionalmente al numero di worker cancellati.
- Nei repository senza violazioni, le prestazioni sono identiche all'implementazione
  precedente (tutti i worker completano, tutti i risultati vengono raccolti).
- La costante `ADAPTIVE_PARALLEL_THRESHOLD` mantiene il suo ruolo: sotto i 50
  file si usa la modalità sequenziale e questo ADR non si applica. Il percorso
  sequenziale è invariato.
- Il fail-fast si applica solo alla modalità parallela. Una scansione che non
  produce finding di sicurezza non è influenzata da questo cambiamento.
