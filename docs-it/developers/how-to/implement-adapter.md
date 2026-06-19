---

description: "Implementa la classe base astratta BaseAdapter per insegnare a Zenzic un nuovo motore di documentazione."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Scrivere un Adapter Zenzic

Questa guida spiega come creare un adapter di terze parti che insegna a Zenzic a
comprendere il layout del progetto, la struttura di navigazione e le convenzioni
i18n del tuo motore di documentazione — senza modificare Zenzic stesso.

---

## Cos'è un Adapter

Un **adapter** è una classe Python che estende la classe base astratta `BaseAdapter`
(`src/zenzic/core/adapters/_base.py`).  Lo scanner, il rilevatore di orfani e il
validatore di link di Zenzic parlano esclusivamente con questa interfaccia — non
importano né chiamano mai codice specifico del motore direttamente.

Un adapter risponde a domande per ogni albero docs attraverso una singola superficie API:

### Routing Metadata-Driven

| Metodo | Domanda |
|---|---|
| `get_route_info(rel)` | Qual è l'URL canonico, lo stato della route, lo slug e il flag proxy per questo file sorgente? Restituisce un'istanza `RouteMetadata`. |

### Metodi Comuni

| Metodo | Domanda |
|---|---|
| `is_locale_dir(part)` | Questa directory è una locale non-default? |
| `resolve_asset(missing_abs, docs_root)` | Esiste un fallback default-locale per questo asset mancante? |
| `resolve_anchor(resolved_file, anchor, anchors_cache, docs_root)` | Questo anchor miss deve essere soppresso perché l'ancora esiste nel file default-locale equivalente? |
| `is_shadow_of_nav_page(rel, nav_paths)` | Questo file è il mirror locale di una pagina nella nav? |
| `get_ignored_patterns()` | Quali glob di filename deve saltare il controllo orfani? |
| `get_nav_paths()` | Quali percorsi `.md` sono dichiarati nella nav di questo motore? |
| `has_engine_config()` | È stato trovato un file di config del motore? (Controlla l'attivazione del controllo orfani.) |
| `provides_index(directory_path)` | Questa directory ha una landing page fornita dall'engine? (Controlla l'emissione di `MISSING_DIRECTORY_INDEX`.) |

---

## Step 1 — Creare la Classe Adapter

```python title="my_engine_adapter/adapter.py"
# my_engine_adapter/adapter.py

from __future__ import annotations

from pathlib import Path
from typing import Any

from zenzic.core.adapters import RouteMetadata
from zenzic.core.adapters._base import BaseAdapter
from zenzic.models.vsm import RouteStatus

class MyEngineAdapter(BaseAdapter):
    """Adapter per i progetti di documentazione MyEngine."""

    def __init__(
        self,
        config: dict[str, Any],
        docs_root: Path,
    ) -> None:
        self._docs_root = docs_root
        self._config = config
        # Estrai ciò che il formato config del tuo motore fornisce.
        self._nav_paths: frozenset[str] = self._parse_nav()

    # ── Protocollo BaseAdapter ─────────────────────────────────────────────

    def is_locale_dir(self, part: str) -> bool:
        """Restituisce True quando *part* è una directory locale non-default.

        Se il tuo motore non supporta i18n, restituisci sempre False.
        """
        locales: list[str] = self._config.get("locales", [])
        return part in locales

    def resolve_asset(self, missing_abs: Path, docs_root: Path) -> Path | None:
        """Restituisce il percorso fallback default-locale per un asset locale mancante.

        Se il tuo motore non supporta il fallback i18n per asset, restituisci sempre None.
        """
        return None

    def resolve_anchor(
        self,
        resolved_file: Path,
        anchor: str,
        anchors_cache: dict[Path, set[str]],
        docs_root: Path,
    ) -> bool:
        """Restituisce True se un anchor miss su un file locale deve essere soppresso.

        Viene chiamato quando un link punta a un'ancora heading che esiste nel
        file default-locale ma non nella traduzione locale (perché le intestazioni
        sono tradotte). Restituisci True per sopprimere il falso positivo.

        Se il tuo motore non supporta i18n, restituisci sempre False.
        """
        return False

    def has_engine_config(self) -> bool:
        """Restituisce True quando un config del motore è stato trovato e caricato.

        Quando False, il controllo orfani viene saltato — senza informazioni nav
        non c'è un insieme di riferimento contro cui confrontare la lista dei file.

        Restituisci True se il tuo adapter ha caricato con successo un file di config.
        Restituisci False solo se non esiste alcun config del motore (modalità bare/standalone).
        """
        return bool(self._config)

    def is_shadow_of_nav_page(self, rel: Path, nav_paths: frozenset[str]) -> bool:
        """Restituisce True quando *rel* è un mirror locale di una pagina nella nav.

        Esempio: docs/fr/guide/index.md è shadow di guide/index.md.
        Se il tuo motore non supporta i18n, restituisci sempre False.
        """
        if not rel.parts or not self.is_locale_dir(rel.parts[0]):
            return False
        default_rel = Path(*rel.parts[1:]).as_posix()
        return default_rel in nav_paths

    def get_ignored_patterns(self) -> set[str]:
        """Restituisce i glob pattern per file che il controllo orfani deve saltare.

        Per plugin i18n in modalità suffisso, restituisci pattern come {'*.fr.md', '*.it.md'}.
        """
        return set()

    def get_nav_paths(self) -> frozenset[str]:
        """Restituisce l'insieme dei percorsi .md nella nav del motore, relativi a docs_root."""
        return self._nav_paths

    def get_metadata_files(self) -> frozenset[str]:
        """Restituisce i file metadata del motore da ignorare nei finding."""
        return frozenset({"myengine.toml"})

    def provides_index(self, directory_path: Path) -> bool:
        """Restituisce se questo motore espone una pagina index per la directory."""
        index_rel = (directory_path / "index.md").as_posix().lstrip("/")
        return index_rel in self._nav_paths

    def get_extra_content_roots(self, repo_root: Path) -> list[Path]:
        """Restituisce radici markdown aggiuntive fuori da docs_root."""
        return []

    def get_locale_source_roots(self, repo_root: Path) -> list[tuple[Path, str]]:
        """Restituisce le radici locale come tuple (root_path, locale_label)."""
        return []

    def get_absolute_url_prefixes(self, repo_root: Path | None = None) -> list[str]:
        """Restituisce i prefissi URL assoluti considerati proprietà del progetto."""
        return []

    # ── Routing Metadata-Driven ────────────────────────────────────────────

    def get_route_info(self, rel: Path) -> RouteMetadata:
        """Restituisce i metadati di routing unificati per un file sorgente.

        Il builder VSM chiama questo metodo per costruire RouteMetadata
        per ogni file sorgente in un unico passaggio.
        """
        posix = rel.as_posix()

        # Determina la raggiungibilità dalla config nav.
        if posix in self._nav_paths:
            status: RouteStatus = "REACHABLE"
        else:
            status = "ORPHAN_BUT_EXISTING"

        # Calcola l'URL canonico (adatta alle regole di routing del tuo motore).
        stem = rel.with_suffix("").as_posix()
        canonical_url = f"/{stem}/"

        return RouteMetadata(
            canonical_url=canonical_url,
            status=status,
        )

    # ── Helper privati ─────────────────────────────────────────────────────

    def _parse_nav(self) -> frozenset[str]:
        nav = self._config.get("nav", [])
        paths: set[str] = set()
        for entry in nav:
            if isinstance(entry, str) and entry.endswith(".md"):
                paths.add(entry.lstrip("/"))
        return frozenset(paths)
```

---

## Step 2 — Registrazione via Entry Point

Zenzic scopre gli adapter tramite il gruppo di entry-point `zenzic.adapters`.
Registra il tuo adapter nel `pyproject.toml` del tuo pacchetto:

```toml title="pyproject.toml"
[project.entry-points."zenzic.adapters"]
myengine = "my_engine_adapter.adapter:MyEngineAdapter"
```

La **chiave** (a sinistra di `=`) diventa il nome del motore che gli utenti
passano a `--engine` o impostano come `engine` in `.zenzic.toml`:

```toml title=".zenzic.toml"
# Nel .zenzic.toml dell'utente
[build_context]
engine = "myengine"
```

---

## Step 3 — Implementare il Factory Hook (Opzionale)

Di default, Zenzic istanzia il tuo adapter chiamando:

```python
adapter_class(context, docs_root)
```

dove `context` è un'istanza `BuildContext`.

Se il tuo adapter richiede un caricamento config legato al repository,
implementa `from_repo(context, docs_root, repo_root)` e carica lì il config engine.

Se il tuo adapter necessita di una signature del costruttore diversa, implementa
un classmethod `from_repo(context, docs_root, repo_root)` e Zenzic lo preferirà:

```python
@classmethod
def from_repo(
    cls,
    context: "BuildContext",
    docs_root: Path,
    repo_root: Path,
) -> "MyEngineAdapter":
    config_path = repo_root / "myengine.toml"
    config = {}
    if config_path.exists():
        import tomllib
        with config_path.open("rb") as f:
            config = tomllib.load(f)
    return cls(config, docs_root)
```

---

## Step 4 — Validare con Zenzic

Dopo aver installato il tuo pacchetto (`uv pip install -e .` o `pip install -e .`),
verifica che l'adapter venga scoperto:

```bash
# Elenca tutti gli adapter installati
zenzic check orphans --engine myengine --help

# Esegui contro un vero albero docs
zenzic check orphans --engine myengine
zenzic check all --engine myengine
```

---

## Step 5 — Le Regole Custom sono Indipendenti dal Motore

Le `[[custom_rules]]` in `.zenzic.toml` operano sul sorgente Markdown grezzo e
sono completamente disaccoppiate dal layer adapter.  Una regola che cerca `DRAFT`
si attiverà identicamente sia che l'adapter sia MkDocs, Zensical o il tuo
motore.  Non è richiesto alcun lavoro aggiuntivo per rendere le regole custom
compatibili con un nuovo adapter.

---

## Step 6 — Dichiarare i Bypass per gli Schemi Link (Opzionale) {#step-6-bypasses}

Se il tuo engine usa uno schema URI non standard per i link interni, implementa
`get_link_scheme_bypasses()` per comunicare al Core quali nomi di schema esentare
dal controllo Z105 e dall'errore schema-sconosciuto (Regola R21 — Sovranità del
Protocollo):

```python
def get_link_scheme_bypasses(self) -> frozenset[str]:
    """Restituisce i nomi di schema URI che l'engine usa legittimamente.

    Il validator aggiunge ``<schema>:`` alla sua lista di skip per ogni nome
    restituito, sopprimendo sia l'avviso schema-sconosciuto sia il controllo
    Z105 per gli URL che usano quello schema.

    Restituisci ``frozenset()`` se l'engine non ha bypass per schemi link.
    """
    return frozenset()
```

La maggior parte degli engine restituisce `frozenset()`. Un motore potrebbe utilizzare schemi di collegamento personalizzati per bypassare il routing (ad esempio per fare riferimento ad asset statici). L'adapter registra questi schemi personalizzati per evitare che il core linter li contrassegni come percorsi assoluti.

!!! info "Regola R21 — Sovranità del Protocollo"
    Il Core non codifica mai nomi di engine. Il comportamento engine-specifico è
    dichiarato nell'adapter e interrogato dal Core tramite questo metodo. Aggiungere
    un nuovo adapter che necessita di un bypass per lo schema dei link richiede
    **zero modifiche a `validator.py`**.

---

## Garanzie del Contratto Adapter

Il tuo adapter deve soddisfare queste invarianti, altrimenti lo scanner di
Zenzic potrebbe produrre risultati errati:

1. `get_route_info()` deve restituire un `RouteMetadata` con `canonical_url`

   che inizia e termina con `/`.

2. `get_route_info()` deve impostare `status` a uno tra `REACHABLE`,

   `ORPHAN_BUT_EXISTING` o `IGNORED`.  Non restituire mai `CONFLICT` — quello
   stato viene assegnato successivamente da `_detect_collisions()`.

3. `get_nav_paths()` restituisce percorsi **relativi a `docs_root`**, usando

   slash in avanti, senza `/` iniziale.

4. `get_nav_paths()` restituisce solo file `.md` (altre estensioni sono ignorate

   dal controllore orfani).

5. `is_locale_dir()` deve restituire `False` per la locale **default**.  Solo

   le directory di locale non-default devono restituire `True`.

6. Tutti i metodi devono essere **puri**: stessi input producono sempre gli

   stessi output. Nessun I/O, nessuna mutazione di stato globale.

7. `resolve_asset()` non deve mai sollevare eccezioni — restituisci `None` in caso di errore.
8. `resolve_anchor()` non deve mai sollevare eccezioni — restituisci `False` in caso di errore.

   L'argomento `anchors_cache` è in sola lettura; non mutarlo.

9. `has_engine_config()` non deve mai sollevare eccezioni — restituisci `False` in caso di errore.
10. `provides_index(directory_path)` **è l'unico metodo che può eseguire I/O**.

    Viene chiamato una volta per directory durante la fase di discovery — mai
    all'interno dei loop critici per-link o per-file — quindi una singola chiamata
    `Path.exists()` è accettabile.  Restituisci `True` se il tuo engine genererà una
    landing page per la directory (es. tramite `index.md`, `README.md`, o una voce
    di configurazione dinamica come `_category_.json` con `"link": {"type": "generated-index"}`).  Non
    sollevare mai eccezioni — restituisci `False` in caso di errore I/O.

11. `get_link_scheme_bypasses()` deve restituire un `frozenset[str]` di nomi di

    schema (senza i due punti finali) — mai `None`, mai sollevare eccezioni.
    Restituisci `frozenset()` se l'engine non ha requisiti di bypass per gli
    schemi link.

---

## Testare il Tuo Adapter

Usa `zenzic.core.adapters.BaseAdapter` come target di tipizzazione nei tuoi
test per verificare la conformità al protocollo:

```python
from zenzic.core.adapters import BaseAdapter
from my_engine_adapter.adapter import MyEngineAdapter

def test_satisfies_protocol() -> None:
    adapter = MyEngineAdapter(config={}, docs_root=Path("/tmp/docs"))
    assert isinstance(adapter, BaseAdapter)

def test_nav_paths_relative() -> None:
    adapter = MyEngineAdapter(
        config={"nav": ["index.md", "guide/setup.md"]},
        docs_root=Path("/tmp/docs"),
    )
    paths = adapter.get_nav_paths()
    assert "index.md" in paths
    assert "guide/setup.md" in paths
    assert all(not p.startswith("/") for p in paths)
```

---

## Esempi di Implementazione Concreti: Zensical vs. Standalone

Per vedere come questi metodi di adapter sono implementati nella pratica, ecco un confronto tra `ZensicalAdapter` orientato al motore e `StandaloneAdapter` che non fa assunzioni.

### `provides_index()` — Questa directory ha una landing page?

Il Core chiama `provides_index(directory_path)` una volta per directory durante il rilevamento degli orfani. Risponde a: *"Il motore genererà un indice navigabile per questa directory, in modo che i file al suo interno non siano strutturalmente orfani?"*

**`ZensicalAdapter.provides_index()`** — consapevolezza del motore:

```python
def provides_index(self, directory_path: Path) -> bool:
    # File di indice fisici — Zensical li serve direttamente.
    index_files = ("index.md", "README.md")
    return any((directory_path / f).exists() for f in index_files)
```

**`StandaloneAdapter.provides_index()`** — zero assunzioni sul motore:

```python
def provides_index(self, directory_path: Path) -> bool:
    # Nessuna configurazione motore — solo index.md indica una landing page.
    return (directory_path / "index.md").exists()
```

**Differenza chiave:** `ZensicalAdapter` conosce sia `index.md` che `README.md` perché queste sono convenzioni di Zensical/MkDocs. `StandaloneAdapter` non fa assunzioni — riconosce solo la convenzione universale `index.md`.

---

### `get_nav_paths()` — Quali file sono scopribili?

`get_nav_paths()` restituisce il set di percorsi di file raggiungibili tramite l'interfaccia utente di navigazione del sito. Un file assente da questo set è un candidato per Z402 (`ORPHAN_BUT_EXISTING`).

**`ZensicalAdapter.get_nav_paths()`** — estrazione navigazione:

```python
def get_nav_paths(self) -> frozenset[str]:
    # Estrae tutti i percorsi dichiarati nel blocco nav
    return frozenset(self._nav_paths)
```

**`StandaloneAdapter.get_nav_paths()`** — intenzionalmente vuoto:

```python
def get_nav_paths(self) -> frozenset[str]:
    """Frozenset vuoto — nessuna configurazione motore significa nessuna nav dichiarata."""
    return frozenset()
```

Quando `get_nav_paths()` restituisce un frozenset vuoto, `get_route_info()` tratta **tutti** i file come `REACHABLE`. Questo è intenzionale: in modalità Standalone non c'è contratto di navigazione, quindi il rilevamento orfani (Z402) è disabilitato.

---

### `get_link_scheme_bypasses()` — Schemi URI specifici del motore

La regola R21 (Protocol Sovereignty) impone che il Core non inserisca mai nomi di motori cablati nella logica di validazione. Gli schemi URI specifici del motore sono dichiarati dall'adapter e interrogati dal Core.

**`ZensicalAdapter.get_link_scheme_bypasses()`:**

```python
def get_link_scheme_bypasses(self) -> frozenset[str]:
    # Zensical utilizza link standard e non ha bypass di schemi speciali.
    return frozenset()
```

**`StandaloneAdapter.get_link_scheme_bypasses()`:**

```python
def get_link_scheme_bypasses(self) -> frozenset[str]:
    """I progetti standalone non hanno bypass di schemi link specifici del motore."""
    return frozenset()
```

!!! info "Passaggi Successivi"
    Collega il codice dell'adapter alla verità operativa del progetto:

    1. Registra l'identità engine nella configurazione del progetto tramite `[build_context] engine`

       (vedi [Adapter e Configurazione del Motore](../../how-to/configure-adapter.md)).

    2. Valida il comportamento dell'adapter in policy Zenzic strict:

       `zenzic check all --engine myengine --strict`.
       Per i controlli di esecuzione, vedi [Comandi CLI: Flag globali](../../reference/cli.md#global-flags).

    3. Se il tuo engine genera route locali sintetiche, mappa esplicitamente le aspettative

       Ghost Route rispetto al riferimento VSM:
       [Meccaniche di Base — VSM](../../explanation/core-mechanics.md#vsm).
