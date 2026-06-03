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

## [0.9.1] - 2026-06-02

### Added

- Z-Code Gallery completion (EN + IT) aligned with the full release scope.
- New documentation pages and galleries for `Z107 CIRCULAR_ANCHOR` and `Z104 FILE_NOT_FOUND`.

### Changed

- **Repository-Relative Suppression Config:** Updated `.zenzic.toml` `per_file_ignores` and `directory_policies` to use strictly repository-relative keys (prefixed with `docs/` or `docs/it/`).
- **Strategic Navigation Exemption:** Added `directory_policies` exemption for `docs/how-to/examples/**` under `Z401` to prevent scoring penalties on example directories that intentionally lack index files.
- **Score Badge telemetry:** Stamped quality score badge inline in `README.md` and `README.it.md` to show a passing score of `96/100`.
- Hostile Precision UI standardization applied across release-facing documentation surfaces.
- Terminal documentation debt removed by normalizing legacy snippets and inconsistent command narratives.
- SVG asset governance aligned with ADR-037 compliance requirements.

---

## Historical Releases

- v0.9.x archive: [changelogs/v0.9.md](./changelogs/v0.9.md)
- v0.8.x archive: [changelogs/v0.8.md](./changelogs/v0.8.md)
- v0.7.x archive: [changelogs/v0.7.md](./changelogs/v0.7.md)
