---
sidebar_label: Inizializzare Configurazione
description: "Come fare scaffolding e inizializzare un nuovo file di configurazione Zenzic."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Inizializzare Configurazione

Per la maggior parte dei progetti non è necessario alcun file di configurazione. Esegui
`zenzic check all` e Zenzic individuerà la root del repository tramite `.git` o `.zenzic.toml`
e applicherà valori predefiniti ragionevoli. Se non viene trovato alcun `.zenzic.toml`, Zenzic
mostra un pannello "Helpful Hint" che suggerisce `zenzic init`.

Usa `zenzic init` per scaffoldare il file automaticamente. Rileva il motore di documentazione
dalla root del progetto (es. `mkdocs.yml`) e preimposta `engine` in `[build_context]`:

```bash
zenzic init             # crea .zenzic.toml con engine rilevato
zenzic init --pyproject # incorpora [tool.zenzic] in pyproject.toml
zenzic init --force     # sovrascrive un file esistente
```

Quando `pyproject.toml` esiste, `zenzic init` chiede se incorporare la configurazione lì
come tabella `[tool.zenzic]`.  Usa `--pyproject` per saltare il prompt interattivo.

Quando hai bisogno di personalizzare il comportamento — ad esempio, per aumentare la soglia
del conteggio parole per le pagine di riferimento tecnico concise, o per aggiungere pattern
placeholder specifici del team — crea o modifica `.zenzic.toml` nella root del repository:

```toml
# .zenzic.toml — punto di partenza minimo

# Decommenta e adatta i campi che ti servono
# Tutto è opzionale. I campi assenti usano i valori di default

# docs_dir = "docs"
# excluded_dirs = ["includes", "assets", "stylesheets", "overrides"]
# excluded_assets = []
# snippet_min_lines = 1
# placeholder_max_words = 50
# placeholder_patterns = ["coming soon", "work in progress", "wip", "todo", "stub", ...]

# [build_context]
# engine         = "mkdocs"
# default_locale = "en"
# locales        = ["it"]
```
