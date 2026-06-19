---
sidebar_position: 2
title: "Z402 - Pagina Orfana"
sidebar_label: "Z402 - Pagina Orfana"
description: "Analisi del fixture z402-orphan-page."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z402-orphan-page — ORPHAN_PAGE

**Z-Code:** `Z402 ORPHAN_PAGE` · **Engine:** `zensical` · **Exit:** `0`

<Z402OrphanPage />

## Il Fixture

Il fixture si trova in `examples/z402-orphan-page/` nel repository Zenzic.
Contiene documenti che dimostrano la violazione `Z402`.

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione aggiuntiva richiesta
cd examples/z402-orphan-page
uvx zenzic check all
```

Expected output:

```text
zensical - 3 files (3 docs, 0 assets) - 0.0s - 147 files/s

docs/secret.md  !  [Z402]  Physical file not listed in navigation.

────────────────────────────────────────────────────────────────────────────────

Summary:  x 0 errors  ! 1 warning  i 0 info  - 1 file with findings

* Analysis complete: All statically-detectable links, credentials, and
references verified.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 1/30 (inline: 0, per-file: 1) [MANAGED DEBT]
```

Exit code: `0`

## Interpretare l'Output

Il codice di errore `Z402` indica un problema di tipo **ORPHAN_PAGE**.

Questo errore o avviso viene generato da Zenzic quando un file markdown esiste nella struttura delle directory ma non è registrato nella barra di navigazione laterale o nel contratto di navigazione. Questo impedisce agli utenti di scoprire la pagina tramite i menu principali. In questo esempio specifico:
- **Tipo di Scansione:** `Structure Guard`
- **Severità:** `Warning`
- **Impatto:** Le pagine orfane riducono la scopribilità dei contenuti e comportano una detrazione DQS di 4.0 punti.
## Correggere la Violazione

Risolvi il problema come riportato da Zenzic.

## Vedi Anche

- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
