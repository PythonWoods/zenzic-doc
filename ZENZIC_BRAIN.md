<!-- Sovereign Memory Master. Mirror: .github/copilot-instructions.md -->
# 📚 ZENZIC DOCS — Zenzic Ledger v0.7.0 "Quartz Maturity"

> **Single Source of Truth for all agents and contributors to the zenzic-doc repository.**
> Schema: [MANIFESTO] → [POLICIES] → [ARCHITECTURE] → [ADR] → [ACTIVE SPRINT] → [ARCHIVE LINK]

---

## [MANIFESTO] — The Structural Custodian

This repository (`zenzic-doc`) is the official documentation portal for Zenzic, deployed at `https://zenzic.dev`. It is the living proof of Zenzic's power: it must be the **gold standard of documentation integrity**.

**Stack:** Docusaurus 3.10 + TypeScript + MDX. Locales: English (`en`, default) + Italian (`it`).

**Philosophy:** Documentation as Code. If a link is broken or a secret is leaked, the documentation is "buggy" and the build must fail. `onBrokenLinks: 'throw'` is active — a single broken link fails the production build.

### The Diátaxis Framework

Knowledge is organized into four quadrants (adopted 2026-04-20, Commit `7d8d513`):

1. **Tutorials** — Learning-oriented, step-by-step (e.g., "Your First Audit").
2. **How-to Guides** — Task-oriented, goal-driven (e.g., "Configure CI/CD").
3. **Reference** — Information-oriented, exhaustive (e.g., Finding Codes, CLI Reference).
4. **Explanation** — Understanding-oriented, conceptual (e.g., Safe Harbor architecture).

The `community/` quadrant is additional: contributing, FAQ, license, brand-kit, developer guides (with nested Diátaxis sub-quadrants under `community/developers/`).

### Bilingual = First-Class Citizenship

The Italian documentation is **not a secondary asset**. It is a first-class citizen of the Safe Harbor. The language switcher must never lead to a 404. Zero Asymmetry is the goal.

---

## [CLOSING PROTOCOL] — Mandatory Sprint Closure Checklist

> **[MANDATORY]** A sprint is not closed until every step below is complete.
> Skipping any step is a **Class 1 violation (Technical Debt)** — the successor agent inherits a ghost, not a project.

### Step 0 — Pre-Task Alignment

- [ ] Read the **[POLICIES]** section of this ledger before starting any work.
- [ ] The **Law of Contemporary Testimony (CEO-059)** applies unconditionally: code and documentation are a single indivisible unit. No task is complete until both are aligned.

### Step 1 — Update This File

- [ ] New architectural facts? → Update **[ARCHITECTURE]**
- [ ] New decisions made? → Add an **[ADR]** entry (tagged `[DECISION]`)
- [ ] Bug found and fixed? → Promote the lesson to a **[POLICY]** rule or **[ADR]** (permanent invariants only). Update **[ACTIVE SPRINT]**.
- [ ] Sprint complete? → Update **[ACTIVE SPRINT]**. Purge previous-sprint entry to `CHANGELOG.md` in core repo.
- [ ] **Size Guardrail:** This file exceeds 400 lines? → Trigger a curation task (Law of Evolutionary Curation).

### Step 2 — Update Documentation Artifacts

- [ ] Content-only changes: add prose section to core repo `RELEASE.md` if user-visible
- [ ] Structural or tooling changes: add section to `RELEASE.md` + notify core repo for cross-repo CHANGELOG entry
- [ ] **Executive Filter:** `RELEASE.md` must stay ≤ 200 lines (Law of Executive Brevity). Technical fluff belongs in `CHANGELOG.md`, not the release notes.

### Step 3 — Staleness & Testimony Audit

- [ ] `README.md` — check: Node.js version, Zenzic version badge, `just` recipe list, prerequisite table
- [ ] **Contemporary Check (CEO-059):**
  - New or changed CLI flag? → `reference/cli.mdx` (EN + IT)
  - Changed default value or config option? → `reference/configuration.mdx` (EN + IT)
  - Architectural or structural change? → `explanation/architecture.mdx` (EN + IT)
  - New or changed finding code? → `reference/finding-codes.mdx` (EN + IT)
  - Adapter/engine config change? → `how-to/configure-adapter.mdx` (EN + IT)
- [ ] **Precedence Table:** Verify `reference/configuration.mdx` reflects the current 4-level hierarchy: CLI flags > zenzic.toml > pyproject.toml > defaults.
- [ ] **Bilingual Mirroring:** Every EN `.mdx` update has a matching IT update in the same commit.
- [ ] Run symmetry diff: `docs/` vs `i18n/it/` — must exit 0 (see Law of Italian Mirroring)
- [ ] **Testimony check** — every page named above: EN and IT are in content-parity (no translation drift)

### Step 4 — Verification Gate

- [ ] Full build: `just verify` (markdownlint → lint:ts → typecheck → build)
- [ ] Pre-commit hooks: `just preflight`
- [ ] Language switcher: Italian locale pages load correct content

---

## [POLICIES] — Immutable Operational Laws

### The Law of Contemporary Testimony [MANDATORY] — CEO-059

- **[INVARIANT] Code and Documentation are a single, indivisible unit of work.**
  - **No Silent Logic:** Any change in Zenzic CLI behavior, flags, findings, or configuration priority MUST be reflected in the relevant `.mdx` files within the SAME sprint/task. This repo *is* the documentation — it is always the last line of truth.
  - **Verification:** An agent is NOT permitted to signal "Task Complete" if any `.mdx` page still reflects old behavior.
  - **Sovereignty:** Before starting ANY task, the agent MUST read this ledger. This file is the only source of truth for current project policies.

### Content & File Conventions

- **[INVARIANT] Content files are `.mdx` only.** Never use `.md` inside `docs/` or `i18n/`. Root-level `README.md` and `RELEASE.md` are the only `.md` files.
- **[INVARIANT] All `.mdx` files must have `sidebar_label` frontmatter.** Controls sidebar display text; prevents raw heading or anchor fragments leaking into navigation.
- **[RULE] Use `_category_.json` for all Diátaxis directories.** Controls ordering (`position`) and labels. Include `"link": { "type": "generated-index" }` for quadrant landing pages.

### Physical Consistency (The Slug Law)

- **[INVARIANT]** Never use `slug:` frontmatter to diverge from the physical file path. URLs must mirror the filesystem to preserve relative link integrity and sidebar auto-generation.
- **Rationale:** The sidebar uses `type: 'autogenerated'` in `sidebars.ts`. A diverged `slug:` creates a URL that the sidebar cannot resolve, causing navigation failures without build-time errors.
- **Single legacy exception:** `docs/internals/vision.mdx` (maintained for historical URL stability).

### The Law of Italian Mirroring (CEO-045)

- **[INVARIANT] Atomic Moves:** Any `git mv` applied to `docs/` MUST be accompanied by a corresponding `git mv` in `i18n/it/docusaurus-plugin-content-docs/current/` **in the same commit**. A rename in EN is a rename in IT. A move in EN is a move in IT.
- **[INVARIANT] Slug Parity:** If a `slug:` value is changed in an English file, it must be changed identically in all Italian translations. A diverged slug causes the language switcher to produce a 404.
- **[INVARIANT] `localeConfigs.path` must be explicit.** Always set `path: 'it'` in `docusaurus.config.ts` for the Italian locale. Without it, Docusaurus derives the path from `htmlLang`, causing silent fallback to English (see BUG-003 — i18n Lockdown).
- **Validation command (run before any commit involving file moves):**

  ```bash
  diff <(find docs -name "*.mdx" | sed 's|^docs/||' | sort) \
       <(find i18n/it/docusaurus-plugin-content-docs/current -name "*.mdx" | \
         sed 's|^i18n/it/docusaurus-plugin-content-docs/current/||' | sort)
  ```

  Exit 0 = symmetric. Any output = structural asymmetry to fix before committing.

### UI Components & Styling

- **Icons:** Use `<Icon name="icon-name" />` in any `.mdx` without per-file imports. To add a new icon: import from `lucide-react` and add to `iconsMap` in `src/components/Icon.tsx`. The `github` icon is a special inline SVG. Missing names render a red fallback box.
- **[INVARIANT] Tailwind:** Never use dynamically interpolated class names (e.g., `` border-${color}-500 ``). JIT purges dynamic classes. Use static mapping objects.
- **i18n workflow:** When adding or renaming files, update both `docs/` and `i18n/it/docusaurus-plugin-content-docs/current/` together. Run `npm run write-translations` to regenerate `code.json` stubs.

### Validation Gate

- **[INVARIANT] `just verify` is the only authorised local gate before any commit or PR.**
  - Sequence: `markdownlint → lint:ts → typecheck → build`
  - `onBrokenLinks: 'throw'` is active — broken internal links fail the build.
  - `onBrokenMarkdownLinks: 'throw'` is active — broken Markdown links also fail.
  - `markdownlint` disabled rules: MD013 (line length), MD033 (inline HTML for JSX), MD041 (first-line heading).
- **Pre-commit gate (Sentinel Guard — 8 hooks):** trailing-whitespace, EOF-fixer, YAML/JSON/TOML validation, large-file prevention, merge-conflict guard, no-direct-commits-to-main, TypeScript typecheck, Zenzic Sentinel, REUSE/SPDX compliance.
- **`just preflight`** mirrors the full CI gate exactly (`uvx pre-commit run --all-files`).
- **Broken-anchor warnings** on `#global-flags`, `#virtual-site-map-vsm` in build output are pre-existing — not regressions.

### BUG-004: Frontmatter Supremacy — Blog MDX Files (CEO-060)

- **[INVARIANT] In Docusaurus blog MDX files, the `---` frontmatter block MUST start at absolute line 1.**

  No comments (SPDX, HTML, MDX), no blank lines, no content of any kind may precede the opening `---`.

- **Root cause:** The blog plugin is anchored — if line 1 ≠ `---`, Docusaurus treats the file as

  frontmatter-less and derives the URL from `date + filename` instead of `slug:`. With
  `onBrokenLinks: 'throw'`, this generates ghost archive routes (e.g. `/blog/2026/04/28`) that
  break the build with no obvious error message.

- **Fix pattern:** SPDX license headers in blog files must appear AFTER the closing `---` of the

  frontmatter block (or be omitted — blog posts are covered by `REUSE.toml` mapping).

- **Note:** `docs/` MDX files may open with `{/* SPDX … */}` — the docs plugin handles this.

  This invariant applies to `blog/` only.

### Documentation Law — The Quartz Testimony [MANDATORY]

- **[INVARIANT] No content page may silently lag behind the core behavior it documents.** If the core repo's behavior changes and the documentation is not updated in the same sprint, the documentation is a ghost — structurally present but semantically dead.
- **Trigger rules (mandatory — not optional):**
  - Core changed a `Zxxx` finding (threshold, message, line accuracy, or semantic scope) → Update `reference/finding-codes.mdx` (EN + IT)
  - Core changed config options or exclusion behavior → Update `reference/configuration.mdx` (EN + IT)
  - Core changed CLI structure or module architecture → Update `explanation/architecture.mdx` (EN + IT)
  - Core changed adapter discovery or engine config handling → Update `how-to/configure-adapter.mdx` (EN + IT)
- **Enforcement:** The [CLOSING PROTOCOL] Step 3 (Staleness & Testimony Audit) implements this law. **A documentation sprint that does not audit for core drift is not closed.**

### Memory Law — The Custodian's Contract

- **[INVARIANT] The [CLOSING PROTOCOL] is a non-negotiable Engineering Contract.**

  An agent that ends a session without completing it commits a Class 1 violation (Technical Debt). The successor inherits a ghost, not a project.

- **[INVARIANT] This file is the agent's only persistent memory.** Update it before the final commit — not after.
- **[INVARIANT] Definition of Done:** A sprint is not closed until RELEASE.md is current and the staleness audit (including symmetry diff) is complete.
- **[INVARIANT] Proactivity:** Agents must notify the Tech Lead when a code change contradicts or expands the current guidelines.
- **[INVARIANT] Sovereignty:** This file is the single source of truth for agent behavior in this repository.

### Trinity Mesh Synchronization (CEO-235/236)

- **[INVARIANT]** The three public repositories (`zenzic`, `zenzic-doc`, `zenzic-action`) form the **Trinity Mesh**. Cross-repo changes must be documented in each affected repo's `ZENZIC_BRAIN.md` [ACTIVE SPRINT] within the same sprint.
- **[RULE]** `just map-update` in the core repo runs `scripts/map_project.py` which emits `[MESH STATUS]` — all three repos must show 🟢. A 🔴 signals a missing or deleted `ZENZIC_BRAIN.md`.
- **[INVARIANT — Silent Mind Protocol]** `zenzic-brain` is the fourth repository and is **never** referenced in any public map, BRAIN section, or mesh detection script. It is the Silent Mind.

### The Law of Executive Brevity [MANDATORY] — D068

- **[INVARIANT] `RELEASE.md` in the core repo must never exceed 200 lines.**
  - User-visible narrative only: Big Three features, security wins, breaking changes, install CTA.
  - No mutation tables, internal sprint IDs, bug IDs, or CVE traces in release notes.
  - Technical details belong in `CHANGELOG.md` (core repo), not in `RELEASE.md`.
- **[INVARIANT] `CHANGELOG.md` archive trigger:** When the core repo's `CHANGELOG.md` exceeds 500 lines, pre-release versions are moved to `CHANGELOG.archive.md`. The main file carries only the current release cycle.
- **[RULE] 5-sprint summarisation:** When a CHANGELOG section for a single version exceeds 5 detailed sprint entries, summarise into thematic paragraphs. Preserve the facts; compress the format.
- **Enforcement:** [CLOSING PROTOCOL] Step 2 "Executive Filter" check implements this law.

---

## [ARCHITECTURE] — Repository Structure

### Content Hierarchy

```text
docs/                                    # English source — ALL files are .mdx
  index.mdx                              # Unified Gateway landing page (see BUG-001)
  tutorials/                             # Learning-oriented (2 files)
  how-to/                                # Task-oriented (8 files)
  reference/                             # Information-oriented (8 files)
  explanation/                           # Understanding-oriented (4 files)
  community/                             # Contributing, FAQ, brand, developers (18 files)
    contribute/                          # PRs, bug reports, docs issues (5 files)
    developers/                          # Adapter/plugin development
      tutorials/ how-to/ reference/ explanation/   # Nested Diátaxis quadrants

i18n/
  en/                                    # English theme overrides (code.json)
  it/
    docusaurus-plugin-content-docs/
      current/                           # Italian translations — MUST mirror docs/ exactly (40 files)

src/
  components/Icon.tsx                    # Global icon wrapper (lucide-react + SVG fallback)
  components/Homepage/                   # Hero, Features, QualityScore, SentinelSection
  pages/index.tsx                        # Landing page monolith (ESLint-excluded, typecheck covered)
  theme/MDXComponents.js                 # Global swizzle: injects Icon and SentinelSection site-wide

scripts/
  build-assets.js                        # prebuild: zips brand/ + social/ → brand-kit.zip
  bump-version.sh                        # version bump automation (6+ hardcoded strings)
```

### Key Config Files

| File | Purpose |
|------|---------|
| `docusaurus.config.ts` | Site config; locales (en, it); `onBrokenLinks: 'throw'`; footer version string |
| `sidebars.ts` | `type: 'autogenerated'` — hierarchy drives sidebar; no hardcoded entries |
| `tailwind.config.js` | Tailwind JIT config; static class names only |
| `justfile` | All developer recipes: `setup`, `start`, `verify`, `build`, `preflight`, `sentinel`, `bump` |
| `REUSE.toml` | SPDX compliance mapping |

### Version Management

Current: **v0.7.0**. Version string appears in 6+ places; always use `just bump VERSION` to update all at once. `scripts/bump-version.sh` covers: `docusaurus.config.ts` (×3), `RELEASE.md` (×1), footer (×1), badge (×1).

---

## [CODE MAP] — Struttura Documentazione (Diátaxis)

> Auto-generato da `scripts/map_docs.py` via filesystem scan (CEO-085 — Universal Cartographer).
> Aggiornare con `just map-update` dopo ogni aggiunta/rimozione di pagine.

<!-- MAP_START -->
> Auto-generato da `scripts/map_docs.py` via filesystem scan.
> Aggiornare con `just map-update` dopo ogni aggiunta/rimozione di pagine.

### Regola di Posizionamento

| Quadrante | Scopo | Aggiungi qui quando... |
|-----------|-------|------------------------|
| `tutorials/` | Learning-oriented | L'utente deve *imparare* qualcosa di nuovo |
| `how-to/` | Task-oriented | L'utente vuole *fare* qualcosa di specifico |
| `reference/` | Information-oriented | Si documenta un nuovo `Zxxx`, flag CLI, o config |
| `explanation/` | Understanding-oriented | Si spiega il *perché* di una decisione architetturale |
| `community/` | Contributing / governance | Contribuzione, governance, brand, guide sviluppatori |

### Mappa Completa

#### `tutorials/` — Tutorials (2 files)

> Learning-oriented. Step-by-step guides for beginners. New file → here.

- `examples.mdx`
- `first-audit.mdx`

#### `how-to/` — How-to Guides (8 files)

> Task-oriented. Goal-driven guides for practitioners. New recipe → here.

- `add-badges.mdx`
- `add-custom-rules.mdx`
- `configure-adapter.mdx`
- `configure-ci-cd.mdx`
- `configure-social-metadata.mdx`
- `install.mdx`
- `migrate-engines.mdx`
- `workflow-integration.mdx`

#### `reference/` — Reference (10 files)

> Information-oriented. Exhaustive technical reference. New Zxxx code, CLI flag → here.

- `advanced-features.mdx`
- `checks.mdx`
- `cli.mdx`
- `configuration-reference.mdx`
- `configuration.mdx`
- `engines.mdx`
- `finding-codes.mdx`
- `glossary.mdx`
- `index.mdx`
- `suppression-policy.mdx`

#### `explanation/` — Explanation (10 files)

> Understanding-oriented. Conceptual deep-dives. New ADR narrative → here.

- `architecture.mdx`
- `audit-v070-quartz-siege.mdx`
- `discovery.mdx`
- `ecosystem.mdx`
- `health-metrics.mdx`
- `mineral-path.mdx`
- `safe-harbor.mdx`
- `structural-integrity.mdx`
- `the-zenzic-trinity.mdx`
- `why-zenzic.mdx`

#### `community/` — Community (32 files)

> Contributing, governance, brand, developer guides.

- `brand-kit.mdx`
- `faqs.mdx`
- `index.mdx`
- `license.mdx`
- **`contribute/`** — Contribute (5 files)
  - `index.mdx`
  - `pull-requests.mdx`
  - `report-a-bug.mdx`
  - `report-a-docs-issue.mdx`
  - `request-a-change.mdx`
- **`developers/`** — Developer Guide (18 files)
  - `index.mdx`
  - **`explanation/`** — Explanation (12 files)
    - `adr-agnostic-universalism.mdx`
    - `adr-bilingual-structural.mdx`
    - `adr-decentralized-cli.mdx`
    - `adr-discovery.mdx`
    - `adr-lint-source.mdx`
    - `adr-path-sovereignty.mdx`
    - `adr-sovereign-sandbox.mdx`
    - `adr-unified-perimeter.mdx`
    - `adr-vault.mdx`
    - `adr-zero-subprocesses.mdx`
    - `architecture-gaps.mdx`
    - `engineering-ledger.mdx`
  - **`how-to/`** — How-to (2 files)
    - `implement-adapter.mdx`
    - `write-plugin.mdx`
  - **`reference/`** — Reference (2 files)
    - `adapter-api.mdx`
    - `sentinel-style.mdx`
  - **`tutorials/`** — Tutorials (1 files)
    - `adapter-examples.mdx`
- **`governance/`** — Governance & Sovereignty (5 files)
  - `adversarial_ai.mdx`
  - `evolution_policy.mdx`
  - `exit_strategy.mdx`
  - `index.mdx`
  - `licensing.mdx`

### Bilingual Symmetry Check

| Locale | Files |
|--------|-------|
| `docs/` (EN) | 63 |
| `i18n/it/` (IT) | 63 |

> ✅ EN/IT parity confirmed.
<!-- MAP_END -->

---

## [ADR] — Architectural Decision Records

### ADR-001: Diátaxis Adoption (2026-04-20, Commit `7d8d513`)

**[DECISION]** Documentation organized into four strict quadrants (Tutorials / How-to / Reference / Explanation). Previous structure (`guides/`, `usage/`, `examples/`, `internals/`) deprecated and moved.

- **Why:** Diátaxis prevents content drift and makes the user's need explicit. Each quadrant has a clear purpose; contributors know exactly where to add new content.
- **Impact:** 29 EN + 29 IT files renamed/moved with git history preserved. All internal cross-references healed in both languages.

### ADR-002: Autogenerated Sidebar (sidebars.ts)

**[DECISION]** `type: 'autogenerated'` — the filesystem hierarchy IS the sidebar. No hardcoded sidebar entries.

- **Why:** Manual sidebar entries cause drift when files move. Auto-generation guarantees structural consistency.
- **Invariant:** Moving a file without updating i18n breaks navigation. The Slug Law (ADR-003) is required for this to work safely.
- **Ordering:** `_category_.json` with `position` field controls display order within each quadrant.

### ADR-003: Physical Slug Law (The Slug Law)

**[DECISION]** No `slug:` frontmatter that diverges from the physical file path. URLs mirror the filesystem.

- **Why:** The autogenerated sidebar resolves URLs from file paths. A diverged `slug:` creates an orphan URL invisible to the sidebar, breaking navigation without a build-time error.
- **Single exception:** `docs/internals/vision.mdx` (legacy URL stability).

### ADR-004: Bootstrap Paradox Resolution — ZRT-005 Genesis Fallback (2026-04-08)

**[DECISION]** `find_repo_root()` gains `fallback_to_cwd: bool = False` parameter. When `fallback_to_cwd=True` and no `.git/` or `zenzic.toml` marker is found, returns `Path.cwd()` instead of raising an error.

- **Why (The Bootstrap Paradox):** `zenzic init` must run in directories that have neither `.git/` nor `zenzic.toml` (its purpose is to *create* the config). Without the fallback, `find_repo_root()` raises, making `zenzic init` impossible in a fresh project — a Catch-22.
- **Security invariant:** Only the `init` command passes `fallback_to_cwd=True`. All analysis commands (`check`, `scan`, `score`, `clean`) retain strict default (`False`). The Genesis Fallback does NOT weaken perimeter for analysis.
- **Full ADR:** `docs/community/developers/explanation/adr-discovery.mdx`.

### ADR-005: i18n Lockdown — Explicit `path` in localeConfigs (D090)

**[DECISION]** `path` must be explicitly set in every locale entry in `localeConfigs` in `docusaurus.config.ts`.

- **Why:** Without explicit `path: 'it'`, Docusaurus derives the filesystem path from `htmlLang: 'it-IT'`. The derived path `it-IT` does not match the actual directory `i18n/it/`, causing the Italian locale to silently fall back to English content — no build error, no visible warning.
- **Implementation:** `localeConfigs: { it: { label: 'Italiano', htmlLang: 'it-IT', path: 'it' } }`.

### ADR-006: Unified Perimeter — Storage + Blog Locale Sovereignty (CEO 051, `3188387`)

**[DECISION]** Two locale-bleed bugs fixed via `docusaurus.config.ts`.

**Theme Flip:** `future.v4` enables `siteStorageNamespacing` which hashes `url+baseUrl` per locale,
producing different localStorage keys (`theme-926` EN, `theme-3d7` IT). Dark mode preference is
siloed per locale — switching locale causes a theme reset. Fix: `storage: { namespace: false }` →
unified key `'theme'` across all locales. Verified in anti-FOUC inline script in built HTML.

**Blog locale bleed:** `to:'/blog'` and `href:'/blog'` are both rewritten to `/it/blog` in IT
locale by the Docusaurus static build pipeline. Fix: `type: 'html'` navbar item with a raw anchor
`href=/blog` — Docusaurus does not process innerHTML of `html`-type items, so the href is
preserved verbatim. Blog remains EN-only regardless of active locale.

**[INVARIANT] CEO directive corrections:**

- `themeConfig.siteStorage.themeKey` — does NOT exist in Docusaurus 3.x. Correct API is top-level `storage.namespace`.
- `respectPrefersColorScheme: true` — NOT applied; would revert CEO 149 immutable invariant. `false` is maintained.

---

<!-- ZONE_B_START -->
## [ACTIVE SPRINT] — Working Context

### D096 — Quartz Discovery, SARIF Sovereignty & Brain Curation (Cross-repo Note)

**Version:** 0.7.0 · **Sprint:** 2026-04-30

**CEO-218/219 "Contemporary Testimony":** Z906 `NO_FILES_FOUND` added to `finding-codes.mdx` EN+IT. Engine `"auto"` documented in `configuration-reference.mdx` EN+IT. Blog updated: 20 Acts (0–19), Act 19 "The Base64 Shadow" row added.

**CEO-233/234 "Zone A/B Restructure":** `<!-- ZONE_B_START -->` / `<!-- ZONE_B_END -->` markers added to this file. Trinity Mesh policy added to [POLICIES].

No doc-only changes in this sprint. All code changes are in the core `zenzic` repo.

### Last Closed — D093 — SMA Dual-Launch + Blog Chronos

**Version:** 0.7.0 · **Sprint:** 2026-04-30

CEO-186 Blog Chronos: numeric prefixes to 8 sidebar_labels. CEO-185 Masterclass Act XI. CEO-187 SMA blog post. CEO-188 `why-zenzic.mdx` CI/CD veracity fix. `just verify` EXIT 0 · 62/62 EN/IT.

<!-- ZONE_B_END -->

## [ARCHIVE LINK]

Complete sprint history, bug post-mortems, and documentation decisions:

- **[CHANGELOG.md](https://github.com/PythonWoods/zenzic/blob/main/CHANGELOG.md)** — core release cycle (v0.7.0)
- **[CHANGELOG.archive.md](https://github.com/PythonWoods/zenzic/blob/main/CHANGELOG.archive.md)** — pre-v0.6.0 history
