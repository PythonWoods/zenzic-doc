<!--
SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
SPDX-License-Identifier: Apache-2.0
-->
<!-- markdownlint-disable MD033 MD041 MD060 -->

<p align="center">
  <a href="https://zenzic.dev/it">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="static/assets/brand/svg/zenzic-wordmark-doc-dark.svg">
      <img alt="Zenzic / doc" src="static/assets/brand/svg/zenzic-wordmark-doc.svg" width="350">
    </picture>
  </a>
</p>

<p align="center">Il portale di documentazione Docusaurus ufficiale per Zenzic — costruito su Diátaxis, distribuito come sito unico con docs utente, docs sviluppatore e blog.</p>

<p align="center">
  <a href="https://github.com/PythonWoods/zenzic-doc/actions/workflows/ci.yml"><img alt="ci-status" src="https://img.shields.io/github/actions/workflow/status/PythonWoods/zenzic-doc/ci.yml?branch=main&label=ci&style=flat-square"></a>
  <!-- zenzic:audit-badge -->
  <img src="https://img.shields.io/badge/%F0%9F%9B%A1%EF%B8%8F_zenzic--audit-passing-22c55e?style=flat-square" alt="zenzic-audit">
  <!-- zenzic:score-badge -->
  <img src="https://img.shields.io/badge/%F0%9F%9B%A1%EF%B8%8F_zenzic--score-96_%2F_100-f59e0b?style=flat-square" alt="zenzic-score">
  <a href="https://reuse.software/"><img alt="REUSE 3.x compliant" src="https://img.shields.io/badge/REUSE-3.x%20compliant-0d9488?style=flat-square"></a>
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/license-Apache--2.0-0d9488?style=flat-square"></a>
  <a href="https://diataxis.fr/"><img alt="Documentation: Diátaxis" src="https://img.shields.io/badge/Docs-Di%C3%A1taxis-brightgreen?style=flat-square"></a>
  <a href="https://github.com/PythonWoods/zenzic"><img alt="Zenzic" src="https://img.shields.io/badge/Zenzic-v0.10.4-blue?style=flat-square"></a>
</p>

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
