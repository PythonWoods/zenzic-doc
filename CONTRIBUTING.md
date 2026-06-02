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
| Node.js | 20 or newer (24 recommended) | [nodejs.org](https://nodejs.org) |
| npm | 10 or newer | bundled with Node.js |
| just | any | `brew install just` / `cargo install just` |
| uv / uvx | any | `pip install uv` or [docs.astral.sh](https://docs.astral.sh/uv/) |

Verify your setup:

```bash
node --version   # must be ≥ 20 (≥ 24 recommended)
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
uvx pre-commit install               # commit-stage: hygiene + typecheck + zenzic
uvx pre-commit install -t pre-push   # pre-push: 🛡️ Final Guard runs `just verify`
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
(Slug Law — see [Governance docs](developers/governance/index.mdx)).

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

## 🚀 Cross-Repo Validation (Branch Parity Rule)

To ensure consistency between the core engine (**zenzic**) and the documentation (**zenzic-doc**), our CI system enforces the **Rule of Branch Parity**.

### 🔍 How it works
1. **Local Development**: Core resolution follows deterministic precedence: `ZENZIC_CORE_PATH` → `./_zenzic_core` → `../zenzic`. You are responsible for keeping local branches aligned.
2. **In CI (GitHub Actions)**: The documentation pipeline attempts to clone the core repository by looking for a branch with the **exact same name** as the one being built in the doc repo.
3. **Fallback**: If the mirrored branch is not found in the core repo, the CI will automatically fall back to the `main` branch.

### 🛠️ Operational Summary for Contributors

| Scenario | Required Action | CI Behavior |
| :--- | :--- | :--- |
| **Documentation Fix** | Push only to `zenzic-doc` | Validates against core `main`. |
| **New Feature (Synchronized)** | Push to `zenzic` **BEFORE** pushing to `zenzic-doc` | Validates against the exact feature code. |
| **Naming Convention** | Use identical branch names in both repos | Guarantees perfect "Dogfooding". |

> **Note**: Never push documentation changes that depend on core features not yet present on the remote server (even if on different branches), otherwise the build will fail due to misalignment.

### 💻 VS Code Multi-Root Workspace Configuration

Because the repositories are tightly coupled, we recommend managing them through a single **Multi-Root Workspace** in VS Code.

1. Clone both repositories into the same parent directory.
2. Open VS Code and go to **File > Save Workspace As...**, saving it as `zenzic.code-workspace` in the parent directory.
3. Edit the newly created file like this:

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

This allows you to perform global searches across all repositories simultaneously and manage branches from the Source Control panel in a single, unified interface.

---

## 404 Emergency Protocol (Sovereign Override)

If Zenzic fails on a pre-launch external URL (HTTP 404), do not disable external checks globally.
Apply a surgical runtime exclusion with `ZENZIC_EXTRA_ARGS`:

```bash
ZENZIC_EXTRA_ARGS="--exclude-url https://example.com/prelaunch" just verify
```

Rules:

1. Exclude only the exact pre-launch URL(s), never broad domains unless explicitly approved.
2. Use `ZENZIC_EXTRA_ARGS` for **transient** pre-launch URLs only. For **permanent** structural
   constraints (e.g. rate-limited infrastructure, consistently timing-out third-party services),
   use `excluded_external_urls` in `.zenzic.toml` with an inline comment explaining the rationale.
3. Remove each exclusion as soon as the URL is publicly reachable.

For full architecture and lifecycle policy, see
[Sovereign Override Guide](developers/how-to/sovereign-override-404-shield.mdx).

---

## Before Opening a Pull Request

Run the full local gate:

```bash
just verify        # lint-all + build + codes parity + strict audit + score stamp + freshness gate
```

This must pass with zero errors before you open or update a PR.

- Execute a D.I.A. (Documentation Impact Analysis). If your PR alters CLI behavior or API contracts, explicitly state it in your PR description. You are encouraged to open a matching PR on zenzic-doc, but if you cannot, the maintainers will handle the documentation sync before release.

### Pre-commit hooks

The repository enforces quality automatically on every `git commit`:

| Hook | What it checks |
|------|----------------|
| trailing-whitespace | No trailing spaces |
| end-of-file-fixer | Files end with a newline |
| check-yaml / check-json / check-toml | Valid structured data |
| TypeScript Typecheck | `tsc --noEmit` must pass |
| Zenzic | `zenzic check all` must exit 0 |
| REUSE/SPDX | All files have licence information |

If a hook fails, fix the reported issue and retry the commit.

### Immutable Pre-Commit Hooks (ADR-089) — Maintainer Only

All `rev:` keys in `.pre-commit-config.yaml` must point to a **40-char commit
hash**, never to a semantic tag (`v1.2.3`). Git tags are mutable: an upstream
maintainer (or an attacker) can move a tag silently, poisoning the local
Gate 2 without any diff in this repository.

This is an **internal CI policy for the zenzic-doc project**, not a public
Zenzic linter rule. Enforcement: `just check-pinning` (dependency of
`just verify`); violations raise `[ADR-089] FATAL` at pre-push.

The local exposure window is smaller than the GHA one because `pre-commit`
freezes hook repos in `~/.cache/pre-commit/` until the user runs `autoupdate`
or `clean`; GitHub Actions instead re-resolves the ref on every run. Pinning
is still mandatory locally for new-clone safety and parity with the remote
ADR-089 enforcement.

**Updating pinned hooks.** Never run plain `pre-commit autoupdate` — it
rewrites SHAs back to mutable tags. Always use:

```bash
uvx pre-commit autoupdate --freeze
```

This preserves the `# vX.Y.Z` annotation comment. Commit the diff and
re-verify with `just check-pinning`.

---

## Adding a Blog Post

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

## REUSE Compliance & Copyright

This repository is REUSE-compliant and enforces SPDX metadata as a merge gate.

- Pull requests that add new files or significantly modify existing files must
  declare contributor authorship with `SPDX-FileCopyrightText`.
- Trivial edits (typos, punctuation, formatting-only changes) are exempt from
  the additional contributor line.
- PRs that violate this policy are rejected by governance checks (Exit 1).

Legal governance model:

- No CLA (Contributor License Agreement) with rights transfer is required.
- Contribution provenance is governed by DCO + REUSE/SPDX.
- Contributors retain copyright on significant changes.

---

## Code of Conduct

All contributors are expected to follow the
[Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
Report violations to `dev@pythonwoods.dev`.

---

*zenzic-doc is developed by [PythonWoods](https://pythonwoods.dev) · Apache-2.0*
