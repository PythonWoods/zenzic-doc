<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
# Release Procedure — zenzic-doc

> **[MAINTAINER SOP]** *This document contains the Standard Operating Procedure for Core Maintainers to cut and publish a new release. If you are an end-user looking for new features, please see the [CHANGELOG](./CHANGELOG.md).*

## Release Metadata

| Field    | Value      |
| :------- | :--------- |
| Version  | v0.9.1     |
| Codename | Graphite   |
| Date     | 2026-06-02 |
| Status   | Stable     |

## Release Checklist

Before tagging, every item must be green:

- [ ] `just verify` — exits 0
- [ ] `zenzic check all --strict` — zero findings
- [ ] `just build` — exits 0, no broken-link errors
- [ ] `package.json` version updated to match Zenzic Core release
- [ ] `CHANGELOG.md` — `[Unreleased]` section moved to the new version heading
- [ ] Update SECURITY.md support table (Add new release, demote previous to Critical/EOL).
- [ ] EN/IT bilingual parity — `Z602 I18N_PARITY` clean
- [ ] All blog post tags in `blog/tags.yml` are valid

## Build & Deploy

```bash
# Local verification
just build

# Deploy — triggered automatically by CI on push to main.
# Manual deploy target: CDN (zenzic.dev)
```

Distribution target: **CDN** — [zenzic.dev](https://zenzic.dev).

## Tag & Push

```bash
# 1. Merge the release branch into main via PR first!
# 2. Switch to main and pull latest
git checkout main
git pull origin main

# 3. Tag the main branch and push
git tag v0.9.1
git push origin main --tags
```

- [ ] Create GitHub Release from the tag, using the `## v0.9.1` CHANGELOG section as the release body.

## Changelog Reference

For a detailed list of changes, see [CHANGELOG.md](./CHANGELOG.md).
