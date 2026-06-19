---
sidebar_position: 8
sidebar_label: "Codenames di Rilascio"
title: "Codenames di Rilascio"
description: "Mappa delle versioni SemVer di Zenzic ai rispettivi codenames di rilascio ufficiali e alle aree di focus ingegneristico."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Codenames di Rilascio

Ogni ciclo di rilascio di Zenzic riceve un codename derivato da un minerale geologico.
I codenames sono sempre in inglese, non vengono mai tradotti e servono come segnalibri
architetturali stabili nella documentazione, nei changelog e nelle guide di migrazione.

## Registro dei Codenames

| Versione | Codename | Proprietà chiave | Focus ingegneristico |
|----------|----------|-----------------|----------------------|
| **v0.6.x** | **Obsidian** | Vetro vulcanico — formato sotto pressione estrema, bordo eccezionalmente tagliente | Credential scanner (Z2xx), path traversal guard, primo output SARIF, modello Exclusion Zone |
| **v0.7.x** | **Quartz** | Piezoelettrico — preciso, auto-oscillante, riferimento per la frequenza | Codici di finding (`Zxxx`), contratto dei codici di uscita, Virtual Site Map, compatibilità SARIF |
| **v0.8.x** | **Basalt** | Roccia vulcanica densa — rinforzo strutturale ad alta resistenza | Plugin SDK, stabilizzazione dell'adapter protocol, performance su larga scala |
| **v0.9.x** | **Graphite** | Altamente conduttivo — abilita il flusso tra sistemi | Integrazioni di terze parti, API pubblica, espansione dell'ecosistema |
| **v0.10.x** | **Magnetite** | Naturally magnetic — aligns with external fields | Native CI/CD integration, Progressive Adoption, Async Network I/O |
| **v1.0.0** | **Diamond** | Materiale naturale più duro — massima integrità strutturale | Long-Term Support, garanzie di stabilità, piena maturità dell'API |
| **v1.1.x** | **Corundum** | Durezza 9 — altamente resistente all'abrasione | Personalizzazione avanzata delle regole, hardening dell'ecosistema |
| **v1.2.x** | **Beryl** | Cristallo esagonale — purezza strutturale | Ottimizzazione del parsing AST, riduzione del footprint in memoria |

## Convenzioni d'uso

I codenames compaiono in:
- Intestazioni di sezione in `CHANGELOG.md` (es. `## [0.8.0] — Basalt`)
- `RELEASE.md` e il campo `version-note` di `CITATION.cff`
- Guide di migrazione e annunci di breaking change

I codenames **non** compaiono in:
- Testo dei tutorial o delle guide how-to (usare prosa agnostica)
- Messaggi di errore o output della CLI (usare il numero di versione)
- Traduzioni (i codenames sono nomi propri — sempre scritti in inglese)

Se vuoi contribuire a un milestone specifico, il
Registro Ingegneristico *(Maintainer Only)* contiene il
contesto dello sprint attivo e le decisioni architetturali in corso.
