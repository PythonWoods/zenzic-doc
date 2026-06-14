<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to the Zenzic documentation portal (zenzic-doc) are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions track the Zenzic Core release line under the Branch Parity Rule.

---

## [Unreleased]

### Added

- **Homepage Phase 2 sections:** Ported the Security Boundary, Quality Score, Governance Gate, and Quickstart panels from the legacy Docusaurus React components to engine-native Jinja2 partials (`overrides/components/homepage/`) with semantic BEM markup and zero Tailwind. Terminal/diagnostic content reflects real `uvx zenzic check all` ground truth.

### Changed

- **Fail-closed PR build gate:** Removed `pull_request.paths` filters from `.github/workflows/ci.yml` so the `Build` check runs on every PR and can safely be required in branch protection.
- **Operational policy docs:** Added explicit branch-protection required-checks guidance (EN + IT) for `zenzic-doc` and `zenzic` in CI/CD integration documentation.

### Fixed

- **Section lead overlap:** Replaced the fragile negative top margin on `.zz-section__lead` with a `:has(+ .zz-section__lead)` rule that tightens the title's bottom margin, eliminating the lead paragraph overlapping the section title when the title wrapped to two lines.

---

## Historical Releases

- v0.10.x archive: [changelogs/v0.10.md](./changelogs/v0.10.md)
- v0.9.x archive: [changelogs/v0.9.md](./changelogs/v0.9.md)
- v0.8.x archive: [changelogs/v0.8.md](./changelogs/v0.8.md)
- v0.7.x archive: [changelogs/v0.7.md](./changelogs/v0.7.md)
