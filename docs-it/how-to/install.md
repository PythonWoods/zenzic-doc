---
sidebar_position: 1
title: "Installa Zenzic"
sidebar_label: "Installa e Prima Esecuzione"
icon: lucide/play
description: "Installa Zenzic ed esegui il primo controllo qualità della documentazione."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->


# Installa Zenzic

Zenzic legge direttamente dal filesystem e funziona con qualsiasi progetto basato su Markdown. Usalo in locale, come hook di pre-commit, nelle pipeline CI o per audit una-tantum.

---

## Installazione

### Temporanea — nessuna installazione richiesta {#install-ephemeral}


**uv**


```bash
uvx zenzic check all
```

`uvx` risolve ed esegue Zenzic da PyPI in un ambiente temporaneo. Nulla viene installato sul
sistema. La scelta giusta per audit una-tantum, `git hooks` e job CI dove si vuole evitare di
fissare una dipendenza dev.

**pip**


```bash
pip install zenzic
zenzic check all
```

Installazione standard nell'ambiente attivo. Usa all'interno di un virtual environment per
mantenere pulito il Python di sistema.

### Eseguire da GitHub (Nessuna installazione) {#install-github}

Se vuoi eseguire Zenzic su un repository senza installarlo localmente, puoi eseguirlo direttamente dal repository GitHub utilizzando `uvx`. Questo è utile per testare Zenzic su un progetto o per usarlo come CLI temporanea e distribuita.

```bash
uvx --from git+https://github.com/PythonWoods/zenzic zenzic .
```

Puoi anche fissare un tag di versione specifico per un'esecuzione deterministica:

```bash
uvx --from git+https://github.com/PythonWoods/zenzic@<version> zenzic .
```

### Strumento globale — disponibile in ogni progetto {#install-global}


**uv**


```bash
uv tool install zenzic
zenzic check all
```

Installa una volta, usa in qualsiasi progetto. Il binario è disponibile nel `PATH` senza
attivare un virtual environment.

**pip**


```bash
python -m venv ~/.local/zenzic-env
source ~/.local/zenzic-env/bin/activate   # Windows: .venv\Scripts\activate
pip install zenzic
```

Installa in un virtual environment dedicato, poi aggiungi la directory `bin/` al `PATH`.

### Dipendenza dev del progetto — versione fissata per progetto {#install-dev-dependency}


**uv**


```bash
uv add --dev zenzic
uvx zenzic check all
```

Installa Zenzic nel virtual environment del progetto e fissa la versione in `uv.lock`.
La scelta giusta per progetti di team e pipeline CI che installano le dipendenze del progetto
prima di eseguire i controlli.

**pip**


```bash
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install zenzic
zenzic check all
```

Pattern standard da dipendenza dev con virtual environment locale al progetto.

### Solo analisi statica — nessun runtime di build richiesto {#lean-agnostic}

Zenzic legge i file di configurazione (`mkdocs.yml`, `zensical.toml`, `pyproject.toml`) come
testo statico. **Non esegue** il motore di build né i suoi plugin.

**Non installare** MkDocs, Material for MkDocs o alcun plugin di build nell'ambiente di
linting. Non servono. L'ambiente di linting ha una sola dipendenza: `zenzic`.

```bash
# Fare il lint di qualsiasi progetto MkDocs — nessun extra necessario
uvx zenzic check all
```

!!! note "Adapter di terze parti"
    Gli adapter di terze parti (es. un ipotetico `zenzic-hugo-adapter`) sono pacchetti
    installabili separati — non extra di `zenzic` stesso. Nessun extra è richiesto per
    `StandaloneAdapter` (cartelle Markdown semplici).

---

## Workflow Init → Config → Check {#init-config-check}

Il workflow standard per adottare Zenzic in un progetto:

### 1. Init — scaffolding del file di configurazione {#init}

Crea un `.zenzic.toml` con un singolo comando. Zenzic identifica il motore di
documentazione dai file di configurazione presenti e preimposta `[build_context]` di conseguenza:

```bash
zenzic init
```

**Esempio di output quando è presente `mkdocs.yml`:**

```text
Created .zenzic.toml
  Engine pre-set to mkdocs (detected from mkdocs.yml).

Edit the file to enable rules, adjust directories, or set a quality threshold.
Run zenzic check all to validate your documentation.
```

Se non viene rilevato alcun file di configurazione engine, `zenzic init` produce uno scaffold
engine-agnostico (modalità Standalone). In entrambi i casi, tutte le impostazioni sono commentate
per default — decommenta e modifica solo i campi di cui hai bisogno.

Eseguendo Zenzic senza un `.zenzic.toml`, Zenzic utilizza i valori predefiniti e mostra un
pannello Helpful Hint che suggerisce `zenzic init`:

```text
╭─ 💡 Zenzic Tip ─────────────────────────────────────────────────────╮
│ Using built-in defaults — no .zenzic.toml found.                      │
│ Run zenzic init to create a project configuration file.              │
│ Customise docs directory, excluded paths, engine adapter, and rules. │
╰──────────────────────────────────────────────────────────────────────╯
```

### 2. Config — personalizza per il tuo progetto {#config}

Modifica il `.zenzic.toml` generato per silenziare il rumore e impostare soglie appropriate:

```toml
# .zenzic.toml — nella root del repository
excluded_assets = [
"assets/favicon.svg",      # referenziato da mkdocs.yml, non da nessuna pagina .md
"assets/social-preview.png",
]
placeholder_max_words = 30     # le pagine di reference tecnico sono intenzionalmente brevi
fail_under = 70                # stabilisce un quality floor iniziale
```

Consulta la [Guida alla Configurazione](../reference/index.md) per l'elenco completo dei campi.

!!! tip "Git Ignore"
    Aggiungi `.zenzic_cache/` al file `.gitignore` del tuo repository per evitare di committare la cache locale della validazione di rete.

### 3. Check — esegui in modo continuativo {#check}

Con il baseline stabilito, esegui Zenzic su ogni commit e pull request:

```bash
# Hook pre-commit o step CI
# --strict: valida URL esterni + tratta i warning come errori
zenzic check all --strict

# Salva il baseline (punto di riferimento) qualità sul branch main
zenzic score --save

# Blocca le PR che regrediscono il baseline di più di 5 punti
zenzic diff --threshold 5
```

---

## Modalità engine {#engine-modes}

Zenzic seleziona un adapter in base al file di configurazione del motore di build presente nella root del repository. La **modalità Engine-aware** si attiva quando viene trovato `mkdocs.yml` o `zensical.toml`, abilitando il rilevamento degli orfani basato sulla nav, la risoluzione del fallback i18n, la soppressione delle directory locale e il tracciamento delle Ghost Route. La **modalità Standalone** si attiva quando non viene trovata alcuna configurazione del motore — il controllo degli orfani viene saltato perché senza una dichiarazione nav ogni file sembrerebbe orfano.

Usa `--engine` per sovrascrivere l'adapter rilevato per una singola esecuzione senza modificare `.zenzic.toml`.

> Per il razionale di design completo dietro la modalità engine-aware rispetto a standalone, vedi [Architettura — Sovereign CLI](../explanation/architecture.md#sovereign-cli).

## Dismissione di Zenzic

Se hai bisogno di rimuovere Zenzic dal tuo progetto, il processo di dismissione richiede meno di 30 secondi e non lascia tracce.

### Passo 1 — Rimuovere da CI/CD
Elimina il blocco di Zenzic dai tuoi file di workflow (ad es., `.github/workflows/docs.yml`):

```yaml
- uses: PythonWoods/zenzic-action@<version>
  with:
    version: "<version>"
    format: sarif
    upload-sarif: "true"
```

O, se eseguito direttamente in uno step shell:

```yaml
- name: Zenzic
  run: uvx zenzic check all
```

### Passo 2 — Rimuovere la configurazione
Elimina il file di configurazione dal tuo repository:

```bash
rm .zenzic.toml
# OPPURE modifica pyproject.toml e rimuovi la sezione [tool.zenzic]
```

---

**Prossimi passi:**

- [Riferimento comandi CLI](../reference/cli.md) — ogni comando, flag e codice di uscita
- [Funzionalità avanzate](../reference/advanced-features.md) — integrità dei riferimenti, credential scanner, utilizzo programmatico
- [Integrazione CI/CD](./configure-ci-cd.md) — GitHub Actions, pre-commit hook, gestione del baseline
