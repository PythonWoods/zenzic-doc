// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

const OUTPUT = `docs/index.md:7:20 ✘ [Z101] [missing.md] target not found on disk

    5  │  ## Broken References
    6  │
    7  ❱  - [Getting Started](missing.md)
       │                     ^^^^^^^^^^
    8  │  - [Setup Guide](guide/setup.md)
    9  │

docs/index.md:8:18 ✘ [Z101] [guide/setup.md] target not found on disk

    6  │
    7  │  - [Getting Started](missing.md)
    8  ❱  - [Setup Guide](guide/setup.md)
       │                 ^^^^^^^^^^^^^^
    9  │

exit 1`;

export default function Z101BrokenLinks(): React.JSX.Element {
  return <ZenzicTerminal output={OUTPUT} />;
}
