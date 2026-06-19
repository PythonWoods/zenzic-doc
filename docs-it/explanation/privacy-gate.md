---
icon: lucide/shield
title: "Architettura del Privacy Gate"
sidebar_label: "Architettura del Privacy Gate"
sidebar_position: 3
description: "Razionale di design del Privacy Gate di Zenzic — il modello di sicurezza Zero-Trust fail-closed che copre la famiglia di finding Z2xx."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Architettura del Privacy Gate (Zero-Trust in CI/CD)

Il Privacy Gate è il contratto di sicurezza che impedisce alle pipeline
documentali di pubblicare materiale sensibile. È progettato intenzionalmente
come sistema **fail-closed**.

In termini operativi: quando viene rilevata una condizione di classe sicurezza,
Zenzic interrompe immediatamente la pipeline invece di produrre un report
"best effort".

---

## Perché Esiste il Gate

La QA documentale tradizionale si concentra sulla correttezza (link rotti,
anchor mancanti, drift strutturale). Il rischio privacy è diverso:

- una credenziale esposta può diventare incidente attivo in pochi minuti;
- un traversal o un termine vietato può esporre topologia interna, policy o
  informazioni regolamentate;
- il comportamento "solo warning" è incompatibile con la governance Zero-Trust.

Per questo il Privacy Gate tratta i finding di sicurezza come **blocchi
operativi**, non come issue stilistiche.

---

## Modello di Enforcement Zero-Trust

L'architettura segue quattro invarianti:

1. **Nessuna fiducia nell'intento dell'autore.** I controlli sicurezza
    vengono eseguiti su tutti i percorsi di scansione.
2. **Nessuna soppressione per la classe sicurezza.** I finding sicurezza sono
    asserzioni fattuali, non lint advisory.
3. **Semantica di failure deterministica.** Il comportamento di exit è stabile
    e auditabile.
4. **Contenimento CI-first.** Il percorso di merge/deploy viene interrotto
    prima della pubblicazione.

Questo rende il Privacy Gate compatibile con pipeline regolamentate dove
evidenza e riproducibilità sono obbligatorie.

---

## Scope Architetturale

Il Privacy Gate non è una singola regola: è un controllo di famiglia che copre
il dominio sicurezza Z2xx nella Z-Code Gallery.

- [Z201 (Credential Secret)](../reference/finding-codes.md#z201)
- [Z202 (Path Traversal)](../reference/finding-codes.md#z202)
- [Z203 (Path Traversal Fatal)](../reference/finding-codes.md#z203)
- [Z204 (Forbidden Term)](../reference/finding-codes.md#z204)

Per firme tecniche, esempi e remediation playbook, usare la
[famiglia Z2xx Security nella Finding Codes Gallery](../reference/finding-codes.md#z201).

---

## Filosofia Operativa

Il Privacy Gate impone una distinzione netta:

- i finding di qualità possono essere triagiati e pianificati;
- i finding di sicurezza devono essere rimossi o remediationati esplicitamente
  prima della release.

Questa è la postura Zero-Trust di Zenzic in CI/CD:
**la documentazione è trattata come superficie d'attacco di produzione**.
