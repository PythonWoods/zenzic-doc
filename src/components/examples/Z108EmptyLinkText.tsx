// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

const OUTPUT = `docs/index.md:10:5 ✘ [Z108] link to 'guide.md' has no label

    8  │  ## Navigation
    9  │
   10  ❱  - [](guide.md)
       │    ^^ label is empty
   11  │

exit 1`;

export default function Z108EmptyLinkText(): React.JSX.Element {
  return <ZenzicTerminal output={OUTPUT} />;
}
