---
sidebar_label: Filosofia del Marchio
description: "Il ragionamento architetturale dietro l'identità visiva, il lessico e la palette bimodale di Zenzic."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Filosofia del Marchio

L'Ecosistema Brand di Zenzic definisce come Zenzic è rappresentato nelle community open-source, nelle integrazioni CI/CD e negli scenari di documentazione.

## La Nostra Postura

Zenzic è un'entità autorevole, silenziosa e rigorosa. Il nostro branding riflette la filosofia del tool:

* **Precisione chirurgica:** Preferiamo un linguaggio tecnico ed esatto, rigettando sterili frasi fatte di marketing.
* **Rumore zero:** Proprio come Zenzic restituisce silenziosamente codice di uscita `0` quando un test passa, la nostra comunicazione visiva e scritta evita qualsiasi ingombro non necessario.
* **Tono deterministico:** Il comportamento è espresso in termini precisi e verificabili.

## Il Lessico Zenzic

La coerenza è il fondamento della qualità. Quando si scrive di Zenzic su qualsiasi mezzo, occorre rispettare le nomenclature seguenti:

* **Zenzic**: La suite software. Scritto sempre con la Z maiuscola.
* **`zenzic`**: Il comando CLI. Sempre minuscolo e formattato rigorosamente come codice inline.
* **Il credential scanner**: Il motore di scansione di sicurezza. Sempre maiuscolo.
* **Controllo d'Integrità dei Riferimenti**: Il nostro algoritmo primario di validazione deterministica.

*Cosa NON siamo:* Zenzic è una suite per la qualità totalmente engine-agnostic. Non riferitevi mai a Zenzic limitandovi a chiamarlo "un plugin", una "utility MkDocs" o un "visualizzatore Markdown".

## Identità Visiva: L'Artefatto Zenzic

Il termine storico *zenzic* si riferisce al quadrato matematico di un numero ($x^2$). È fondamentalmente legato ai sistemi di radici matematiche e al ridimensionamento dimensionale.

La nostra iconografia eredita direttamente questo retaggio. L'artefatto visivo di Zenzic rappresenta una solida base-radice che governa dozzine di strutture complesse e intrecciate, mantenendole in equilibrio. Simboleggia il rigore logico che domina il caos su sistemi non lineari.

Quando disponi i nostri loghi o elementi visivi in presentazioni fisiche o documentazioni:

* Lascia che l’artefatto abbia un adeguato margine di spazio. Non affollarlo di testo.
* Mantieni confini netti e ad alto contrasto (flat).
* Evita inclinazioni, rotazioni arbitrarie o l'applicazione di sfocature e ombre morbide che ne compromettano la spigolatura geometrica.

## La Palette Bimodale {#bimodal-palette}

Zenzic adatta la propria frequenza visiva all'ambiente luminoso dell'ingegnere. L'Indaco che guida un audit a mezzanotte deve essere diverso da quello che accoglie l'utente su uno schermo illuminato. Non è incoerenza — è ergonomia cognitiva.

| Modalità | Token | Hex | Contrast Ratio | Livello WCAG |
|---------|-------|-----|---------------|-------------|
| Light | `indigo-700` | `#4338ca` | 7,9:1 su bianco | AAA |
| Dark | `indigo-300` | `#a8b3fb` | 9,9:1 su `#09090b` | AAA |
| Bordi (Light) | `indigo-200` | `#c7d2fe` | strutturale | — |
| Bordi (Dark) | `indigo-500/20` | `#6366f1` al 20% | strutturale | — |

**Specifiche d'Uso:** Il colore Indaco di Zenzic è un indicatore semantico riservato ai componenti strutturali (es. Navbar, Footer, Scanner Output). In Light Mode garantisce un rapporto di contrasto >4.5:1 per il testo primario. In Dark Mode, il livello di contrasto è ricalibrato per la leggibilità prolungata. Il layer `backdrop-blur` sotto i pannelli `ZenzicTerminal` riduce l'intensità del bordo per prevenire l'affaticamento visivo (WCAG 2.1 AA compliance).
