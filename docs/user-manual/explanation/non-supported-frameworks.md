---
title: "Non-Supported Frameworks"
sidebar_label: "Non-Supported Frameworks"
sidebar_position: 11
description: "Why Zenzic does not support React-based SPA frameworks like Docusaurus, and the architectural boundaries of static analysis."
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

# Non-Supported Frameworks

Zenzic is designed for **static content analysis** of Markdown source files. It enforces structural integrity, link correctness, and security invariants by parsing source files in isolation.

Because of this architecture, Zenzic does not support React-based Single-Page Application (SPA) documentation frameworks—most notably **Docusaurus**.

---

## The Architectural Mismatch

Documentation frameworks like Docusaurus are not static Markdown engines. They are React applications that compile Markdown (and MDX) into JavaScript bundles.

This creates several ontological limits for static analysis:

1. **Dynamic Route Generation:** In an SPA framework, routes (such as tags, paginated archives, and author profiles) do not map to physical files. They are generated dynamically at runtime from frontmatter metadata.
2. **React-Injected Identifiers:** Anchors and element IDs are often generated dynamically by React components (e.g., `<APITable>`) during rendering. These IDs do not exist in the Markdown source, making them invisible to a static parser.
3. **MDX Partial Merging:** MDX allows files to import and embed partial content dynamically. Anchor references defined in imported partials are resolved only at bundle-time.

To validate these structures correctly, Zenzic would need to execute a Node.js runtime, build the Webpack/React dependency graph, and run the full compilation pipeline. Doing so would destroy Zenzic's core value proposition: **speed, zero-dependency execution, and static determinism.**

---

## Dropping Docusaurus Support

Docusaurus support was officially deprecated and removed in Zenzic v0.12.0. We chose to enforce a strict boundary: Zenzic validates universal, static Markdown engines (such as MkDocs, Zensical, or plain standalone directories) and does not attempt to parse compiled SPA runtimes.

For a detailed analysis of the engineering limits and the decisions behind this change, see the blog post:
[Why We Dropped Docusaurus: The Ontological Limits of Static Analysis](../../blog/2026-06-13-why-we-dropped-docusaurus.md).
