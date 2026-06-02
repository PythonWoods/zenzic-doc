// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

const OUTPUT = `docs/index.md:10:5 ✘ [Z105] '/guide' uses absolute path

    8  │  ## Navigation
    9  │
   10  ❱  - [Guide](/guide)
       │            ^^^^^^
   11  │

exit 1`;

export default function Z105AbsolutePath(): React.JSX.Element {
  return <ZenzicTerminal output={OUTPUT} />;
}
