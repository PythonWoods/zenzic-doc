// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z108EmptyLinkText(): React.JSX.Element {
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="zenzic check links">
      <div className="text-zinc-500 mb-4">standalone - 2 files (2 docs, 0 assets) - 0.0s - 120 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/guide.md:4
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-amber-500">⚠</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z502]
        </span>
        <span className="text-zinc-300">
          Page has only 25 words (minimum 50).
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">2</span>│ &lt;!-- SPDX-License-Identifier: Apache-2.0 --&gt;</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">3</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">4</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span># Guide</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">5</span>│ </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">6</span>│ This guide page exists on disk so that `[](guide.md)` in `index.md` </div>
      <div className="text-zinc-400">does not</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/index.md:10:2
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z108]
        </span>
        <span className="text-zinc-300">
          link label is empty or whitespace-only
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">8</span>│ ## Empty Link</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">9</span>│ </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">10</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>- [](guide.md) — empty label (no visible text for screen readers) → </span>
      </div>
      <div className="text-zinc-400">**Z108**</div>
      <div className="text-zinc-400">        │    </div>
      <div className="text-zinc-400">^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">11</span>│ </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">12</span>│ ## What Zenzic Reports</div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 1 errors</span>
        <span className="text-amber-500 font-medium">⚠ 1 warnings</span>
        <span className="text-zinc-500 font-medium">ℹ 0 info</span>
        <span className="text-zinc-500">- 2 files with findings</span>
      </div>
      <div className="h-2" />
      <div className="text-rose-500 font-bold tracking-wide mt-2">FAILED: Hard errors detected. Exit code 1 is mandatory.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">[ Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 1</div>
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}
