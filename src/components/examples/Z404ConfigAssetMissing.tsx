// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z404ConfigAssetMissing(): React.JSX.Element {
  // REUSE-IgnoreStart
  return (
    <ZenzicTerminal title="zenzic check all">
      <div className="text-zinc-500 mb-4">mkdocs - 2 files (2 docs, 0 assets) - 0.0s - 116 files/s</div>
      <div className="h-2" />
      <div className="text-zinc-500 mb-1 border-b border-zinc-800/40 pb-1 font-medium mt-6 first:mt-0">
        docs/docs/assets/logo.svg
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-amber-500">⚠</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm whitespace-nowrap">
          [Z404]
        </span>
        <span className="text-zinc-300">
          logo asset not found on disk: &apos;docs/assets/logo.svg&apos; (declared as
          theme.logo: &apos;assets/logo.svg&apos; in mkdocs.yml) [Z404]
        </span>
      </div>
      <div className="h-2" />
      <div className="text-zinc-700 my-4 select-none">────────────────────────────────────────────────────────────────────────────────</div>
      <div className="h-2" />
      <div className="flex flex-wrap gap-4 mt-4">
        Summary:
        <span className="text-rose-500 font-medium">✘ 0 errors</span>
        <span className="text-amber-500 font-medium">⚠ 1 warning</span>
        <span className="text-zinc-500 font-medium">ℹ 0 info</span>
        <span className="text-zinc-500">- 1 file with findings</span>
      </div>
      <div className="h-2" />
      <div className="text-emerald-500 font-bold tracking-wide mt-2">✨ Analysis complete: All statically-detectable links, credentials, and references verified.</div>
      <div className="text-zinc-500 mt-1">Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try </div>
      <div className="text-zinc-400">&apos;zenzic check --help&apos; for options.</div>
      <div className="text-zinc-500 mt-1">🔒 Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
      <div className="mt-4 text-zinc-500 font-bold">exit 0</div>
    </ZenzicTerminal>
  );
  // REUSE-IgnoreEnd
}
