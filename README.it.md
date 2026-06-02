<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->

<div align="center">
  <a href="https://zenzic.dev/it">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="static/assets/brand/svg/zenzic-nav-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="static/assets/brand/svg/zenzic-nav-light.svg">
      <img src="static/assets/brand/svg/zenzic-nav-dark.svg" alt="Zenzic" height="64" />
    </picture>
  </a>
</div>

# Guida per Sviluppatori zenzic-doc

[![ci-status](https://img.shields.io/github/actions/workflow/status/PythonWoods/zenzic-doc/ci.yml?branch=main&label=ci&style=flat-square)](https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml)
<!-- zenzic:audit-badge -->
[![zenzic-audit](https://img.shields.io/badge/%F0%9F%9B%A1%EF%B8%8F_zenzic--audit-passing-22c55e?style=flat-square)](https://zenzic.dev/it/docs/reference/scoring-algorithm)
<!-- zenzic:score-badge -->
[![zenzic-score](https://img.shields.io/badge/%F0%9F%9B%A1%EF%B8%8F_zenzic--score-96_%2F_100-f59e0b?style=flat-square)](https://zenzic.dev/it/docs/reference/scoring-algorithm)
[![REUSE 3.x compliant](https://img.shields.io/badge/REUSE-3.x%20compliant-0d9488?style=flat-square)](https://reuse.software/)
[![License](https://img.shields.io/badge/license-Apache--2.0-0d9488?style=flat-square)](LICENSE)
[![Documentation: Diátaxis](https://img.shields.io/badge/Docs-Di%C3%A1taxis-brightgreen?style=flat-square)](https://diataxis.fr/)
[![Zenzic](https://img.shields.io/badge/Zenzic-v0.9.1-blue?style=flat-square)](https://github.com/PythonWoods/zenzic)

---

## 📖 Mappa della Documentazione

La documentazione di Zenzic è distribuita come **un unico sito Docusaurus** sotto lo stesso dominio, con le docs principali, un plugin docs dedicato `developers` e il blog pubblicati nello stesso albero dei contenuti.

```text
zenzic.dev/
├── docs/           → Area Utente  — installazione, configurazione, CI/CD, finding codes, community
├── developers/     → Area Dev     — plugin, adapter, ADR, tech debt ledger
└── blog/           → Release notes e post-mortem ingegneristici
```

Le sezioni docs, developers e blog transitano dalla stessa configurazione del sito.

| Sei un... | Inizia da qui |
| :--- | :--- |
| 👤 Utente che legge la documentazione | [Guida Utente](https://zenzic.dev/it/docs/) |
| 🔧 Contributor / autore docs | [Portale Sviluppatori](https://zenzic.dev/it/developers/) · [ADR Vault](https://zenzic.dev/it/developers/explanation/adr-vault) |
| 🛡️ Security reviewer | [Engineering Ledger](https://zenzic.dev/it/developers/explanation/engineering-ledger) · [SECURITY.md](SECURITY.md) |

---

## Prerequisiti

- Node.js compatibile con la policy di supporto del progetto dichiarata in `package.json`
- Opzionale: [just](https://github.com/casey/just) per comandi brevi e memorizzabili

## Primo Setup

```bash
npm ci          # installazione riproducibile dal lockfile
# oppure
just setup
```

## Avvia in locale

```bash
npm run start
# oppure
just start
```

Per un gate completo (TypeScript + build + audit Zenzic) prima di aprire una PR:

```bash
just verify
```

---

## Governance: Directory Policies e Prosa Pulita

`.zenzic.toml` definisce un contratto `[governance.directory_policies]` che concede **esenzioni zero-debt**
a specifici pattern di percorso. I finding su percorsi corrispondenti vengono annotati `[POLICY_EXEMPTION]`
nell'output di audit e non contano contro il `suppression_cap`.

```toml
[governance.directory_policies]
"blog/**"                         = ["Z601"]  # post storici: i codename di release sono intenzionali
"explanation/mineral-path.mdx"    = ["Z601"]  # Registro SSOT dei codename (EN)
"it/explanation/mineral-path.mdx" = ["Z601"]  # Registro SSOT dei codename (IT)
```

Questo elimina la necessità di tag `<!-- zenzic:ignore -->` inline dispersi tra i post storici del blog,
mantenendo la prosa pulita e il suppression cap riservato ai casi limite genuini.

---

<div align="center">
  <a href="https://zenzic.dev">
    <img src="https://raw.githubusercontent.com/PythonWoods/zenzic/main/assets/brand/pythonwoods-logo.svg" alt="PythonWoods" height="50" />
  </a>
  <p>
    <strong>Progettato con precisione da PythonWoods in Italia 🇮🇹</strong><br/>
    <em>"Costruendo lo Standard per l'Integrità della Documentazione Tecnica."</em>
  </p>
  <p>
    <a href="https://zenzic.dev"><strong>Documentazione</strong></a> &middot;
    <a href="https://github.com/PythonWoods"><strong>GitHub</strong></a> &middot;
    <a href="https://zenzic.dev/blog"><strong>Journal</strong></a>
  </p>
</div>
