---
sidebar_label: Design Esclusioni
description: "La logica di design dietro il modello di esclusione consapevole di Zenzic."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Design Esclusioni

## Controllo Consapevole vs. Automazione Cieca

Zenzic adotta di default il **Controllo Consapevole** invece dell'Automazione Cieca. Capire questo principio è la chiave per configurare lo strumento in modo efficace nei progetti in produzione.

`respect_vcs_ignore` è `true` di default. Questo allinea Zenzic al comportamento dei moderni linter: i percorsi ignorati dal VCS vengono saltati a meno che non siano esplicitamente inclusi.

**Il Problema del `.gitignore` Rumoroso**

Considera un repository dove `docs_dir = "."` (la root del repo è anche la root della documentazione). Questo è comune per progetti che analizzano `README.md`, `CHANGELOG.md` e altri file Markdown nella root. Un tipico `.gitignore` Python contiene voci come:

```gitignore
*.egg-info/
.coverage
dist/
htmlcov/
*.pyc
.venv/
```

Se `respect_vcs_ignore = true`, Zenzic escluderebbe silenziosamente qualsiasi file di documentazione il cui percorso corrisponde a questi pattern. Una pagina `docs/coverage-report.md`, ad esempio, sparirebbe dal rilevamento orfani senza alcun messaggio diagnostico. Il linter sembrerebbe sano mentre salta silenziosamente interi sottoalberi di documentazione.

**L'Esplicito `.zenzic.toml` è Superiore**

I campi `excluded_dirs` e `excluded_file_patterns` nella configurazione del progetto (L3 nella gerarchia delle esclusioni a strati) sono:

- **Visibili** — le esclusioni sono dichiarate in un unico file autorevole, non sparse tra `.gitignore`, `.dockerignore` e `.npmignore`
- **Revisionabili** — un nuovo contributore che esegue `git diff` vede esattamente cosa esclude Zenzic e perché
- **Stabili** — le esclusioni non cambiano quando uno sviluppatore aggiorna `.gitignore` per ragioni di tooling non correlate

```toml title=".zenzic.toml"
# Le esclusioni esplicite sono manutenibili e auditabili
excluded_dirs = ["includes", "stylesheets", "overrides"]
excluded_file_patterns = ["*.it.md", "CHANGELOG*.md"]

# respect_vcs_ignore = true   ← default; ometti o imposta esplicitamente
```

**Quando abilitare `respect_vcs_ignore`**

Abilitalo per progetti con un `.gitignore` pulito e orientato alla documentazione dove i percorsi ignorati dal VCS si mappano genuinamente su documentazione che non dovrebbe essere analizzata (es. riferimento API auto-generato in `site/`). Verifica sempre l'effetto delle esclusioni usando `--show-info` dopo l'abilitazione.

## Matematica del Punteggio di Governance

I campi `fail_under` e `suppression_cap` agiscono come **vincoli ortogonali**. Ogni soppressione attiva sottrae esattamente **1 punto DQS** (modello a costo fisso). Il punteggio massimo raggiungibile da un progetto è quindi:

$$\text{Punteggio Max Raggiungibile} = 100 - |F_s|$$

dove $|F_s|$ è il conteggio totale delle soppressioni attive. Configurare `fail_under > 100 - suppression_cap` crea una contraddizione matematica: il gate del punteggio scatterà a causa del debito di soppressioni *prima* che il cap venga raggiunto, rendendo gli slot superiori del budget inutilizzabili.

**Regola di configurazione sicura:** `fail_under` ≤ `100 - suppression_cap`.

**Progettare Policy di Governance Ibride**

Impostare `fail_under = 90` e `suppression_cap = 30` significa: "La qualità globale del repository non deve mai scendere sotto 90/100, **ma** indipendentemente dal punteggio, non tolleriamo assolutamente più di 30 difetti soppressi." Questo impedisce ai team di nascondere un enorme debito strutturale anche se il loro codice attivo è altrimenti pulito.
