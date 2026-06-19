---
sidebar_position: 5
title: "Z405 - Asset Inutilizzati"
sidebar_label: "Z405 - Asset Inutilizzati"
description: "Analisi del fixture z405-unused-assets."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z405-unused-assets — UNUSED_ASSET

**Z-Code:** `Z405 UNUSED_ASSET` · **Engine:** `standalone` · **Exit:** `0`

<Z405UnusedAssets />

## Il Fixture

Il fixture si trova in `examples/z405-unused-assets/` nel repository Zenzic.
Contiene documenti che dimostrano la violazione `Z405`.

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione aggiuntiva richiesta
cd examples/z405-unused-assets
uvx zenzic check all
```

Expected output:

```text
standalone - 2 files (1 docs, 1 assets) - 0.0s - 130 files/s

docs/assets/banner.png  !  [Z405]  File not referenced in any documentation
page.

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

Il codice di errore `Z405` indica un problema di tipo **UNUSED_ASSET**.

Questo errore o avviso viene generato da Zenzic quando un file di asset (immagine o media) esiste nel filesystem (es. sotto `assets/`) ma non viene mai referenziato in nessuna pagina di documentazione. Questo aumenta inutilmente la dimensione del repository. In questo esempio specifico:
- **Tipo di Scansione:** `Asset Sentry`
- **Severità:** `Warning`
- **Impatto:** Gli asset inutilizzati appesantiscono la build del progetto e comportano una detrazione DQS di 3.0 punti.
## Correggere la Violazione

Risolvi il problema come riportato da Zenzic.

## Vedi Anche

- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
