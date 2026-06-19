---

description: "Un confronto pedagogico del funzionamento interno degli adapter."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Interno degli Adapter — Progettazione Pedagogica

Il pattern adapter è il meccanismo architetturale fondamentale che consente a Zenzic di validare siti di documentazione senza dipendere dal runtime di specifici framework di build (ad es. Python per MkDocs).

Astrando i layout del sito e i contratti di navigazione in un protocollo unificato (`BaseAdapter`), Zenzic disaccoppia il motore di validazione dai comportamenti specifici dell'engine.

## Trade-off Architetturali: Modalità Consapevole del Motore vs. Sovrana

Gli adapter di Zenzic rientrano in due paradigmi principali: **Consapevole del Motore** (ad es. `MkDocsAdapter`) e **Senza Presupposti / Sovrano** (ad es. `StandaloneAdapter`).

### Adapter Consapevoli del Motore

Gli adapter consapevoli del motore leggono i file di configurazione, le sidebar e il frontmatter per ricostruire la tabella di routing interna del motore.

- **Capacità:** Abilitano funzionalità di validazione avanzate come il rilevamento rigoroso delle pagine orfane (Z402), il rilevamento delle copie shadow delle locale e la validazione di schemi URI personalizzati (ad es. i bypass di link personalizzati).
- **Complessità:** Elevata. L'adapter deve analizzare configurazioni complesse (YAML/TOML/JS/TS) e replicare la logica di generazione delle route esattamente come la eseguirebbe il motore.

### Adapter Senza Presupposti (Sovereign)

Gli adapter senza presupposti trattano l'albero di documentazione come un insieme grezzo di file e directory Markdown senza alcun contratto di navigazione.

- **Capacità:** Ricadono su un modello flat di filesystem in cui ogni file è considerato raggiungibile. Sotto questo modello, alcuni controlli (come il rilevamento delle pagine orfane) vengono disattivati automaticamente per prevenire falsi positivi.
- **Complessità:** Estremamente bassa. L'adapter non presuppone alcun metadato o generazione speciale di route.

---

> Per confronti di codice concreti che mostrano come queste strategie sono implementate in Python, vedi [Scrivere un Adapter — Esempi Concreti](../how-to/implement-adapter.md#esempi-di-implementazione-concreti-zensical-vs-standalone).
>
> Per la definizione della classe astratta e le firme del protocollo, vedi [Riferimento API — BaseAdapter](../reference/adapter-api.md#baseadapter-interface).
