// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

// Docusaurus MDX global component injection.
// Extends the default theme components with our Icon wrapper so that
// <Icon name="..." /> is available in every .md / .mdx file without
// requiring a per-file import statement.

import MDXComponents from '@theme-original/MDXComponents';
import Icon from '@site/src/components/Icon';
import SecuritySection from '@site/src/components/Homepage/SecuritySection';
import TerminalWindow from '@site/src/components/TerminalWindow';
import ZenzicOutput from '@site/src/components/ZenzicOutput';
import VSMVisualizer from '@site/src/components/VSMVisualizer';

export default {
  ...MDXComponents,
  Icon,
  SecuritySection,
  TerminalWindow,
  ZenzicOutput,
  VSMVisualizer,
};
