// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

// Docusaurus MDX global component injection.
// Extends the default theme components with our Icon wrapper so that
// <Icon name="..." /> is available in every .md / .mdx file without
// requiring a per-file import statement.

import MDXComponents from '@theme-original/MDXComponents';
import Icon from '@site/src/components/Icon';
import SentinelSection from '@site/src/components/Homepage/SentinelSection';

export default {
  ...MDXComponents,
  Icon,
  SentinelSection,
};
