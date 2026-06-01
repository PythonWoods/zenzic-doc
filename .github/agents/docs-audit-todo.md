<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Zenzic-Doc Audit TODO Tracker

Last updated: 2026-06-01
Branch: audit/docs--truth-seeker-01
Scope rule: include v0.8.0+ blog and user+developer docs; omit pre-v0.8.0 blog.

## Examined Resources

### Blog (v0.8.0+)
- [x] blog/2026-05-24-engineering-v080-deep-dive.mdx
- [x] blog/2026-05-24-log-v080.mdx
- [x] blog/2026-05-24-v080-namespace-contract.mdx
- [x] blog/2026-05-25-dqs-mathematical-model.mdx
- [x] blog/2026-05-27-terminal-ux-documentation-governance.mdx
- [x] blog/2026-05-28-enterprise-use-cases.mdx
- [x] blog/2026-05-30-log-v090.mdx

### User docs (EN/IT)
- [x] docs/reference/configuration-reference.mdx
- [x] i18n/it/docusaurus-plugin-content-docs/current/reference/configuration-reference.mdx

### Developer docs (EN/IT)
- [x] developers/how-to/implement-adapter.mdx
- [x] i18n/it/docusaurus-plugin-content-docs-developers/current/how-to/implement-adapter.mdx

### Core evidence already cross-checked
- [x] ../zenzic/src/zenzic/models/config.py
- [x] ../zenzic/src/zenzic/core/adapters/_factory.py
- [x] ../zenzic/src/zenzic/core/adapters/_base.py
- [x] ../zenzic/src/zenzic/cli/_check.py
- [x] ../zenzic/src/zenzic/cli/_governance.py
- [x] ../zenzic/src/zenzic/core/scanner.py
- [x] ../zenzic/changelogs/v0.8.md
- [x] ../zenzic/CHANGELOG.md

## To Examine Next (proposed micro-batches)

## Sprint Scope (active)
- [x] Batch U2 (User docs EN/IT)
- [ ] Batch D2 (Developer docs EN/IT)
- [ ] Optional backlog (user docs)

### Batch U2 (User docs EN/IT)
- [x] docs/reference/scoring-algorithm.mdx
- [x] i18n/it/docusaurus-plugin-content-docs/current/reference/scoring-algorithm.mdx
- [x] docs/reference/checks.mdx
- [x] i18n/it/docusaurus-plugin-content-docs/current/reference/checks.mdx

### Batch D2 (Developer docs EN/IT)
- [ ] developers/explanation/architecture.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/explanation/architecture.mdx
- [ ] developers/explanation/adr-native-telemetry.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs-developers/current/explanation/adr-native-telemetry.mdx

### Optional backlog (user docs)
- [ ] docs/reference/finding-codes.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/reference/finding-codes.mdx
- [ ] docs/reference/suppression-policy.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/reference/suppression-policy.mdx

## Notes
- Historical version references are allowed and should be preserved where factual.
- External-link timeout failures are treated as flaky unless reproducible and specific.
- No PR opening in this phase; direct iterative commits on current branch.

## Current Batch State
- U2 status: remediated locally; final re-audit still reports 2 residual fixes in checks EN/IT (Z203 naming in prose + IT admonition delimiter parity).

## Further Batches (queued)

### Batch D3 (Developer docs EN/IT)
- [ ] developers/explanation/adr-vault.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs-developers/current/explanation/adr-vault.mdx
- [ ] developers/explanation/adr-path-sovereignty.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs-developers/current/explanation/adr-path-sovereignty.mdx

### Batch U3 (User docs EN/IT)
- [ ] docs/reference/cli.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/reference/cli.mdx
- [ ] docs/how-to/configure-ci-cd.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/how-to/configure-ci-cd.mdx

### Batch U4 (User docs EN/IT)
- [ ] docs/reference/advanced-features.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/reference/advanced-features.mdx
- [ ] docs/tutorials/examples.mdx
- [ ] i18n/it/docusaurus-plugin-content-docs/current/tutorials/examples.mdx
