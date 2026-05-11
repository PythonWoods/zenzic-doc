---
name: "🛡️ Gate Bypass Post-Mortem"
about: "Break-Glass protocol — documented bypass of the `just verify` Final Guard."
title: "[BYPASS] <short-emergency-description>"
labels: ["gate-bypass", "priority:critical"]
assignees: ""
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- markdownlint-disable MD003 MD041 -->

> **Blameless principles**
>
> 1. **Data, not blame.** The failure log is objective evidence; narrative is secondary.
> 2. **System focus.** Root cause identifies *why the pipeline* (Zenzic / yarn build / GHA) failed, never who pushed.
> 3. **Always-on remediation.** Every bypass produces a task that hardens the gate so it is no longer needed next time.

## 🚨 1. Trigger

> What made the immediate bypass necessary? (production hotfix, total CI infra outage, broken upstream Node dependency, ...)

## 📊 2. Gate Failure Log (Evidence)

> Paste the full output of `just verify` (or the failing step) that blocked the push.

```bash
# paste log here
```

## 🔍 3. Root Cause Analysis

- [ ] **False positive** (Zenzic flagged a legitimate documentation link)
- [ ] **Build failure** (yarn build / Docusaurus rendering error)
- [ ] **Flakiness** (network fetch during build, `yarn install` failure)
- [ ] **Infrastructure** (GitHub Actions / local runner offline)
- [ ] **Technical debt** (broken link introduced by upstream content change)
- [ ] **Other** — describe:

## 🛠️ 4. Remediation

> Concrete change to the gate so this bypass becomes unnecessary in the future. Link the follow-up PR/issue here.

## ⏳ 5. Timeline & Scope

- **Bypass commit SHA / branch / PR:**
- **Bypass author:** (informational only — blameless)
- **Bypass time → post-mortem time** (max 24h):
- **Permanent fix merged at:**

---

*Bypass closed only when the permanent fix lands. Until then this issue stays open and is reviewed at every sprint retrospective.*
