// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z503SnippetError(): React.JSX.Element {
  return (
    <ZenzicTerminal>
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium mt-6 first:mt-0">
        docs/index.md:14
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z503]
        </span>
        <span className="text-zinc-300">
          SyntaxError in Python snippet — &apos;(&apos; was never  closed
        </span>
      </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 1</div>
    </ZenzicTerminal>
  );
}
