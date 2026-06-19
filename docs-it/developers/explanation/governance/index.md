---
title: "Governance & Sovranità"

description: "Panoramica della costituzione di governance di Zenzic, pilastri immutabili e standard di licenza."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Governance & Sovranità

> *"La stabilità non è il nemico del progresso. Ne è la precondizione."*

Questa sezione non è documentazione per burocrati. È l'**Ingegneria della Stabilità**
— un contratto formale che protegge i Tre Pilastri del Exclusion Zone dall'erosione
causata dalla comodità, dall'urgenza o da scorciatoie ben intenzionate.

---

## La Legge Suprema: I Tre Pilastri

Ogni documento di governance in questa sezione esiste per difendere un invariante:
**i Tre Pilastri sono non negoziabili.**

| Pilastro | Invariante | Cosa si perderebbe violandolo |
| :---: | :--- | :--- |
| **I** | Analizza la Sorgente, non il Build | Analizzare l'output HTML incatena Zenzic alla pipeline di build — quella cosa che è progettato per precedere. |
| **II** | Zero Sottoprocessi | Una chiamata a subprocess sfugge al perimetro di fiducia. Introduce una dipendenza che Zenzic non può controllare. |
| **III** | Pure Functions First | Le funzioni impure nei cicli critici sono modalità di fallimento invisibili. Il determinismo è la base del modello di fiducia. |

Questi non sono preferenze di design. Sono pareti portanti. Quando i Tre Pilastri
reggono, il Exclusion Zone regge.

---

## Documenti di Governance

| Documento | Scopo |
| :--- | :--- |
| [Il Giuramento di Sovranità](./exit_strategy) | Prova che Zenzic è uno strumento, non un padrone. Zero Residui. Rimovibile in 30 secondi. |
| [Politica di Evoluzione](./evolution_policy) | Il processo formale per far evolvere — o proteggere — i Tre Pilastri. |
| [Conformità Licenza](./licensing) | Apache-2.0 + REUSE 3.3. Ogni file porta la firma crittografica della sua licenza. |

---

## L'Ingegneria della Stabilità

I documenti di governance non sono scritti per oggi. Sono scritti per gli ingegneri
che manterranno Zenzic nel 2030, sotto pressioni che non esistono ancora, di fronte
a tentazioni architetturali che non sono ancora state nominate.

L'[ADR Vault](../adr-vault.md)
è la memoria operativa del progetto. Questa sezione Governance è il suo
**livello costituzionale** — i principi che il Ledger stesso non può ignorare.

---

## Abstract — Riassunto Tecnico

*Il sistema di Governance di Zenzic è progettato per un'unica garanzia: che le regole
del Exclusion Zone non cambino silenziosamente a metà del viaggio.*

I Tre Pilastri — *Analizza la Sorgente*, *Zero Sottoprocessi*, *Pure Functions First* —
sono Leggi Costituzionali, non preferenze architetturali. Una modifica a qualsiasi
Pilastro richiede un incremento di versione Major e una revisione formale tramite stress test.

La governance di Zenzic è costruita su tre assi:

| Asse | Documento | Garanzia |
| :--- | :--- | :--- |
| **Libertà** | [Il Giuramento di Sovranità](./exit_strategy) | Rimozione in 30 secondi. Zero residui. Core in sola lettura. |
| **Durata** | [Politica di Evoluzione](./evolution_policy) | Nessuna modifica ai Pilastri senza processo costituzionale pubblico. |

Questa sezione è il **contratto di governance del progetto** — i vincoli che proteggono la
struttura stessa di Zenzic dall'erosione causata da convenienza, urgenza e scorciatoie
ben intenzionate.

*"Non fidatevi di noi. Fidatevi del sistema che abbiamo costruito per proteggervi."*
