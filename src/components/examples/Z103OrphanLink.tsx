// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

const OUTPUT = `docs/index.md:16:13 ⚠ [Z103] 'guide.md' exists but is not reachable via site navigation

   14  │  The following link points to a page that exists on disk but has no nav entry:
   15  │
   16  ❱  - [Guide](guide.md)
       │             ^^^^^^^^
   17  │

exit 1`;

export default function Z103OrphanLink(): React.JSX.Element {
  return <ZenzicTerminal output={OUTPUT} />;
}
