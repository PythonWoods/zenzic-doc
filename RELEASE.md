<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
# Release Procedure — zenzic-doc

## Release Metadata

| Field    | Value      |
| :------- | :--------- |
| Version  | v0.7.1     |
| Codename | Basalt     |
| Date     | 2026-05-12 |
| Status   | Stable     |

## Release Checklist

Before tagging, every item must be green:

- [ ] `just verify` — exits 0
- [ ] `zenzic check all --strict` — zero findings
- [ ] `yarn build` — exits 0, no broken-link errors
- [ ] `package.json` version updated to match Zenzic Core release
- [ ] `CHANGELOG.md` — `[Unreleased]` section moved to the new version heading
- [ ] EN/IT bilingual parity — `Z602 I18N_PARITY` clean
- [ ] All blog post tags in `blog/tags.yml` are valid

## Build & Deploy

```bash
# Local verification
yarn build

# Deploy — triggered automatically by CI on push to main.
# Manual deploy target: CDN (zenzic.dev)
```

Distribution target: **CDN** — [zenzic.dev](https://zenzic.dev).

## Tag & Push

```bash
git tag zenzic-doc-v0.7.1
git push origin release/v0.7.1 --tags
```

Create a GitHub Release from the tag. Copy the `## v0.7.1` section from
`CHANGELOG.md` as the release body.

## Changelog Reference

For a detailed list of changes, see [CHANGELOG.md](./CHANGELOG.md).
