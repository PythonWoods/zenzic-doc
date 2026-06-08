<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD041 -->

## Description

<!-- Describe your changes in detail. Link the issue this PR resolves. -->

Closes #

## Type of change

- [ ] Bug fix (broken link, rendering error, build failure)
- [ ] New content (tutorial, how-to, blog post, ADR)
- [ ] Translation (EN ↔ IT)
- [ ] Structural / navigation change
- [ ] Dependency update (npm, Docusaurus version)

---

## Documentation Quality — mandatory checklist

Every PR touching `docs/`, `blog/`, `src/`, or `i18n/` must satisfy all that apply.

### 1. Accuracy & Link Validity

- [ ] All new internal links use relative paths and have been verified locally
  (`just check` or `just build` must pass without broken-link errors).
- [ ] External links point to canonical, stable URLs — not redirects or preview deployments.
- [ ] Code samples have been tested against the referenced Zenzic version.

### 2. EN / IT Parity

- [ ] The English source file(s) in `docs/`, `blog/`, or `src/` have been updated (or are unchanged).
- [ ] The corresponding Italian file(s) in `i18n/it/` have been updated — **or** I have left a
  comment below explaining why parity is deferred and which Core Maintainer will handle the translation.

> **Graceful Degradation clause** — If you don't speak Italian, update the English files and
> leave a comment here. A Core Maintainer will handle the Italian translation.

### 3. Build & Zenzic Self-Check

- [ ] `just build` completes without errors locally.
- [ ] `just check` (Zenzic self-audit of this documentation portal) passes without new findings.
- [ ] REUSE/SPDX headers are present on every new file.

### 4. D.I.A. (Documentation Impact Analysis)

- [ ] **D.I.A. (Documentation Impact Analysis):** I have evaluated the impact of this code change on the public documentation.
  - *If impacted:* [ ] I have opened a PR on `zenzic-doc` OR [ ] I request maintainer assistance to update the docs.

---

## Enterprise governance compliance

- [ ] This PR addresses an approved Issue #___ and complies with the **Issue-First Policy**.
- [ ] Every commit in this PR is **cryptographically signed** (GPG/SSH/S/MIME) and shows as "Verified" on GitHub.
- [ ] Every commit has a valid **Developer Certificate of Origin (DCO)** sign-off (`Signed-off-by:` via `git commit -s`).
- [ ] I have verified and can architecturally justify every single line of code proposed in this PR (**No AI Slop**).
- [ ] All commit messages comply with the **Conventional Commits** specification.

---

## Notes for reviewers

<!-- Anything unusual about this PR that reviewers should know? -->
