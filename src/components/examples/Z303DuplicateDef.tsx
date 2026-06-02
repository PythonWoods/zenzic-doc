// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z303DuplicateDef(): React.JSX.Element {
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="zenzic check all">
      <div className="text-zinc-500 mb-4">standalone - 1 file (1 docs, 0 assets) - 0.0s - 65 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/index.md:15
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-amber-500">⚠</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z303]
        </span>
        <span className="text-zinc-300">
          Reference ID &apos;[api]&apos; is defined more than once.
        </span>
      </div>
      <div className="text-zinc-400">First definition wins (CommonMark §4.7).</div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">13</span>│ The new [API][api] includes a breaking change in `/v2/auth`.</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">14</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">15</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>[api]: https://api-v1.example.com</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">16</span>│ [api]: https://api-v2.example.com</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">17</span>│ &lt;!-- The `api` reference ID is defined twice above — once for v1, </div>
      <div className="text-zinc-400">once for v2.</div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 0 errors</span>
        <span className="text-amber-500 font-medium">⚠ 1 warnings</span>
        <span className="text-zinc-500 font-medium">ℹ 0 info</span>
        <span className="text-zinc-500">- 1 file with findings</span>
      </div>
      <div className="h-2" />
      <div className="text-emerald-500 font-bold tracking-wide mt-2">* Analysis complete: All statically-detectable links, credentials, and </div>
      <div className="text-zinc-400">references verified.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">[ Suppression Audit: 1/30 (inline: 0, per-file: 1) [MANAGED DEBT]</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 0</div>
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}
