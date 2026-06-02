// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z204ForbiddenTerm(): React.JSX.Element {
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="zenzic check security">
      <div className="text-rose-500 font-semibold mb-2">✘ POLICY VIOLATION DETECTED</div>
      <div className="space-y-1 mb-3">
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Finding:</span> Forbidden term detected — remove from documentation: &apos;ProjectX&apos;</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Location:</span> docs/index.md:11</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Term:</span> ProjectX</div>
      </div>
      <div className="text-zinc-400 mb-4"><span className="text-zinc-500 font-semibold">Action:</span> Remove this term from the documentation or update the forbidden_patterns list in .zenzic.local.toml. </div>
      <div className="text-rose-500 font-semibold mb-2">✘ POLICY VIOLATION DETECTED</div>
      <div className="space-y-1 mb-3">
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Finding:</span> Forbidden term detected — remove from documentation:</div>
        <div className="text-zinc-300">&apos;staging.internal.corp&apos;</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Location:</span> docs/index.md:15</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Term:</span> staging.internal.corp</div>
      </div>
      <div className="text-zinc-400 mb-4"><span className="text-zinc-500 font-semibold">Action:</span> Remove this term from the documentation or update the forbidden_patterns list in .zenzic.local.toml. </div>
      <div className="text-rose-500 font-semibold mb-2">✘ POLICY VIOLATION DETECTED</div>
      <div className="space-y-1 mb-3">
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Finding:</span> Forbidden term detected — remove from documentation: &apos;ProjectX&apos;</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Location:</span> docs/index.md:20</div>
        <div className="text-zinc-300"><span className="text-rose-500 mr-2">x</span><span className="text-zinc-500 w-24 inline-block">Term:</span> ProjectX</div>
      </div>
      <div className="text-zinc-400 mb-4"><span className="text-zinc-500 font-semibold">Action:</span> Remove this term from the documentation or update the forbidden_patterns list in .zenzic.local.toml. </div>
      <div className="text-zinc-500 mb-4">standalone - 1 file (1 docs, 0 assets) - 0.0s - 62 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 3 policy violations</span>
        <span className="text-zinc-500">- 1 file impacted</span>
        <span className="text-rose-500 font-medium">✘ 0 errors</span>
        <span className="text-amber-500 font-medium">⚠ 0 warnings</span>
        <span className="text-zinc-500">i</span>
      </div>
      <div className="text-zinc-400">0 info  - 0 files with findings</div>
      <div className="h-2" />
      <div className="text-rose-500 font-bold tracking-wide mt-2">FAILED: Policy violations detected. Exit code 2 is mandatory.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">[ Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 2</div>
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}
