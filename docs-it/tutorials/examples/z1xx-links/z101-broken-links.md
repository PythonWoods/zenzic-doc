---
sidebar_position: 1
title: "Z101 - Link Rotti"
sidebar_label: "Z101 - Link Rotti"
description: "Analisi del fixture z101-broken-links: due destinazioni di link interni inesistenti su disco, che attivano Z101 LINK_BROKEN con exit code 1."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z101-broken-links — Integrità dei Link

**Z-Code:** `Z101 LINK_BROKEN` · **Engine:** `standalone` · **Exit:** `1`

<Z101BrokenLinks />

## Il Fixture

Il fixture si trova in `examples/z101-broken-links/` nel repository Zenzic.
Il documento sorgente è `docs/index.md`, che contiene due link che puntano a file
non esistenti su disco:

| Riga | Link | Destinazione | Esiste? |
| :--: | :--- | :----------- | :-----: |
| 7    | `[Getting Started](missing.md)` | `missing.md` | ✘ |
| 8    | `[Setup Guide](guide/setup.md)` | `guide/setup.md` | ✘ |

Né `missing.md` né la sottodirectory `guide/` esistono nel fixture.
Entrambi i link sono quindi rotti. Zenzic attiva Z101 per ciascuno.

```toml title="examples/z101-broken-links/.zenzic.toml"
docs_dir = "docs"
fail_under = 0

[build_context]
engine = "standalone"
```

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione richiesta
cd examples/z101-broken-links
uvx zenzic check links
```

Expected output:

```text
standalone - 1 file (1 docs, 0 assets) - 0.0s - 65 files/s

docs/index.md:11:2  x  [Z104]  'missing.md' not found in docs

     9  │  ## Broken References
    10  │
    11  ❱  - [Getting Started](missing.md) — this file does not exist → **Z101**
        │    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    12  │  - [Setup Guide](guide/setup.md) — this directory does not exist →
**Z101**
    13  │

docs/index.md:12:2  x  [Z104]  'guide/setup.md' not found in docs

    10  │
    11  │  - [Getting Started](missing.md) — this file does not exist → **Z101**
    12  ❱  - [Setup Guide](guide/setup.md) — this directory does not exist →
**Z101**
        │    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    13  │
    14  │  ## What Zenzic Reports

────────────────────────────────────────────────────────────────────────────────

Summary:  x 2 errors  ! 0 warnings  i 0 info  - 1 file with findings

FAILED: Hard errors detected. Exit code 1 is mandatory.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `1`

## Interpretare l'Output

Il codice di errore `Z101` indica un problema di tipo **LINK_BROKEN**.

Questo errore o avviso viene generato da Zenzic quando un link di riferimento punta a una pagina o a una rotta esistente nel workspace, ma il percorso specifico è errato o il file di destinazione non corrisponde ad alcuna rotta valida nella Virtual Site Map. In questo esempio specifico:
- **Tipo di Scansione:** `Link Validator`
- **Severità:** `Error`
- **Impatto:** I link interrotti degradano l'esperienza dell'utente e riducono il Documentation Quality Score (DQS) applicando una penale di 8.0 punti.
## Correggere la Violazione

Crea i file mancanti affinché entrambi i link si risolvano:

```bash
mkdir -p examples/z101-broken-links/docs/guide
touch examples/z101-broken-links/docs/missing.md
touch examples/z101-broken-links/docs/guide/setup.md
uvx zenzic check links  # → exit 0, nessun finding
```

In alternativa, rimuovi le righe con i link rotti da `docs/index.md`.

## Vedi Anche

- [z102 — Ancora Mancante](z102-anchor-missing) — variante a livello di frammento del
  controllo integrità link: il file esiste, ma l'ancora dell'intestazione non esiste.
- [z103 — Link Orfano](z103-orphan-link) — destinazioni di link esistenti su disco ma assenti
  dalla navigazione del sito (motore zensical richiesto).
- [Riferimento Controlli — Z101](../../../reference/checks) — specifica completa della regola.
