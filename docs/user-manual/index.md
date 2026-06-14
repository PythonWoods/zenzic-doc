---
sidebar_position: 0
sidebar_label: "Overview"
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Your Documentation, Fully Protected

**Zenzic detects broken links, leaked credentials, and orphan pages before they reach production. No configuration required to start. No engine-specific build integration required.**

---

## Experience it now — zero install required

```bash
uvx zenzic lab
```

`zenzic lab` launches an interactive showcase of every scanner in action: credential detection,
broken links, orphan pages, path traversal guard enforcement. Run it against bundled
fixtures and see the results in real time.

**Run a full audit quickly — no installation, no setup:**

```bash
uvx zenzic check all .
```

→ **[Learn more in the Interactive Lab tutorial](tutorials/first-audit.md#step-2-credential-scanner)**

---

## Two Instruments: Check and Score

**`zenzic check all`** is a binary gate. It emits a deterministic exit code based on findings detected within the analyzed scope. Exit 0 means no findings were detected.

```terminal title="zenzic check all"
standalone · 20 files · 0.4 s
✔ All checks passed — exit 0
```

**`zenzic score`** computes a 0–100 quality score using a weighted penalty model across four categories: Structural Integrity (30%), Navigation (25%), Brand & Assets (25%), Content Excellence (20%). A `100/100` means zero penalized findings within the analyzed scope. Excluded content is not evaluated. A score below `100/100` is a passing audit if it meets the configured `fail_under` threshold.

One absolute rule: any Z2xx finding collapses the score to `0/100` unconditionally, regardless of `fail_under`.

→ **[Full scoring model](explanation/scoring-system.md)**

---

## Deterministic Failure Analysis: Before vs After Zenzic

| Scenario                | Without Zenzic (Traditional Linter)                                                                 | With Zenzic                                                                            |
|-------------------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| **Broken Link**         | CI fails with generic error, no file/line/cause.                                                    | Zenzic finding: file, line, code (e.g. Z404), actionable fix, deterministic exit code.        |
| **Virtual Route (e.g. `/blog/tags/python/`)** | False positive (404): dynamic routes not resolved, forced to use ignore/regex.                        | Deterministic resolution via VRM: virtual route mapped to `source_files` without Node.js. |
| **Credential Leak**     | Linter may miss secrets in YAML/code blocks; no masking; incident may reach git history.            | Credential scanner: scans all content, masks secrets, halts pipeline (exitCode=2, Z201), never prints full secret. |
| **Exit Codes**          | Non-standard, ambiguous, or missing.                                                                | Tiered: Z1xx (link integrity), Z2xx (security), Z4xx (structure), Z6xx (governance).                   |

**Example: Zenzic terminal output for a Virtual Route finding**

```terminal title="zenzic check all"
✘[Z111]docs/blog/tags/python/: Virtual route not mapped to any source file
FAILED — exit 1
```

This is not a lint check. It is a **non-negotiable security gate**.

→ **[How to act when credential scanner blocks a secret](how-to/configure-ci-cd.md#credential-recovery)**

---

## Four Entry Points

| | |
| :--- | :--- |
| **[Tutorials →](tutorials/first-audit.md)** | From zero to a passing audit in 3 minutes. |
| **[How-to →](how-to/configure-ci-cd.md)** | Integrate with GitHub Actions for automated CI/CD checks. |
| **[Reference →](reference/cli.md)** | Every flag, every `Zxxx` code, every option. |
| **[Explanation →](explanation/scoring-system.md)** | How findings reduce the 100-point baseline and how `fail_under` sets your CI threshold. |

---

## Native GitHub Integration

```yaml title=".github/workflows/zenzic.yml"

- uses: PythonWoods/zenzic-action@<version>

  with:
    format: sarif
    upload-sarif: "true"
```

Findings can appear as **inline Pull Request annotations** and in the **Security tab** —
no log parsing, no custom scripts, no post-processing. The official
[`PythonWoods/zenzic-action`](https://github.com/PythonWoods/zenzic-action) handles
installation, execution, and SARIF upload in a single workflow step.

CI verification in this repository uses an Ubuntu runner.

---

*"The Code is Law. The Documentation is Truth. Zenzic is vigilant."*
