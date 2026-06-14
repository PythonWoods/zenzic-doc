---
icon: lucide/circle-check
sidebar_label: "Local Quality Gate"
description: "Close the gate before the build. Integrate Zenzic into your local workflow so documentation errors never reach CI."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->



# Local Quality Gate

> *Don't debug the build output. Fix the source before the build starts.*

A documentation error discovered in CI means a failed pipeline, a context switch, and a
wasted build minute. Discovered **before** the build, it is just a one-line fix.

The Quality Gate pattern closes the gap: Zenzic runs as a mandatory pre-step, blocking
the build command if the source is not clean. No findings — no gate — no wasted cycle.

---

## The Principle

The Quality Gate enforces a simple invariant:

```text
zenzic check all [PATH] --strict  →  success  →  your build tool
                                  →  failure  →  build blocked
```

The gate fires **locally** — before you push, before CI sees the branch. It is the same
analysis that runs in your GitHub Actions workflow, applied at the moment when fixing
it is cheapest.

---

## Recipes by Ecosystem

Pick the recipe that matches your build toolchain.

=== "Docusaurus (npm scripts)"



    Docusaurus projects use `npm run build`. Gate it in `package.json`:

    ```json title="package.json"
    {
      "scripts": {
        "zenzic": "uvx zenzic check all . --strict",
        "build": "npm run zenzic && docusaurus build"
      }
    }
    ```

    `npm run build` now runs Zenzic first. If any finding is detected, `docusaurus build`
    never starts. Your existing CI command (`npm run build`) gains the gate automatically —
    no changes to the workflow YAML needed.

    ::: tip "Pinned version in production"
    Replace `uvx zenzic` with `uvx "zenzic==<version>"` for deterministic CI. On the first
    warm install, uv caches the wheel — subsequent runs are near-instant.
    :::



=== "MkDocs (justfile / Makefile)"



    MkDocs projects typically use `mkdocs build` or a `justfile`. Gate the build recipe:

    ```just title="justfile"
    # Quality Gate — Zenzic must pass before MkDocs builds
    build:
      uvx zenzic check all . --strict
        mkdocs build --strict
    ```

    Or if you prefer a bare shell recipe without uv:

    ```just title="justfile"
    build:
        uvx zenzic check all . --strict
        mkdocs build --strict
    ```

    For `Makefile` users:

    ```makefile title="Makefile"
    build:
    	uvx zenzic check all . --strict
    	mkdocs build --strict
    ```

    Both commands in the recipe run sequentially. A non-zero exit from `zenzic check all`
    aborts the recipe before `mkdocs build` is reached.



=== "Zensical (shell / justfile)"



    Zensical projects can gate the build with a simple command chain:

    ```bash title="build.sh"
    #!/usr/bin/env bash
    set -euo pipefail

    uvx zenzic check all . --strict
    zensical build
    ```

    Or via a `justfile` recipe:

    ```just title="justfile"
    # Quality Gate — documentation must be clean before Zensical renders
    build:
        uvx zenzic check all . --strict
        zensical build
    ```

    `set -euo pipefail` in the shell script ensures that a non-zero exit from
    `zenzic check all` propagates immediately — `zensical build` is never reached.



=== "Standalone (any tool)"



    For projects without a build engine — static site generators, documentation shipped
    as Markdown, or custom pipelines — the pattern is always the same:

    ```bash
    uvx zenzic check all . --strict && your_build_command
    ```

    The `&&` operator short-circuits: if Zenzic exits non-zero, `your_build_command`
    is never executed. Combine with any `Makefile`, `justfile`, `package.json` script,
    or shell script entry point.



---

## Why Gate Locally, Not Only in CI

| Discovery point | Cost to fix |
| :--- | :--- |
| **Before the build** (local gate) | Seconds — the editor is still open |
| **CI pipeline** | Minutes — push, wait, read log, fix, re-push |
| **Production deploy** | Hours — rollback, triage, hotfix |

The Quality Gate shifts discovery to the cheapest possible moment. By the time CI
runs, the documentation is already clean — CI becomes a **confirmation** rather than
a **detector**.

---

## Exit Code Reference

| Code | Meaning | Gate behaviour |
| :--- | :--- | :--- |
| `0` | All checks passed | Build proceeds |
| `1` | Quality findings (links, orphans, placeholders) | Build blocked by default; add `--no-fail-under` to allow |
| `2` | credential scanner finding — credential detected | Always blocked. Never suppressible. |
| `3` | Path traversal guard — system path traversal | Always blocked. Never suppressible. |

Exit codes 2 and 3 are unconditional stops. No flag or configuration can suppress a
security incident.

---

## Pre-Launch and Staging Environments {#pre-launch}

External links to sites that are not yet public — documentation domains, GitHub release
tags, staging URLs — return HTTP 404 until the deploy completes. The Quality Gate
blocks the build on these, which is correct behaviour: a broken external link is a
real finding.

When you are **deliberately building documentation before the target site goes live**,
instruct the gate to skip external checks for that run using `ZENZIC_EXTRA_ARGS`:

```bash
# Skip all external link checks — pre-launch or network-restricted environments
ZENZIC_EXTRA_ARGS="--no-external" just build

# Exclude one specific pre-launch domain, keep all other external checks active
ZENZIC_EXTRA_ARGS="--exclude-url https://zenzic.dev/" just build
```

`ZENZIC_EXTRA_ARGS` is an environment variable read by both `just verify` and
`just build`. It injects flags into the Zenzic invocation without modifying
`.zenzic.toml` or the justfile — the source of truth for configuration remains
unchanged. Unset, it expands to empty and the gate behaves at full strictness.

::: warning "Explicit exception, not a new default"
`ZENZIC_EXTRA_ARGS` must be set explicitly on each invocation. It is not persisted
in any configuration file. Run `just build` without the variable to confirm that the
gate still blocks on the broken links:

```bash
just build
# ✘ [EXTERNAL_LINK] blog/example.mdx:12: 'https://zenzic.dev/blog/' returned HTTP 404
# FAILED: Hard errors detected. Exit code 1 is mandatory.
```

The protection is active by default. The variable is an operator exception, not a
configuration change.
:::

```terminal title="zenzic check all"
✘ [Z301] DANGLING_REF — exit 1
```

The finding above is what a pre-launch external link looks like. It is accurate — the
URL does not resolve. `ZENZIC_EXTRA_ARGS="--no-external"` suppresses it for one build
invocation only.

---

## Related

- [CI/CD Integration](configure-ci-cd.md) — GitHub Actions workflows that enforce the

  same gate in your pipeline

- [Scoring System](../explanation/scoring-system.md) — how Zenzic calculates the quality

  score that the Quality Gate defends

- [Exit Codes Reference](../reference/cli.md#exit-codes) — full exit code semantics
