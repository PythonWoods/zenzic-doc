---
sidebar_position: 2
title: "Z102 - Ancora Mancante"
sidebar_label: "Z102 - Ancora Mancante"
description: "Analisi del fixture z102-anchor-missing: un link con frammento che punta a un'intestazione inesistente nel file di destinazione, attivando Z102 ANCHOR_MISSING con exit code 1."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z102-anchor-missing — Integrità dell'Ancora

**Z-Code:** `Z102 ANCHOR_MISSING` · **Engine:** `standalone` · **Exit:** `1`

<Z102AnchorMissing />

## Il Fixture

Il fixture si trova in `examples/z102-anchor-missing/` nel repository Zenzic.
Contiene due documenti:

| File | Ruolo |
| :--- | :---- |
| `docs/index.md` | Sorgente — contiene il link con frammento rotto alla riga 11 |
| `docs/guide.md` | Destinazione — esiste su disco ma manca dell'intestazione referenziata |

`docs/index.md` riga 11 punta a `guide.md#nonexistent-section`. Il file di destinazione
`guide.md` esiste e contiene un'intestazione valida — `## Overview` (ancora `#overview`) —
ma non ha alcuna intestazione `#nonexistent-section`. Zenzic risolve il file, scansiona le
intestazioni, individua il frammento morto e attiva Z102.

```toml title="examples/z102-anchor-missing/.zenzic.toml"
docs_dir = "docs"
fail_under = 0

[build_context]
engine = "standalone"
```

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione richiesta
cd examples/z102-anchor-missing
uvx zenzic check links
```

Expected output:

```text
standalone - 2 files (2 docs, 0 assets) - 0.0s - 111 files/s

docs/guide.md:4  !  [Z502]  Page has only 37 words (minimum 50).

    2  │  <!-- SPDX-License-Identifier: Apache-2.0 -->
    3  │
    4  ❱  # Guide
    5  │
    6  │  ## Overview

docs/index.md:11:2  x  [Z102]  anchor '#nonexistent-section' not found in
'guide.md'

     9  │  ## Broken Anchor Reference
    10  │
    11  ❱  - [Nonexistent Section](guide.md#nonexistent-section) — the fragment
`#nonexistent-section` is not defined i…
        │    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    12  │
    13  │  ## What Zenzic Reports

────────────────────────────────────────────────────────────────────────────────

Summary:  x 1 error  ! 1 warning  i 0 info  - 2 files with findings

FAILED: Hard errors detected. Exit code 1 is mandatory.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `1`

## Interpretare l'Output

Il codice di errore `Z102` indica un problema di tipo **ANCHOR_MISSING**.

Questo errore o avviso viene generato da Zenzic quando un link markdown contiene un frammento/hash (es. `#section-title`) ma quell'ancora specifica è mancante o non definita nella pagina di destinazione. Zenzic compila automaticamente tutti gli header e i tag ancora HTML del file target per verificare la corrispondenza. In questo esempio specifico:
- **Tipo di Scansione:** `Link Validator`
- **Severità:** `Error`
- **Impatto:** Le ancore mancanti portano a una navigazione interna interrotta, con una detrazione sul DQS di 5.0 punti.
## Correggere la Violazione

Aggiungi l'intestazione mancante in `guide.md`:

```markdown title="docs/guide.md (dopo la correzione)"
## Nonexistent Section

Contenuto per questa sezione.
```

Oppure correggi il link in `index.md` per referenziare l'intestazione effettivamente presente:

```markdown title="docs/index.md (dopo la correzione)"
- [Overview](guide.md#overview)
```

Poi riesegui:

```bash
uvx zenzic check links  # → exit 0, nessun finding
```

## Ancore Esplicite e Attribute List

Zenzic supporta nativamente le ancore esplicite a livello di blocco (come `{#id}`) e gestisce le liste di attributi markdown (es. `{ data-toc-label="Overview" }`) collegate alle intestazioni. Durante la compilazione del registro intestazioni, Zenzic rimuove queste attribute list prima di slugificare il testo del titolo, prevenendo falsi positivi per il codice `Z102`.

## Vedi Anche

- [z101 — Link Rotti](z101-broken-links) — variante a livello di file: il file di destinazione non esiste.
- [z103 — Link Orfano](z103-orphan-link) — destinazioni di link esistenti su disco ma assenti dalla navigazione del sito.
- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
