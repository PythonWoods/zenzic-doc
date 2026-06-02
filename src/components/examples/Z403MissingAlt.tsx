// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z403MissingAlt(): React.JSX.Element {
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="zenzic check all">
      <div className="text-zinc-500 mb-4">standalone - 2 files (1 docs, 1 assets) - 0.0s - 123 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/index.md:14
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-amber-500">⚠</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z403]
        </span>
        <span className="text-zinc-300">
          Image &apos;diagram.png&apos; has no alt text.
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">12</span>│ The following diagram shows the system components:</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">13</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">14</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>![](diagram.png)</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">15</span>│ </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">16</span>│ The `![](diagram.png)` syntax above has an empty alt attribute → </div>
      <div className="text-zinc-400">**Z403**.</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/index.md:16
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-amber-500">⚠</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z403]
        </span>
        <span className="text-zinc-300">
          Image &apos;diagram.png&apos; has no alt text.
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">14</span>│ ![](diagram.png)</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">15</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">16</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>The `![](diagram.png)` syntax above has an empty alt attribute → </span>
      </div>
      <div className="text-zinc-400">**Z403**.</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">17</span>│ </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">18</span>│ ## What Zenzic Reports</div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 0 errors</span>
        <span className="text-amber-500 font-medium">⚠ 2 warnings</span>
        <span className="text-zinc-500 font-medium">ℹ 0 info</span>
        <span className="text-zinc-500">- 1 file with findings</span>
      </div>
      <div className="h-2" />
      <div className="text-emerald-500 font-bold tracking-wide mt-2">* Analysis complete: All statically-detectable links, credentials, and </div>
      <div className="text-zinc-400">references verified.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">[ Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 0</div>
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}
