<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to the Zenzic documentation portal (zenzic-doc) are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions track the Zenzic Core release line under the Branch Parity Rule.

---

## [Unreleased]

No changes yet.

---

## [0.9.0] - 2026-05-31

### Added

- Historical archive split for v0.8.x and v0.7.x release notes under `changelogs/`.
- `tutorials/examples.mdx` (EN + IT): full gallery of all 20 `zenzic lab` sandboxes with scenario matrix, exit-code column, and per-scenario prose.
- 15 new gallery sections covering z102, z103, z105, z108, z202, z204, z301, z302, z303, z402, z403, z501, z502, z503, z505.
- `finding-codes.mdx` (EN + IT): Z204 CLI output updated to `POLICY VIOLATION DETECTED` banner.
- `privacy-gate.mdx` (EN + IT): Exit Behavior section and `[core]` table-header fix.

### Changed

- Documentation for local gates now mirrors the real `just verify` recipe sequence (pre-commit hooks → pytest → strict audit → score stamp → freshness gate).
- Developers command matrix updated to remove obsolete preflight terminology.
- v0.8.x narratives archived; v0.9.0 sprint material moved to this entry.

---

## Historical Releases

- v0.8.x archive: [changelogs/v0.8.md](./changelogs/v0.8.md)
- v0.7.x archive: [changelogs/v0.7.md](./changelogs/v0.7.md)
