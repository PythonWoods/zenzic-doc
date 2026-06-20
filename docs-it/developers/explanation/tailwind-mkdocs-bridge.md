<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
---
title: Bridge Tailwind/MkDocs Material
description: Come il sito zenzic-doc riconcilia il sistema rem di Tailwind CSS con il font-size di accessibilità di MkDocs Material e sincronizza la dark mode senza logica server-side.
---

# Bridge Tailwind/MkDocs Material

Questo documento spiega il pattern architetturale che permette ai componenti Tailwind CSS di coesistere con MkDocs Material sulla stessa pagina senza corrompere il layout né desincronizzare la dark mode.

---

## Il Problema: Il Conflitto del Font-Size al 125%

MkDocs Material applica `font-size: 125%` all'elemento `<html>` in modo globale. Questo scala la dimensione base del browser da `16px` a `20px` per l'accessibilità. Poiché Tailwind CSS usa utility class basate su `rem`, ogni valore Tailwind eredita questa inflazione:

| Classe Tailwind | Atteso | Reale (sotto 125%) |
|---|---|---|
| `p-4` (`1rem`) | `16px` | `20px` |
| `text-sm` (`0.875rem`) | `14px` | `17.5px` |
| `gap-6` (`1.5rem`) | `24px` | `30px` |
| `max-w-[1400px]` | `1400px` | `1400px` ✅ (px immune) |

I valori fissi in `px` sono immuni; ogni valore derivato da `rem` viene inflazionato del 25%. Questo rompe il ritmo di spaziatura, la scala tipografica e le proporzioni dei componenti su tutte le sezioni della landing page.

---

## La Soluzione: Reset Chirurgico con Scope

Il bridge usa due componenti cooperanti senza alcuna logica server-side.

### 1. La Regola CSS di Targeting

Aggiunta a `docs/assets/css/extra.css`:

```css
/* MkDocs Material imposta html { font-size: 125% } per l'accessibilità.
 * Reset a 100% (16px) SOLO sulle pagine contenenti .zz-tailwind-root. */
html:has(.zz-tailwind-root) {
  font-size: 100% !important;
}
```

La pseudo-classe CSS `:has()` si attiva esclusivamente quando il DOM contiene un elemento con la classe `zz-tailwind-root`. Tutte le pagine di documentazione normale — che non portano questa classe — rimangono al default di MkDocs Material del 125% e sono completamente inalterate.

### 2. L'Ancora Semantica

La classe `zz-tailwind-root` è applicata al `<div>` wrapper esterno in `overrides/home.html`:

```html
<div class="zz-tailwind-root flex flex-col min-h-screen …">
```

`zz-tailwind-root` non porta proprietà visive. È un puro segnale semantico la cui unica funzione è attivare la regola bridge sopra.

---

## Perché `:has()` e Non una Classe sul Body?

Approcci alternativi considerati e scartati:

| Approccio | Motivo del rifiuto |
|---|---|
| Reset globale `font-size: 100%` | Corrompe tutte le pagine doc normali (TOC, sidebar, tabelle, admonition) |
| `!important` per ogni classe Tailwind | ~3.000 utility class — impossibile da mantenere |
| `extra.body_class` di MkDocs Material | Aggiunge configurazione per-pagina nel TOML; accoppia il template alla configurazione |
| Scoping con CSS `@layer` | Non altera la specificità nella cascade rispetto alla regola base di MkDocs Material |
| Convertire Tailwind tutto in `px` | Vanifica il framework utility-first; superficie di manutenzione enorme |

Il selettore `:has()` è l'unico meccanismo che è:

1. **Scoped** — si attiva solo sulla pagina target
2. **Pure CSS** — zero stato server-side
3. **Non invasivo** — non tocca nessuna regola di stile esistente
4. **Nativo del browser** — supportato da tutti i browser evergreen moderni (Chrome 105+, Firefox 121+, Safari 15.4+)

---

## Sincronizzazione Dark Mode

MkDocs Material comunica la combinazione colori corrente tramite l'attributo `data-md-color-scheme` sull'elemento `<body>`:

- `data-md-color-scheme="slate"` → dark mode
- `data-md-color-scheme="default"` → light mode

La variante `dark:` di Tailwind opera tramite la classe `dark` su `<html>` per default. Poiché MkDocs Material possiede l'elemento `<html>` e non applica mai una classe `dark`, la variante `dark:` non è funzionale in questo contesto.

**Soluzione:** Gli stili dark-mode per i componenti Tailwind sono scritti come regole CSS esplicite in `extra.css` che puntano a `[data-md-color-scheme="slate"]`, non come utility `dark:` di Tailwind.

Pattern corretto:

```css
/* Corretto — usa l'attributo schema di MkDocs Material */
[data-md-color-scheme="slate"] .my-component {
  background-color: #0d1117;
}

/* Errato — Tailwind dark: non si attiva mai in questo host */
/* <div class="dark:bg-[#0d1117]"> */
```

I file sorgente Tailwind possono conservare le utility `dark:` per chiarezza semantica e portabilità futura, ma queste classi non hanno effetto a runtime. Solo gli override di `extra.css` sono autoritativi.

---

## Mappa dei File

| File | Ruolo |
|---|---|
| `docs/assets/css/extra.css` | Contiene la regola di reset rem `html:has(.zz-tailwind-root)` |
| `overrides/home.html` | Porta la classe ancora semantica `zz-tailwind-root` |
| `docs/assets/css/zenzic-tailwind.min.css` | Artefatto compilato Tailwind (Tailwind CLI eseguito manualmente; no Node.js in CI) |
| `overrides/partials/homepage/` | Partial Jinja2 renderizzati dentro il boundary `zz-tailwind-root` |
