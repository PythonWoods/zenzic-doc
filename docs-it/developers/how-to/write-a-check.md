---

description: "Guida passo-passo per aggiungere un nuovo check all'engine di analisi Zenzic, incluse le Core Laws che ogni contributore deve rispettare."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Scrivere un Nuovo Check

I check di Zenzic si trovano in `src/zenzic/core/`. Ogni check è una funzione standalone in
`scanner.py` (traversal del filesystem) o `validator.py` (validazione del contenuto). Il wiring
CLI è nel package `cli/` (`src/zenzic/cli/`).

---

## Checklist in Sei Passi

1. **Implementa** la logica nel modulo core appropriato (`zenzic.core.scanner` o `zenzic.core.validator`).
2. **Delega la risoluzione** a `InMemoryPathResolver` — non chiamare mai `os.path.exists()`, `Path.is_file()`,
   o qualsiasi altra probe del filesystem all'interno di un loop per-link. Il resolver viene istanziato
   una volta prima del loop; re-istanziarlo per file annulla la `_lookup_map` pre-calcolata e riduce
   il throughput da 430 000+ a meno di 30 000 risoluzioni/s.
3. **Testa l'i18n** — se il check riguarda path di file, testalo in tutte e tre le configurazioni i18n
   (nessuna, folder mode, suffix mode).
4. **Collega la CLI** — aggiungi un comando o sotto-comando corrispondente nel package `cli/`. Vedi il [riferimento Architettura CLI](../reference/cli-architecture). Se il tuo comando accetta un argomento `PATH`, devi chiamare `find_repo_root(search_from=resolved_path)` e invocare `_apply_target()` per rispettare la Sovranità del Percorso.
5. **Scrivi i test** in `tests/` che coprano sia i casi passanti che quelli fallenti, inclusa una
   baseline di performance (5 000 link risolti in < 100 ms su un corpus in-memory mockato).
6. **Aggiorna gli esempi** in `examples/` per esercitare il nuovo check — Zenzic valida i propri
   esempi ad ogni commit.

> **Contratto di performance:** il hot path di `zenzic.core` deve rimanere allocation-free. Nessuna
> costruzione di oggetti `Path`, nessuna syscall e nessuna chiamata `relative_to()` all'interno del
> loop di risoluzione.

---

## Core Laws

Tutti i check devono rispettare le leggi fondamentali (Core Laws) dello scanner. Prima di scrivere un check, assicurati di familiarizzare con gli invarianti dettagliati nelle [Leggi Fondamentali dello Scanner](../explanation/core-laws.md).

---

## Cablaggio CLI

A seconda che tu stia aggiungendo un comando a una sub-app esistente o introducendo una nuova sub-app di primo livello, segui i passaggi seguenti:

### Aggiungere un Comando a una Sub-App Esistente

Nel modulo della sub-app appropriata (ad es., `src/zenzic/cli/_check.py`):

```python
@check_app.command(name="metadata")
def check_metadata(path: Path = ...) -> None:
    ...
```

Non sono necessarie modifiche a `__init__.py`, `main.py` o `_metadata.py`.

### Aggiungere una Nuova Sub-App di Primo Livello

1. Crea un nuovo modulo `src/zenzic/cli/_myfeature.py` che definisce la sub-app: `myfeature_app = typer.Typer(...)`.
2. Esporta `myfeature_app` da `src/zenzic/cli/__init__.py`.
3. Registra la sub-app in `src/zenzic/main.py`: `app.add_typer(myfeature_app, name="myfeature", rich_help_panel="...")`.
4. Aggiungi una voce `CommandMeta(...)` in `src/zenzic/cli/_metadata.py` affinché i pannelli di aiuto della radice e l'aiuto breve rimangano autorevoli.
5. Se la sub-app usa `no_args_is_help=True`, aggiungi `"myfeature"` al frozenset `_SUBAPPS_WITH_MENU` in `cli_main()` in modo che il banner di Zenzic appaia quando la sub-app viene invocata senza argomenti.

---

## Obbligazioni del Credential Scanner

Se il tuo check tocca il credential scanner o `harvest()`, vedi il riferimento dedicato
[Obbligazioni del Credential Scanner](../reference/credential-scanner-obligations).
Le quattro obbligazioni (Worker Timeout, Regex-Canary, Dual-Stream Invariant, Mutation Score ≥ 90%)
sono applicate ad ogni PR che tocca `src/zenzic/core/`.

---

## Codici di Finding

Ogni nuovo check deve emettere finding usando un codice registrato in `FROZEN_CODES`. Prima
di aggiungere un nuovo codice:

1. Esegui `zenzic inspect codes` — conferma che il codice non esista già.
2. Aggiungi il codice a `FROZEN_CODES` nel tier appropriato (`Core`, `Structure`, o `Governance`).
3. Aggiorna `CHANGELOG.md` con il nuovo codice nello stesso commit.

Non riutilizzare codici ritirati. I codici ritirati rimangono in `FROZEN_CODES` con stato `retired`.
