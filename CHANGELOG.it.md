<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Registro delle modifiche

Tutte le modifiche rilevanti al portale di documentazione Zenzic (`zenzic-doc`) sono documentate qui.
Il formato segue [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Le versioni seguono la linea di rilascio di Zenzic Core sotto la Branch Parity Rule.

---

## [0.7.0] — 2026-05-XX (Target) — Quartz Maturity (Stable)

> **Fonte autorevole:** [zenzic.dev](https://zenzic.dev). Questo file è la
> controparte machine-readable di [`RELEASE.md`](RELEASE.md) e segue la stessa
> Branch Parity Rule del changelog di Zenzic Core.

#### Aggiunto

- **EPOCH 7a.1 — Sovranità Zero-Config (`absolute_path_allowlist` ritirato)**:
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
- `static/brand/` (duplicato legacy) eliminato; il percorso canonico è
  `static/assets/brand/`.
- `static/assets/stylesheets/` rinominato in `static/css/`.
- `brand-kit.zip` spostato in `static/assets/brand/`.
- Percorso del logo navbar aggiornato in `docusaurus.config.ts`.
- `scripts/build-assets.js` e `scripts/bump-version.sh` aggiornati — niente
  più pattern mirror-copy.

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
