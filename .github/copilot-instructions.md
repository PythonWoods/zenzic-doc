# 📚 ZENZIC DOCS — Obsidian Ledger v0.7.0 "Obsidian Maturity"

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
- **Pre-commit gate (Obsidian Guard — 8 hooks):** trailing-whitespace, EOF-fixer, YAML/JSON/TOML validation, large-file prevention, merge-conflict guard, no-direct-commits-to-main, TypeScript typecheck, Zenzic Sentinel, REUSE/SPDX compliance.
- **`just preflight`** mirrors the full CI gate exactly (`uvx pre-commit run --all-files`).
- **Broken-anchor warnings** on `#global-flags`, `#virtual-site-map-vsm` in build output are pre-existing — not regressions.

### Documentation Law — The Obsidian Testimony [MANDATORY]

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

```
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

---

## [ACTIVE SPRINT] — Working Context

### D144–D154 — Full-Spectrum title= Audit + Sentinel Gate Manifesto (Current)

**Version:** 0.7.0 · **Date:** 2026-04-27

**CEO 144–145 "Full-Spectrum title= Audit" (`599d462`):**
- `title=` added to all file-representative code blocks across all languages (yaml, toml, ts, python,
  markdown, mdx) in docs/ + i18n/it/. 22 files, BUILD_EXIT:0.

**CEO 147–148 "Sovereign Naming Law" (`982c2d9`):**
- `docs.yml` → `zenzic.yml` (22× EN+IT), `zenzic-badge.yml` → `zenzic-score.yml` (4× EN+IT).
  14 files, 26 substitutions. BUILD_EXIT:0.

**CEO 149–151 "Event Isolation + Mirror of Truth + Sentinel Gate" (`b2c1ef5`):**
- `docusaurus.config.ts`: `respectPrefersColorScheme: false` — root cause of language switcher
  triggering theme change was OS preference overriding `defaultMode` on SPA navigation.
  Swizzled components (LocaleDropdownNavbarItem, Navbar/Content) confirmed architecturally clean.
- `health-metrics.mdx` + IT: 21× `/docs/reference/` → `../reference/finding-codes.mdx#zXXX` (R19 compliance).
- `finding-codes.mdx` (EN + IT): 21× `/docs/explanation/health-metrics` → `../explanation/health-metrics.mdx`.
- `architecture-gaps.mdx` (EN + IT): blog link → `https://zenzic.dev/blog/...` full URL.
- `justfile`: `build` recipe now depends on `sentinel` (Sentinel Gate mandatory prerequisite).

**CEO 152 "Purity of Events" (analysis only):**
- `LocaleDropdownNavbarItem/index.tsx`: confirmed architecturally pure — zero colorMode references.
- `Navbar/Content/index.tsx`: confirmed clean — null on `/` and `/it/`, data-blog-route on blog.
- CEO 149 fix (`respectPrefersColorScheme: false`) is the complete and canonical fix.

**CEO 152 "Sovereign Silence" (`9c4a715`):**
- `src/theme/NavbarItem/LocaleDropdownNavbarItem/` deleted (Tabula Rasa).
  CSS already suppresses locale dropdown on blog via `data-blog-route`; React wrapper was redundant.
- `src/css/custom.css`: Blog Sovereignty rule `display: none` → `visibility: hidden + pointer-events: none`
  (zero layout shift; pure declarative; upgrade-proof).
- `Navbar/Content` swizzle retained: homepage `null` return cannot be CSS-only.

**CEO 153–154 "Sentinel Gate Manifesto + Release Bridge + Z503" (`30d545c`):**
- `docs/how-to/workflow-integration.mdx` (new): 'Local Sentinel Gate' how-to guide.
  Recipes for Docusaurus (npm scripts), MkDocs (justfile/Makefile), Zensical (shell/justfile),
  Standalone (any tool). Discovery cost table. Exit code reference. Related links (Z105-compliant).
- `i18n/it/.../how-to/workflow-integration.mdx` (new): bilingual IT mirror — 'Sentinel Gate Locale'.
- `zenzic.toml`: 2 specific blog URLs added to `excluded_external_urls` (Release Bridge, R19-surgical).
  Remove after v0.7.0 GA deploy: `https://zenzic.dev/blog/ai-driven-siege-shield-postmortem`,
  `https://zenzic.dev/blog/beyond-the-siege-zenzic-v070`.
- `configure-ci-cd.mdx` (EN): restored complete `jobs:`/`steps:` structure in 'uvx (zero-setup)'
  and 'astral-sh/setup-uv' tabs (truncated by prior title= audit, causing Z503 YAML parse failures).

SENTINEL_EXIT:0 | BUILD_EXIT:0 (EN + IT, `just build` with Sentinel Gate passes).

### Last Closed — D127–D142 — SentinelOutput Visual System + Chromatic Sovereignty

**Version:** 0.7.0 · **Date:** 2026-04-27

SentinelOutput component (4 variants: clean/breach/findings/inspect), 30 live instances EN+IT,
Bimodal Indigo palette (WCAG AAA), Global Chromatic Sovereignty (indigo-700 base), Conditional
Perimeter borders, Contextual Snippets (title= on all YAML/TOML blocks). BUILD_EXIT:0.

### Last Last Closed — D122–D124 — Obsidian Ascension + Visual Fidelity Protocol

**Version:** 0.7.0 · **Date:** 2026-04-27

CEO 122/123/124: index/first-audit/health-metrics rewritten user-benefit-first. TerminalWindow
component + 3 SVG assets via rich.console. engineering-ledger.mdx (EN + IT) created.
BUILD_EXIT:0.

### Last Last Closed — D114–D119 — Obsidian Mirror + Sovereign Integration Audit

**Version:** 0.7.0 · **Date:** 2026-04-25

D075: R19 `:::warning` admonition added to `configuration-reference.mdx` (EN + IT) — domain-level
URL exclusion prohibition now visible at the point of use. Bilingual symmetry maintained; preflight
passes. All v0.7.0 documentation obligations fulfilled.

---

## [ARCHIVE LINK]

Complete sprint history, bug post-mortems, and documentation decisions:

- **[CHANGELOG.md](https://github.com/PythonWoods/zenzic/blob/main/CHANGELOG.md)** — core release cycle (v0.7.0)
- **[CHANGELOG.archive.md](https://github.com/PythonWoods/zenzic/blob/main/CHANGELOG.archive.md)** — pre-v0.6.0 history
