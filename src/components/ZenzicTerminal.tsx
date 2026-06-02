// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Translate from '@docusaurus/Translate';

export interface ZenzicTerminalProps {
  title?: string;
  output?: string;
  children?: React.ReactNode;
}

export default function ZenzicTerminal({
  title = 'zenzic check links',
  output,
  children,
}: ZenzicTerminalProps): React.JSX.Element {
  return (
    <div className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl overflow-hidden font-mono text-[12px] leading-relaxed">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800/40 bg-zinc-900/30">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-zinc-500 text-[11px] tracking-wide">{title}</span>
      </div>
      <div className="px-5 py-4 text-zinc-300 whitespace-pre-wrap break-words">
        {output ?? children}
      </div>
    </div>
  );
}

// ── Gutter Reporter Terminal ───────────────────────────────────────────────
export function GutterTerminal(): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        docs/guide.md
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">
          [FILE_NOT_FOUND]
        </span>
        <span className="text-zinc-300">
          <Translate id="terminal.gutter.finding">&apos;intro.md&apos; not reachable from nav</Translate>
        </span>
      </div>
      <div className="text-zinc-600 flex">
        <span className="w-6 text-right mr-3">15</span>│{' '}
        <Translate id="terminal.gutter.line15">before continuing.</Translate>
      </div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">16</span>
        <span className="text-rose-500 mr-1 font-bold">❱</span>
        <Translate id="terminal.gutter.line16">See the getting started page for details.</Translate>
      </div>
      <div className="text-zinc-600 flex">
        <span className="w-6 text-right mr-3">17</span>│{' '}
        <Translate id="terminal.gutter.line17">Then configure your environment.</Translate>
      </div>
    </div>
  );
}

export interface CredentialTerminalProps {
  finding?: string;
  location?: string;
  credential?: string;
}

// ── Credential Scanner Terminal ────────────────────────────────────────────
export function CredentialTerminal({
  finding = "GitHub token detected",
  location = "docs/tutorial.md:42",
  credential = "ghp_************3456",
}: CredentialTerminalProps): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-rose-900/30 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-rose-500/90 text-xs text-center tracking-[0.2em] font-bold mb-4 border-b border-rose-900/20 pb-3">
        <Translate id="terminal.shield.header">SECURITY BREACH DETECTED</Translate>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500">✘</span>
        <span className="w-24 text-zinc-500">
          <Translate id="terminal.shield.label.finding">Finding:</Translate>
        </span>
        <span className="text-zinc-200">
          <Translate id="terminal.shield.value.finding">{finding}</Translate>
        </span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500">✘</span>
        <span className="w-24 text-zinc-500">
          <Translate id="terminal.shield.label.location">Location:</Translate>
        </span>
        <span className="text-zinc-200">{location}</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="w-24 text-zinc-500">
          <Translate id="terminal.shield.label.credential">Credential:</Translate>
        </span>
        <span className="bg-rose-500/10 text-rose-200 px-2 py-0.5 rounded-sm">
          {credential}
        </span>
      </div>
      <div className="flex items-start gap-3 mt-4 pt-4 border-t border-rose-900/20">
        <span className="w-24 text-zinc-600 pt-0.5">
          <Translate id="terminal.shield.label.action">Action:</Translate>
        </span>
        <span className="text-zinc-400">
          <Translate id="terminal.shield.value.action">
            Rotate this credential immediately and purge it from the repository history.
          </Translate>
        </span>
      </div>
    </div>
  );
}

// ── Severity Summary Terminal ──────────────────────────────────────────────
export function SummaryTerminal(): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="flex gap-6 mb-4 border-b border-zinc-800/40 pb-4">
        <span className="text-rose-500 font-medium">
          <Translate id="terminal.summary.errors">✘ 2 errors</Translate>
        </span>
        <span className="text-amber-500 font-medium">
          <Translate id="terminal.summary.warnings">⚠ 1 warning</Translate>
        </span>
        <span className="text-zinc-500">
          <Translate id="terminal.summary.files">• 1 file with findings</Translate>
        </span>
      </div>
      <div className="text-rose-500 font-bold tracking-wide">
        <Translate id="terminal.summary.verdict">FAILED: One or more checks failed.</Translate>
      </div>
    </div>
  );
}

export interface PathTraversalGuardTerminalProps {
  finding?: string;
  location?: string;
  target?: string;
  exitCode?: string;
}

// ── Path Traversal Guard Terminal (Path Traversal) ────────────────────────────
export function PathTraversalGuardTerminal({
  finding = "PATH_TRAVERSAL_SUSPICIOUS",
  location = "docs/setup.md:18",
  target = "/etc/passwd",
  exitCode = "3",
}: PathTraversalGuardTerminalProps): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-rose-900/40 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-rose-500 text-xs text-center tracking-[0.2em] font-bold mb-4 border-b border-rose-900/30 pb-3">
        &#x1F6AB; PATH TRAVERSAL GUARD — PATH TRAVERSAL
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500 flex-shrink-0">&#10008;</span>
        <span className="w-28 text-zinc-500 flex-shrink-0">Finding:</span>
        <span className="text-rose-300 font-medium min-w-0 break-all">{finding}</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500 flex-shrink-0">&#10008;</span>
        <span className="w-28 text-zinc-500 flex-shrink-0">Location:</span>
        <span className="text-zinc-200 min-w-0 break-all">{location}</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-rose-500 flex-shrink-0">&#10008;</span>
        <span className="w-28 text-zinc-500 flex-shrink-0">Target:</span>
        <span className="bg-rose-500/10 text-rose-200 px-2 py-0.5 rounded-sm min-w-0 break-all">{target}</span>
      </div>
      <div className="flex items-start gap-3 mt-4 pt-4 border-t border-rose-900/20">
        <span className="w-28 text-zinc-600 pt-0.5 flex-shrink-0">Exit code:</span>
        <span className="text-rose-400 font-bold">{exitCode}</span>
      </div>
    </div>
  );
}

export interface SnippetLine {
  num: string;
  text: string;
}

export interface SnippetTerminalProps {
  location?: string;
  message?: string;
  line1?: SnippetLine;
  line2?: SnippetLine;
  line3?: SnippetLine;
}

// ── Snippet Error Terminal ────────────────────────────────────────────────
export function SnippetTerminal({
  location = "docs/tutorial.md",
  message = "Python block at line 24 fails to compile",
  line1 = { num: "23", text: "```python" },
  line2 = { num: "24", text: "def hello(name" },
  line3 = { num: "25", text: "    print(f\"Hello {name}\")" },
}: SnippetTerminalProps): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        {location}
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">&#10008;</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">[SYNTAX_ERROR]</span>
        <span className="text-zinc-300">{message}</span>
      </div>
      {line1.num && (
        <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">{line1.num}</span>&#9474; {line1.text}</div>
      )}
      {line2.num && (
        <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
          <span className="w-6 text-right mr-3 text-rose-500 font-bold">{line2.num}</span>
          <span className="text-rose-500 mr-1 font-bold">&#10145;</span>
          <span>{line2.text}</span>
        </div>
      )}
      {line3.num && (
        <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">{line3.num}</span>&#9474; {line3.text}</div>
      )}
    </div>
  );
}

export interface OrphanTerminalProps {
  files?: string[];
  message?: string;
}

// ── Orphan Finder Terminal ────────────────────────────────────────────────
export function OrphanTerminal({
  files = ["docs/old-guide.md", "docs/drafts/wip-page.md"],
  message = "2 files on disk but absent from site navigation",
}: OrphanTerminalProps): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        Orphan Detection
      </div>
      {files.map((file, i) => (
        <div key={i} className="flex gap-3 mb-2">
          <span className="text-amber-500">&#9888;</span>
          <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm">[ORPHAN]</span>
          <span className="text-zinc-300">{file}</span>
        </div>
      ))}
      <div className="mt-4 pt-3 border-t border-zinc-800/40 text-zinc-500">
        {message}
      </div>
    </div>
  );
}
