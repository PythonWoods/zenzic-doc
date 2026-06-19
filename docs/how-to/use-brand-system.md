---
sidebar_label: Use the Brand System
description: "How to use Zenzic's semantic tokens in React components and MDX."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Use the Brand System

The Zenzic visual language is token-first. All UI colors must be consumed through semantic CSS variables defined in `src/css/custom.css`.

## React Components Contract

Every React component must use `var(--zenzic-*)` tokens for:

1. Surface/background
2. Text hierarchy
3. Borders and outlines
4. Semantic states (`success`, `warning`, `error`, `fatal`)

### Approved token families

- `--zenzic-brand-*` for action identity and active emphasis
- `--zenzic-ink-*` for text contrast hierarchy
- `--zenzic-bg-*` for translucent layered surfaces
- `--zenzic-border-*` for separators and component framing
- `--zenzic-success|warning|error|fatal` for severity semantics

### React usage example

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
    UI pull requests are rejected if JSX/TSX or local CSS introduces hardcoded color literals. Use semantic tokens only.

## MDX Integration Pattern

Use MDX as the normative page and keep the static HTML board as the full visual artifact.

Recommended pattern:

1. Explain policy and token mapping in MDX.
2. Link to the static board for visual review.
3. Keep both aligned when editing palette decisions.

Optional embed:

```mdx
<iframe
  title="Zenzic Brand System"
  src="/assets/brand/zenzic-brand-system.html"
  style={{ width: '100%', minHeight: 920, border: '1px solid var(--ifm-toc-border-color)', borderRadius: 'var(--ifm-pre-border-radius)' }}
/>
```

## Accessibility Baseline

The palette is tuned for documentation readability first.

1. Body text must stay in Zinc tiers (`--zenzic-ink-*`) to preserve long-read comfort.
2. Brand Indigo is for interaction and active state cues, not full-paragraph prose.
3. Severity colors must remain semantic and not be reused as decorative accents.

## A/B Palette Profiles

Two optional profiles are available in `src/css/custom.css` for visual validation without component refactors.

### Activation

Set one of these attributes on `<html>`:

```html
<html data-zenzic-palette="corporate-calm">
<html data-zenzic-palette="technical-neon">
```

### Advantages and disadvantages

1. Corporate Calm
Pros: stronger enterprise tone, lower visual fatigue in long reading sessions, safer default for mixed audiences.
Cons: lower perceived energy on marketing-like surfaces, less aggressive CTA pop.

2. Technical Neon
Pros: higher perceived modernity, stronger active/hover cues, more memorable interaction identity.
Cons: can feel more intense on dense pages, requires stricter accessibility QA on edge states.
