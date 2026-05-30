<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->

<div align="center">
  <a href="https://zenzic.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="static/assets/brand/svg/zenzic-nav-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="static/assets/brand/svg/zenzic-nav-light.svg">
      <img src="static/assets/brand/svg/zenzic-nav-dark.svg" alt="Zenzic" height="64" />
    </picture>
  </a>
</div>

# zenzic-doc Developer Guide

[![CI](https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml/badge.svg)](https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml)
<!-- zenzic:badge -->
[![zenzic-score](https://img.shields.io/badge/%F0%9F%9B%A1%EF%B8%8F_zenzic--score-99_%2F_100-ef4444?style=flat-square)](https://zenzic.dev/docs/reference/scoring-algorithm)
[![REUSE 3.x compliant](https://img.shields.io/badge/REUSE-3.x%20compliant-0d9488?style=flat-square)](https://reuse.software/)
[![License](https://img.shields.io/badge/license-Apache--2.0-0d9488?style=flat-square)](LICENSE)
[![Documentation: Diátaxis](https://img.shields.io/badge/Docs-Di%C3%A1taxis-brightgreen?style=flat-square)](https://diataxis.fr/)
[![Zenzic](https://img.shields.io/badge/Zenzic-v0.8.0-blue?style=flat-square)](https://github.com/PythonWoods/zenzic)

---

## 📖 Documentation Map

The Zenzic documentation ships as **two separate Docusaurus instances** under one domain.

```text
zenzic.dev/
├── docs/           → User Area    — install, configure, CI/CD, finding codes, community
├── developers/     → Dev Area     — plugins, adapters, ADRs, tech debt ledger
└── blog/           → Release notes & engineering post-mortems
```

Two instances, one Quality Gate. The split is enforced by
[ADR 011](https://zenzic.dev/developers/explanation/adr-cross-instance-allowlist) —
every cross-boundary link is a documented contract, never a silent suppression.

| You are a... | Start here |
| :--- | :--- |
| 👤 User reading the docs | [User Guide](https://zenzic.dev/docs/) |
| 🔧 Contributor / docs author | [Developer Portal](https://zenzic.dev/developers/) · [ADR Vault](https://zenzic.dev/developers/explanation/adr-vault) |
| 🛡️ Security reviewer | [Engineering Ledger](https://zenzic.dev/developers/explanation/engineering-ledger) · [SECURITY.md](SECURITY.md) |

---

## Prerequisites

- Node.js 24 or newer
- npm 10 or newer
- Optional: [just](https://github.com/casey/just) for short, memorable commands

## First Setup

```bash
npm ci          # reproducible install from lockfile
# or
just setup
```

## Start locally

```bash
npm run start
# or
just start
```

For a full gate (TypeScript + build + Zenzic audit) before opening a PR:

```bash
just verify
```

---

## Governance: Directory Policies and Clean Prose

`.zenzic.toml` defines a `[governance.directory_policies]` contract that grants **zero-debt exemptions**
to specific path patterns. Findings on matching paths are annotated `[POLICY_EXEMPTION]` in audit
output and do not count against `suppression_cap`.

```toml
[governance.directory_policies]
"blog/**"                         = ["Z601"]  # historical release posts: codenames are intentional
"explanation/mineral-path.mdx"    = ["Z601"]  # SSOT codename registry (EN)
"it/explanation/mineral-path.mdx" = ["Z601"]  # SSOT codename registry (IT)
```

This removes the need for inline `<!-- zenzic:ignore -->` tags scattered across historical blog posts,
keeping prose clean and the suppression cap reserved for genuine edge cases.

---

<div align="center">
  <a href="https://zenzic.dev">
    <img src="https://raw.githubusercontent.com/PythonWoods/zenzic/main/assets/brand/pythonwoods-logo.svg" alt="PythonWoods" height="50" />
  </a>
  <p>
    <strong>Engineered with precision by PythonWoods in Italy 🇮🇹</strong><br/>
    <em>"Building the Standard for Technical Document Integrity."</em>
  </p>
  <p>
    <a href="https://zenzic.dev"><strong>Documentation</strong></a> &middot;
    <a href="https://github.com/PythonWoods"><strong>GitHub</strong></a> &middot;
    <a href="https://zenzic.dev/blog"><strong>Journal</strong></a>
  </p>
</div>
