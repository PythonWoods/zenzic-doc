---
icon: lucide/blocks
sidebar_label: "Guida ai Motori"
description: "Come Zenzic scopre e carica gli adapter dei motori di documentazione."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Guida alla Configurazione dei Motori

Zenzic è **agnostico** — funziona con MkDocs, Zensical o una cartella standard di file
Markdown senza richiedere l'installazione di alcun framework di build. È anche **opinato**:
quando dichiari un motore, devi dimostrarlo. Questa guida spiega come configurare Zenzic
per ogni motore supportato e quali sono le regole.

## Portata multi-ecosistema

Zenzic è uno strumento Python, ma la sua portata non è limitata all'ecosistema Python della
documentazione. Poiché Zenzic analizza **file Markdown sorgente e configurazione come dati
semplici** — senza mai invocare un motore di build, senza mai importare codice di framework
— può validare la documentazione di qualsiasi generatore di siti statici (SSG),
indipendentemente dal linguaggio in cui è scritto.

| Livello di supporto | Motore | Linguaggio SSG | Come |
| :--- | :--- | :--- | :--- |
| **Nativo** | MkDocs | Python | `MkDocsAdapter` — legge `mkdocs.yml`, risolve i18n, impone la nav |
| **Nativo** | Zensical | Python | `ZensicalAdapter` — legge `zensical.toml`, zero YAML |
| **Agnostico** | Standalone | qualsiasi | `StandaloneAdapter` — funziona su qualsiasi cartella Markdown; controllo orphan disabilitato |
| **Estensibile** | Hugo *(esempio)* | Go | Adapter di terze parti via entry-point `zenzic.adapters` |
| **Estensibile** | Jekyll *(esempio)* | Ruby | Adapter di terze parti via entry-point `zenzic.adapters` |

Le voci "Estensibile" sono esempi di ciò che il sistema di adapter rende possibile — non
adapter già distribuiti. Un team che gestisce documentazione Hugo o Jekyll può scrivere un
pacchetto adapter di terze parti e installarlo accanto a Zenzic senza alcuna modifica a
Zenzic stesso:

```bash
# Esempio: adapter di terze parti per un ipotetico supporto Hugo
uv pip install zenzic-hugo-adapter   # oppure: pip install zenzic-hugo-adapter
zenzic check all --engine hugo
```

Questa portata multi-linguaggio è una proprietà strutturale, non una promessa di roadmap.
Il protocollo Adapter definisce cinque metodi; qualsiasi pacchetto Python che li implementa
e si registra sotto il gruppo entry-point `zenzic.adapters` è un adapter Zenzic valido —
per qualsiasi SSG.

---

## Versioni Supportate dei Motori

Zenzic include adapter per specifiche linee di versione maggiore. Dichiarare un motore diverso è un errore di configurazione: Zenzic emetterà `Z000 UNSUPPORTED_ENGINE` e si interromperà.

| Motore | Versioni supportate | Note |
| :--- | :--- | :--- |
| MkDocs | `1.x` | Serie congelata a `1.6.1`; nessuna `1.7` prevista. v2 è un progetto separato e richiede un adapter dedicato |
| Zensical | `0.0.x` | Pre-release; API volatile. L'adapter viene aggiornato in lockstep |
| Standalone | — | Agnostico rispetto al motore; la versione non è rilevante |

Zenzic **non** invoca il binario del motore — legge i file di configurazione come dati semplici. I vincoli di versione riguardano lo **schema del file di configurazione**, non il binario del motore installato. Se il tuo progetto utilizza una versione più recente di quelle elencate, l'adapter potrebbe comunque funzionare; segnala un problema solo se riscontri un errore di parsing effettivo o un falso positivo riconducibile a una modifica dello schema.

---

## Scegliere un motore

La sezione `[build_context]` in `.zenzic.toml` indica a Zenzic quale motore utilizza il tuo
progetto:

```toml
# .zenzic.toml
[build_context]
engine = "mkdocs"   # oppure "zensical"
```

Se `[build_context]` è assente, Zenzic individua deterministicamente il motore:

- `mkdocs.yml` presente → `MkDocsAdapter`
- nessuna configurazione presente, nessun locale dichiarato → `StandaloneAdapter` (controllo orphan disabilitato)

!!! info "Ponte CLI — Controlli signal-to-noise"
    Selezione engine e verbosità report sono aspetti separati. Usa
    [Comandi CLI: Flag globali](./cli.md#global-flags) per calibrare la policy per run:

    1. `--strict` per elevare warning e imporre validazione URL esterni.
    2. `--exit-zero` per run osservativi non bloccanti.
    3. `--show-info` per ispezionare finding informativi di topologia.
    4. `--quiet` per output CI/pre-commit a riga singola.


---

## MkDocs

`MkDocsAdapter` viene selezionato quando `engine = "mkdocs"`.
Le stringhe motore non riconosciute ricadono su `StandaloneAdapter` — nessuna consapevolezza nav.
Legge `mkdocs.yml` usando un loader YAML permissivo che ignora
silenziosamente i tag sconosciuti (come l'interpolazione `!ENV` di MkDocs), quindi le
configurazioni con molte variabili d'ambiente funzionano senza alcuna pre-elaborazione.

### Limiti dell'analisi statica

`MkDocsAdapter` analizza `mkdocs.yml` come **dati statici**. Non esegue la pipeline di
build di MkDocs. Questo significa:

- **Tag `!ENV`** — trattati silenziosamente come `null`. Se la nav dipende da

  interpolazione di variabili d'ambiente a runtime, le voci nav che dipendono da quei
  valori saranno assenti dalla visione di Zenzic.

- **Nav generata dai plugin** — plugin che mutano la nav a runtime (es.
  `mkdocs-awesome-pages`, `mkdocs-literate-nav`) producono un albero di navigazione
  che Zenzic non vede mai. Le pagine incluse solo da questi plugin vengono segnalate
  come orfane.
  *Nota Tecnica su `mkdocs-awesome-pages`: L'adapter statico di Zenzic non legge i file `.pages`. Se si utilizzano i file `.pages` per definire la navigazione, Zenzic non vedrà quelle pagine come raggiungibili e le segnalerà come orfane a meno che non siano esplicitamente linkate da altre pagine raggiungibili.*

- **Macro** — `mkdocs-macros-plugin` (template Jinja2 in Markdown) non viene

  valutato. I link all'interno di espressioni macro non vengono validati.

Per progetti che dipendono fortemente dalla generazione dinamica della nav, aggiungi i
percorsi generati dai plugin a `excluded_dirs` in `.zenzic.toml` per sopprimere i falsi
positivi sugli orfani finché non sarà disponibile un adapter nativo.

### Configurazione minima

```toml
# .zenzic.toml
docs_dir = "docs"

[build_context]
engine         = "mkdocs"
default_locale = "en"
locales        = ["it", "fr"]   # nomi delle directory locale non predefinite (folder mode)
```

Quando `locales` è vuoto, Zenzic si ricade a leggere le informazioni sui locale direttamente
dal blocco del plugin `i18n` in `mkdocs.yml` — zero configurazione richiesta
per la maggior parte dei progetti. Questo comprende sia il pacchetto community
`mkdocs-static-i18n` che il plugin i18n integrato in `mkdocs-material`, poiché entrambi
si dichiarano come `i18n:` in `mkdocs.yml`.

### i18n: Folder Mode

In Folder Mode (`docs_structure: folder`), ogni locale non predefinito vive in una directory
di primo livello sotto `docs/`:

```text
docs/
  index.md          ← locale predefinito
  assets/
    logo.png        ← asset condiviso
  it/
    index.md        ← traduzione italiana
```

Zenzic legge la lista `languages` da `mkdocs.yml` per identificare le directory locale. I
file il cui primo componente del percorso è una directory locale vengono esclusi dal controllo
orphan — ereditano la loro appartenenza alla nav dall'originale nel locale predefinito.

Quando `fallback_to_default: true` è impostato, i link agli asset da `docs/it/index.md` che
si risolvono a `docs/it/assets/logo.png` (assente) vengono automaticamente ricontrollati
rispetto a `docs/assets/logo.png`, specchiando il comportamento di fallback effettivo del
motore di build.

```yaml title="mkdocs.yml"
# mkdocs.yml
plugins:

  - i18n:

      docs_structure: folder
      fallback_to_default: true
      languages:

        - locale: en

          default: true
          build: true

        - locale: it

          build: true
```

> **Regola:** Se `fallback_to_default: true` è impostato, almeno una voce lingua deve avere
> `default: true`. Se nessuna lo ha, Zenzic lancia `ConfigurationError` immediatamente — non
> può determinare il locale di destinazione del fallback.

### i18n: Suffix Mode

In Suffix Mode (`docs_structure: suffix`), i file tradotti sono fratelli degli originali:

```text
docs/
  guide.md        ← locale predefinito
  guide.it.md     ← traduzione italiana (stessa profondità di directory)
  assets/
    logo.png      ← stesso percorso relativo da entrambi i file
```

Zenzic legge i codici locale non predefiniti da `mkdocs.yml` e genera pattern di esclusione
`*.{locale}.md` (es. `*.it.md`, `*.fr.md`). Questi file vengono esclusi dal controllo orphan.

Solo i codici ISO 639-1 validi di due lettere minuscole producono pattern di esclusione. I
tag di versione (`v1`, `v2`), tag di build (`beta`, `rc1`), codici a tre lettere e codici
BCP 47 con regione vengono rifiutati silenziosamente — non producono esclusioni false.

### Risoluzione degli URL di route

MkDocs costruisce gli URL dai percorsi sorgente quando `use_directory_urls: true` (impostazione
predefinita): `docs/guide/install.md` → `/guide/install/`. Zenzic valida i **link relativi a
livello sorgente**, non gli URL costruiti — quindi i link inter-documento sono identici in entrambe
le modalità di routing.

Se `use_directory_urls: false` è impostato, MkDocs genera file `.html` piatti. La validazione
dei link di Zenzic non è influenzata: i link relativi `../api.md` si risolvono correttamente
indipendentemente da questa impostazione. Solo i link assoluti (`/guide/`) vengono sempre
segnalati come `Z105 ABSOLUTE_PATH`.

---

## Zensical

`ZensicalAdapter` viene selezionato quando `engine = "zensical"`. Legge `zensical.toml`
nativamente usando `tomllib` di Python — **zero YAML**. Nessun `mkdocs.yml` viene letto
né richiesto.

### Native Enforcement

```toml
# .zenzic.toml
[build_context]
engine = "zensical"
```

### Proxy Trasparente (Ponte di Migrazione) {#zensical-transparent-proxy}

Il Proxy Trasparente è la feature di migrazione distintiva di Zensical: se `zensical.toml` è
**assente** ma `mkdocs.yml` è presente nella root del progetto, `ZensicalAdapter` legge
automaticamente la configurazione MkDocs come ponte — senza alcuna configurazione manuale.

Questo significa che puoi adottare Zenzic con l'engine Zensical **dal primo giorno di migrazione**,
prima di scrivere una singola riga di `zensical.toml`. Quando il ponte si attiva, il banner
Zenzic notifica:

```text
NOTICE: Zensical engine active via mkdocs.yml compatibility bridge.
```

**Cosa legge il ponte da `mkdocs.yml`:**

| Campo MkDocs | Usato da Zensical Adapter per |
| :--- | :--- |
| `docs_dir` | Rilevamento della directory sorgente |
| `nav` | Appartenenza alla nav (rilevamento orphan) |
| `plugins.i18n.languages` | Identificazione delle directory locale |
| `theme.favicon`, `theme.logo` | Guardia asset Z404 |

!!! tip "Strategia di migrazione"
    Usa il Proxy Trasparente per eseguire `zenzic check all` sul tuo progetto MkDocs *prima* di
    impegnarti con Zensical. Una volta soddisfatto dei risultati, crea un `zensical.toml` nativo per
    la piena parità e sblocca le funzionalità specifiche di Zensical.

### Formato nav di zensical.toml

Zenzic legge la sezione `[nav]` per determinare quali pagine sono dichiarate:

```toml
# zensical.toml
[project]
site_name = "La Mia Documentazione"

[nav]
nav = [
  {title = "Home",      file = "index.md"},
  {title = "Tutorial",  file = "tutorial.md"},
  {title = "API",       file = "reference/api.md"},
]
```

I file elencati sotto `file` (relativi a `docs/`) costituiscono il set della nav. Qualsiasi
file `.md` sotto `docs/` che non è in questo set e non è un mirror locale viene segnalato
come orphan.

### Perché Zensical elimina la complessità dell'i18n

> Vedi [Caricamento Configurazione](../explanation/configuration-loading.md) per il razionale architetturale dietro i18n nativo di Zensical vs. indirezione di plugin MkDocs.

### Limitazioni

- **Nav generata da plugin** — I plugin Zensical che modificano la nav a runtime non vengono

  valutati. Le pagine incluse solo da tali plugin potrebbero essere segnalate come orphan. Aggiungi
  i loro percorsi a `excluded_dirs` in `.zenzic.toml` per sopprimere i report falsi.

- **Contenuto dinamico** — `zensical.toml` viene analizzato come TOML statico. Le espressioni

  template o i campi calcolati non vengono valutati.

- **Scope di rilevamento** — `ZensicalAdapter` cerca `zensical.toml` (o il ponte MkDocs) solo

  nella root del progetto. I layout workspace nidificati richiedono un `docs_dir` esplicito in `.zenzic.toml`.

---

---

## Divieto di Link Assoluti

**Questa regola si applica a ogni motore, incondizionatamente.**

I link che iniziano con `/` sono un errore bloccante in tutte le modalità motore:

```markdown
<!-- Rifiutato — il percorso assoluto rompe la portabilità -->
[Scarica](/assets/guide.pdf)

<!-- Corretto — il percorso relativo sopravvive a qualsiasi prefisso di hosting -->
[Scarica](/assets/guide.pdf)
```

Un link a `/assets/guide.pdf` presuppone che il sito sia servito dalla root del dominio.
Quando la documentazione è ospitata su `https://example.com/docs/`, il browser risolve
`/assets/guide.pdf` in `https://example.com/assets/guide.pdf` — un 404. La correzione è
sempre un percorso relativo.

Il controllo viene eseguito prima di qualsiasi logica dell'adapter — prima del parsing della
nav, prima del rilevamento dei locale, prima della risoluzione dei percorsi. Non può essere
soppresso dalla configurazione del motore.

Gli URL esterni (`https://...`, `http://...`) non sono interessati.

---

## Standalone (nessun motore)

`StandaloneAdapter` viene restituito quando non è presente alcun file di configurazione del
motore e non sono dichiarati locale. È la modalità universale di Zenzic — compatibile con
qualsiasi progetto basato su Markdown che non utilizza un SSG supportato.

### Quando usare Standalone

- **Repository Markdown statici** — wiki, ADR log, documentazione in testo statico senza

  pipeline di build.

- **Validazione pre-migrazione** — esegui Zenzic su un progetto prima di scegliere un SSG per

  rilevare link rotti e credenziali prima dell'introduzione di un framework.

- **Progetti SSG personalizzati** — qualsiasi generatore non ancora coperto da un adapter nativo.

  Usa `excluded_dirs` per sopprimere i falsi positivi delle directory di output generate.

### Configurazione minimale

```toml
# .zenzic.toml — minimo richiesto per standalone
docs_dir = "docs"
```

Nessuna sezione `[build_context]` è necessaria. Zenzic rileva l'assenza di file di configurazione
del motore e seleziona automaticamente `StandaloneAdapter`.

### Capacità

I controlli snippet, placeholder, link e asset vengono eseguiti a piena potenza. Il rilevamento
credenziali Z201, il rilevamento path traversal Z202/Z203 e le guardie logo/favicon Z401
funzionano tutti normalmente.

Tutti i metodi dell'adapter sono no-op:

- `is_locale_dir` → sempre `False`
- `resolve_asset` → sempre `None`
- `is_shadow_of_nav_page` → sempre `False`
- `get_nav_paths` → `frozenset()`
- `get_ignored_patterns` → `set()`

### Limitazioni

`find_orphans` restituisce `[]` immediatamente — senza una nav dichiarata, non c'è un insieme
di riferimento con cui confrontarsi. Il rilevamento orphan richiede una dichiarazione nav: MkDocs
`nav:` o Zensical `[nav]`.

Per progetti con localizzazione senza un engine supportato, aggiungi i nomi delle directory
locale a `excluded_dirs` in `.zenzic.toml` per evitare falsi report orphan.
