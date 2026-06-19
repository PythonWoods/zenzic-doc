---
sidebar_position: 2
title: "Z502 - Contenuto Corto"
sidebar_label: "Z502 - Contenuto Corto"
description: "Analisi del fixture z502-short-content."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z502-short-content — SHORT_CONTENT

**Z-Code:** `Z502 SHORT_CONTENT` · **Engine:** `standalone` · **Exit:** `0`

<Z502ShortContent />

## Il Fixture

Il fixture si trova in `examples/z502-short-content/` nel repository Zenzic.
Contiene documenti che dimostrano la violazione `Z502`.

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione aggiuntiva richiesta
cd examples/z502-short-content
uvx zenzic check all
```

Expected output:

```text
standalone - 1 file (1 docs, 0 assets) - 0.0s - 72 files/s

docs/index.md:4  !  [Z502]  Page has only 22 words (minimum 50).

    2  │  <!-- SPDX-License-Identifier: Apache-2.0 -->
    3  │
    4  ❱  # Z502 — Short Content Gallery Example
    5  │
    6  │  This page is intentionally sparse to demonstrate **Z502
SHORT_CONTENT** detection.

────────────────────────────────────────────────────────────────────────────────

Summary:  x 0 errors  ! 1 warning  i 0 info  - 1 file with findings

* Analysis complete: All statically-detectable links, credentials, and
references verified.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `0`

## Interpretare l'Output

Il codice di errore `Z502` indica un problema di tipo **SHORT_CONTENT**.

Questo errore o avviso viene generato da Zenzic quando il conteggio delle parole della pagina è inferiore alla soglia minima (di default 10 parole). Questo assicura che le pagine contengano informazioni utili invece di essere semplici scheletri. In questo esempio specifico:
- **Tipo di Scansione:** `Content Guard`
- **Severità:** `Warning`
- **Impatto:** Il contenuto troppo breve indica una scarsa profondità informativa e comporta una detrazione DQS di 1.0 punto.
## Correggere la Violazione

Risolvi il problema come riportato da Zenzic.

## Vedi Anche

- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
