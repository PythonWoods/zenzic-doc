// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

/**
 * TerminalWindow — macOS-style terminal frame for SVG terminal assets.
 *
 * Usage in MDX (globally available — no import required):
 *
 *   <TerminalWindow title="zenzic check all">
 *     <img src="/assets/terminal/zenzic-clean.svg" alt="Zenzic Audit Badge — 100/100" />
 *   </TerminalWindow>
 *
 * Props:
 *   title  — text shown in the title bar (default: "zenzic")
 *   alt    — optional subtitle shown next to the dots
 */

import React from 'react';

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
}

export default function TerminalWindow({
  title = 'zenzic',
  children,
}: TerminalWindowProps): React.JSX.Element {
  return (
    <div className="zz-terminal-frame rounded-xl overflow-hidden my-6 font-mono">
      {/* Title bar */}
      <div className="zz-terminal-titlebar relative flex items-center gap-2 px-3.5 py-2">
        {/* Traffic-light dots — Zenzic semantic palette */}
        <span className="inline-block flex-shrink-0 w-2.5 h-2.5 rounded-full bg-rose-500" />
        <span className="inline-block flex-shrink-0 w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="inline-block flex-shrink-0 w-2.5 h-2.5 rounded-full bg-emerald-500" />
        {/* Title — centered over full bar width via absolute positioning */}
        <span className="absolute inset-x-0 text-center text-[11px] text-white/45 tracking-[0.04em] pointer-events-none">
          {title}
        </span>
      </div>

      {/* Content area — bg-zinc-950 = var(--zenzic-slate-900) = #09090b */}
      <div className="bg-zinc-950 leading-none block">
        {children}
      </div>
    </div>
  );
}
