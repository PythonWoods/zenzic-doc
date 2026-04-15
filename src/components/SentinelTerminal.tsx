import React from 'react';
import Translate from '@docusaurus/Translate';

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

// ── Shield Breach Terminal ─────────────────────────────────────────────────
export function ShieldTerminal(): React.JSX.Element {
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
          <Translate id="terminal.shield.value.finding">GitHub token detected</Translate>
        </span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500">✘</span>
        <span className="w-24 text-zinc-500">
          <Translate id="terminal.shield.label.location">Location:</Translate>
        </span>
        <span className="text-zinc-200">docs/tutorial.md:42</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-rose-500">✘</span>
        <span className="w-24 text-zinc-500">
          <Translate id="terminal.shield.label.credential">Credential:</Translate>
        </span>
        <span className="bg-rose-500/10 text-rose-200 px-2 py-0.5 rounded-sm">
          ghp_************3456
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

// ── Blood Sentinel Terminal (Path Traversal) ──────────────────────────────
export function BloodSentinel(): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-rose-900/40 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-rose-600 text-xs text-center tracking-[0.2em] font-bold mb-4 border-b border-rose-900/30 pb-3">
        &#x1F6A8; BLOOD SENTINEL — PATH TRAVERSAL
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500">&#10008;</span>
        <span className="w-28 text-zinc-500">Finding:</span>
        <span className="text-rose-300 font-medium">PATH_TRAVERSAL_SUSPICIOUS</span>
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-rose-500">&#10008;</span>
        <span className="w-28 text-zinc-500">Location:</span>
        <span className="text-zinc-200">docs/setup.md:18</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-rose-500">&#10008;</span>
        <span className="w-28 text-zinc-500">Target:</span>
        <span className="bg-rose-500/10 text-rose-200 px-2 py-0.5 rounded-sm">/etc/passwd</span>
      </div>
      <div className="flex items-start gap-3 mt-4 pt-4 border-t border-rose-900/20">
        <span className="w-28 text-zinc-600 pt-0.5">Exit code:</span>
        <span className="text-rose-400 font-bold">3</span>
      </div>
    </div>
  );
}

// ── Snippet Error Terminal ────────────────────────────────────────────────
export function SnippetTerminal(): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        docs/tutorial.md
      </div>
      <div className="flex gap-3 mb-4">
        <span className="text-rose-500">&#10008;</span>
        <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">[SYNTAX_ERROR]</span>
        <span className="text-zinc-300">Python block at line 24 fails to compile</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">23</span>&#9474; ```python</div>
      <div className="text-zinc-300 flex bg-zinc-800/30 -mx-6 px-6 py-0.5">
        <span className="w-6 text-right mr-3 text-rose-500 font-bold">24</span>
        <span className="text-rose-500 mr-1 font-bold">&#10145;</span>
        <span>def hello(name</span>
      </div>
      <div className="text-zinc-600 flex"><span className="w-6 text-right mr-3">25</span>&#9474;     print(f&quot;Hello &#123;name&#125;&quot;)</div>
    </div>
  );
}

// ── Orphan Finder Terminal ────────────────────────────────────────────────
export function OrphanTerminal(): React.JSX.Element {
  return (
    <div
      className="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed"
    >
      <div className="text-zinc-500 mb-3 border-b border-zinc-800/40 pb-2 font-medium">
        Orphan Detection
      </div>
      <div className="flex gap-3 mb-2">
        <span className="text-amber-500">&#9888;</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm">[ORPHAN]</span>
        <span className="text-zinc-300">docs/old-guide.md</span>
      </div>
      <div className="flex gap-3 mb-2">
        <span className="text-amber-500">&#9888;</span>
        <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm">[ORPHAN]</span>
        <span className="text-zinc-300">docs/drafts/wip-page.md</span>
      </div>
      <div className="mt-4 pt-3 border-t border-zinc-800/40 text-zinc-500">
        2 files on disk but absent from site navigation
      </div>
    </div>
  );
}
