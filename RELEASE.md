# Release — zenzic-doc

## Current Status

> **v0.6.1rc1 "Obsidian Bastion" — Public Launch Active.**

The documentation site is open and publicly deployed.
All embargo conditions have been satisfied.

### Release Conditions (met)

1. **Documentation Parity** — All MDX content hardened, EN + IT mirrors verified.
2. **Sentinel Certification** — `zenzic check all --strict` reports zero errors.
3. **Triple Green Gate** — TypeScript 0 errors, Docusaurus build SUCCESS (EN + IT), Zenzic Sentinel EXIT 0.
4. **Tech Lead Authorisation** — Embargo lifted, public deployment approved.

### Deployment

The `release-docs.yml` workflow is active. Tagged releases (`v*`) trigger
build, archive, and versioned artifact publication.

### Local verification

Validate changes locally before any release:

```bash
just verify
```

This runs markdown lint, TypeScript lint, type checking, and a full production build.

### Indexing

`static/robots.txt` permits full crawler indexing (`Allow: /`).
