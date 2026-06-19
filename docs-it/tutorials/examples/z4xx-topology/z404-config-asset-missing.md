---
sidebar_position: 4
title: "Z404 - Asset Config Mancante"
sidebar_label: "Z404 - Asset Config Mancante"
description: "Analisi del fixture z404-config-asset-missing: mkdocs.yml dichiara theme.logo: assets/logo.svg ma il file non esiste, attivando Z404 CONFIG_ASSET_MISSING con exit code 0."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z404-config-asset-missing — Asset di Infrastruttura Non Trovato

**Z-Code:** `Z404 CONFIG_ASSET_MISSING` · **Engine:** `mkdocs` · **Exit:** `0`

<Z404ConfigAssetMissing />

## Il Fixture

Il fixture si trova in `examples/z404-config-asset-missing/` nel repository Zenzic.
Utilizza l'engine **MkDocs**.

`mkdocs.yml` dichiara `theme.logo: assets/logo.svg` ma `docs/assets/logo.svg`
non esiste su disco:

```yaml title="examples/z404-config-asset-missing/mkdocs.yml"
site_name: My Project
theme:
  name: material
  logo: assets/logo.svg
```

```toml title="examples/z404-config-asset-missing/.zenzic.toml"
docs_dir = "docs"
fail_under = 0

[build_context]
engine = "mkdocs"
```

## Eseguire l'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione richiesta
cd examples/z404-config-asset-missing
uvx zenzic check all
```

Output atteso:

```text
mkdocs · 2 files (2 docs, 0 assets) · 0.0s · 116 files/s

docs/docs/assets/logo.svg  !  [Z404]  logo asset not found on disk:
'docs/assets/logo.svg' (declared as theme.logo: 'assets/logo.svg' in mkdocs.yml)
[Z404]

────────────────────────────────────────────────────────────────────────────────

Summary:  x 0 errors  ! 1 warning  i 0 info  · 1 file with findings

Analysis complete: All statically-detectable links, credentials, and references
verified.
```

Exit code: `0`

## Interpretare l'Output

Il finding `Z404` indica un problema **CONFIG_ASSET_MISSING**.

Questo avviso viene sollevato quando la configurazione del motore di build
(es. `mkdocs.yml` o `zensical.toml`) fa riferimento a
un asset locale tramite percorso, ma il file non esiste su disco:

- **Tipo di scansione:** `Config Asset Checker (specifico per engine)`
- **Severità:** `Warning`
- **Impatto:** Deduce **3.0 punti DQS** (categoria brand governance, peso 0.25).

Campi verificati in MkDocs Material:
- `theme.logo` — risolto relativo a `docs_dir`
- `theme.favicon` — risolto relativo a `docs_dir`

## Risolvere il Problema

Creare il file asset mancante:

```bash
mkdir -p docs/assets
# Aggiungere il logo SVG:
cp my-logo.svg docs/assets/logo.svg
```

Oppure aggiornare `mkdocs.yml` per puntare a un file esistente:

```diff
theme:
  name: material
- logo: assets/logo.svg
+ logo: assets/brand-icon.png
```

## Vedi Anche

- [Z405 — Asset Non Utilizzati](z405-unused-assets) — l'inverso: un file esiste ma non è mai referenziato.
- [Z402 — Pagina Orfana](z402-orphan-page) — la pagina esiste ma è assente dalla navigazione.
- [Riferimento Controlli — Z404](../../../reference/checks) — specifica completa della regola.
