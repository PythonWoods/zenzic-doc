// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

const OUTPUT = `docs/index.md:11:31 ✘ [Z102] guide.md#nonexistent-section — anchor not found on target page

    9  │  ## Broken Anchor Reference
   10  │
   11  ❱  - [Nonexistent Section](guide.md#nonexistent-section)
       │                               ^^^^^^^^^^^^^^^^^^^^
   12  │

exit 1`;

export default function Z102AnchorMissing(): React.JSX.Element {
  return <ZenzicTerminal output={OUTPUT} />;
}
