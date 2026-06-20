---
sidebar_position: 4
sidebar_label: "Codici di Rilevamento"
description: "Guida rapida ai codici Zenzic. Severità, penalità, codice di uscita e rimedio per ogni identificatore diagnostico Zxxx."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Riferimento Codici di Rilevamento

Ogni problema rilevato da Zenzic è contrassegnato da un **codice di rilevamento canonico** (`Zxxx`). Questa pagina è il cheat-sheet di riferimento rapido — severità, penalità, codice di uscita e percorso di rimedio essenziale per ogni segnale diagnostico.

## Modello a Livelli

Zenzic organizza i diagnostici in quattro livelli operativi:

| Livello | Proprietà | Formato | Ambito |
|---|---|---|---|
| Core | Zenzic | `Zxxx` | Scanner integrati e rilevamenti di sistema |
| Governance | Zenzic | `Z6xx` | Controlli policy opt-in (`[governance]`) |
| Plugin | Terze parti | `<plugin-id>:<code>` | Regole da entry-point esterni |
| Custom | Progetto locale | `ZZxxx` | `[[custom_rules]]` dichiarate nel TOML |

## Contratto di Stabilità

Il registro dei codici è regolato da superfici di contratto immutabili:

- `FROZEN_CODES`: codici che non possono essere rinumerati o modificati semanticamente senza approvazione a livello architetturale.
- `NON_SUPPRESSIBLE_CODES`: codici di sicurezza che non possono essere silenziati inline.
- `PLUGIN_FORBIDDEN_EXITS`: i plugin non possono emettere Exit 2/3 (riservati alla semantica di sicurezza del core).

!!! tip "Deep-linking"
    Ogni codice ha un anchor permanente. È possibile collegarsi direttamente a un codice specifico usando `https://zenzic.dev/it/docs/reference/finding-codes#z101`.

## Panoramica Categorie

| **Categoria** | **Intervallo** | **Scopo** | **Severità Predefinita** | **Sopprimibile?** |
|---|---|---|---|---|
| **Z0xx** | Migrazione e Compatibilità | Deprecazione motore; guida alla migrazione | `error` | ❌ No (abort fatale) |
| **Z1xx** | Integrità dei Link | Link rotti, vuoti, circolari; pagine orfane; problemi di percorso | `error`/`warning`/`info` | ✅ Sì |
| **Z2xx** | Sicurezza (credential scanner) | Rilevamento segreti; path traversal; incidenti di sicurezza | `warning`/`security_breach`/`security_incident` | 🔒 **Mai** |
| **Z3xx** | Integrità dei Riferimenti | Definizioni di riferimento dangling/duplicate | `error`/`warning` | ✅ Sì |
| **Z4xx** | Struttura | Indici directory, pagine orfane, alt text mancante, asset di config | `info`/`warning` | ✅ Sì |
| **Z5xx** | Qualità dei Contenuti | Testo segnaposto, contenuto breve, validazione snippet, regressioni | `warning`/`error` | ✅ Sì |
| **Z6xx** | Governance | Obsolescenza brand, parità i18n (opt-in) | `warning` | ✅ Sì |
| **Z9xx** | Motore e Sistema | Errori di esecuzione regole, timeout, diagnostici di sistema | `error`/`warning` | ✅ Sì |

!!! info "Sintassi di soppressione per riga"
    Sopprimi un rilevamento su una riga specifica con un commento nel formato corretto sulla stessa riga.\
    **Markdown (.md):** `<!-- zenzic:ignore: Zxxx -->`\
    **MDX (.md):** `<!-- zenzic:ignore: Zxxx -->`\
    Vedi [Politica di Soppressione](./suppression-policy.md) per il riferimento completo.

### Contratto Codici di Uscita

| Codice di Uscita | Significato | Sopprimibile? |
| :---: | :--- | :--- |
| **0** | Tutti i controlli superati (o soppressi con `--exit-zero`) | — |
| **1** | Errori e avvisi rilevati; usa `--strict` per promuovere i warning | ✅ Sì |
| **2** | Breach di sicurezza (Z201, Z204). **Mai** soppresso | ❌ Mai |
| **3** | Incidente di sicurezza (Z203 PATH_TRAVERSAL_FATAL). **Mai** soppresso, nemmeno con `--exit-zero` | ❌ Mai |

---

## Livelli di Severità e Impatto sulla Pipeline {#severity-pipeline-impact}

Ogni codice di rilevamento porta una **severità** che determina il suo contributo matematico al DQS e il suo comportamento nel gate della pipeline. La tabella `inspect codes` rende questi valori espliciti tramite le colonne **Severity** e **Penalty**.

### Livelli di Severità Standard

| Severità | Matematica DQS | Comportamento Gate CI | Sopprimibile? |
|---|---|---|---|
| `error` | Sottrae la penalità del codice dal bucket di categoria | Attiva Exit 1. Per i codici Z2xx diventa Exit 2/3. | ✅ Sì (eccetto Z2xx) |
| `warning` | Sottrae la penalità del codice dal bucket di categoria | Attiva Exit 1 solo in modalità `--strict` | ✅ Sì |
| `note` (0.0) | **Zero** — nessun punto detratto | **Mai** blocca il gate CI. Esce sempre con 0. | ✅ Sì |

**`error`** I rilevamenti sottraggono i punti di penalità e attivano incondizionatamente Exit 1 (o superiore per i codici di sicurezza). Se il DQS risultante scende sotto `fail_under`, il gate fallisce anche senza un rilevamento specifico a livello error.

**`warning`** I rilevamenti sottraggono i punti di penalità. Sono invisibili al gate CI in modalità predefinita. Con `--strict`, i warning vengono promossi a error e diventano bloccanti per il gate.

**`note` / 0.0** I rilevamenti sono telemetria puramente informativa. Non sottraggono mai punti, non fanno mai fallire il gate, e sono nascosti per impostazione predefinita (`--show-info` è necessario per visualizzarli). Z106 (CIRCULAR_LINK) e Z114 (LARGE_PAGINATION_SET) sono esempi.

### Penalità Override: FATAL e HALT

Due stati di pipeline aggiuntivi sono mostrati in `inspect codes` che sovrascrivono il modello matematico standard:

#### FATAL

```text
Penalty: FATAL
```

Visualizzato per **Z0xx** (abort di configurazione) e **Z2xx** (Codici di Sicurezza). Questi codici non sottraggono punti in modo incrementale — attivano un **Security Override** che fa collassare l'intero DQS a **0/100** in modo incondizionato.

- **Z0xx** (es. Z000 `UNSUPPORTED_ENGINE`): Errore di configurazione fatale. L'esecuzione si interrompe prima di qualsiasi scansione. Exit 1.
- **Z2xx** (Z201–Z204): Security Breach o Security Incident. Il punteggio collassa a 0 indipendentemente da tutti gli altri rilevamenti. Exit 2 (breach) o Exit 3 (incident). **Non può essere soppresso.**

> L'etichetta FATAL sostituisce `0.0` nella colonna Penalty per prevenire la pericolosa lettura errata che i codici di sicurezza siano "innocui" perché non portano deduzioni incrementali di punti.

#### HALT

```text
Penalty: HALT
```

Visualizzato per i **codici con severità `warning` e penalità 0.0** — codici che non sottraggono punti matematici ma agiscono come **bloccanti rigidi della pipeline** attraverso la logica del gate CI piuttosto che attraverso la formula di punteggio.

Esempi:

| Codice | Nome | Perché HALT e non un numero |
|---|---|---|
| Z504 | QUALITY_REGRESSION | Si attiva quando il DQS attuale regredisce sotto la baseline salvata. Non è esso stesso nel calcolo del punteggio (sarebbe circolare). Blocca il gate `zenzic diff`. |
| Z602 | I18N_PARITY | Gate di governance binario — mirror di traduzione mancante o frontmatter divergente. Blocca il gate di governance incondizionatamente. |
| Z901 | RULE_ENGINE_ERROR | Crash dello scanner. I risultati parziali potrebbero essere inaffidabili; la pipeline non può passare. |
| Z902 | RULE_TIMEOUT | Scanner in timeout (rischio ReDoS). I risultati parziali non sono affidabili. |

> I codici HALT sono i più pericolosi semanticamente nella tabella: sembrano voci `warning` senza costo visibile, ma bloccano incondizionatamente la CI quando scattano. L'etichetta HALT lo rende esplicito.

### Tabella Riassuntiva

| Display Penalty in `inspect codes` | Significato | Impatto DQS | Impatto CI |
|---|---|---|---|
| `-8.0`, `-2.0`, ecc. | Penalità standard detratta dal bucket DQS | Riduce il punteggio di quella quantità per occorrenza | Fa fallire il gate se il punteggio scende sotto `fail_under` |
| `0.0` (attenuato) | Nota informativa — nessun costo | Nessuno | Nessuno — esce con 0 |
| **FATAL** | Security Override (Z0xx, Z2xx) | Fa collassare il DQS a 0/100 | Exit 1/2/3 obbligatorio |
| **HALT** | Blocco gate pipeline (warning + 0.0) | Nessuno | Exit 1 obbligatorio quando scatta |

---

## Z0xx — Migrazione e Compatibilità

### Z000: UNSUPPORTED_ENGINE {#z000}

**Severità:** `error` (abort fatale) · **Penalità:** nessuna · **Uscita:** 1 · **Sopprimibile:** No

Errore di configurazione fatale: l'adapter factory ha rilevato un alias motore deprecato o rimosso in `.zenzic.toml`. L'esecuzione si interrompe prima di qualsiasi scansione — Z000 non appare nell'output `--format json`.

**Rimedio:**
1. Apri `.zenzic.toml` e imposta `engine = "standalone"` (o `"mkdocs"`, `"zensical"`).
2. Rimuovi qualsiasi alias motore legacy.

---

## Z1xx — Integrità dei Link

### Z101: LINK_BROKEN {#z101}

**Severità:** `error` · **Penalità:** −8,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z101-broken-links)

Un link relativo punta a una risorsa non trovata nella Virtual Site Map. Il file potrebbe essere fuori dall'ambito di `docs_dir` o corrispondente a un pattern di esclusione.

**Rimedio:**
1. Verifica l'esistenza fisica del file di destinazione.
2. Correggi il percorso relativo (es. `../folder/target.md`).
3. Conferma che il file non sia corrispondente a `ignored_patterns` nella config.

### Z102: ANCHOR_MISSING {#z102}

**Severità:** `error` · **Penalità:** −5,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z102-anchor-missing)

Il file di destinazione del link esiste (Z101 passa), ma l'anchor HTML specifico (es. `#setup`) è assente dal registro intestazioni del file di destinazione. Zenzic analizza tutte le intestazioni e i tag `<a id="...">` espliciti durante il Pass 1.

**Rimedio:**
1. Controlla il testo dell'intestazione nel file di destinazione e verifica lo slug dell'anchor.
2. Assicurati che la slugificazione Kebab-case corrisponda al motore Markdown.
3. Usa `{#id}` o `<a id="id"></a>` per ID personalizzati.

### Z103: ORPHAN_LINK {#z103}

**Severità:** `error` · **Penalità:** 0,0 pt · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z103-orphan-link)

La destinazione del link esiste nella VSM ma non è raggiungibile attraverso alcuna struttura di navigazione (sidebar/nav). Gli utenti possono raggiungerla solo tramite URL diretto.

**Rimedio:**
1. Aggiungi il file al `nav` (MkDocs).
2. Se la pagina nascosta è intenzionale, sopprimi con `<!-- zenzic:ignore: Z103 -->`.

### Z104: FILE_NOT_FOUND {#z104}

**Severità:** `error` · **Penalità:** −8,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì

Errore filesystem di basso livello: il motore non ha potuto aprire un file referenziato da un link.

```text
blog/post.mdx:12: '/blog/zenzic-v070' not found in the site map
💡 Did you mean: '/blog/zenzic-v070-release/'?
```

**Rimedio:**
1. Verifica che nessun processo concorrente stia modificando `docs/` durante la scansione.
2. Controlla che `docs_dir` sia corretto e il percorso sia assoluto rispetto alla radice del repository.
3. *(Slug-mismatch)* Esegui `zenzic inspect routes --kind physical` per elencare tutti gli slug canonici nella VSM. Aggiorna il link per corrispondere allo slug `slug:` dichiarato nel frontmatter.

### Z105: ABSOLUTE_PATH {#z105}

**Severità:** `error` · **Penalità:** −2,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z105-absolute-path)

Un percorso assoluto del filesystem (es. `C:\Docs\page.md` o `/home/user/docs/page.md`) compromette la portabilità della documentazione. I prefissi URL del progetto (`/blog/`, `/docs/`) sono esenti da Z105 ma vengono comunque verificati tramite lookup VSM (uno slug mancante genera **Z104**).

**Rimedio:**
1. Converti in un percorso relativo dalla directory del file corrente.
2. Usa `@site/` o alias specifici del motore dove supportati.
3. Se hai ricevuto Z104 su un link assoluto `/blog/`, vedi il rimedio Z104.

### Z106: CIRCULAR_LINK {#z106}

**Severità:** `info` · **Penalità:** 0,0 pt · **Uscita:** 0 · **Sopprimibile:** Sì (solo informativo, `--show-info`)

Un insieme di link forma un ciclo diretto (A → B → A). Si tratta di un segnale di telemetria strutturale — non blocca il Quality Gate né riduce il DQS.

**Rimedio:** Rivedi il flusso dei contenuti; considera di sostituire un link con una sezione "Vedi anche". Nessuna azione richiesta se il ciclo è intenzionale.

### Z107: CIRCULAR_ANCHOR {#z107}

**Severità:** `warning` · **Penalità:** −1,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì

Un link della forma `[testo](#anchor)` si risolve in un'intestazione della **stessa** pagina — un self-loop che naviga il lettore esattamente dove si trova già. Distinto da una voce di sommario (che collega in avanti a un anchor inferiore su una pagina lunga).

**Rimedio:**
1. Sostituisci `[testo](#anchor)` con testo normale se non è prevista navigazione.
2. Oppure collega il concetto a una pagina *diversa*.

### Z108: EMPTY_LINK_TEXT {#z108}

**Severità:** `error` · **Penalità:** −1,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z108-empty-link-text)

Un link Markdown inline o un link di riferimento collapsed ha testo visibile vuoto o composto solo da spazi — es. `[](./page.md)`, `[ ](./page.md)`, `[][ref]`. Rompe simultaneamente l'accessibilità screen reader e l'indicizzazione semantica.

**Rimedio:**
1. Aggiungi testo descrittivo al link: `[Documentazione](./page.md)`.
2. Rimuovi completamente il link se la destinazione non è ancora nota.

### Z109: EXTERNAL_LINK_BROKEN {#z109}

**Severità:** `error` · **Penalità:** −3,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z1xx-links/z109-external-link-broken)

Un URL esterno ha restituito un codice di stato di errore HTTP (es. 404, 500) o è stato completamente irraggiungibile a causa di un timeout di connessione o di un errore di risoluzione DNS durante la scansione.

**Rimedio:**
1. Controlla l'URL di destinazione in un browser web.
2. Correggi l'URL se contiene errori di digitazione, oppure rimuovi il link se la destinazione non è più esistente.

### Z111: VIRTUAL_ROUTE_BROKEN {#z111}

**Severità:** `error` · **Penalità:** −8,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì

Il link punta a una rotta virtuale (pagina dei tag, indice paginato, profilo dell'autore) che non è mai stata generata da alcun frontmatter.

**Rimedio:**
1. Verifica che il frontmatter contenga i tag o le proprietà necessarie per generare la pagina.
2. Aggiorna il percorso del link in modo che corrisponda alla rotta generata corretta.

### Z113: AUTHOR_KEY_COLLISION {#z113}

**Severità:** `error` · **Penalità:** −2,0 pt (Strutturale) · **Uscita:** 1 · **Sopprimibile:** Sì

Chiave autore duplicata dichiarata in due o più file di configurazione dell'autore del blog.

**Rimedio:**
1. Assicurati che ogni file di configurazione dell'autore abbia una chiave unica.
2. Risolvi eventuali collisioni di nomi.

### Z114: LARGE_PAGINATION_SET {#z114}

**Severità:** `note` · **Penalità:** 0,0 pt · **Uscita:** 0 · **Sopprimibile:** Sì

Il set di paginazione del blog supera la soglia informativa di 200 pagine.

**Rimedio:** Nessuna azione richiesta (solo informativa). Rivedi le dimensioni del blog.

---

## Z2xx — Sicurezza (credential scanner)

### Z201: CREDENTIAL_SECRET {#z201}

!!! danger "🔒 INVIOLABILE — Non sopprimibile | Uscita 2 | DQS collassa a 0/100"
    `zenzic:ignore: Z201` è **silenziosamente rifiutato**. Il credential scanner si attiva incondizionatamente su ogni riga. [↗ Gallery](../tutorials/examples/z2xx-security/z201-credentials)

**Severità:** `security_breach` · **Penalità:** DQS collassa a 0/100 · **Uscita:** 2

Il credential scanner ha rilevato un pattern di credenziale noto. Viene applicata la decodifica speculativa Base64 — anche i token codificati che decodificano in pattern di credenziali vengono segnalati.

**Rimedio:**
1. **IMMEDIATO:** Ruota la credenziale esposta — è compromessa.
2. Rimuovi il segreto dal file.
3. Pulisci la cronologia git usando `git-filter-repo`.
4. Usa placeholder come `YOUR_API_KEY` negli esempi di documentazione.

### Z202: PATH_TRAVERSAL {#z202}

!!! danger "🔒 INVIOLABILE — Non sopprimibile | Uscita 1 | DQS collassa a 0/100"
    `zenzic:ignore: Z202` è **silenziosamente rifiutato**. [↗ Gallery](../tutorials/examples/z2xx-security/z202-path-traversal)

**Severità:** `error` · **Penalità:** DQS collassa a 0/100 · **Uscita:** 1

Un percorso relativo usa segmenti `..` per uscire dal confine della radice `docs/`, esponendo potenzialmente file privati del repository (`.env`, `config.py`).

**Rimedio:**
1. Sposta l'asset o il file di destinazione nella gerarchia `docs/` o `static/`.
2. Se devi referenziare un file esterno, usa un link simbolico (se consentito) o un URL assoluto letterale.

### Z203: PATH_TRAVERSAL_FATAL {#z203}

!!! danger "🔒 INVIOLABILE — Non sopprimibile | Uscita 3 (massima) | DQS collassa a 0/100"
    `zenzic:ignore: Z203` è **silenziosamente rifiutato**. Diverso da Z202: punta alle directory di sistema (`/etc/`, `/root/`) segnalando una compromissione della supply-chain.

**Severità:** `security_incident` · **Penalità:** DQS collassa a 0/100 · **Uscita:** 3

Path traversal rilevato verso directory di sistema riservate (es. `/etc/`, `/root/`). Non può risultare da un flusso di lavoro di documentazione legittimo — la presenza indica iniezione di template, toolchain compromessa, o commit malevolo.

**Rimedio:**
1. Indaga il file sorgente per intento malevolo o compromissione della supply chain.
2. Rimuovi tutti i percorsi assoluti che referenziano posizioni di sistema.
3. Controlla i vettori di iniezione nella pipeline CI.

### Z204: FORBIDDEN_TERM {#z204}

!!! danger "🔒 INVIOLABILE — Non sopprimibile | Uscita 2 | DQS collassa a 0/100"
    `zenzic:ignore: Z204` è **silenziosamente rifiutato**. Sorgente: `forbidden_patterns` in `.zenzic.local.toml` (ignorato da git). [↗ Gallery](../tutorials/examples/z2xx-security/z204-forbidden-term)

**Severità:** `security_breach` · **Penalità:** DQS collassa a 0/100 · **Uscita:** 2

Il Privacy Gate ha rilevato un termine di progetto riservato (nome in codice interno, hostname di staging, alias di team) configurato in `.zenzic.local.toml`. Il matching è una sottostringa verbatim case-insensitive — nessuna regex. Esegui `zenzic init` per creare `.zenzic.local.toml` (aggiunto automaticamente a `.gitignore`).

!!! info "Integrità brand — due livelli"
    | Livello | Sorgente | Ambito | Severità |
    |---|---|---|---|
    | **Z204 Privacy Gate** | `forbidden_patterns` in `.zenzic.local.toml` *(git-ignored)* | Termini privati — code-name, staging host | **Uscita 2 (Critica)** |
    | **Z601 Brand Guard** | `[governance].brand_obsolescence` in `.zenzic.toml` | Termini brand deprecati | Uscita 1 (Qualità) |

**Rimedio:**
1. Rimuovi o generalizza il termine vietato.
2. Se il termine è legittimamente pubblico, rimuovilo da `forbidden_patterns`.
3. Verifica che `.zenzic.local.toml` sia in `.gitignore`.

---

## Z3xx — Integrità dei Riferimenti

### Z301: DANGLING_REF {#z301}

**Severità:** `error` · **Penalità:** −4,0 pt (Navigazione) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z3xx-references/z301-dangling-ref)

Un link in stile riferimento (`[mio link][ref]`) è presente, ma la definizione (`[ref]: http://...`) è assente dal file. La maggior parte dei renderer degrada silenziosamente il link a testo normale.

**Rimedio:**
1. Aggiungi la definizione mancante in fondo al file Markdown.
2. Controlla errori di battitura nell'ID di riferimento.

### Z302: DEAD_DEF {#z302}

**Severità:** `warning` · **Penalità:** −1,0 pt (Navigazione) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z3xx-references/z302-dead-def)

Una definizione di riferimento esiste ma nessun link nel file la utilizza. Innocua per i lettori ma crea debito di manutenzione.

**Rimedio:** Rimuovi la definizione inutilizzata, o aggiorna un link per usare questo riferimento.

### Z303: DUPLICATE_DEF {#z303}

**Severità:** `warning` · **Penalità:** −3,0 pt (Navigazione) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z3xx-references/z303-duplicate-def)

Esistono definizioni multiple per lo stesso ID di riferimento. CommonMark specifica che vince la prima definizione, ma questa ambiguità va risolta per un rendering deterministico cross-engine.

**Rimedio:** Assicurati che ogni ID di riferimento abbia esattamente una definizione; consolida i duplicati in un unico riferimento canonico.

---

## Z4xx — Struttura

### Z401: MISSING_DIRECTORY_INDEX {#z401}

**Severità:** `info` · **Penalità:** nessuna (suggerimento strutturale) · **Uscita:** 0 · **Sopprimibile:** Sì

Una directory di documentazione non ha `index.md` o `README.md`. L'URL della directory potrebbe restituire 404 o un elenco raw a seconda del motore di build.

**Rimedio:** Crea `index.md` nella directory segnalata con una breve panoramica della sezione.

### Z402: ORPHAN_PAGE {#z402}

**Severità:** `warning` · **Penalità:** −4,0 pt (Navigazione) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z4xx-topology/z402-orphan-page)

Un file esiste in `docs/` ma non è raggiungibile da alcun menu di navigazione. L'equivalente documentale del codice morto.

**Rimedio:**
1. Aggiungi il file al `nav` (MkDocs).
2. Elimina il file se è un artefatto residuo.

### Z403: MISSING_ALT {#z403}

**Severità:** `warning` · **Penalità:** nessuna (avviso di accessibilità) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z4xx-topology/z403-missing-alt)

Un'immagine è priva di testo alt, degradando l'accessibilità per screen reader e il SEO.

**Rimedio:** Aggiungi testo descrittivo: `![Una descrizione dell'immagine](url)`. Evita etichette generiche come "immagine" o "screenshot".

### Z404: CONFIG_ASSET_MISSING {#z404}

**Severità:** `warning` · **Penalità:** nessuna (avviso integrità configurazione) · **Uscita:** 1 · **Sopprimibile:** Sì

La configurazione principale del motore di build (es. `zensical.toml`) referenzia un logo o favicon che non esiste al percorso specificato. Il fallimento è globale: ogni pagina in ogni locale viene servita senza l'asset di branding.

**Rimedio:**
1. Controlla i percorsi `favicon:` o `logo.src:` nel file di configurazione.
2. Assicurati che l'asset sia fisicamente presente nelle cartelle target.

### Z405: UNUSED_ASSET {#z405}

**Severità:** `warning` · **Penalità:** −3,0 pt (Governance) · **Uscita:** 1 · **Sopprimibile:** Sì

Un file immagine o asset nel repository non viene mai referenziato da alcun file Markdown. Gli "Dark Asset" gonfiano il repository e gli artefatti di build silenziosamente.

!!! info "Esenzioni Infrastrutturali"
    I file di infrastruttura standard (`robots.txt`, `_redirects`, `CNAME`, `sitemap.xml`) sono nativamente esentati da questo controllo dal motore core. Non attiveranno mai un rilevamento Z405.

**Rimedio:**
1. Elimina il file inutilizzato.
2. Oppure referenzialo in una pagina di documentazione appropriata.

### Z406: NAV_CONTRACT {#z406}

**Severità:** `error` · **Penalità:** −2,0 pt (Governance) · **Uscita:** 1 · **Sopprimibile:** Sì

Un conflitto tra la struttura fisica dei file e la configurazione di navigazione del motore. Per MkDocs: una voce `nav` che punta a un percorso non attivato da alcun file fisico.

**Rimedio:**
1. Allinea il percorso nav nella configurazione con il percorso fisico del file.
2. Esegui `zenzic check all` per verificare la correzione sull'intera VSM.

---

## Z5xx — Qualità dei Contenuti

### Z501: PLACEHOLDER {#z501}

**Severità:** `warning` · **Penalità:** −2,0 pt (Contenuto) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z5xx-content/z501-placeholder)

Stringhe segnaposto (`TODO`, `FIXME`, `[INSERIRE IMMAGINE QUI]`) committate nella documentazione di produzione segnalano lavoro incompleto.

**Rimedio:** Sostituisci il segnaposto con contenuto reale, o rimuovilo fino a quando non è pronto.

### Z502: SHORT_CONTENT {#z502}

**Severità:** `warning` · **Penalità:** −1,0 pt (Contenuto) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z5xx-content/z502-short-content)

Una pagina contiene meno di 50 parole di prosa renderizzata (frontmatter, commenti MDX e HTML esclusi). Una pagina al di sotto di questa soglia non può contenere i componenti semantici necessari per rispondere alla domanda del lettore.

**Rimedio:** Espandi la pagina, o uniscila a una pagina correlata.

### Z503: SNIPPET_ERROR {#z503}

**Severità:** `error` · **Penalità:** −10,0 pt (Contenuto — penalità massima per occorrenza singola) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z5xx-content/z503-snippet-error)

Lo Snippet Guard ha identificato un errore di sintassi in un blocco di codice delimitato con un tag linguaggio. Il numero di riga riportato è **assoluto** — relativo al file sorgente, non all'inizio dello snippet.

**Rimedio:**
1. Correggi la sintassi nel blocco di codice.
2. Per esempi intenzionalmente errati, usa `` ```text `` per bypassare la validazione.

### Z505: UNTAGGED_CODE_BLOCK {#z505}

**Severità:** `warning` · **Penalità:** −1,0 pt (Contenuto) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z5xx-content/z505-untagged-code-block)

Un blocco di codice delimitato non ha specificatore di linguaggio. Syntax highlighter, lo Snippet Guard (Z503) e gli screen reader non possono elaborarlo. Alcuni metadati specifici del motore (es. `` ```python title="file.py" showLineNumbers ``) sono supportati e non vengono mai segnalati.

**Rimedio:** Aggiungi un tag linguaggio: `` ```python ``, `` ```bash ``, `` ```toml ``. Per blocchi solo visualizzazione, usa `` ```text `` o `` ```plaintext ``.

---

## Z6xx — Governance

### Z601: BRAND_OBSOLESCENCE {#z601}

**Severità:** `warning` · **Penalità:** −2,0 pt (Governance) + Escalation · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z6xx-brand/z601-brand-obsolescence)

Un nome di release deprecato o identificatore di brand appare in un file scansionato. Configurato tramite `[governance].brand_obsolescence` in `.zenzic.toml`. I file CHANGELOG sono esenti per impostazione predefinita (`obsolete_names_exclude_patterns`).

**Governance Escalation:** Oltre 10 occorrenze Z6xx totali, si applica un moltiplicatore esponenziale: `deduzione × 2^(eccesso / 5)`, con un tetto al livello 25 pt.

**Rimedio:**
1. Aggiorna il testo al nome di release attivo.
2. Per riferimenti storici intenzionali in `.md`: aggiungi `<!-- zenzic:ignore: Z601 -->`.
3. Per file `.mdx`: aggiungi `<!-- zenzic:ignore: Z601 -->`.
4. Per esentare un pattern di file, aggiungilo a `obsolete_names_exclude_patterns` in `.zenzic.toml`.

### Z602: I18N_PARITY {#z602}

**Severità:** `warning` · **Penalità:** nessuna (controllo integrità bilingue) · **Uscita:** 1 · **Sopprimibile:** Sì · [↗ Gallery](../tutorials/examples/z6xx-brand/z602-i18n-parity)

Un mirror di traduzione è mancante, o il frontmatter di un file tradotto diverge dalla base canonica (`sidebar_position`, `sidebar_label`, `title`). Due locale con frontmatter diverso producono grafi di navigazione asimmetrici.

**Rimedio:**
1. Crea la traduzione mancante nel percorso corrispondente del mirror.
2. Copia il blocco frontmatter della lingua base e traduci i valori — non aggiungere o rimuovere chiavi.
3. Per asimmetria intenzionale, sopprimi con `<!-- zenzic:ignore: Z602 -->` sul blocco frontmatter.

---

## Z9xx — Motore e Sistema

### Z901: RULE_ENGINE_ERROR {#z901}

**Severità:** `error` · **Penalità:** nessuna (sistema) · **Uscita:** 1 · **Sopprimibile:** Sì

Eccezione non gestita in una regola core o un plugin. Il principio fail-visible di Zenzic converte i crash silenziosi in rilevamenti Z901 espliciti e auditabili.

**Rimedio:** Controlla l'output CLI per un traceback Python. Segnala il problema su `https://github.com/PythonWoods/zenzic/issues`.

### Z902: RULE_TIMEOUT {#z902}

**Severità:** `error` · **Penalità:** nessuna (sistema) · **Uscita:** 1 · **Sopprimibile:** Sì

Una regola ha superato il limite di tempo di esecuzione (default > 30s). Quasi sempre causato da backtracking catastrofico in una regex personalizzata — un rischio ReDoS che può disabilitare silenziosamente un security gate.

**Rimedio:**
1. Rivedi i pattern regex personalizzati in `.zenzic.toml`.
2. Semplifica i pattern: evita quantificatori annidati come `(a+)+`.
3. Usa alternative non-backtracking dove possibile.

### Z906: NO_FILES_FOUND {#z906}

**Severità:** `note` · **Penalità:** nessuna · **Uscita:** 0 · **Sopprimibile:** Sì (informativo)

Nessun file `.md` / `.mdx` trovato nel `docs_root` risolto dopo tutti i livelli di esclusione. Soppresso nei formati output macchina (`json`, `sarif`).

**Rimedio:**
1. Verifica che `docs_dir` in `.zenzic.toml` (o `--docs-dir`) punti alla directory corretta.
2. Se la directory è intenzionalmente vuota, Z906 può essere ignorato in sicurezza — esce con 0.

---

## Codici Riservati (Inattivi) {#reserved-codes}

!!! note "Inattivi per contratto a runtime"
    I codici in questa sezione sono definiti nel registro Zenzic e riservati per le implementazioni del motore. **Non vengono emessi a runtime** e **non hanno impatto sul Deterministic Quality Score**.

### Z504: QUALITY_REGRESSION {#z504}

**Severità:** `warning` *(riservato)*

Emesso da `zenzic diff` quando il DQS attuale è inferiore alla baseline salvata (`.zenzic-score.json`). Non è esso stesso ponderato nel punteggio (sarebbe circolare); identifica quale commit ha introdotto una regressione.

**Rimedio:** Esegui `zenzic score` per vedere il breakdown per categoria, correggi i rilevamenti sottostanti che hanno causato il calo, poi esegui `zenzic score --save` su `main` per aggiornare la baseline.

---

## Remap Codici Storici {#historical-code-remap}

<!-- zenzic:migration-matrix:start -->
| Codice Deprecato | Codice Attivo | Note |
|---|---|---|
| `Z903` | `Z405` | Remap canonico per `UNUSED_ASSET`. |
| `Z904` | `Z406` | Remap canonico per `NAV_CONTRACT`. |
| `Z905` | `Z601` | Remap canonico per `BRAND_OBSOLESCENCE`. |
| `Z907` | `Z602` | Remap canonico per `I18N_PARITY`. |
<!-- zenzic:migration-matrix:end -->

Gli identificatori storici rimangono validi solo come riferimenti storici nella prosa di migrazione. I rilevamenti attivi e gli anchor di sezione usano sempre i codici canonici elencati in questa matrice.

---

## Soppressione dei Diagnostici

> Vedi [Politica di Soppressione](./suppression-policy.md) per la sintassi inline (`zenzic:ignore`), il modello Suppression Debt e l'override `--audit`.
