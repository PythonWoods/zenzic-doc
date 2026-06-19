---
icon: lucide/eye-off
sidebar_label: "Privacy Gate"
description: "Configura Z204 FORBIDDEN_TERM per bloccare termini riservati dalla documentazione pubblica."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Configurare il Privacy Gate

Z204 (`FORBIDDEN_TERM`) blocca i termini interni riservati — codename di progetto, hostname
interni, URL di staging — dall'apparire nella documentazione pubblica.

---

## Architettura

Il Privacy Gate usa un modello a due file:

| File | Scopo | Committato? |
|:-----|:------|:-----------|
| `.zenzic.toml` | Configurazione condivisa del progetto | Sì |
| `.zenzic.local.toml` | Pattern proibiti locali alla macchina | **No** |

`forbidden_patterns` risiede esclusivamente in `.zenzic.local.toml`. Questo file non viene
mai committato. Zenzic lo applica automaticamente aggiungendo `.zenzic.local.toml` al
`.gitignore` durante `zenzic init`.

---

## Setup

### 1. Inizializza l'overlay locale

Se `.zenzic.local.toml` non esiste ancora, crealo tramite:

```bash
zenzic init
```

Questo crea `.zenzic.local.toml` e lo aggiunge al `.gitignore` automaticamente.

### 2. Aggiungi i pattern proibiti

Apri `.zenzic.local.toml` e popola la lista `forbidden_patterns`:

```toml
[governance]
forbidden_patterns = [
    "CODENAME-PHOENIX",
    "internal-staging.example.corp",
    "acme-internal-api",
]
```

I pattern vengono confrontati come stringhe letterali, case-insensitive. La sintassi RE2 DFA
è supportata per i pattern che richiedono il matching regex — vedi il
[Riferimento Configurazione](../reference/configuration-reference.md) per la specifica
completa di `forbidden_patterns`.

### 3. Verifica `.gitignore`

Conferma che `.zenzic.local.toml` sia protetto:

```bash
git check-ignore -v .zenzic.local.toml
# atteso: .gitignore:N:.zenzic.local.toml	.zenzic.local.toml
```

Se la riga è assente, aggiungila manualmente:

```bash
echo ".zenzic.local.toml" >> .gitignore
```

### 4. Esegui il controllo

```bash
zenzic check all
```

Z204 si attiva con exit code 2 quando viene trovato un termine proibito. L'exit code 2 è
identico a Z201 (esposizione credenziale) — il punteggio crolla a 0 incondizionatamente
(Security Override).

---

## Integrazione CI

In CI, `forbidden_patterns` è tipicamente vuoto — non viene fatto checkout di
`.zenzic.local.toml`. Z204 quindi non si attiva in CI a meno che non provvedi esplicitamente
i pattern tramite un secret CI:

```yaml
# Esempio GitHub Actions
- name: Scrivi overlay zenzic locale
  run: |
    cat > .zenzic.local.toml << 'EOF'
    [governance]
    forbidden_patterns = ${{ secrets.ZENZIC_FORBIDDEN_PATTERNS }}
    EOF
```

In alternativa, passa i pattern a runtime usando il flag `--forbidden` (se disponibile nella
tua versione di Zenzic) invece di scrivere un file.

---

## Precedenza

La configurazione viene risolta nel seguente ordine (le voci successive sovrascrivono le precedenti):

1. `.zenzic.toml` — default condivisi del progetto
2. `pyproject.toml [tool.zenzic]` — alternativa embedded a `.zenzic.toml`
3. `.zenzic.local.toml` — overlay locale alla macchina (merge additivo per i campi lista)

Per `forbidden_patterns`, l'overlay è **additivo**: i pattern in `.zenzic.local.toml`
vengono aggiunti a eventuali pattern dichiarati in `.zenzic.toml`. Non li sostituiscono.

---

## Correlato

- [Riferimento Configurazione](../reference/configuration-reference.md) — specifica completa del campo `forbidden_patterns`
- [Strategia di Configurazione](./configuration-strategy.md) — troubleshooting del modello a due file
- [Panoramica degli Esempi](../tutorials/examples/index.md) — scenari Z-code eseguibili
