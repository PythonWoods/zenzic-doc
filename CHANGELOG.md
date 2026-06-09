<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to the Zenzic documentation portal (zenzic-doc) are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions track the Zenzic Core release line under the Branch Parity Rule.

---

## [Unreleased]

### Changed

- **Fail-closed PR build gate:** Removed `pull_request.paths` filters from `.github/workflows/ci.yml` so the `Build` check runs on every PR and can safely be required in branch protection.
- **Operational policy docs:** Added explicit branch-protection required-checks guidance (EN + IT) for `zenzic-doc` and `zenzic` in CI/CD integration documentation.

---

## [0.10.0] - 2026-06-06

### Added

- **Native CI Integration and Filtering Docs:** Documented the new `--ci` shorthand and `--format github-annotations` in CLI Reference and CI/CD integration guides (EN + IT). Documented the `--only` flag for targeted rule filtering.
- **Blog Post:** Added new DevRel payload "Zenzic v0.10.0: Native GitHub Annotations and Progressive Adoption" demonstrating the killer features of v0.10.0.

### Changed

- **ADR-037 Install Guide Refinement:** Removed the hardcoded version tag (`@v0.10.0`) from the Ephemeral GitHub execution instructions (`uvx --from git+...`) to decouple the command from temporal releases and point to the default branch.

---

## Historical Releases

- v0.9.x archive: [changelogs/v0.9.md](./changelogs/v0.9.md)
- v0.8.x archive: [changelogs/v0.8.md](./changelogs/v0.8.md)
- v0.7.x archive: [changelogs/v0.7.md](./changelogs/v0.7.md)
