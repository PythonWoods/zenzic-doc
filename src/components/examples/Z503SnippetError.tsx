// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z503SnippetError(): React.JSX.Element {
  return (
    <ZenzicTerminal title="zenzic check all">
      <div className="text-zinc-500 mb-4">standalone - 1 file (1 docs, 0 assets) - 0.0s - 60 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/index.md:14
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z503]
        </span>
        <span className="text-zinc-300">
          SyntaxError in Python snippet — &apos;(&apos; was never closed
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">12</span>│ Use the `compute_total` function to sum a list of prices:</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">13</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">14</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>def compute_total(</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3"> </span>│                 <span className="text-rose-500">^</span></div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">15</span>│     items =   # SyntaxError: incomplete expression</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">16</span>│ </div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 1 error</span>
        <span className="text-amber-500 font-medium">⚠ 0 warnings</span>
        <span className="text-zinc-500 font-medium">ℹ 0 info</span>
        <span className="text-zinc-500">- 1 file with findings</span>
      </div>
      <div className="h-2" />
      <div className="text-rose-500 font-bold tracking-wide mt-2">FAILED: Hard errors detected. Exit code 1 is mandatory.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">[ Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 1</div>
    </ZenzicTerminal>
  );
}
