<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Registro delle modifiche

Tutte le modifiche rilevanti al portale di documentazione Zenzic (`zenzic-doc`) sono documentate qui.
Il formato segue [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Le versioni seguono la linea di rilascio di Zenzic Core sotto la Branch Parity Rule.

---

## [Non Rilasciato]

#### Aggiunto

- **DX Release Recipes (Sprint DX):** Tutti e quattro i repository dell'ecosistema includono ora:
  - `just version` — stampa la versione corrente tramite bump-my-version
  - `just release-dry <part>` — dry-run verbose completo (mostra diff dei file)
  - `just release-dry <part> --short` — preview compatto (solo 3 righe essenziali)
  - `just release-contracts` — valida i contratti architetturali del justfile, incluso in `verify`
- **Branch Parity Rule — parity snapshot con Core v0.7.1:** Nessuna modifica al codice
  in questo repository (ecosistema Node/Docusaurus). Questa voce traccia l'allineamento
  con la release di allineamento infrastrutturale di Zenzic Core (fix della matrice
  Boundary Testing, floor Mypy abbassato a 3.10).
- **DX guard `_check-hooks`:** Aggiunta recipe nascosta `_check-hooks` come prima dipendenza
  di `just verify` in tutti e quattro i repository dell'ecosistema. Emette un avviso se
  l'hook Final Guard pre-push (`pre-commit install -t pre-push`) non è installato
  localmente, senza bloccare l'esecuzione della verifica.
- **`ecosystem.mdx` — Trasparenza Ecosistema (Sprint D101):** Pagina rinominata "L'Ecosistema
  Zenzic". Aggiunte tre nuove sezioni: "L'Ecosistema in Sintesi" (tabella dei ruoli Core /
  Structum / Zenzic-Doc), "zenzic-doc — Banco di Prova Vivente" (self-dogfooding, Graceful
  Degradation, `verify-codes-parity`), "Lo Standard a 4 Cancelli" (IDE / Pre-commit /
  Pre-push / CI Remota). EN + IT aggiornati atomicamente.
- **`Z907 I18N_PARITY` — voce enciclopedia finding-codes.mdx (Sprint D102):** Aggiunta
  sezione `{#z907}` dedicata a `finding-codes.mdx` (EN + IT) che documenta il controllo
  di Parità I18n: invariante di presenza del mirror e invariante di parità frontmatter.
  Risolve l’errore MISSING di `verify-codes-parity` per Z907. Simmetria bilingue ripristinata.

#### Modificato

- **Refactoring `noxfile.py` — unificazione pipeline:** Rimossa la sessione nox
  `preflight` (duplicava `just verify`; usava `uvx zenzic` senza pin di versione).
  Rinominata la sessione `verify-docs` in `verify-codes-parity`.
- **`verify-codes-parity` — Graceful Degradation:** Lo Step 1 ora usa
  `ZENZIC_PROJECT_PATH` per i Core Maintainer (sorgente locale via `uv run --project`)
  e torna a `uv run --with zenzic` per i contributori esterni (release PyPI
  pubblicata). Elimina il percorso sibling hardcoded e il meccanismo `importlib.util`.
- **Aggiornamento `justfile`:** Aggiunta la recipe `verify-codes`
  (`uvx nox -s verify-codes-parity`). Aggiornato il target `verify`:
  `lint-all typecheck build verify-codes` (la parity dei codici è ora Gate 4
  della pipeline standard).
- **`_check-hooks` — DX Polish (Sprint D102):** Aggiornato il copy del warning: colore
  ANSI giallo, riga esplicativa del “perché conta” e `uvx pre-commit install -t pre-push`
  (zero installazioni globali richieste). Applicato in tutti e quattro i repository.
- **Doppia Esecuzione eliminata — pipeline `just verify` (Sprint D102):** Rimosso
  `typecheck` ridondante dalla catena `verify` (gira già in `lint-all`/pre-commit).
  Rimossa la dipendenza `check` dalla recipe `build` (Zenzic Sentinel gira già in
  `lint-all`/pre-commit). Catena `verify`: `_check-hooks lint-all build verify-codes`.
- **`finding-codes.mdx` — sezione Legacy rimossa (Sprint D102):** Sezione `## Codici
  Legacy [Deprecati]` (codici pre-v0.6.0 Z001/Z002/Z009) rimossa. Z000 promosso a
  codice canonico in `codes.py`. `## Integrazione con CI/CD` promossa da H3 a H2.
- **`docs/reference/checks.mdx` — modernizzazione codici canonici (Sprint D102):**
  Riferimenti legacy aggiornati: `Z001`→`Z101`, `Z002`→`Z103`, `Z009`→`Z902`.

---

## [0.7.0] — 2026-05-07 — Quartz Maturity (Stable)

> **Fonte autorevole:** [zenzic.dev](https://zenzic.dev). Questo file è la
> controparte machine-readable di [`RELEASE.md`](RELEASE.md) e segue la stessa
> Branch Parity Rule del changelog di Zenzic Core.

#### Aggiunto

- **Sprint Editoriale A — Sovranità Zero-Config**: Tutorial `docs/tutorials/first-audit.mdx`
  (EN+IT) aggiornato per documentare la blog auto-discovery senza configurazione manuale.
  `uvx zenzic check all` include i post del blog nel perimetro di default; il tutorial
  lo dimostra esplicitamente con una nota `ContentRoot` blog: `blog/` rilevata tramite
  `docusaurus.config.ts` o convenzione filesystem — nessun `blog_dir` da configurare.

- **Sprint Editoriale B — Manifesto Aerospaziale**: Il linguaggio dei vincoli sostituisce
  gli aggettivi di marketing nei README di tutti e quattro i repository dell'ecosistema
  (`zenzic`, `zenzic-doc`, `zenzic-action`, `structum`). Tagline riscritte come invarianti
  deterministici:
  - `zenzic` — "Audit deterministico di strutture documentali con tracciabilità
    bidirezionale. Ogni finding mappa su un file sorgente e un numero di riga. Ogni URL
    ha un'origine fisica. Zero stato globale."
  - `zenzic-doc` — Dichiarazione di evidenza conformità: `zenzic check all --strict`
    termina con 0 e zero finding ad ogni push.
  - `zenzic-action` — Paragrafo contratto exit code (exit 2 e 3 non sono mai
    sopprimibili al confine di enforcement).
  - `structum` — "Legge, non esegue. Solo AST. Niente `eval()`, niente import dinamico,
    niente subprocess."
  Preambolo Engineering Ledger riformulato sui principi NASA Power of 10 Rules 1/4
  (flusso di controllo deterministico, zero stato globale) e Rule 2 (ban subprocess
  applicato da ruff).

- **Sprint Editoriale C — Mostra, Non Descrivere**: Eliminazione chirurgica degli
  aggettivi non quantificabili in `docs/how-to/`, `docs/explanation/` e
  `docs/tutorials/` (EN+IT). Sei sostituzioni EN + sei mirror IT in `explanation/` e
  `how-to/`; quattro sostituzioni tutorial (EN+IT) in `tutorials/`:
  - `why-zenzic.mdx` — etichette bullet di marketing sostituite con invocazioni
    strumento fattuali (requisiti esatti `bash ≥5`, `python3 ≥3.11`, invocazione
    `astral-sh/setup-uv`).
  - `safe-harbor.mdx` — "trivialmente testabili" sostituito con contratto di
    comportamento deterministico (input identici, output identici, nessuno stato
    condiviso).
  - `install.mdx` — titolo sezione "Lean e Agnostico per Design" → "Solo analisi
    statica — nessun runtime di build richiesto"; prosa "rendendolo ideale per"
    rimossa.
  - `configure-ci-cd.mdx` — "strumento potente ma irreversibile" → "strumento
    irreversibile".
  - `migrate-engines.mdx` — metafora "custode" sostituita con linguaggio contrattuale;
    blocco tip riscritto in voce imperativa.
  - `tutorials/first-audit.mdx` — Sprint B: prova di tracciabilità aggiunta inline:
    link rotto → finding `Z101` esatto con file, riga e codice. Sprint A: nota
    blog auto-discovery nello Step 1. Sprint C: `:::note[Rottura Deliberata — La
    Prova della Tracciabilità]` illustra l'output deterministico.
  - `tutorials/examples.mdx` — paragrafo di apertura riscritto: "Clonalo. Esegui
    `uvx zenzic check all`. Ogni esempio isola una funzionalità."

- **Fase Tecnica 1 — SentinelOutput API v2**: `src/components/SentinelOutput.tsx`
  esteso con un discriminante `Status` domain-specific che sostituisce `variant`:

  | `status`    | `variant` interno | Exit | Significato                    |
  |-------------|------------------|------|--------------------------------|
  | `success`   | `clean`          |  0   | Integrità verificata           |
  | `error`     | `findings`       |  1   | Violazione strutturale/link    |
  | `warning`   | `findings`       | 0–1  | Anomalia non bloccante         |
  | `inspect`   | `inspect`        |  0   | Modalità audit/debug           |
  | `breach`    | `breach`         |  2   | Perimetro sicurezza compromesso|

  Nuove props: `status`, `code` (stringa Zxxx), `exitCode` (0|1|2|3),
  `traceability` (boolean). `variant` preservato per compatibilità con `console.warn`
  di deprecazione in development mode. Guardia di tracciabilità: `status="error"|"warning"`
  senza `code` emette warning — un finding senza codice Zxxx viola la Tracciabilità
  Assoluta. `tsc --noEmit` pulito.

- **Fase Tecnica 2 — VSMVisualizer**: Nuovo componente
  `src/components/VSMVisualizer.tsx` registrato globalmente in
  `src/theme/MDXComponents.js`. Renderizza un albero gerarchico espandibile in-place
  del Virtual Site Map distinguendo:
  - **Nodi Fisici** (📄) — file `.md`/`.mdx` reali su disco
  - **Route Virtuali** (🏷 tag, 📑 paginazione, 👤 autore) — route inferite dai
    metadati frontmatter, con disclosure Reverse-Mapping in-place dei `source_files`.
  - **Violazione Reverse-Mapping** — nodo virtuale con `source_files = ∅` renderizzato
    con marcatore ⚠ (non dovrebbe mai apparire in un audit che passa).
  Props: `roots: string[]` (obbligatorio), `virtual?: boolean`, `nodes?: VSMNode[]`
  (override per alberi personalizzati). `tsc --noEmit` pulito.

- **Fase Tecnica 3 — Migrazione finding-codes.mdx**: Tutti gli 8 utilizzi
  `<SentinelOutput>` in `docs/reference/finding-codes.mdx` (EN+IT) migrati dalla
  legacy prop `variant=` al contratto Fase 1 (`status`, `code`, `exitCode`). Ogni
  codice di finding nell'enciclopedia di riferimento è ora collegato al suo
  identificatore Zxxx tramite `code=` — Tracciabilità Assoluta dalla prosa al
  componente al codice di finding.


  Dopo l'epurazione EPOCH 7a.1 nel Core, il blocco TOML
  `[link_validation].absolute_path_allowlist` è **rimosso** da
  `zenzic-doc/zenzic.toml`. I prefissi URL multi-instance di Docusaurus
  (`/docs/`, `/developers/`, ogni ulteriore istanza content-docs) vengono ora
  auto-rilevati da `DocusaurusAdapter.get_absolute_url_prefixes()` tramite
  parsing statico di `docusaurus.config.ts` più un'euristica filesystem su
  `i18n/<locale>/docusaurus-plugin-content-docs-<id>/`. Nessuna duplicazione
  TOML del routing Docusaurus richiesta. **Supersessione documentale** —
  ADR-0011 ("Cross-Instance Allowlist"),
  `how-to/manage-cross-site-links.mdx` e la sezione `[link_validation]` di
  `reference/configuration.mdx` descrivono una superficie di configurazione
  obsoleta e sono in attesa di refactor in uno sprint documentale successivo.
  La voce Z108 STALE_ALLOWLIST_ENTRY in
  `developers/governance/technical-debt.mdx` è ora chiusa-per-rimozione: non
  esiste più alcuna allowlist che possa diventare stantia.

- **EPOCH 7a — Documentazione Multi-Root Discovery (dual-track)**: Due nuove
  superfici documentali consegnano la narrativa user-facing e developer-facing
  della Multi-Root Discovery del Core, che rimuove la storica frontiera di
  `docs_dir` nel VSM.
  - **User track** — `docs/reference/engines.mdx` (EN+IT) acquisisce una
    sezione `### Blog auto-discovery {#docusaurus-blog}` che celebra il
    risultato pratico e documenta le tre regole di rilevamento (blocco di
    config, fallback per convenzione, opt-out `blog: false`) senza divulgare
    dettagli implementativi.
  - **Developer track** — `docs/explanation/discovery.mdx` (EN+IT) acquisisce
    una sezione `## Multi-Root Discovery (EPOCH 7a)` con la dataclass
    `ContentRoot`, l'hook adapter sigillato da `hasattr()`, la cooperazione
    pipeline a quattro stadi (Discovery → VSM → Validator → Scanner), il pass
    di auto-discovery Zero Subprocess, l'invariante Reverse-Mapping e la
    matrice di supporto motori.
  - La separazione dual-track è rigorosa — nessun gergo implementativo trapela
    nello User track; nessun linguaggio celebrativo trapela nel Developer
    track.
  - La parità linguistica è imposta tra EN e IT in entrambi i track
    (`Z907 I18N_PARITY` clean).
- **Ristrutturazione Architettura Diátaxis**: Architettura informativa
  ricostruita attorno al [framework Diátaxis](https://diataxis.fr) — `tutorials/`,
  `how-to/`, `reference/`, `explanation/`. Sidebar autogenerata dal filesystem.
- **Zenzic Blog**: `/blog/` inaugurato come log ingegneristico ufficiale di
  Zenzic. Sei articoli fondativi coprono lo sprint v0.6.x, il post-mortem del
  AI-Driven Siege e la dichiarazione di Quartz Maturity v0.7.0. Convenzione a
  due track: 🛡️ **Saga** (long-form) e 📜 **Log** (mirror sintetico delle
  patch-notes).
- **Brand System**: Brand package formale consegnato in
  `static/assets/brand/brand-kit.zip` — icone SVG, esportazioni PNG, template
  social card, pagina HTML di riferimento brand.
- **Parità Bilingue (EN + IT)**: `i18n/it/` rispecchia `docs/` esattamente.
  `npm run build` produce entrambi i locale con zero broken link.
- **D117 — Supporto protocollo `pathname:`**: Escape hatch engine-agnostic per
  i link `pathname:///` di Docusaurus documentato in `reference/engines.mdx`
  (EN+IT).
- **Pre-commit Gate & REUSE 3.3 Compliance**: Pipeline completamente operativa
  con 207/207 file conformi. Nuove ricette `just`: `preflight`, `reuse`,
  `sentinel`.
- **D118 — Coerenza Assoluta dei Titoli**: Titoli della pagina lista del blog
  bloccati attraverso gli stati `:visited` / `:active` / `:hover`.
- **SentinelPalette CLI × Web Color Bridge**: Sei custom property CSS in
  `src/css/custom.css` rispecchiano la palette semantica della CLI sui mode
  light e dark (calibrato WCAG AA).
- **Asset Integrity & Static Consolidation**: `static/` riorganizzato attorno
  a una singola gerarchia canonica (`assets/brand`, `assets/favicon`,
  `assets/social`, `css`, `img`).
- **Cross-Instance Routing — promozione Developer Area**:
  `/docs/community/developers/*` → `/developers/*` (istanza Docusaurus
  top-level dedicata).
- **ADR-0011 "Cross-Instance Allowlist"** (EN+IT) — formalizza la
  configurazione `absolute_path_allowlist` come *contratto di fiducia* tra
  istanze Docusaurus.

#### Modificato

- Tutti i percorsi precedenti sotto `docs/usage/` e `docs/guides/` riorganizzati
  nei quadranti Diátaxis. Gli slug della sidebar sono ora filesystem-driven —
  nessuna divergenza di slug ammessa.
- **Hardening del rendering metadata autore**: uno swizzle mirato in
  `src/theme/BlogPostItem/Header/Authors` ora restituisce `null` quando non
  sono dichiarati autori, rimuovendo rumore da placeholder/fallback e
  omettendo il blocco in modo strutturale dal DOM.
- **Verifica CI docs cross-platform**: `.github/workflows/ci.yml` ora esegue
  su matrice Ubuntu/Windows (`fail-fast: false`) preservando il checkout di
  parità branch del Core (`_zenzic_core`) e l'esecuzione unificata di
  `just verify`.
- `static/brand/` (duplicato legacy) eliminato; il percorso canonico è
  `static/assets/brand/`.
- `static/assets/stylesheets/` rinominato in `static/css/`.
- `brand-kit.zip` spostato in `static/assets/brand/`.
- Percorso del logo navbar aggiornato in `docusaurus.config.ts`.
- `scripts/build-assets.js` e `scripts/bump-version.sh` aggiornati — niente
  più pattern mirror-copy.
- **Igiene workspace ESLint**: `.eslintignore` in root ora esclude artefatti
  di checkout CI (`_zenzic_core/`) e virtual environment locali (`.venv/`,
  `venv/`).
- **Manutenzione dipendenze (ZRT-008)**: consolidati 8 Dependabot PR — Docusaurus
  3.10.0 → 3.10.1 (`@docusaurus/core`, `faster`, `preset-classic`,
  `module-type-aliases`, `tsconfig`, `types`; patch: bugfix bundler webpackbar),
  `lucide-react` 1.8.0 → 1.14.0 (nuove icone), `postcss` → 8.5.14
  (sicurezza: XSS tramite `</style>` non escaped in scenari non-bundler; fix
  regressione sintassi custom). `npm run build` (EN + IT) pulito dopo
  l'aggiornamento.

#### Rimosso

- **Percorsi URL legacy**: `/docs/community/developers/*`,
  `/docs/community/governance/*`, `/docs/community/contribute/*` rimossi senza
  compatibility shim. I bookmark esterni vanno aggiornati.
- **Contenuti probabilistici / AI-architecture** epurati dal blog Zenzic. La
  pagina `Adversarial Stress-Testing Protocol` è l'unica eccezione e inquadra
  l'AI esplicitamente come "punching bag", mai come co-autore.

#### Gate di verifica

| Gate | Risultato |
|------|-----------|
| `zenzic check all` sul repo docs | ✅ Exit 0 |
| `npm run build` (EN + IT) | ✅ Zero errori broken-link |
| TypeScript `tsc --noEmit` | ✅ Zero errori |
| Markdownlint (tutti gli MDX) | ✅ Zero warning |
| REUSE lint | ✅ 207/207 conformi |
| Pre-commit (tutti gli hook) | ✅ Tutti passati |

---

**Per le release notes del motore, vedere
[Zenzic Core CHANGELOG](https://github.com/PythonWoods/zenzic/blob/main/CHANGELOG.md).**
