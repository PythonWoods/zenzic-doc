<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to the Zenzic documentation portal (zenzic-doc) are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions track the Zenzic Core release line under the Branch Parity Rule.

---

## [0.14.0] - Unreleased

### Removed

- **I18N Eradication:** Deprecated ADR-020 (Mirror Law) and entirely removed Italian bilingual support (`docs-it/`, `zensical.it.toml`). Zenzic is now a strictly English-Only ecosystem to streamline maintenance and CI/CD performance.
- **Dark Mode Enforcement:** Removed Light Mode support from the landing page. Enforced a unified Dark-Mode (`slate`) aesthetic. The theme toggle has been eliminated.
- **Code Parity Validator Removed:** `scripts/verify_codes_parity.py` and its nox session `verify-codes-parity` deleted. The Z602 I18N_PARITY scanner has been eradicated from Zenzic core; the parity validator is no longer relevant. The nox session docstring updated accordingly.

## [0.13.2] - 2026-06-20

### Changed

- **SEO Overhaul:** Migrated `mkdocs-redirects` to edge-level Cloudflare `_redirects` for strict 301 compliance.
- **Reference:** Documented that standard infrastructure files (`robots.txt`, `_redirects`, `CNAME`, `sitemap.xml`) are natively exempt from Z405 (Unused Assets).

---

## [0.13.0] - 2026-06-19

### Added

- **D.I.A. Compliance:** Added the "TOML Root Key Law" warning block in English and Italian documentation, explaining configuration boundaries and root key swallowing to prevent silent failures.

### Changed

- Full documentation migration to Zensical/MkDocs.

### Fixed

- REUSE compliance updates and Z-Code parity fixes across the bilingual documentation.

---

## Historical Releases

- v0.12.x archive: [changelogs/v0.12.md](./changelogs/v0.12.md)
- v0.11.x archive: [changelogs/v0.11.md](./changelogs/v0.11.md)
- v0.10.x archive: [changelogs/v0.10.md](./changelogs/v0.10.md)
- v0.9.x archive: [changelogs/v0.9.md](./changelogs/v0.9.md)
- v0.8.x archive: [changelogs/v0.8.md](./changelogs/v0.8.md)
- v0.7.x archive: [changelogs/v0.7.md](./changelogs/v0.7.md)
