---
sidebar_position: 1
title: "Z601 - Obsolescenza del Brand"
sidebar_label: "Z601 - Obsolescenza del Brand"
description: "Analisi del fixture z601-brand-obsolescence."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z601-brand-obsolescence — BRAND_OBSOLESCENCE

**Z-Code:** `Z601 BRAND_OBSOLESCENCE` · **Engine:** `standalone` · **Exit:** `0`

<Z601BrandObsolescence />

## Il Fixture

Il fixture si trova in `examples/z601-brand-obsolescence/` nel repository Zenzic.
Contiene documenti che dimostrano la violazione `Z601`.

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione aggiuntiva richiesta
cd examples/z601-brand-obsolescence
uvx zenzic check all
```

Expected output:

```text
standalone - 2 files (2 docs, 0 assets) - 0.0s - 121 files/s

docs/index.md:6:33  !  [Z601]  [Z601] Obsolete or unauthorized brand term
'OldPlatform' detected. Use semantic versioning (e.g., 'vX.Y.Z') in active
prose, or suppress if this is a historical ledger.

    4  │  # Welcome to the Documentation Platform
    5  │
    6  ❱  This project was migrated from **OldPlatform** in Q1 2026.
       │                                   ^^^^^^^^^^^
    7  │
    8  │  All content has been ported to the new documentation engine.

docs/index.md:9:4  !  [Z601]  [Z601] Obsolete or unauthorized brand term
'OldPlatform' detected. Use semantic versioning (e.g., 'vX.Y.Z') in active
prose, or suppress if this is a historical ledger.

     7  │
     8  │  All content has been ported to the new documentation engine.
     9  ❱  The OldPlatform export scripts are archived for reference.
        │      ^^^^^^^^^^^
    10  │
    11  │  ## Getting Started

docs/index.md:17:19  !  [Z601]  [Z601] Obsolete or unauthorized brand term
'OldPlatform' detected. Use semantic versioning (e.g., 'vX.Y.Z') in active
prose, or suppress if this is a historical ledger.

    15  │  ## About the Migration
    16  │
    17  ❱  The migration from OldPlatform improved build times by 60% and added
        │                     ^^^^^^^^^^^
    18  │  native i18n support. Contact the platform team for migration
assistance.

────────────────────────────────────────────────────────────────────────────────

Summary:  x 0 errors  ! 3 warnings  i 0 info  - 1 file with findings

* Analysis complete: All statically-detectable links, credentials, and
references verified.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `0`

## Interpretare l'Output

Il codice di errore `Z601` indica un problema di tipo **BRAND_OBSOLESCENCE**.

Questo errore o avviso viene generato da Zenzic quando un nome di brand deprecato, obsoleto o non autorizzato (es. 'OldPlatform') viene trovato nel contenuto dei documenti, violando le linee guida aziendali. In questo esempio specifico:
- **Tipo di Scansione:** `Brand Integrity Guard`
- **Severità:** `Warning`
- **Impatto:** Le violazioni di brand obsolescence comportano una detrazione DQS di 2.0 punti, che può crescere esponenzialmente in caso di ripetizioni.
## Correggere la Violazione

Risolvi il problema come riportato da Zenzic.

## Vedi Anche

- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
