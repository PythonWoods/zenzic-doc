<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="static/brand/svg/zenzic-nav-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="static/brand/svg/zenzic-nav-light.svg">
    <img src="static/brand/svg/zenzic-nav-dark.svg" alt="Zenzic" height="64" />
  </picture>
</div>

# zenzic-doc Developer Guide

[![Zenzic Core](https://img.shields.io/badge/Zenzic_Core-v0.7.0-4f46e5)](https://github.com/PythonWoods/zenzic)
[![Docs CI](https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml/badge.svg)](https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-0d9488?style=flat-square)](LICENSE)
[![REUSE status](https://api.reuse.software/badge/github.com/PythonWoods/zenzic-doc)](https://api.reuse.software/info/github.com/PythonWoods/zenzic-doc)
[![Documentation: Diátaxis](https://img.shields.io/badge/Docs-Di%C3%A1taxis-brightgreen?style=flat-square)](https://diataxis.fr/)

> **This documentation is strictly aligned to Zenzic v0.7.0 "Obsidian Maturity".**
> If the core version changes, run `just bump NEW_VERSION` to keep all references in sync.

This repository contains the Docusaurus documentation website for Zenzic.

This guide is written for both experienced maintainers and first-time contributors.
If you are new, follow the sections in order.

## 1) Prerequisites

- Node.js 24 or newer
- npm 10 or newer
- Optional: [just](https://github.com/casey/just) to run short, memorable commands

## 2) First Setup (for new collaborators)

Run this once after cloning the repository:

```bash
npm ci
```

What this does:

- Installs dependencies exactly as defined in `package-lock.json`.
- Keeps your environment reproducible with CI.

Alternative with just:

```bash
just setup
```

## 3) Start the docs site locally

```bash
npm run start
```

What this does:

- Starts a local development server.
- Automatically reloads pages when files change.

Alternative with just:

```bash
just start
```

## 4) Common daily workflow

When editing docs or components, this is the safest flow:

```bash
just start
just verify
```

What `just verify` does:

- Runs TypeScript checks.
- Builds the production site exactly like CI expects.

## 5) All commands explained

### npm commands

| Command | When to use it | What it does |
| --- | --- | --- |
| `npm ci` | First setup, clean reinstall, CI parity | Installs dependencies from lockfile with deterministic versions |
| `npm run start` | During active development | Starts local server with live reload |
| `npm run build` | Before PR, before release | Produces static site in `build/` |
| `npm run serve` | After a build | Serves `build/` locally to preview production output |
| `npm run lint:md` | Before PR, after docs edits | Lints Markdown/MDX style and formatting rules |
| `npm run lint:ts` | Before PR, after React/TS edits | Lints TypeScript/React source files |
| `npm run typecheck` | Before PR, when changing TS/React files | Runs `tsc` type checks |
| `npm run clear` | If Docusaurus cache causes weird behavior | Clears cached artifacts |
| `npm run swizzle` | Advanced theme customization | Copies Docusaurus theme internals for customization |
| `npm run write-translations` | i18n workflow changes | Generates translation scaffolding |
| `npm run write-heading-ids` | Large Markdown updates | Writes/updates heading IDs for docs files |
| `npm run deploy` | Deployment workflows only | Runs Docusaurus deploy command |
| `npm run docusaurus -- <args>` | Advanced/diagnostic usage | Runs raw Docusaurus CLI with custom arguments |

### just commands

`just` wraps npm commands with simpler names.

| Command | When to use it | What it does |
| --- | --- | --- |
| `just setup` | First setup or reset | Runs `npm ci` |
| `just start` | Daily editing | Runs local dev server |
| `just serve` | Preview production build | Serves `build/` with full locale switch (the correct way to test EN↔IT) |
| `just markdownlint` | After editing docs | Runs markdown lint checks |
| `just lint` | After editing React/TS source | Runs TypeScript/React lint checks |
| `just typecheck` | Before opening/updating PR | Runs TypeScript checks |
| `just build` | Build validation | Runs production build |
| `just preview` | Validate built output | Serves already-built site |
| `just verify` | Recommended final local check | Runs `markdownlint` + `lint` + `typecheck` + `build` |
| `just preflight` | Before every commit | Runs all pre-commit hooks against every tracked file |
| `just reuse` | After adding/renaming files | Checks REUSE/SPDX licence compliance |
| `just sentinel` | Quick quality spot-check | Runs the Zenzic Sentinel alone (faster than full preflight) |
| `just clean` | Cleanup before fresh run | Removes `build/` and `.docusaurus/` |
| `just bump VERSION [BADGE]` | After a Zenzic core release | Updates all hardcoded version references |

You can list all recipes with:

```bash
just --list
```

## 6) Pre-commit hooks (Obsidian Guard)

This repository enforces quality gates before every commit via [pre-commit](https://pre-commit.com/).

Install the hooks once after cloning:

```bash
pip install pre-commit
pre-commit install
```

Every `git commit` will automatically run:

| Hook | What it checks |
| --- | --- |
| trailing-whitespace | No trailing spaces (excludes `.mdx`) |
| end-of-file-fixer | Files end with a newline |
| check-yaml / check-json / check-toml | Valid structured data |
| check-added-large-files | Prevents accidental binary commits |
| check-merge-conflict | No unresolved merge markers |
| no-commit-to-branch | Blocks direct commits to `main` |
| TypeScript Typecheck | `tsc --noEmit` must pass |
| Zenzic Sentinel | `zenzic check all` must exit 0 |
| REUSE/SPDX | License compliance on every file |

If a hook fails, fix the reported issue and retry the commit.

To run all hooks manually without committing:

```bash
just preflight
```

## 7) CI/CD workflows

| Workflow | File | Trigger | Goal |
| --- | --- | --- | --- |
| Docs CI | `.github/workflows/ci.yml` | PR, push to `main`, manual | Validate install, markdown lint, TS/React lint, typecheck, and build on Node 22 and 24 |
| Dependency Audit | `.github/workflows/npm-audit.yml` | PR, push to `main`, weekly, manual | Detect high-severity dependency vulnerabilities |
| Dependency Review | `.github/workflows/dependency-review.yml` | PR, manual | Detect risky dependency changes introduced by PRs |
| CodeQL (opt-in) | `.github/workflows/codeql.yml` | PR, push to `main`, weekly, manual | Static analysis when `ENABLE_CODEQL=true` |
| Release Docs | `.github/workflows/release-docs.yml` | tags `v*`, manual | Build, archive, and publish versioned artifact |

## 8) Security notes

- `codeql.yml` is opt-in for private repositories.
- To enable CodeQL jobs: enable Code Security (GHAS), then set repository variable `ENABLE_CODEQL=true`.
- `npm-audit.yml` runs strict high-severity audit without allowlists.

## 9) Pipeline robustness (current status)

Landing-page policy:

- `src/pages/index.tsx` is an intentional monolith landing page and is excluded from `lint:ts` by explicit policy.
- It is still covered by `typecheck` and `build`.

Already implemented:

- Concurrency controls (cancel obsolete runs).
- Job timeouts (avoid stuck runners).
- Manual `workflow_dispatch` triggers.
- Node matrix (22 and 24) for compatibility.
- npm cache in workflows, keyed by `package-lock.json`.

Possible future hardening:

- Pin third-party GitHub Actions by commit SHA.
- Require branch protection checks after rollout validation.

## 10) Troubleshooting

### Error: `File '@docusaurus/tsconfig' not found`

When this appears in your editor, check `tsconfig.json` and ensure `extends` points to:

```json
"@docusaurus/tsconfig/tsconfig.json"
```

Then run:

```bash
npm run typecheck
```

### `npm ci` fails

Try this sequence:

```bash
just clean
rm -rf node_modules
npm ci
```

If it still fails, verify your Node/npm versions against the prerequisites section.

### `npm run build` fails but `start` works

This usually means production-only checks are stricter.

Run:

```bash
npm run typecheck
npm run build
```

Fix type errors first, then retry the build.

### `/it/docs/index` is 404 on localhost

This is expected when running `npm run start` with default locale (`en`):
the dev server serves one locale at a time.

Use one of these commands instead:

```bash
npm run start:en
npm run start:it
```

Notes:

- With `start:it`, open `http://localhost:3000/docs/` (Italian content served at root in dev).
- If you want prefixed routes like `/it/docs/`, build + serve production output:

```bash
npm run build
npm run serve
```

### CI fails but local commands pass

Use the exact CI-equivalent local gate:

```bash
just verify
```

If CI still differs, check:

- Node version (CI uses Node 22 and 24)
- Lockfile changes (`package-lock.json`)
- Workflow-specific jobs (dependency audit, dependency review)

### The i18n Silent Fallback Trap

**Symptom:** `http://localhost:3000/it/docs/` renders English content even though the
Italian translation files exist under `i18n/it/`.

**Root cause:** Docusaurus derives the `path` property from `htmlLang` when `path` is
not set explicitly. If you declare `htmlLang: 'it-IT'`, Docusaurus looks for translations
in `i18n/it-IT/` — a directory that does not exist. The build completes silently with
`translate: false` and falls back to the English source for all content pages. The UI
chrome (navbar, breadcrumbs, pagination labels) remains translated because those strings
come from Docusaurus's own bundled translations, masking the problem.

**Diagnosis:** In `build/it/.docusaurus/i18n.json` (or `.docusaurus/i18n.json` after a
build), check whether the `it` locale has `"translate": false`. If so, the path mismatch
is the cause.

**Fix:** Always set `path` explicitly in `localeConfigs`:

```ts
// docusaurus.config.ts
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'it'],
  localeConfigs: {
    en: { label: 'English' },
    it: { label: 'Italiano', htmlLang: 'it-IT', path: 'it' }, // ← path is mandatory
  },
},
```

**Discovered in:** v0.7.0 release audit (D090 "The i18n Lockdown").

## 11) Pull Request Checklist

Before opening or updating a PR, run this checklist.

- [ ] I installed dependencies with `npm ci` (or `just setup`).
- [ ] I tested local development with `npm run start` (or `just start`) if UI/docs behavior changed.
- [ ] I ran `just verify` and it passed.
- [ ] I reviewed `README.md` sections if I changed commands/workflows.
- [ ] I updated docs or comments when behavior changed.
- [ ] My branch contains only intentional changes.
- [ ] If I touched `i18n` config or locale files: I verified the `/it/` pages show **Italian content** (not just an Italian URL), by checking the page body after `npm run build && npm run serve`.

Minimal command sequence before PR:

```bash
just setup
just verify
```

---

## 📚 The Obsidian Chronicles

Zenzic was born from a technical journey through the fragility of modern documentation
ecosystems. Discover the philosophy, the security siege, and the engineering behind the
Sentinel in the [**Obsidian Engineering Series**](https://dev.to/pythonwoods/series/38629) on Dev.to.

---

<div align="center">
  <a href="https://zenzic.dev">
    <img src="static/img/pythonwoods-logo.svg" alt="PythonWoods" height="50" />
  </a>
  <p>
    <strong>Engineered with precision by PythonWoods in Italy 🇮🇹</strong><br/>
    <em>"Building the Safe Harbor for technical knowledge."</em>
  </p>
  <p>
    <a href="https://zenzic.dev"><strong>Documentation</strong></a> &middot;
    <a href="https://github.com/PythonWoods"><strong>GitHub</strong></a> &middot;
    <a href="https://zenzic.dev/blog"><strong>Journal</strong></a>
  </p>
</div>
