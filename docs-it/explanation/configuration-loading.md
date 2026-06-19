---
sidebar_label: Caricamento Configurazione
description: "Catena di priorità Agnostic Citizen e logica di caricamento file."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Caricamento della configurazione

Zenzic segue una catena di priorità a tre livelli (**Cittadino Agnostico**) quando cerca la
configurazione all'avvio:

| Priorità | Sorgente | Quando viene usata |
| :---: | :--- | :--- |
| 1 | `.zenzic.toml` nella root del repository | Sempre preferita — la configurazione sovrana |
| 2 | `[tool.zenzic]` in `pyproject.toml` | Usata solo quando `.zenzic.toml` è assente |
| 3 | Valori predefiniti interni | Usati quando nessun file è presente |

La root del repository viene individuata risalendo dalla directory di lavoro corrente fino a
trovare una directory `.git`, un file `.zenzic.toml` o un `pyproject.toml`.

### .zenzic.toml (Priorità 1)

Il file di configurazione dedicato. Se esiste, Zenzic lo legge e ignora completamente
`pyproject.toml` — non c'è nessuna fusione tra i due file.

### pyproject.toml (Priorità 2)

I progetti Python che hanno già un `pyproject.toml` possono incorporare la configurazione di
Zenzic nella tabella `[tool.zenzic]`, eliminando la necessità di un file separato:

```toml
# pyproject.toml — configurazione Zenzic nel file di metadati Python standard

[tool.zenzic]
docs_dir   = "docs"
fail_under = 90

[tool.zenzic.build_context]
engine = "mkdocs"

[[tool.zenzic.custom_rules]]
id       = "ZZ-NODRAFT"
pattern  = "(?i)\\bDRAFT\\b"
message  = "Rimuovere il marker DRAFT prima della pubblicazione."
severity = "warning"
```

Tutti i campi supportati in `.zenzic.toml` sono ugualmente supportati in `[tool.zenzic]`. La
sotto-tabella `[build_context]` diventa `[tool.zenzic.build_context]`, e gli array `[[custom_rules]]`
diventano `[[tool.zenzic.custom_rules]]`.

!!! note "Regola della sovranità"
    Se sia `.zenzic.toml` **che** `pyproject.toml` esistono nella root del repository,
    `.zenzic.toml` vince incondizionatamente. La tabella `[tool.zenzic]` in `pyproject.toml`
    viene ignorata.

### Gestione degli errori

Se il file di configurazione vincitore contiene un **errore di sintassi TOML**, Zenzic solleva un
`ConfigurationError` con un messaggio leggibile ed esce immediatamente — il fallback silenzioso
su un file di configurazione non valido nasconderebbe gli errori. I campi sconosciuti vengono
ignorati silenziosamente.
