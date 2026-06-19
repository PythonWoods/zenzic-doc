---
sidebar_position: 11
title: Glossario
description: Terminologia tecnica di Zenzic — ogni termine definito con rigore e contesto architetturale.
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->



# Glossario

Questo glossario fornisce definizioni precise per tutti i termini specifici del dominio utilizzati nella documentazione di Zenzic, nell'output della CLI e nel codice sorgente. I termini (gli heading) restano nella forma inglese originale per garantire la tracciabilità con la CLI e il codice sorgente; le definizioni sono in italiano tecnico.

---

## Terms

### Adapter {#adapter}

Modulo specifico per un motore di build che implementa il protocollo `BaseAdapter`. Gli adapter traducono le convenzioni di file di un motore di documentazione (struttura nav, directory locale, mappatura URL) nel core engine-agnostico di Zenzic. Gli adapter integrati sono: `MkDocsAdapter`, `ZensicalAdapter`, `StandaloneAdapter`. Gli adapter di terze parti possono essere registrati tramite il gruppo entry-point `zenzic.adapters`.

Vedi: [Architettura -- Protocollo Adapter](../explanation/architecture#adapter-protocol)

---

### Path Traversal Guard

Classificazione di sicurezza applicata quando un link di documentazione risolve verso una directory di sistema operativo (`/etc/`, `/root/`, `/var/`, `/proc/`, `/sys/`, `/usr/`). Il Path Traversal Guard attiva il finding `PATH_TRAVERSAL_SUSPICIOUS` e forza l'**exit code 3** — il codice di uscita a massima priorità in Zenzic. Si attiva anche quando `docs_dir` stesso sfugge dalla root del repository (protezione F4-1 jailbreak).

Gli eventi del Path Traversal Guard non vengono mai soppressi da `--exit-zero`. Indicano potenziale template injection, una toolchain di documentazione compromessa o divulgazione involontaria dell'infrastruttura interna.

Vedi: [Checks Reference -- Path Traversal Guard](./checks#path-traversal-guard)

---

### Dark Page {#dark-page}

Una pagina di documentazione che esiste su disco ed è elencata nella navigazione del sito, ma non può essere raggiunta seguendo link da nessun'altra pagina. Le Dark Page sono strutturalmente valide ma funzionalmente invisibili — i lettori possono trovarle solo navigando l'albero di navigazione o indovinando l'URL direttamente. Distinte dalle Ghost Route (non presenti nella nav del tutto) e dagli orfani (su disco ma non nella nav).

---

### Ghost Route {#ghost-route}

Un percorso URL che la configurazione nav del motore di build dichiara ma per cui non esiste alcun file sorgente corrispondente su disco. Le Ghost Route rappresentano voci che il lettore vedrebbe nella navigazione ma che risulterebbero in un 404 al clic. Vengono rilevate durante la costruzione della VSM confrontando i percorsi dichiarati dalla nav con l'insieme fisico dei file su disco.

---

### Hex Pattern Detector

Il pattern del credential scanner specializzato nel rilevamento di sequenze di byte hex-encoded — tre o più escape `\xNN` consecutivi (es. `\x40\x41` · `\x42`, tre in sequenza). Questo pattern intercetta payload offuscati, frammenti di shellcode o credenziali codificate che compaiono negli esempi di documentazione. Fa parte delle otto famiglie di pattern scansionate dal credential scanner di Zenzic.

---

### Layered Exclusion {#layered-exclusion}

La gerarchia a 4 livelli che determina quali file e directory Zenzic scansiona. Ogni livello ha un ruolo distinto e una precedenza definita:

| Livello | Nome | Descrizione |
| :---: | :--- | :--- |
| L1 | System Guardrails | Esclusioni immutabili codificate nel software (`.git`, `.venv`, `node_modules`, ecc.) |
| L2 | Forced Inclusions + VCS | `included_dirs`/`included_file_patterns` da config e pattern `.gitignore` |
| L3 | Config Exclusions | `excluded_dirs` e `excluded_file_patterns` da `.zenzic.toml` o `[tool.zenzic]` in `pyproject.toml` |
| L4 | CLI Overrides | Flag `--exclude-dir` e `--include-dir` |

La gerarchia viene valutata dall'alto verso il basso; la prima regola corrispondente vince. I System Guardrails (L1) non possono mai essere sovrascritti da nessuna configurazione utente.

Vedi: [Discovery e Esclusione](../explanation/discovery)

---

### Exclusion Zone {#privacy-gate}

Il confine preciso all'interno del modello di file discovery di Zenzic dove gli scanner sono intenzionalmente inibiti. Ogni inclusione ed esclusione nella zona è tracciabile a una specifica riga di configurazione (`.zenzic.toml`) o flag CLI. Governata dalla gerarchia Layered Exclusion.

---

### Reference Map {#reference-map}

Struttura dati per-file popolata durante la Passata 1 della Two-Pass Pipeline. La Reference Map memorizza tutte le definizioni reference-link Markdown (`[id]: url`) trovate in un file, indicizzate per ID normalizzato (minuscolo, senza spazi). Traccia:

- **Definizioni** — `{norm_id: (url, line_no)}`, prima-definizione-vince per CommonMark 4.7.
- **ID Utilizzati** — insieme degli ID referenziati via `[testo][id]` o sintassi shortcut `[testo]`.
- **ID Duplicati** — insieme degli ID definiti più di una volta.
- **Definizioni Orfane** — definizioni mai referenziate (definizioni morte).
- **Punteggio di Integrità** — calcolato dal rapporto tra definizioni utilizzate e totali.

---

### Zenzic Score {#zenzic-score}

Un punteggio di qualità da 0 a 100 calcolato su quattro categorie ponderate: Structural (30%), Navigation (25%), Content (20%) e Brand & Assets (25%). Ogni categoria accumula deduzioni di penalità per codice (D092 — Zenzic Penalty Scorer). Il punteggio viene calcolato da `zenzic score` e può essere imposto come soglia in CI tramite `fail_under` in `.zenzic.toml` o `--fail-under` da CLI.

Usa `zenzic score --save` per salvare uno snapshot del punteggio corrente e `zenzic diff` per confrontarlo con la baseline.

---

### Credential Scanner Violation

Un'eccezione sollevata dall'IO Middleware del credential scanner (`safe_read_line`) quando una credenziale viene rilevata durante l'estrazione dei metadati. `ShieldViolation` è intenzionalmente fatale — impedisce che il segreto entri in qualsiasi parser (YAML, Markdown, regex) interrompendo immediatamente l'elaborazione. Il chiamante deve catturarla e terminare con il **codice 2**.

Distinta da un *finding* del credential scanner (un dataclass `SecurityFinding` prodotto durante la raccolta della Passata 1). Un finding è un dato; una violation è un'interruzione del flusso di controllo.

---

### System Guardrails (L1) {#system-guardrails}

L'insieme immutabile di directory che Zenzic esclude **sempre**, indipendentemente da qualsiasi configurazione o flag CLI. Sono definite in `SYSTEM_EXCLUDED_DIRS` come `frozenset`:

```text
.git          .github       .venv         node_modules
.nox          .tox          .pytest_cache .mypy_cache
.ruff_cache   __pycache__   .cache
.hypothesis   .temp
```

I System Guardrails formano il Livello 1 della gerarchia di Layered Exclusion. Non possono essere rimossi da `included_dirs`, `--include-dir` o qualsiasi altro meccanismo. Vengono uniti a `excluded_dirs` incondizionatamente durante l'inizializzazione del modello di configurazione.

---

### Two-Pass Pipeline {#two-pass-pipeline}

L'architettura di analisi fondamentale di Zenzic. La pipeline elabora ogni file Markdown in due passate sequenziali:

- **Passata 1 (Raccolta + Credential Scan)** — Stream di ogni riga; registrazione delle definizioni reference `[id]: url`; esecuzione del credential scanner su ogni riga (inclusi blocchi di codice delimitati e frontmatter). Popolamento della Reference Map.
- **Passata 2 (Cross-Check)** — Risoluzione di ogni utilizzo `[testo][id]` rispetto alla Reference Map completa. Segnalazione degli ID non definiti come `DANGLING_REF`.
- **Passata 3 (Report di Integrità)** — Calcolo del punteggio di integrità per-file. Aggiunta di avvisi per definizioni morte e alt-text mancanti.

La Passata 2 inizia solo quando la Passata 1 si completa senza finding del credential scanner.

Vedi: [Architettura -- Three-Phase Pipeline](../explanation/architecture#three-phase-pipeline)

---

### Virtual Site Map (VSM) {#vsm}

Una proiezione in memoria dei percorsi URL che il motore di build servirà. La VSM mappa ogni file sorgente al suo URL canonico e assegna uno stato di routing:

| Stato | Significato |
| :--- | :--- |
| `REACHABLE` | Il file è nella nav e verrà servito al suo URL canonico |
| `ORPHAN_BUT_EXISTING` | Il file esiste su disco ma non è elencato nella nav |
| `IGNORED` | Il file è in una directory privata o un README non elencato — il motore non lo servirà mai |
| `CONFLICT` | Due o più file mappano allo stesso URL canonico (slug collision) |

La VSM viene costruita una volta dopo la Passata 1 usando il metodo `get_route_info()` dell'adapter. Permette a Zenzic di rilevare Ghost Route e link non raggiungibili senza invocare il motore di build.
