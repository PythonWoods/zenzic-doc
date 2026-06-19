---
sidebar_label: "Panoramica"
icon: lucide/settings
description: "Controlli, campi di configurazione, regole DSL personalizzate e logica di discovery."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Riferimento Configurazione

Zenzic legge un singolo file `.zenzic.toml` nella root del repository. Tutti i campi sono
opzionali — Zenzic funziona senza alcun file di configurazione.

!!! tip "Configurazione zero"

    La maggior parte dei progetti non ha bisogno di alcun `.zenzic.toml`. Esegui
    `uvx zenzic check all` — se passa, hai finito. Aggiungi configurazione solo quando
    devi personalizzare un comportamento specifico.

---

## Sezioni di riferimento

Questa guida di riferimento è suddivisa in sezioni dedicate:

| Pagina | Contenuto |
| :--- | :--- |
| [Riferimento Configurazione](./configuration-reference.md) | `docs_dir`, liste di esclusione, soglie, punteggio, `build_context`, auto-rilevamento adapter |
| [DSL Regole Custom](../how-to/add-custom-rules.md) | `[[custom_rules]]` — regole lint personalizzate in puro TOML |
| [Brand System](./brand-system.md) | Contratto palette, token semantici e regole di styling React |

---

## Esempio completo

La `.zenzic.toml` più semplice e completa che esercita ogni sezione:

```toml
docs_dir = "docs"
excluded_dirs  = ["includes", "assets", "stylesheets", "overrides"]
excluded_assets = []
excluded_build_artifacts = []
snippet_min_lines = 1
placeholder_max_words = 50
placeholder_patterns = ["coming soon", "wip", "todo", "stub", "draft", "da completare", "bozza"]
validate_same_page_anchors = false
excluded_external_urls = []
fail_under = 80

[[custom_rules]]
id       = "ZZ-NODRAFT"
pattern  = "(?i)\\bDRAFT\\b"
message  = "Rimuovere il marker DRAFT prima della pubblicazione."
severity = "warning"

[build_context]
engine         = "mkdocs"
default_locale = "en"
locales        = ["it"]
```
