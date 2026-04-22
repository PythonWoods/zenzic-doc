<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->

# Security Policy — zenzic-doc

## Scope

This policy covers the **zenzic-doc documentation portal** — the Docusaurus-based site
hosted at [zenzic.dev](https://zenzic.dev).

For vulnerabilities in the **Zenzic engine** (Python, Shield scanner, path-traversal
protection), see the [core security policy](https://github.com/PythonWoods/zenzic/blob/main/SECURITY.md).

---

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report privately via:

- **GitHub Security Advisories** (preferred): [github.com/PythonWoods/zenzic-doc/security/advisories](https://github.com/PythonWoods/zenzic-doc/security/advisories)
- **Email**: `dev@pythonwoods.dev` — subject line: `[SECURITY] zenzic-doc — <brief description>`

Include a clear description of the vulnerability, steps to reproduce, potential impact,
and a suggested fix if available.

We will acknowledge your report within **72 hours** and aim to release a patch within
**14 days** of confirming the issue.

---

## In-Scope Areas

| Area | Description |
|------|-------------|
| **npm dependency CVE** | A known CVE in a runtime dependency (`docusaurus`, `react`, `tailwindcss`, etc.) that affects the built site or the build pipeline |
| **Zenzic Sentinel bypass in docs** | A crafted file in `docs/` or `blog/` that causes `zenzic check all` to pass despite containing a credential pattern (Z201) |
| **Build pipeline code execution** | A crafted MDX file, config, or plugin that causes arbitrary code execution during `npm run build` |
| **Pre-commit hook bypass** | Any method that allows a commit to bypass the Shield, TypeScript, or REUSE pre-commit hooks |
| **Static asset exposure** | A file committed to `static/` that inadvertently exposes credentials or sensitive configuration |

Out-of-scope: content errors, broken links (reported as standard issues), cosmetic
rendering bugs, or issues that only affect local dev mode (`npm run start`).

---

## Dependency Monitoring

npm dependencies are audited automatically:

- `npm-audit.yml` runs on every PR, push to `main`, and weekly — flags high-severity CVEs.
- `dependency-review.yml` flags risky dependency changes introduced by PRs.

To audit locally:

```bash
npm audit --audit-level=high
```

---

## Security Design Notes

The documentation portal is a **static site** — no server-side code executes at runtime.
The attack surface is limited to:

- **Build pipeline** — `npm run build` executes Node.js. Crafted MDX could theoretically
  exploit a Docusaurus or remark plugin vulnerability. Keep dependencies up to date.
- **Pre-commit hooks** — the Zenzic Sentinel scans all source files for credential patterns
  before every commit. The Shield (exit code 2 on Z201) is the last line of defence before
  content reaches the public site.
- **Static assets** — binary files committed to `static/` bypass text-based scanning.
  The `check-added-large-files` hook limits accidental binary commits.

---

## Supported Versions

| Version | Support status |
|---------|----------------|
| `0.7.x` (current) | ✅ All security fixes |
| `0.6.x` | ⚠️ Critical security fixes only |
| `< 0.6` | ❌ End of life — no support |
