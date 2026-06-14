---
title: "MDX Asset Componentization Rationale"
sidebar_label: "MDX Asset Rationale"
description: "Architectural rationale for using React components instead of static SVGs in MDX pages."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# MDX Asset Componentization Rationale

Vector assets intended for exclusive use within MDX pages must be implemented as React components (`.tsx`) rather than static `.svg` files (Directive ZRT-DOC-010).

This rule exists due to several critical limitations of static `.svg` files within a React application environment:

- **Theme Agnosticism:** Static `.svg` files cannot read runtime CSS variables (like `--ifm-color-*`) or easily react to light/dark mode transitions without manual style overrides or duplicate asset files.
- **i18n Barriers:** Text inside an SVG file is baked into the XML nodes. This prevents the use of translation wrappers like `<Translate>` and requires maintaining duplicate localized files for every language.
- **Data Synchronization:** Static SVGs must be manually updated when underlying data models change, leading to technical drift and errors. React components can import and dynamically render variables from a single source of truth.

## Permitted and Forbidden SVG Uses

| Use Case | Status | Reason |
| :--- | :---: | :--- |
| **OpenGraph Social Cards** (`static/assets/social/`) | Permitted (✓) | Consumed directly by `<meta og:image>`, not inside the React layout |
| **GitHub README Illustrations** | Permitted (✓) | Rendered by GitHub's Markdown processor outside Docusaurus context |
| **Pure Graphics** (logos, simple shapes) | Permitted (✓) | No text nodes or localized data requiring translations |
| **Text-Bearing Illustrations inside MDX** | Forbidden (❌) | Must use a `.tsx` component to support i18n and styling |
