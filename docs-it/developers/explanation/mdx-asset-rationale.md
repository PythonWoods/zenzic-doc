---
title: "Razionale della Componentizzazione degli Asset MDX"

description: "Razionale architetturale per l'uso di componenti React anziché SVG statici nelle pagine MDX."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Razionale della Componentizzazione degli Asset MDX

Gli asset vettoriali destinati all'uso esclusivo all'interno delle pagine MDX devono essere implementati come componenti React (`.tsx`) anziché file `.svg` statici (Direttiva ZRT-DOC-010).

Questa regola esiste a causa di diverse limitazioni critiche dei file `.svg` statici all'interno di un ambiente applicativo React:

- **Agnosticismo del Tema:** I file `.svg` statici non possono leggere le variabili CSS di runtime (come `--ifm-color-*`) o reagire facilmente alle transizioni della modalità chiara/scura senza sovrascritture manuali di stile o file di asset duplicati.
- **Barriere i18n:** Il testo all'interno di un file SVG è incorporato nei nodi XML. Ciò impedisce l'uso di wrapper di traduzione come `<Translate>` e richiede il mantenimento di file localizzati duplicati per ogni lingua.
- **Sincronizzazione dei Dati:** Gli SVG statici devono essere aggiornati manualmente quando i modelli di dati sottostanti cambiano, portando a derive tecniche ed errori. I componenti React possono importare e renderizzare dinamicamente le variabili da un'unica fonte di verità.

## Usi SVG Consentiti e Vietati

| Caso d'Uso | Stato | Motivo |
| :--- | :---: | :--- |
| **Schede Social OpenGraph** (`static/assets/social/`) | Consentito (✓) | Consumato direttamente da `<meta og:image>`, non all'interno del layout React |
| **Illustrazioni README di GitHub** | Consentito (✓) | Renderizzato dal processore Markdown di GitHub al di fuori del contesto del motore di build |
| **Grafica Pura** (loghi, forme semplici) | Consentito (✓) | Nessun nodo di testo o dati localizzati che richiedano traduzioni |
| **Illustrazioni con Testo dentro MDX** | Vietato (❌) | Deve usare un componente `.tsx` per supportare i18n e stile |
