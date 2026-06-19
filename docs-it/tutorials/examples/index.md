---
sidebar_position: 1
title: "Panoramica degli Esempi"
sidebar_label: "Panoramica"
---
<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->




# Galleria Z-Code

Questa sezione contiene esempi interattivi e riproducibili di ogni codice diagnostico emesso da Zenzic.

## Pattern di Esecuzione Rapida

Per eseguire uno qualsiasi di questi scenari localmente:

```bash
uvx zenzic lab           # menu della galleria
uvx zenzic lab z101      # esegui lo scenario Z101
uvx zenzic lab all       # esegui tutti e 20 gli scenari
```

## Categorie Diagnostiche

<DocCardList />

## Matrice Feature-Esempio

| Z-Code | Classe di Violazione | Esempio |
| :---: | :--- | :--- |
| Z101 | Link interni rotti | [z101-broken-links](z1xx-links/z101-broken-links) |
| Z102 | Ancora frammento non definita | [z102-anchor-missing](z1xx-links/z102-anchor-missing) |
| Z103 | Link a pagina orfana dalla nav | [z103-orphan-link](z1xx-links/z103-orphan-link) |
| Z104 | Target link relativo mancante | [z104-file-not-found](z1xx-links/z104-file-not-found) |
| Z105 | Percorso assoluto nel link | [z105-absolute-path](z1xx-links/z105-absolute-path) |
| Z107 | Link di ancora auto-referenziale | [z107-circular-anchor](z1xx-links/z107-circular-anchor) |
| Z108 | Testo link vuoto | [z108-empty-link-text](z1xx-links/z108-empty-link-text) |
| Z109 | Link esterno rotto | [z109-external-link-broken](z1xx-links/z109-external-link-broken) |
| Z201 | Rilevamento credenziali / segreti | [z201-credentials](z2xx-security/z201-credentials) |
| Z202 | Path traversal fuori dalla docs-root | [z202-path-traversal](z2xx-security/z202-path-traversal) |
| Z204 | Termine governance proibito | [z204-forbidden-term](z2xx-security/z204-forbidden-term) |
| Z301 | Riferimento link-style pendente | [z301-dangling-ref](z3xx-references/z301-dangling-ref) |
| Z302 | Definizione riferimento inutilizzata | [z302-dead-def](z3xx-references/z302-dead-def) |
| Z303 | Definizione riferimento duplicata | [z303-duplicate-def](z3xx-references/z303-duplicate-def) |
| Z401 | Indice directory mancante | [z401-missing-directory-index](z4xx-topology/z401-missing-directory-index) |
| Z402 | Pagina Markdown non nella nav | [z402-orphan-page](z4xx-topology/z402-orphan-page) |
| Z403 | Immagine senza alt text | [z403-missing-alt](z4xx-topology/z403-missing-alt) |
| Z404 | Asset di configurazione mancante | [z404-config-asset-missing](z4xx-topology/z404-config-asset-missing) |
| Z405 | Asset su disco non referenziato | [z405-unused-assets](z4xx-topology/z405-unused-assets) |
| Z406 | Violazione del contratto nav | [z406-nav-contract](z4xx-topology/z406-nav-contract) |
| Z501 | Contenuto stub / placeholder TODO | [z501-placeholder](z5xx-content/z501-placeholder) |
| Z502 | Pagina sotto il conteggio minimo di parole | [z502-short-content](z5xx-content/z502-short-content) |
| Z503 | Errore di sintassi snippet Python | [z503-snippet-error](z5xx-content/z503-snippet-error) |
| Z505 | Blocco codice delimitato senza tag | [z505-untagged-code-block](z5xx-content/z505-untagged-code-block) |
| Z601 | Nome brand deprecato nel contenuto | [z601-brand-obsolescence](z6xx-brand/z601-brand-obsolescence) |
| Z602 | Gap di parità file locale i18n | [z602-i18n-parity](z6xx-brand/z602-i18n-parity) |

---

## Vedi Anche {#see-also}

- [Architettura](../../explanation/architecture) — Modello Adapter vs Integration.
- [Discovery & Esclusione](../../explanation/discovery) — Come funziona la gerarchia di esclusione a livelli.
- [Riferimento Check](../../reference/checks) — Tutti i comandi `zenzic check` disponibili e i loro finding.
- [Riferimento CLI — lab](../../reference/cli#lab) — Documentazione completa di `zenzic lab`.
