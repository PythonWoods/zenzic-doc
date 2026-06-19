---
sidebar_label: Usare il Brand System
description: "Come usare i token semantici di Zenzic in componenti React e MDX."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Usare il Brand System

Il linguaggio visivo di Zenzic è token-first. Tutti i colori UI devono essere consumati tramite variabili CSS semantiche definite in `src/css/custom.css`.

## Contratto Componenti React

Ogni componente React deve usare token `var(--zenzic-*)` per:

1. Surface e background
2. Gerarchia testo
3. Bordi e outline
4. Stati semantici (`success`, `warning`, `error`, `fatal`)

### Famiglie token approvate

- `--zenzic-brand-*` per azioni e stati attivi
- `--zenzic-ink-*` per contrasto e gerarchia tipografica
- `--zenzic-bg-*` per superfici stratificate traslucide
- `--zenzic-border-*` per separatori e cornici
- `--zenzic-success|warning|error|fatal` per severità

### Esempio d'uso React

```tsx
export function AuditBadge(): React.JSX.Element {
  return (
    <span
      style={{
        backgroundColor: 'var(--zenzic-brand)',
        color: 'var(--zenzic-ink-100)',
        border: '1px solid var(--zenzic-border-brand-35)',
        borderRadius: '6px',
        padding: '0.2rem 0.5rem',
        fontWeight: 600,
      }}
    >
      audit: passed
    </span>
  );
}
```

!!! danger "Policy Gate"
    Le PR UI vengono rifiutate se JSX/TSX o CSS locale introducono colori hardcoded.
    Usa solo token semantici.

## Pattern di Integrazione MDX

Usa MDX come pagina normativa e mantieni la board HTML statica come artefatto visuale completo.

Pattern consigliato:

1. Definisci policy e mapping token in MDX (questa pagina).
2. Linka la board statica per review visuale.
3. Mantieni allineate board e runtime CSS quando evolvi la palette.

Embed opzionale:

```mdx
<iframe
  title="Zenzic Brand System"
  src="/assets/brand/zenzic-brand-system.html"
  style={{ width: '100%', minHeight: 920, border: '1px solid var(--ifm-toc-border-color)', borderRadius: 'var(--ifm-pre-border-radius)' }}
/>
```

## Baseline Accessibilita

La palette e calibrata prima di tutto per leggibilita documentale.

1. Il body text deve restare nei tier Zinc (`--zenzic-ink-*`).
2. L'Indigo di brand e riservato a interazioni e stati attivi.
3. I colori di severita restano semantici e non decorativi.

## Profili Palette A/B

In `src/css/custom.css` sono disponibili due profili opzionali per validazione visuale senza refactor dei componenti.

### Attivazione

Imposta uno di questi attributi su `<html>`:

```html
<html data-zenzic-palette="corporate-calm">
<html data-zenzic-palette="technical-neon">
```

### Vantaggi e svantaggi

1. Corporate Calm
Vantaggi: tono piu enterprise, minore affaticamento visivo su letture lunghe, default piu sicuro per audience miste.
Svantaggi: minore energia percepita nelle superfici promozionali, CTA meno incisive.

2. Technical Neon
Vantaggi: maggiore percezione di modernita, stati active/hover piu evidenti, identita interattiva piu memorabile.
Svantaggi: puo risultare piu intenso su pagine dense, richiede QA accessibilita piu rigorosa sugli stati limite.
