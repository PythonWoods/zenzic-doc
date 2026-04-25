# 📚 ZENZIC DOCS — Obsidian Ledger v0.7.0 "Obsidian Maturity"

> **Single Source of Truth for all agents and contributors to the zenzic-doc repository.**
> Schema: [MANIFESTO] → [POLICIES] → [ARCHITECTURE] → [ADR] → [CHRONICLES] → [SPRINT LOG]

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
- [ ] Bug found and fixed? → Add a **[CHRONICLES]** entry (tagged `[BUG-xxx]` / `[LESSON]`)
- [ ] Sprint complete? → Add entry to **[SPRINT LOG]**

### Step 2 — Update Documentation Artifacts
- [ ] Content-only changes: add prose section to `RELEASE.md`
- [ ] Structural or tooling changes: add section to `RELEASE.md` + notify core repo for cross-repo CHANGELOG entry

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
- **[INVARIANT] Definition of Done:** A sprint is not closed until [SPRINT LOG] is updated, RELEASE.md is current, and the staleness audit (including symmetry diff) is complete.
- **[INVARIANT] Proactivity:** Agents must notify the Tech Lead when a code change contradicts or expands the current guidelines.
- **[INVARIANT] Sovereignty:** This file is the single source of truth for agent behavior in this repository.

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

## [CHRONICLES] — Post-Mortem & Lessons Learned

### [BUG-001] The /docs/ 404 — Missing Landing Page (Commit `9a1c041`)
- **ID:** BUG-001
- **Severity:** SEO + UX failure (root docs URL returned 404)
- **Symptom:** Navigating to `https://zenzic.dev/docs/` returned 404. Reported via Google Search Console.
- **Root Cause:** Docusaurus 3.10 requires an explicit `index.mdx` file at `docs/` root for the `/docs/` route. The previous structure did not provide one. After the Diátaxis restructure, the old implicit index was lost.
- **[LESSON]** Every Docusaurus doc section root must have an explicit `index.mdx`. Never rely on implicit routing for section roots. The file serves as a Unified Gateway — a navigation table linking to all major quadrants.
- **Permanent Fix:** `docs/index.mdx` + `i18n/it/.../current/index.mdx` created.

### [BUG-002] Diátaxis 404 Cascade — Blanket URL Exclusion (D079 — 2026-04-22)
- **ID:** BUG-002
- **Severity:** Silent link rot (3 broken links invisible to Zenzic Sentinel)
- **Symptom:** Three links in `README.md` and `README.it.md` pointed to old pre-Diátaxis URLs. `zenzic check all` did not catch them.
- **Root Cause:** `zenzic.toml` in the core repo contained `excluded_external_urls = "https://zenzic.dev/"` — a blanket bypass added when the site was undeployed. After the Diátaxis restructure, the renamed URLs were hidden behind this curtain.
- **Dead paths (old → correct):**
  - `/docs/usage/badges/` → `/docs/how-to/add-badges/`
  - `/docs/guides/ci-cd/` → `/docs/how-to/configure-ci-cd/`
  - `/docs/internals/architecture-overview/` → `/docs/explanation/architecture/`
- **[LESSON]** Never use domain-level URL exclusions. They create permanent blind spots that survive restructures. Use `--exclude-url <url>` at CLI runtime for temporary skips only.
- **Permanent Fix:** Blanket exclusion removed from `zenzic.toml`. All three links corrected.

### [BUG-003] i18n Silent Fallback — Missing `path` in localeConfigs (D090)
- **ID:** BUG-003
- **Severity:** Silent UX failure (Italian pages served English content)
- **Symptom:** Italian locale pages served English content without any build error or console warning.
- **Root Cause:** `localeConfigs.it` was missing the explicit `path: 'it'` field. Docusaurus derived the locale path from `htmlLang: 'it-IT'`, looking for `i18n/it-IT/` which didn't exist. Fell back silently to English.
- **[LESSON]** Always set `path` explicitly in every `localeConfigs` entry. Never let Docusaurus infer it from `htmlLang`. Verify by switching to the Italian locale in local dev (`npm run start`) after any `docusaurus.config.ts` change.
- **Permanent Fix:** `path: 'it'` added to `localeConfigs.it`. See ADR-005.

### [BUG-004] Z404 Engine-Specific Flaw (D087 — 2026-04-22)
- **ID:** BUG-004
- **Severity:** Architecture failure (config asset check was Docusaurus-only)
- **Symptom:** A broken `theme.favicon` in `mkdocs.yml` was not caught by `zenzic check all`. Only Docusaurus config assets were validated.
- **Root Cause:** `check_config_assets()` was only wired for `engine = "docusaurus"` in `cli/_check.py`.
- **[LESSON]** A Safe Harbor claiming engine-agnosticism cannot have engine-specific integrity guards. Every guard that applies conceptually to all engines must be implemented for all engines.
- **Permanent Fix:** Z404 extended to MkDocs (`theme.favicon`, `theme.logo`) and Zensical (`[project].favicon`, `[project].logo`). CLI dispatch uses multi-engine routing.

---

## [SPRINT LOG] — CEO Directive History

### D109–D116 — Typography, Navigation & Layout Polish
**Version:** 0.7.0 · **Date:** 2026-04-22
Geist + JetBrains Mono typography system, navigation arrows, responsive layout hardening, hero/feature section refinements.

### D117 — `pathname:` Protocol Support
**Version:** 0.7.0 · **Date:** 2026-04-22
Documentation for Docusaurus `pathname:///` escape hatch added to `reference/engines.mdx` (EN + IT).

### D118–D119 — Blog Title Consistency & Sibling Release Protocol
**Version:** 0.7.0 · **Date:** 2026-04-22
Blog `h2 a` colors locked. RELEASE.md rewritten as Sibling Release Protocol. `scripts/bump-version.sh` + `just bump` recipe added.

### D122 — Governance Pack
**Version:** 0.7.0 · **Date:** 2026-04-22
`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CITATION.cff`, `SECURITY.md` created. REUSE compliant (blog/** added to `REUSE.toml`).

### D123–D125 — Global Brand Sync
**Version:** 0.7.0 · **Date:** 2026-04-22
4 badges added to `README.md`. Node 20 → 22 → 24 corrected. Obsidian Chronicles added. PythonWoods logo SVG/PNG assets in `static/img/`.

### D127 (CEO) — The Sovereign Identity Protocol
**Version:** 0.7.0 · **Date:** 2026-04-22
X.com / Twitter links removed. Italian flag 🇮🇹 restored. Social links: GitHub + Journal only. RELEASE.md cross-reference to core repo added.

### D042 (CEO) — The Perpetual Memory Protocol
**Version:** 0.7.0 · **Date:** 2026-04-25
Memory Law (section 9) codified in both `.github/copilot-instructions.md` files.

### D043 (CEO) — The Sentinel's Sanity Pass
**Version:** 0.7.0 · **Date:** 2026-04-25
Blood Sentinel false positive fixed in core repo. Banner hoisted before validation. Test added. (Core repo change; documented here for cross-repo awareness.)

### D045 (CEO) — Codifying the Symmetry
**Version:** 0.7.0 · **Date:** 2026-04-25
Law of Italian Mirroring codified. Symmetry audit (docs/ vs i18n/it/) confirms zero asymmetries. Validation diff command documented above.

### D046 (CEO) — The Knowledge Refactoring
**Version:** 0.7.0 · **Date:** 2026-04-25
Obsidian Ledger schema adopted for all three repo agent instructions. Changelog audit completed before writing.

### D047 (CEO) — The Knowledge Trinity
**Version:** 0.7.0 · **Date:** 2026-04-25
Full rewrite (Option 1) of all three copilot-instructions.md files. zenzic-action receives its first agent instructions file.

### D049 (CEO) — The Obsidian Memory Law
**Version:** 0.7.0 · **Date:** 2026-04-25
`[CLOSING PROTOCOL]` section added to all three Obsidian Ledger files. Memory Law upgraded to "The Custodian's Contract" — the agent's only persistent memory. A sprint is not closed until the protocol checklist is fully ticked. Resolves the Paradox of the Custodian without Memory.

### D050 (CEO) — The Intelligent Perimeter
**Version:** 0.7.0 · **Date:** 2026-04-25
Core repo fix: Z903 false positives on engine config and infrastructure files eliminated via two-layer guardrail (L1a: system file names/patterns; L1b: `BaseAdapter.get_metadata_files()`). No documentation changes in this repo — documented here for cross-repo awareness.

### D051 (CEO) — Documentation as an Invariant
**Version:** 0.7.0 · **Date:** 2026-04-25
Documentation Law "The Obsidian Testimony" added to `[POLICIES]`. `[CLOSING PROTOCOL]` Step 3 upgraded to "Staleness & Testimony Audit". Four pages updated: `finding-codes.mdx` (Z502 semantic word count, Z503 absolute line number), `configuration.mdx` (System Guardrails section — L1a/L1b automatic exclusions, `_category_.json` no longer required), `configure-adapter.mdx` (L1b tip box after adapter discovery table). All EN + IT mirrors updated.

### D052 (CEO) — The Sovereign Root Fix
**Version:** 0.7.0 · **Date:** 2026-04-25
Core repo fix: BUG-010 (Context Hijacking) — `find_repo_root()` now accepts `search_from`; `_apply_target()` sovereign root guard preserves `docs_dir` when target equals repo root. No documentation changes in this repo — documented here for cross-repo awareness.

### D053 (CEO) — The Portability Invariant
**Version:** 0.7.0 · **Date:** 2026-04-25
Fixed absolute link violations in `configure-adapter.mdx` (EN + IT) introduced by D051: replaced `/docs/reference/configuration#system-guardrails` with `../reference/configuration.mdx#system-guardrails`. Rule R14 codified in core repo: Z105 is an unconditional pre-resolution gate.

### D054 (CEO) — The Strict Perimeter Law
**Version:** 0.7.0 · **Date:** 2026-04-25
BUG-011 fixed: `configuration.mdx` (EN + IT) wrongly listed `"assets"` in the `excluded_dirs` default. Corrected to `["includes", "stylesheets", "overrides", "hooks"]`; tip box added explaining why `"assets"` is intentionally absent. Rule R15 "Scope Integrity" codified in core repo. Forensic diagnosis: the Z104 incident was a CEO-052 artifact, not a perimeter failure — the Shield resolver was already correct.

### D055 (CEO) — The Precision Calibration
**Version:** 0.7.0 · **Date:** 2026-04-25
Core repo fixes: BUG-012 (Z502 MDX frontmatter leak — MDX comment stripping must precede frontmatter regex) and BUG-013 (Z105 `pathname:///` false positive — Z105 gate conditioned on `not parsed.scheme`). Rule R16 "Protocol Awareness" codified in core repo. CONTRIBUTING.md + CONTRIBUTING.it.md: Nox development note added (EN + IT). Regression tests in `tests/guardians/test_precision.py`. No documentation page changes required in this repo — documented here for cross-repo awareness.

### D056 (CEO) — Universal Path Awareness
**Version:** 0.7.0 · **Date:** 2026-04-25
Core repo: `zenzic score [PATH]` and `zenzic diff [PATH]` now accept an optional positional argument — sovereign root semantics identical to `check all`. Rule R17 "CLI Symmetry" codified in core repo. No documentation page changes in this repo — documented for cross-repo awareness.

### D058 (CEO) — The Precedence Audit
**Version:** 0.7.0 · **Date:** 2026-04-25
Documentation audit of configuration priority. Four pages updated in this repo: `reference/configuration-reference.mdx` (EN + IT): Config File Priority table upgraded from 3-level to 4-level — CLI flags added as Priority 1 with cumulative note for exclusions. `reference/configuration.mdx` (EN + IT): new "Configuration Priority" section added. "Precedence Table" checklist item added to [CLOSING PROTOCOL] Step 3 in all three Obsidian Ledgers.

### D059 (CEO) — The Law of Contemporary Testimony
**Version:** 0.7.0 · **Date:** 2026-04-25
Law of Contemporary Testimony codified as mandatory policy in [POLICIES] at top of all three Obsidian Ledgers. Step 0 "Pre-Task Alignment" added to [CLOSING PROTOCOL]. Step 3 enhanced with "Contemporary Check" bullets and "Bilingual Mirroring" + "Precedence Table" items.

### D060 (CEO) — Total CLI Symmetry
**Version:** 0.7.0 · **Date:** 2026-04-25
PATH argument applied to all check sub-commands and `init` in zenzic core. CLI reference docs updated (EN + IT): PATH usage examples for all `check` commands and init Nomad mode. Rule R18 "Total CLI Symmetry" codified in zenzic Obsidian Ledger.

### D062 (CEO) — The Genesis Nomad Enforcement
**Version:** 0.7.0 · **Date:** 2026-04-25
"Sovereign Root Protocol" section added to `docs/explanation/architecture.mdx` (EN + IT): documents the three-step sovereignty protocol, Genesis Nomad invariants, and Context Hijacking problem/solution.

### D061 (CEO) — The Maturity Narrative
**Version:** 0.7.0 · **Date:** 2026-04-25
v0.7.0 launch blog article (`blog/2026-04-22-beyond-the-siege-zenzic-v070.mdx`) revised as a case study in software engineering maturity. Additions (EN + IT simultaneously): "Treating Documentation as Untrusted Input" framing section; "The Precision Sprint" (Z502 BUG-012 + Z105 BUG-013 false positive narrative); "Total CLI Symmetry: The Sovereign Root Protocol" (D060/D062 coverage with terminal output examples); "The Law of Contemporary Testimony" (CEO-059). Capabilities table updated with new rows. Test count updated 1195 → 1225. CTA changed from `pip install zenzic; zenzic check all` to `uvx zenzic lab`.
