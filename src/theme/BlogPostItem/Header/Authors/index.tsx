// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogPostItemHeaderAuthorsOriginal from '@theme-original/BlogPostItem/Header/Authors';
import type {Props} from '@theme/BlogPostItem/Header/Authors';

export default function BlogPostItemHeaderAuthors(
  props: Props,
): React.JSX.Element | null {
  const {metadata} = useBlogPost();
  const authors = metadata.authors ?? [];

  // Omit the whole authors block when no authors are declared.
  if (authors.length === 0) {
    return null;
  }

  return <BlogPostItemHeaderAuthorsOriginal {...props} />;
}
