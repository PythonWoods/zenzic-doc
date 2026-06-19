---
icon: lucide/share-2
sidebar_label: "Social Metadata & SEO"
description: "Configura i tag Open Graph, Twitter Cards e i metadati SEO per pagina nel tuo progetto Zensical/MkDocs."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Configura Social Metadata & SEO

Zensical e MkDocs gestiscono i metadati social a due livelli: **default globali** in `zensical.toml` (o `mkdocs.yml`), e **override per pagina** nel frontmatter di ogni file Markdown. Questa guida mostra entrambi, usando la configurazione stessa di Zenzic come modello di riferimento.

---

## Default globali (`zensical.toml` o `mkdocs.yml`)

Le impostazioni globali si trovano nella configurazione del progetto:

```toml
# zensical.toml / mkdocs.yml
site_name = "Zenzic"
site_url = "https://zenzic.dev/"
site_description = "Documentation quality gate per progetti Markdown."

# Variabili extra globali (come link social o immagini di default)
[extra]
social_image = "assets/social/social-card.png"
```

!!! tip "Specifiche dell'immagine OG"
    Le immagini delle social card devono essere di **1200 × 630 px** (rapporto 1.91:1).
    File più piccoli di questo vengono ritagliati o rifiutati da LinkedIn e Twitter.
    Usa PNG per screenshot e grafiche esportate da SVG; evita JPEG per card ricche di testo.

---

## Override per pagina (Frontmatter)

Qualsiasi pagina può sovrascrivere i default globali aggiungendo campi al suo frontmatter:

```markdown
---
title: "Architecture — How Zenzic Works"
description: "Deep dive nel Two-Pass Pipeline, VSM e nel path traversal guard."
image: assets/social/social-card.png
keywords: [zenzic, architecture, vsm, pipeline, linter documentale]
---
```

| Chiave Frontmatter | Mappa a | Note |
| :--- | :--- | :--- |
| `title` | `<title>`, `og:title`, `twitter:title` | Il motore di build aggiunge automaticamente il titolo del sito |
| `description` | `<meta name="description">`, `og:description` | Mantieni sotto i 155 caratteri per gli snippet di ricerca |
| `image` | `og:image`, `twitter:image` | Assoluto o relativo alla root; sovrascrive il default del sito |
| `keywords` | `<meta name="keywords">` | Elenco separato da virgole |

---

## Memorizzazione delle Immagini Social

Posiziona tutti gli asset delle social card in `docs/assets/social/` (o nella cartella mappata agli asset statici):

```text
docs/assets/social/
├── social-card.png          ← immagine OG di default (1200 × 630, scura)
├── social-card-light.png    ← variante per modalità chiara
├── social-card.svg          ← SVG sorgente (non servire direttamente come OG)
└── social-card-light.svg
```

!!! caution "SVG come immagine OG"
    La maggior parte dei social crawler (LinkedIn, Slack, iMessage) non renderizza gli SVG.
    Esporta sempre un PNG dalla sorgente SVG. I file SVG sono conservati in `docs/assets/social/`
    solo come sorgenti di progettazione.

Per card specifiche per pagina (ad es. un post del blog che annuncia una release), aggiungi il PNG
e referenzialo nel frontmatter del post:

```markdown
---
title: "Zenzic Documentation Security Platform"
image: assets/social/social-card.png
---
```

---

## Verifica

Dopo aver aggiornato i metadati, verifica l'output in locale compilando la documentazione:

```bash
uvx zensical build
# o
mkdocs build
```

Quindi ispeziona l'head (`<head>`) di qualsiasi pagina con browser DevTools (tab Elementi, cerca
`og:image`). Per la verifica in produzione, usa il
[Twitter Card Validator](https://cards-dev.twitter.com/validator) o l'
[Open Graph Debugger](https://developers.facebook.com/tools/debug/) — entrambi
accettano un URL e mostrano quali tag hanno risolto.

---

## Zenzic & Asset Sociali

Zenzic non valida gli URL social esterni, ma **rileva** gli asset statici inutilizzati. Se aggiungi
un PNG per una social card personalizzata e non la referenzi mai nel frontmatter o nella configurazione,
Zenzic la segnalerà come asset inutilizzato alla prossima esecuzione di `zenzic check all`.

Escludi i file sorgente intenzionali in `.zenzic.toml`:

```toml
# .zenzic.toml
excluded_assets = [
    "assets/social/*.svg",   # Sorgenti SVG — non serviti come immagini OG
]
```
