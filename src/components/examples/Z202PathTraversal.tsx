// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z202PathTraversal(): React.JSX.Element {
  return (
    <ZenzicTerminal>
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium mt-6 first:mt-0">
        docs/index.md:11:2
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z202]
        </span>
        <span className="text-zinc-300">
          &apos;../../private/secret.txt&apos; resolves outside the  docs directory
        </span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">9</span>│ ## Traversal Link</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">10</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">11</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>- [Config](../../private/secret.txt) — this link escapes `docs/` via </span>
      </div>
      <div className="text-zinc-400">`../..` → **Z202**</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3"> </span>│ <span className="text-rose-500">^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</span></div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">12</span>│ </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">13</span>│ ## What Zenzic Reports</div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 1</div>
    </ZenzicTerminal>
  );
}
