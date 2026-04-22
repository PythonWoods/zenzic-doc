<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->

# Contributing to zenzic-doc

Thank you for contributing to the Zenzic documentation portal.
This guide is written for **Technical Writers and Documentation Engineers** — not Python
programmers. If you want to contribute to the Zenzic engine itself, see the
[core repository](https://github.com/PythonWoods/zenzic/blob/main/CONTRIBUTING.md).

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 24 or newer | [nodejs.org](https://nodejs.org) |
| npm | 10 or newer | bundled with Node.js 24 |
| just | any | `brew install just` / `cargo install just` |
| uv / uvx | any | `pip install uv` or [docs.astral.sh](https://docs.astral.sh/uv/) |

Verify your setup:

```bash
node --version   # must be ≥ 24
npm --version    # must be ≥ 10
just --version
```

---

## First-Time Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/PythonWoods/zenzic-doc.git
cd zenzic-doc
npm ci
```

Install the pre-commit hooks (run once after cloning):

```bash
uvx pre-commit install
```

---

## Running the Site Locally

```bash
just start          # EN only — fastest for editing
just start-it       # IT only — use when editing Italian content
```

The dev server reloads automatically when you save a file.
The language switcher is **inactive in dev mode** — use `just serve` after
`just build` to test locale switching.

---

## File Structure

```
docs/                 ← English source content (all .mdx)
  tutorials/          ← Learning-oriented guides
  how-to/             ← Task-oriented recipes
  reference/          ← Information-oriented reference
  explanation/        ← Conceptual background
  community/          ← Contributing, FAQ, license, brand-kit
i18n/
  it/                 ← Italian translations — mirrors docs/ exactly
blog/                 ← Obsidian Journal engineering posts
src/
  components/         ← React components (Icon, Homepage sections)
  css/custom.css      ← Obsidian visual system (do not edit without CEO approval)
static/               ← Static files served verbatim
```

**Rule:** Every file inside `docs/` must be `.mdx`. Never create `.md` files there.

---

## Writing and Editing Content (Diátaxis)

This portal follows the [Diátaxis framework](https://diataxis.fr). Before writing,
identify which quadrant your contribution belongs to:

| Section | Question it answers | Example |
|---------|---------------------|---------|
| `tutorials/` | "How do I learn X step by step?" | First-time setup walkthrough |
| `how-to/` | "How do I accomplish X?" | How to add badges |
| `reference/` | "What does X do exactly?" | Engine configuration reference |
| `explanation/` | "Why does Zenzic work this way?" | Architecture overview |

Place your file in the correct section and follow the naming convention:
`verb-noun.mdx` for how-to (e.g. `add-badges.mdx`), `noun.mdx` for reference.

### Frontmatter (required)

Every `.mdx` file must begin with:

```yaml
---
sidebar_label: Short Label
---
```

**Do not add `slug:` frontmatter.** URLs must mirror the filesystem path exactly
(Slug Law — see [copilot-instructions.md](.github/copilot-instructions.md)).

### Icons

Use `<Icon name="icon-name" />` anywhere without per-file imports.
Available names are listed in [`src/components/Icon.tsx`](src/components/Icon.tsx).

---

## Managing Translations (i18n)

The Italian locale lives in `i18n/it/docusaurus-plugin-content-docs/current/` and
mirrors `docs/` exactly.

When you **add a new file**:

1. Create the English version in `docs/`.
2. Create the Italian version in the corresponding `i18n/it/` path.
3. The content of the Italian file must be a faithful translation — not a machine translation without review.

When you **rename a file**:

1. Rename in both `docs/` and `i18n/it/`.
2. Run `just build` to confirm no broken links.

To regenerate translation stubs after structural changes:

```bash
npm run write-translations
```

---

## Before Opening a Pull Request

Run the full local gate:

```bash
just verify        # markdownlint + lint:ts + typecheck + build
just preflight     # all pre-commit hooks (mirrors the CI gate exactly)
```

Both must pass with zero errors before you open or update a PR.

### Pre-commit hooks

The repository enforces quality automatically on every `git commit`:

| Hook | What it checks |
|------|----------------|
| trailing-whitespace | No trailing spaces |
| end-of-file-fixer | Files end with a newline |
| check-yaml / check-json / check-toml | Valid structured data |
| TypeScript Typecheck | `tsc --noEmit` must pass |
| Zenzic Sentinel | `zenzic check all` must exit 0 |
| REUSE/SPDX | All files have licence information |

If a hook fails, fix the reported issue and retry the commit.

---

## Adding a Blog Post (Obsidian Journal)

Blog posts live in `blog/` and use the filename format `YYYY-MM-DD-slug.mdx`.

Required frontmatter:

```yaml
---
slug: your-post-slug
title: The Full Title
authors: [pythonwoods]
tags: [engineering, release]
date: 2026-04-22
---
```

The author `pythonwoods` is defined in `blog/authors.yml`.

---

## REUSE / Licence Compliance

Every file in this repository must carry `SPDX-FileCopyrightText` and
`SPDX-License-Identifier` metadata. For most files this is handled automatically
via glob annotations in `REUSE.toml`.

If you add a new file type or directory not covered by existing globs, add an
annotation to `REUSE.toml` before committing. The `reuse lint` hook will catch
any gaps.

Check compliance manually:

```bash
just reuse
```

---

## Code of Conduct

All contributors are expected to follow the
[Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
Report violations to `dev@pythonwoods.dev`.

---

*zenzic-doc is developed by [PythonWoods](https://pythonwoods.dev) · Apache-2.0*
