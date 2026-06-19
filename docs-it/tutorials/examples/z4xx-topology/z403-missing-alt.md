---
sidebar_position: 3
title: "Z403 - Testo Alt Mancante"
sidebar_label: "Z403 - Testo Alt Mancante"
description: "Analisi del fixture z403-missing-alt."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z403-missing-alt — MISSING_ALT

**Z-Code:** `Z403 MISSING_ALT` · **Engine:** `standalone` · **Exit:** `0`

<Z403MissingAlt />

## Il Fixture

Il fixture si trova in `examples/z403-missing-alt/` nel repository Zenzic.
Contiene documenti che dimostrano la violazione `Z403`.

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione aggiuntiva richiesta
cd examples/z403-missing-alt
uvx zenzic check all
```

Expected output:

```text
standalone - 2 files (1 docs, 1 assets) - 0.0s - 125 files/s

docs/index.md:14  !  [Z403]  Image 'diagram.png' has no alt text.

    12  │  The following diagram shows the system components:
    13  │
    14  ❱  ![](diagram.png)
    15  │
    16  │  The `![](diagram.png)` syntax above has an empty alt attribute →
**Z403**.

docs/index.md:16  !  [Z403]  Image 'diagram.png' has no alt text.

    14  │  ![](diagram.png)
    15  │
    16  ❱  The `![](diagram.png)` syntax above has an empty alt attribute →
**Z403**.
    17  │
    18  │  ## What Zenzic Reports

────────────────────────────────────────────────────────────────────────────────

Summary:  x 0 errors  ! 2 warnings  i 0 info  - 1 file with findings

* Analysis complete: All statically-detectable links, credentials, and
references verified.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `0`

## Interpretare l'Output

Il codice di errore `Z403` indica un problema di tipo **MISSING_ALT**.

Questo errore o avviso viene generato da Zenzic quando un'immagine markdown in linea `![](url)` o un tag HTML `<img>` non possiede un testo alternativo (alt). Il testo alternativo è fondamentale per l'accessibilità web (a11y) e l'indicizzazione SEO. In questo esempio specifico:
- **Tipo di Scansione:** `Structure Guard`
- **Severità:** `Warning`
- **Impatto:** La mancanza di testo alternativo viola le policy di accessibilità, comportando una detrazione DQS di 1.0 punto.
## Correggere la Violazione

Risolvi il problema come riportato da Zenzic.

## Vedi Anche

- [Riferimento Controlli](../../../reference/checks) — specifica completa della regola.
