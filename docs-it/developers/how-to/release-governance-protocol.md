---

description: "Runbook operativo per sviluppatori: 4 gate, governance del brand e contratti di namespace."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Protocollo Operativo di Rilascio e Governance

Usa questa guida come contratto operativo predefinito per ogni contributo nei
repository Zenzic.

Questa è la procedura di esecuzione. Gli ADR restano il livello storico di
motivazione architetturale.

La policy Release A è enforcement di release: nessun debito di soppressione
oltre il perimetro CAP.

---

## 1) Gerarchia dei Quattro Gate

Una modifica è Ready for Release solo quando tutti e quattro i gate sono verdi.

1. Gate IDE

Correggere lint e type issue durante la fase di authoring.

2. Gate Pre-commit

Il commit viene bloccato in caso di violazioni stile, parsing o coerenza locale.

3. Gate Pre-push

Il push viene bloccato dalla verifica completa di progetto, inclusa parità i18n e
controlli di sicurezza path/link.

4. Gate CI/CD

La stessa verifica gira in infrastruttura condivisa e deve replicare l'esito locale.

Regola operativa: non aggirare un gate fallito abbassando i controlli. Correggere
la causa radice o applicare un'eccezione stretta, motivata e tracciabile.

---

## 2) Policy Brand e Obsolescenza

- Il codename della release attiva è definito in `release_name` del `.zenzic.toml`.
- I codename precedenti sono elencati in `brand_obsolescence` e intercettati dai check Z601.
- Il nuovo materiale deve usare terminologia agnostica rispetto alla versione.
- I riferimenti storici ai codename restano solo dove necessari per cronologia.

---

## 3) Contratti di Namespace (Z4 e Z6)

- Namespace Z4: invarianti strutturali e infrastrutturali.
- Namespace Z6: invarianti di governance e ciclo di vita.

Regole obbligatorie:

- Le identità codice congelate sono immutabili.
- Il riuso o la riassegnazione semantica di ID frozen è vietato.
- Nuovi comportamenti di governance appartengono a Z6.
- Check strutturali e invarianti di piattaforma appartengono a Z4.

---

## 4) Checklist Contributiva

Prima del commit:

- Eseguire i check locali standard del repository.
- Verificare che non siano stati introdotti bypass di configurazione non autorizzati.
- Mantenere i mirror EN/IT quando la parità è prevista.

Prima del push:

- Eseguire l'entrypoint di verifica completa.
- Confermare che percorsi hook e comandi diretti producano lo stesso risultato.

Prima del merge:

- Verificare che la CI replichi il pass locale.
- Rimuovere esclusioni temporanee non più giustificate.
- Nessuna PR sul Core che altera il comportamento documentato può essere fusa nel branch di rilascio senza una corrispondente PR fusa in zenzic-doc. L'autore è il garante finale della Mirror Law.

### Aggiungere una Dipendenza

Quando si aggiunge una nuova dipendenza di terze parti a un progetto Zenzic:
1. Verificare la compatibilità della licenza (deve essere compatibile con Apache-2.0: MIT, BSD, Apache-2.0, LGPL-3.0, ISC). Le licenze GPL e proprietarie sono vietate.
2. Aggiungere i dettagli della dipendenza al file `NOTICE` (nome, URL, titolare del copyright, identificatore di licenza).
3. Eseguire `uv run reuse lint` per verificare la conformità.

### Parità Bilingue (Symmetry Check) {#parita-bilingue-symmetry-check}

Per verificare che la struttura del filesystem dei docs tree in inglese e italiano coincida esattamente (Symmetry Guardrail), esegui:

```bash
diff \
  <(find docs -name "*.md" | sed 's|^docs/||' | sort) \
  <(find docs-it -name "*.md" | sed 's|^docs-it/||' | sort)
```

Qualsiasi output da questi comandi rappresenta un'asimmetria strutturale che produrrà un errore 404 sui selettori di lingua.

---

## 5) Policy Soppressioni (Release A)

- CAP sovrano di default a 30 soppressioni attive.
- CAP configurabile per repository in `[governance].suppression_cap`.
- Scope globale: commenti inline + soppressioni per-file in config.
- Enforcement fail-hard: da 31 in su, `check all` termina con exit 1.
- Ogni esecuzione stampa il contatore soppressioni nel footer del report.

Quando il CAP configurato e superiore al default sovrano (`> 30`), il footer
mostra `[EXTENDED DEBT]` per rendere esplicito e auditabile il regime di
tolleranza estesa.

Formato atteso del footer:

```text
Suppression Audit: X/30
```

Sintassi inline canonica:

- Markdown: `<!-- zenzic:ignore: Z601 - historical reference -->`
- MDX: `<!-- * zenzic:ignore: Z601 - historical reference * -->`

---

## 6) Blocchi Zenzic più comuni

### Z105 Path Safety Breach

Sintomo:

- Zenzic blocca un percorso relativo con risalita e segnala violazione di
  sicurezza path.

Risoluzione standard:

- Preferire path assoluti dalla root sito (ad esempio `/blog/slug-articolo`) al
  posto di traversal relativi multi-livello.

Eccezione validata:

- Usare soppressione inline solo quando il bridge è revisionato e intenzionale.

```mdx
<!-- * zenzic:ignore: Z105 - cross-locale bridge validato * -->
[Leggi in Italiano](/blog/it/articolo)
```

### Z602 I18N Parity Drift

Sintomo:

- La CI fallisce perché un file base non ha mirror locale o manca la parità dei
  campi frontmatter richiesti.

Risoluzione:

- Creare il file speculare nella tree locale.
- Allineare i campi frontmatter richiesti (`title`, `description` di default).

Z602 è un check di contratto, non una preferenza opzionale di lint.

---

## 7) Hardening della Governance

Il ciclo di hardening segue una transizione a due stadi:

1. Stadio identità (corrente)

`release_name` è attivo con il codename corrente. I codename precedenti entrano in
`brand_obsolescence` alla release successiva.

2. Stadio hardening (pianificato)

Dopo una bonifica storica dedicata, i codename precedenti vengono promossi a
obsolescenza con enforcement Z601 pieno.

Questa sequenza evita saturazione di falsi positivi preservando la qualità del
segnale di governance.

---

## 8) Modello Sovrano di Verifica Condiviso (Repository della Famiglia)

I repository della famiglia zenzic condividono un solo modello deterministico
per `nox`, `just` e workflow CI:

1. Override esplicito: variabile d'ambiente `ZENZIC_CORE_PATH`.
2. Topologia canonica CI: `./_zenzic_core`.
3. Topologia sibling per sviluppo: `../zenzic`.
4. Ogni candidato deve contenere `src/zenzic`.
5. Policy fail-closed: il fallback a PyPI e proibito nei quality gate del repository.

Conseguenze operative:

- Locale e CI devono eseguire lo stesso entrypoint di verifica (`just verify`).
- La CI deve fare checkout del core in `_zenzic_core` prima della verifica.
- I workaround temporanei di configurazione non devono sostituire
  l'allineamento strutturale dei gate.
- L'override esplicito di branch (`ZENZIC_CORE_REF`) e consentito solo come
  eccezione governata con metadati obbligatori (ticket, reason, approver,
  expiry) ed enforcement fail-closed.
- I controlli di isolamento devono rimanere silenti nei file tracciati: il
  dogfooding contributor usa `.zenzic.local.toml`, mentre in CI i parametri di
  isolamento sono forniti solo tramite iniezione runtime di variabili
  d'ambiente.

Riferimento canonico:

- [Modello Sovrano di Verifica Condiviso](../explanation/sovereign-verification-model.md)
- [Profilo Assurance Supply Chain](../reference/supply-chain-assurance-profile.md)

### Runbook per Contributor (Setup Locale) {#contributor-runbook-local-setup}

Due setup locali supportati per l'esecuzione della verifica:

1. **Layout sibling (raccomandato):**
   Posiziona il repository core come sibling del tuo repository target:
   ```text
   workspace/
     zenzic/
     zenzic-doc/
     zenzic-action/
   ```
   Quindi esegui:
   ```bash
   just verify
   ```

2. **Layout con override esplicito (path custom):**
   Se il tuo repository core si trova in una posizione diversa, esporta `ZENZIC_CORE_PATH` durante l'esecuzione di verify:
   ```bash
   ZENZIC_CORE_PATH=/percorso/assoluto/a/zenzic just verify
   ```

Se la verifica segnala la mancanza del core path, trattalo come un errore di configurazione del setup, non come un warning di qualità da sopprimere.

---

## 9) Aggiungere un nuovo ADR

Quando viene presa una decisione architetturale significativa — che vincola i futuri contributori o risolve una tensione strutturale — deve essere registrata:

1. Crea `docs/developers/explanation/adr-<slug>.md` con il successivo numero ADR disponibile.
2. Crea il mirror italiano nel percorso corrispondente in `docs-it/developers/explanation/`.
3. Aggiungi entrambi i file alla tabella indice in [ADR Vault](../explanation/adr-vault.md).
4. Registra la decisione nella sezione `[ADR]` del log di governance del repository in cui è stata implementata.

Per policy di governance, le voci ADR sono record append-only. Per emendare una decisione, aggiungi un nuovo ADR che fa riferimento all'originale e documenta l'emendamento — mai riscrivere la storia.

---
