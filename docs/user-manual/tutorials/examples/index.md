---
sidebar_position: 1
title: "Examples Overview"
sidebar_label: "Overview"
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->


# Z-Code Gallery

This section contains interactive, reproducible examples of every diagnostic code emitted by Zenzic.

## Quick-Run Pattern

To run any of these scenarios locally:

```bash
uvx zenzic lab           # gallery menu
uvx zenzic lab z101      # run the Z101 scenario
uvx zenzic lab all       # run all 20 scenarios
```

## Diagnostic Categories

- [Links (Z1xx)](z1xx-links/z101-broken-links.md)
- [Security (Z2xx)](z2xx-security/z201-credentials.md)
- [References (Z3xx)](z3xx-references/z301-dangling-ref.md)
- [Topology (Z4xx)](z4xx-topology/z401-missing-directory-index.md)
- [Content (Z5xx)](z5xx-content/z501-placeholder.md)
- [Brand (Z6xx)](z6xx-brand/z601-brand-obsolescence.md)

## Feature-to-Example Matrix

| Z-Code | Violation Class | Example |
| :---: | :--- | :--- |
| Z101 | Broken internal links | [z101-broken-links](z1xx-links/z101-broken-links.md) |
| Z102 | Fragment anchor not defined | [z102-anchor-missing](z1xx-links/z102-anchor-missing.md) |
| Z103 | Link to nav-orphaned page | [z103-orphan-link](z1xx-links/z103-orphan-link.md) |
| Z104 | Relative link target missing | [z104-file-not-found](z1xx-links/z104-file-not-found.md) |
| Z105 | Absolute path in link | [z105-absolute-path](z1xx-links/z105-absolute-path.md) |
| Z107 | Self-referential anchor link | [z107-circular-anchor](z1xx-links/z107-circular-anchor.md) |
| Z108 | Empty link text | [z108-empty-link-text](z1xx-links/z108-empty-link-text.md) |
| Z109 | External link is broken | [z109-external-link-broken](z1xx-links/z109-external-link-broken.md) |
| Z201 | Credential / secret detection | [z201-credentials](z2xx-security/z201-credentials.md) |
| Z202 | Docs-root path traversal | [z202-path-traversal](z2xx-security/z202-path-traversal.md) |
| Z204 | Forbidden governance term | [z204-forbidden-term](z2xx-security/z204-forbidden-term.md) |
| Z301 | Dangling reference-style link | [z301-dangling-ref](z3xx-references/z301-dangling-ref.md) |
| Z302 | Unused reference definition | [z302-dead-def](z3xx-references/z302-dead-def.md) |
| Z303 | Duplicate reference definition | [z303-duplicate-def](z3xx-references/z303-duplicate-def.md) |
| Z401 | Missing directory index | [z401-missing-directory-index](z4xx-topology/z401-missing-directory-index.md) |
| Z402 | Markdown page not in nav | [z402-orphan-page](z4xx-topology/z402-orphan-page.md) |
| Z403 | Image missing alt text | [z403-missing-alt](z4xx-topology/z403-missing-alt.md) |
| Z404 | Configured asset missing | [z404-config-asset-missing](z4xx-topology/z404-config-asset-missing.md) |
| Z405 | Unreferenced asset on disk | [z405-unused-assets](z4xx-topology/z405-unused-assets.md) |
| Z406 | Navigation contract violation | [z406-nav-contract](z4xx-topology/z406-nav-contract.md) |
| Z501 | Stub / TODO placeholder content | [z501-placeholder](z5xx-content/z501-placeholder.md) |
| Z502 | Page below minimum word count | [z502-short-content](z5xx-content/z502-short-content.md) |
| Z503 | Python snippet syntax error | [z503-snippet-error](z5xx-content/z503-snippet-error.md) |
| Z505 | Untagged fenced code block | [z505-untagged-code-block](z5xx-content/z505-untagged-code-block.md) |
| Z601 | Deprecated brand name in content | [z601-brand-obsolescence](z6xx-brand/z601-brand-obsolescence.md) |
| Z602 | i18n locale file parity gap | [z602-i18n-parity](z6xx-brand/z602-i18n-parity.md) |

---

## See Also {#see-also}

- [Architecture](../../explanation/architecture.md) — Adapter vs Integration model.
- [Discovery & Exclusion](../../explanation/discovery.md) — How the Layered Exclusion hierarchy works.
- [Checks Reference](../../reference/checks.md) — All available `zenzic check` commands and their findings.
- [CLI Reference — lab](../../reference/cli.md#lab) — Full documentation for `zenzic lab`.
