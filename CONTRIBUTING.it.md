<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->

# Contribuire a zenzic-doc

Grazie per il tuo contributo al portale di documentazione di Zenzic.
Questa guida è scritta per **Technical Writer e Documentation Engineer** — non per
programmatori Python. Se vuoi contribuire al motore Zenzic, consulta il
[repository core](https://github.com/PythonWoods/zenzic/blob/main/CONTRIBUTING.md).

---

## Policy di Governance Enterprise e Contributo

Per garantire la sicurezza, l'integrità architetturale e la conformità legale di Zenzic, tutti i contributi devono aderire alle seguenti linee guida di Governance Enterprise:

1. **Issue-First Policy (Prima le Issue)**: Nessuna Pull Request sarà presa in carico, revisionata o discussa se non preceduta da una Issue corrispondente discussa e approvata dai maintainer. Collega sempre l'Issue approvata nella descrizione della tua PR.
2. **Firma Crittografica Obbligatoria**: Tutti i commit devono essere firmati crittograficamente tramite chiavi GPG, SSH o S/MIME (mostrati come "Verified" su GitHub). I commit non firmati verranno respinti automaticamente dal gate di merge.
3. **Clausola "No AI Slop"**: Applichiamo una policy severa contro il codice generato da intelligenza artificiale non verificato. I contributor devono comprendere appieno, saper spiegare e giustificare dal punto di vista architetturale ogni singola riga di codice proposta nella PR. La proposta di codice non compreso porterà al rifiuto immediato del contributo.
4. **Developer Certificate of Origin (DCO)**: Tutti i commit devono includere la riga `Signed-off-by:` (usando `git commit -s`) per certificare la conformità con la DCO.
5. **Conventional Commits**: I messaggi di commit devono seguire rigorosamente la specifica Conventional Commits (es. `feat: add block anchor support (#123)`).

---

## Prerequisiti

| Strumento | Versione | Installazione |
|-----------|----------|---------------|
| Node.js | 20 o superiore (24 raccomandato) | [nodejs.org](https://nodejs.org) |
| npm | 10 o superiore | incluso con Node.js |
| just | qualsiasi | `brew install just` / `cargo install just` |
| uv / uvx | qualsiasi | `pip install uv` o [docs.astral.sh](https://docs.astral.sh/uv/) |

Verifica il tuo setup:

```bash
node --version   # must be ≥ 20 (≥ 24 raccomandato)
npm --version    # must be ≥ 10
just --version
```

---

## Setup Iniziale

Clona il repository e installa le dipendenze:

```bash
git clone https://github.com/PythonWoods/zenzic-doc.git
cd zenzic-doc
npm ci
```

Installa gli hook pre-commit (una sola volta dopo il clone):

```bash
uvx pre-commit install               # commit-stage: hygiene + typecheck + zenzic
uvx pre-commit install -t pre-push   # pre-push: 🛡️ Final Guard runs `just verify`
```

---

## Eseguire il Sito in Locale

```bash
just start          # EN only — fastest for editing
just start-it       # IT only — use when editing Italian content
```

Il dev server ricarica automaticamente quando salvi un file.
Il language switcher è **inattivo in modalità dev** — usa `just serve` dopo
`just build` per testare il cambio di locale.

---

## Struttura dei File

```text
docs/                 ← English source content (all .mdx)
  tutorials/          ← Learning-oriented guides
  how-to/             ← Task-oriented recipes
  reference/          ← Information-oriented reference
  explanation/        ← Conceptual background
  community/          ← Contributing, FAQ, license, brand-kit
i18n/
  it/                 ← Italian translations — mirrors docs/ exactly
blog/                 ← Zenzic Blog engineering posts
src/
  components/         ← React components (Icon, Homepage sections)
  css/custom.css      ← design system (do not edit without CEO approval)
static/               ← Static files served verbatim
```

**Regola:** ogni file dentro `docs/` deve essere `.mdx`. Non creare mai file
`.md` lì dentro.

---

## Scrivere e Modificare i Contenuti (Diátaxis)

Questo portale segue il [framework Diátaxis](https://diataxis.fr). Prima di
scrivere, identifica a quale quadrante appartiene il tuo contributo:

| Sezione | Domanda a cui risponde | Esempio |
|---------|------------------------|---------|
| `tutorials/` | "Come imparo X passo dopo passo?" | Walkthrough di primo setup |
| `how-to/` | "Come realizzo X?" | Come aggiungere badge |
| `reference/` | "Cosa fa esattamente X?" | Reference della configurazione del motore |
| `explanation/` | "Perché Zenzic funziona in questo modo?" | Panoramica architetturale |

Colloca il file nella sezione corretta e segui la convenzione di naming:
`verb-noun.mdx` per how-to (es. `add-badges.mdx`), `noun.mdx` per reference.

### Frontmatter (obbligatorio)

Ogni file `.mdx` deve iniziare con:

```yaml
---
sidebar_label: Short Label
---
```

**Non aggiungere il frontmatter `slug:`.** Gli URL devono rispecchiare
esattamente il path del filesystem (Slug Law — vedi la
[documentazione Governance](developers/governance/index.mdx)).

### Icone

Usa `<Icon name="icon-name" />` ovunque, senza import per-file.
I nomi disponibili sono elencati in [`src/components/Icon.tsx`](src/components/Icon.tsx).

---

## Gestione delle Traduzioni (i18n)

Il locale italiano vive in `i18n/it/docusaurus-plugin-content-docs/current/` e
rispecchia `docs/` esattamente.

Quando **aggiungi un nuovo file**:

1. Crea la versione inglese in `docs/`.
2. Crea la versione italiana nel path corrispondente in `i18n/it/`.
3. Il contenuto del file italiano deve essere una traduzione fedele — non una traduzione automatica senza revisione.

Quando **rinomini un file**:

1. Rinomina sia in `docs/` che in `i18n/it/`.
2. Esegui `just build` per confermare che nessun link sia rotto.

Per rigenerare gli stub di traduzione dopo cambi strutturali:

```bash
npm run write-translations
```

---

## 🚀 Cross-Repo Validation (Branch Parity Rule)

Per garantire la coerenza tra il motore core (**zenzic**) e la documentazione (**zenzic-doc**), il nostro sistema CI applica la **Regola della Branch Parity**.

### 🔍 Come funziona

1. **Sviluppo Locale**: la risoluzione del core segue una precedenza deterministica: `ZENZIC_CORE_PATH` → `./_zenzic_core` → `../zenzic`. Sei responsabile di mantenere allineati i branch locali.
2. **In CI (GitHub Actions)**: la pipeline della documentazione tenta di clonare il repository core cercando un branch con **lo stesso nome esatto** di quello in build nel repo doc.
3. **Fallback**: se il branch specchio non viene trovato nel repo core, la CI ripiega automaticamente sul branch `main`.

### 🛠️ Riepilogo Operativo per i Contributori

| Scenario | Azione Richiesta | Comportamento CI |
| :--- | :--- | :--- |
| **Fix Documentazione** | Push solo su `zenzic-doc` | Valida contro core `main`. |
| **Nuova Feature (Sincronizzata)** | Push su `zenzic` **PRIMA** di pushare su `zenzic-doc` | Valida contro il codice esatto della feature. |
| **Convenzione di Naming** | Usa nomi di branch identici in entrambi i repo | Garantisce un Dogfooding perfetto. |

> **Nota**: non pushare mai cambi di documentazione che dipendano da feature core non ancora presenti sul server remoto (anche se su branch diversi), altrimenti la build fallirà per disallineamento.

### 💻 Configurazione del Multi-Root Workspace VS Code

Poiché i repository sono strettamente accoppiati, raccomandiamo di gestirli tramite un singolo **Multi-Root Workspace** in VS Code.

1. Clona entrambi i repository nella stessa directory padre.
2. Apri VS Code e vai su **File > Save Workspace As...**, salvando come `zenzic.code-workspace` nella directory padre.
3. Modifica il file appena creato così:

```json
{
  "folders": [
    { "path": "zenzic" },
    { "path": "zenzic-doc" },
    { "path": "zenzic-action" }
  ],
  "settings": {
    "python.analysis.extraPaths": ["./zenzic/src"],
    "files.exclude": {
      "**/.venv": true,
      "**/_zenzic_core": true
    }
  }
}
```

Questo ti permette di eseguire ricerche globali su tutti i repository simultaneamente e gestire i branch dal pannello Source Control in un'unica interfaccia unificata.

---

## 404 Emergency Protocol (Sovereign Override)

Se Zenzic fallisce su un URL esterno pre-launch (HTTP 404), non disabilitare i check esterni globalmente.
Applica un'esclusione runtime chirurgica con `ZENZIC_EXTRA_ARGS`:

```bash
ZENZIC_EXTRA_ARGS="--exclude-url https://example.com/prelaunch" just verify
```

Regole:

1. Escludi solo gli URL pre-launch esatti, mai domini ampi senza approvazione esplicita.
2. Usa `ZENZIC_EXTRA_ARGS` solo per URL pre-launch **transitori**. Per vincoli strutturali
   **permanenti** (es. infrastrutture rate-limited, servizi di terze parti che vanno
   sistematicamente in timeout), usa `excluded_external_urls` in `.zenzic.toml` con
   un commento inline che spiega il razionale.
3. Rimuovi ogni esclusione non appena l'URL diventa pubblicamente raggiungibile.

Per l'architettura completa e la lifecycle policy, vedi la
[Sovereign Override Guide](developers/how-to/sovereign-override-404-shield.mdx).

---

## Prima di Aprire una Pull Request

Esegui il gate locale completo:

```bash
just verify        # lint-all + build + codes parity + audit strict + score stamp + freshness gate
```

Deve passare con zero errori prima di aprire o aggiornare una PR.

- Eseguire un D.I.A. (Documentation Impact Analysis). Se la PR altera il comportamento della CLI o i contratti API, dichiaratelo esplicitamente nella descrizione. Siete incoraggiati ad aprire una PR corrispondente su zenzic-doc; in caso contrario, i maintainer si occuperanno dell'allineamento prima del rilascio.

### Hook pre-commit

Il repository applica la qualità automaticamente a ogni `git commit`:

| Hook | Cosa verifica |
|------|---------------|
| trailing-whitespace | Nessuno spazio in coda |
| end-of-file-fixer | I file terminano con un newline |
| check-yaml / check-json / check-toml | Dati strutturati validi |
| TypeScript Typecheck | `tsc --noEmit` deve passare |
| Zenzic | `zenzic check all` deve uscire con 0 |
| REUSE/SPDX | Tutti i file hanno informazioni di licenza |

Se un hook fallisce, correggi il problema segnalato e riprova il commit.

### Immutable Pre-Commit Hooks (ADR-089) — Solo Maintainer

Tutte le chiavi `rev:` in `.pre-commit-config.yaml` devono puntare a un
**commit hash di 40 caratteri**, mai a un tag semantico (`v1.2.3`). I tag git
sono mutabili: un maintainer upstream (o un attaccante) può spostare un tag
silenziosamente, avvelenando il Gate 2 locale senza alcun diff in questo
repository.

Questa è una **policy CI interna del progetto zenzic-doc**, non una regola
pubblica del linter Zenzic. Enforcement: `just check-pinning` (dipendenza di
`just verify`); le violazioni sollevano `[ADR-089] FATAL` in pre-push.

La finestra di esposizione locale è più piccola di quella GHA perché
`pre-commit` congela i repo degli hook in `~/.cache/pre-commit/` finché
l'utente non lancia `autoupdate` o `clean`; GitHub Actions invece ri-risolve
il ref a ogni esecuzione. Il pinning è comunque obbligatorio in locale per la
sicurezza dei nuovi clone e per la parità con l'enforcement ADR-089 remoto.

**Aggiornare gli hook pinned.** Non eseguire mai il `pre-commit autoupdate`
nudo — riscrive le SHA tornando a tag mutabili. Usa sempre:

```bash
uvx pre-commit autoupdate --freeze
```

Questo preserva il commento di annotazione `# vX.Y.Z`. Committa il diff e
ri-verifica con `just check-pinning`.

---

## Aggiungere un Blog Post

I blog post vivono in `blog/` e usano il formato di filename `YYYY-MM-DD-slug.mdx`.

Frontmatter obbligatorio:

```yaml
---
slug: your-post-slug
title: The Full Title
authors: [pythonwoods]
tags: [engineering, release]
date: 2026-04-22
---
```

L'autore `pythonwoods` è definito in `blog/authors.yml`.

---

## REUSE / Compliance di Licenza

Ogni file in questo repository deve contenere i metadati
`SPDX-FileCopyrightText` e `SPDX-License-Identifier`. Per la maggior parte dei
file questo è gestito automaticamente tramite glob annotations in `REUSE.toml`.

Se aggiungi un nuovo tipo di file o una directory non coperta dai glob
esistenti, aggiungi un'annotazione a `REUSE.toml` prima di committare. L'hook
`reuse lint` intercetterà eventuali lacune.

Verifica la compliance manualmente:

```bash
just reuse
```

---

## Code of Conduct

Tutti i contributori sono tenuti a seguire il
[Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
Segnala le violazioni a `dev@pythonwoods.dev`.

---

*zenzic-doc è sviluppato da [PythonWoods](https://pythonwoods.dev) · Apache-2.0*
