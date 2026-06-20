---
icon: lucide/plug
sidebar_label: "Adapter e Motore"
description: "Configura il comportamento dell'adapter, le impostazioni locale e le opzioni specifiche del motore."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Configurare Adapter e Motore

Zenzic utilizza un **adapter** per ottenere la conoscenza specifica del motore — struttura nav, directory i18n e pattern locale — senza importare o eseguire alcun framework di build.

> Per il riferimento completo ai campi `[build_context]`, le regole di discovery degli adapter e il formato nav di ZensicalAdapter, vedi [Configuration Reference — `[build_context]`](../reference/configuration-reference.md#build-context).

---

## Dichiarare il motore

Aggiungi una sezione `[build_context]` a `.zenzic.toml` per impostare l'engine esplicitamente:

```toml
[build_context]
engine         = "auto"     # "auto" (default), "mkdocs", "zensical", "standalone"
default_locale = "en"       # codice ISO 639-1 della locale predefinita
locales        = ["it"]     # nomi delle directory locale non predefinite (es. docs/it/, docs/fr/)
```

> **Ordinamento TOML:** `[build_context]` deve essere l'**ultima** sezione in `.zenzic.toml`.

---

## Flag `--engine` (override per singola esecuzione)

Il flag `--engine` su `zenzic check orphans` e `zenzic check all` sovrascrive
`build_context.engine` per una singola esecuzione:

```bash
zenzic check orphans --engine zensical
zenzic check all --engine mkdocs
```

Se passi un nome di engine senza adapter registrato, Zenzic elenca quelli disponibili ed esce
con codice 1:

```text
ERROR: Unknown engine adapter 'hugo'.
Installed adapters: mkdocs, standalone, zensical
Install a third-party adapter or choose from the list above.
```

---

## Coesistenza dei motori (`mkdocs.yml` + `zensical.toml` nella stessa repo)

Alcune repository contengono sia `mkdocs.yml` che `zensical.toml` durante una transizione — una
build in fase di test con Zensical mentre l'altra continua a servire in produzione su MkDocs.

Quando `engine` è dichiarato esplicitamente in `.zenzic.toml`, Zenzic usa quell'adapter — anche
quando è presente anche il file di configurazione di un altro motore.  `engine = "mkdocs"` legge
sempre `mkdocs.yml` anche se esiste `zensical.toml`, e viceversa.

Se `engine` viene omesso (o `build_context` è assente del tutto), il default è `engine = "auto"`.
Zenzic applica allora l'Auto-Discovery: ispeziona la radice del progetto per manifesti noti e
monta automaticamente l'Adapter corretto.

!!! info "Ordine di priorità dell'Auto-Discovery"
    1. `zensical.toml` → `ZensicalAdapter`
    3. `mkdocs.yml` → `MkDocsAdapter`
    4. Nessun manifesto trovato → `StandaloneAdapter`

```toml
# .zenzic.toml — dichiarazione esplicita del motore richiesta
[build_context]
engine = "zensical"   # ← questa riga attiva ZensicalAdapter
```

---

## Adapter di terze parti

Gli adapter di terze parti (es. `zenzic-hugo-adapter`) vengono rilevati automaticamente una volta installati come pacchetti Python — nessun aggiornamento di Zenzic necessario. Registrazione tramite il gruppo entry-point `zenzic.adapters`.

Vedi [Scrivere un Adapter](../developers/how-to/implement-adapter.md) per il protocollo completo.
