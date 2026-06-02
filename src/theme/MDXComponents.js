// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

// Docusaurus MDX global component injection.
// Extends the default theme components with our Icon wrapper so that
// <Icon name="..." /> is available in every .md / .mdx file without
// requiring a per-file import statement.

import MDXComponents from '@theme-original/MDXComponents';
import Icon from '@site/src/components/Icon';
import SecuritySection from '@site/src/components/Homepage/SecuritySection';
import ZenzicTerminal, {
  CredentialTerminal,
  GutterTerminal,
  SummaryTerminal,
  PathTraversalGuardTerminal,
  SnippetTerminal,
  OrphanTerminal,
} from '@site/src/components/ZenzicTerminal';
import VSMVisualizer from '@site/src/components/VSMVisualizer';
import CapExceededSummary from '@site/src/components/CapExceededSummary';

export default {
  ...MDXComponents,
  Icon,
  SecuritySection,
  ZenzicTerminal,
  CredentialTerminal,
  GutterTerminal,
  SummaryTerminal,
  PathTraversalGuardTerminal,
  SnippetTerminal,
  OrphanTerminal,
  VSMVisualizer,
  CapExceededSummary,
};
