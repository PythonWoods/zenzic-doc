// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import ZenzicTerminal from '../ZenzicTerminal';

export default function Z105AbsolutePath(): React.JSX.Element {
  return (
    <ZenzicTerminal>
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        docs/index.md:10:5
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">
          [Z105]
        </span>
        <span className="text-zinc-300">
          &apos;/guide&apos; uses absolute path
        </span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">8</span>│ ## Navigation</div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">9</span>│</div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">10</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <span>- [Guide](/guide)</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3"> </span>│           <span className="text-rose-500">^^^^^^</span></div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">11</span>│</div>
      <div className="mt-4 text-rose-500 font-bold">exit 1</div>
    </ZenzicTerminal>
  );
}
