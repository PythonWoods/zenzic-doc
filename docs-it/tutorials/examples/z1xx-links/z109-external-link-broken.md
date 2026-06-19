---
sidebar_position: 8
title: "Z109 - Link Esterno Rotto"
sidebar_label: "Z109 - Link Esterno Rotto"
description: "Analisi dell'esempio z109-external-link-broken: un URL esterno che non può essere raggiunto o restituisce un errore HTTP, attivando il codice Z109 EXTERNAL_LINK_BROKEN con exit code 1."
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Z109-external-link-broken — Integrità dei Link

**Codice Z:** `Z109 EXTERNAL_LINK_BROKEN` · **Engine:** `standalone` · **Exit:** `1`

<Z109ExternalLinkBroken />

## Il Fixture

Il fixture si trova in `examples/z109-external-link-broken/` nel repository di Zenzic.
Il documento sorgente è `docs/index.md`, che contiene un link esterno che punta a un URL che restituisce un errore HTTP o non esiste:

| Linea | Link | Target | Esiste? |
| :--: | :--- | :----- | :-----: |
| 7    | `[Broken Link](https://this-domain-does-not-exist-at-all-xyz.com)` | `https://this-domain-does-not-exist-at-all-xyz.com` | ✘ |

Il dominio non esiste e non restituisce un codice di stato di successo.
Zenzic rileva Z109 per questo link esterno rotto.

```toml title="examples/z109-external-link-broken/.zenzic.toml"
docs_dir = "docs"
fail_under = 0

[build_context]
engine = "standalone"
```

## Esecuzione dell'Esempio

```bash
# Clona il repository Zenzic — nessuna installazione richiesta
cd examples/z109-external-link-broken
uvx zenzic check links
```

Output atteso:

```text
standalone - 1 file (1 docs, 0 assets) - 0.0s - 65 files/s

docs/index.md:7:2  x  [Z109]  external link 'https://this-domain-does-not-exist-at-all-xyz.com' is broken

     5  │
     6  │  Here is a broken external link:
     7  ❱  - [Broken Link](https://this-domain-does-not-exist-at-all-xyz.com)
        │    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     8  │

────────────────────────────────────────────────────────────────────────────────

Summary:  x 1 errors  ! 0 warnings  i 0 info  - 1 file with findings

FAILED: Hard errors detected. Exit code 1 is mandatory.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try
'zenzic check --help' for options.
[ Suppression Audit: 0/30 (inline: 0, per-file: 0)
```

Exit code: `1`

## Interpretazione dell'Output

Il riscontro `Z109` indica un problema di **EXTERNAL_LINK_BROKEN**.

Questo errore viene generato da Zenzic quando un link esterno fa riferimento a un URL che non può essere risolto, va in timeout o restituisce un errore di stato HTTP (ad esempio, 404, 500). In questo esempio specifico:
- **Tipo di Scansione:** `Link Validator`
- **Gravità:** `Error`
- **Impatto:** I link esterni rotti peggiorano l'esperienza dell'utente e riducono il Documentation Quality Score (DQS) deducendo una penalità di 3.0 punti.

## Risoluzione del Problema

Correggi l'URL esterno di destinazione con un URL valido, oppure rimuovi il link se la risorsa non è più disponibile.

## Vedi Anche

- [z101 — Broken Links](z101-broken-links) — la variante per link interni dell'integrità dei link.
- [Riferimento dei Check — Z109](../../../reference/checks) — specifica completa della regola.
