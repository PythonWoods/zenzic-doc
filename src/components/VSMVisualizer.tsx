// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

/**
 * VSMVisualizer — Auditor Visivo del Virtual Site Map.
 *
 * Renders a hierarchical tree of the VSM distinguishing:
 *   - Physical Nodes  — real Markdown files on disk (📄)
 *   - Virtual Routes  — routes generated from frontmatter metadata (🏷 tag,
 *                       📑 pagination, 👤 author), with in-place disclosure
 *                       of the source_files that produced them (Reverse-Mapping).
 *
 * Usage in MDX (globally registered — no import required):
 *
 *   <VSMVisualizer roots={["docs", "blog"]} />
 *   <VSMVisualizer roots={["docs", "blog"]} virtual />
 *   <VSMVisualizer roots={["docs"]} nodes={customNodes} />
 *
 * Design invariant: every virtual node exposes its source_files on expansion.
 * A virtual route with an empty source_files set is rendered with a ⚠ marker
 * (Reverse-Mapping violation — should never appear in a passing audit).
 *
 * Tailwind Invariant (RULE): Never interpolate class names dynamically.
 * All state-specific classes are static string literals for Tailwind JIT.
 */

import React, { useState } from 'react';

// ── Public types ─────────────────────────────────────────────────────────────

export type NodeKind =
  | 'physical'          // real file on disk
  | 'tag'               // /blog/tags/{slug}/
  | 'tag_index'         // /blog/tags/
  | 'pagination'        // /blog/page/{n}/
  | 'author'            // /blog/authors/{id}/
  | 'author_index'      // /blog/authors/
  | 'dir';              // directory grouping node (not a route itself)

export interface VSMNode {
  /** Display label (file path, tag name, author id, …) */
  label: string;
  /** Canonical URL in the VSM (e.g. "/docs/tutorial/", "/blog/tags/python/") */
  url?: string;
  /** Node kind — drives icon and colour */
  kind: NodeKind;
  /**
   * For virtual nodes: the physical source files that produced this route.
   * Implements the Reverse-Mapping invariant: every URL in the VSM must trace
   * back unambiguously to ≥1 physical file.
   * Empty set = Reverse-Mapping violation (rendered with ⚠ marker).
   */
  sourceFiles?: string[];
  /** Child nodes (physical children or grouped virtual routes) */
  children?: VSMNode[];
}

interface VSMVisualizerProps {
  /**
   * Root directories included in the scan (e.g. `["docs", "blog"]`).
   * Each root becomes a top-level dir node in the tree.
   */
  roots: string[];
  /**
   * When true, show virtual route nodes (tags, pagination, authors).
   * Defaults to false — renders physical tree only.
   */
  virtual?: boolean;
  /**
   * Override the default demo node tree.
   * When omitted, a canonical demo tree is rendered that showcases all node
   * kinds including virtual routes with source_files.
   */
  nodes?: VSMNode[];
}

// ── Default demo tree ────────────────────────────────────────────────────────

const DEMO_PHYSICAL: VSMNode[] = [
  {
    label: 'docs/',
    kind: 'dir',
    children: [
      { label: 'index.mdx', url: '/docs/', kind: 'physical' },
      {
        label: 'tutorials/',
        kind: 'dir',
        children: [
          { label: 'first-audit.mdx', url: '/docs/tutorials/first-audit', kind: 'physical' },
          { label: 'examples.mdx',    url: '/docs/tutorials/examples',    kind: 'physical' },
        ],
      },
      {
        label: 'reference/',
        kind: 'dir',
        children: [
          { label: 'finding-codes.mdx', url: '/docs/reference/finding-codes', kind: 'physical' },
          { label: 'cli.mdx',           url: '/docs/reference/cli',           kind: 'physical' },
        ],
      },
    ],
  },
  {
    label: 'blog/',
    kind: 'dir',
    children: [
      { label: '2026-05-07-log-v070-quartz.mdx',              url: '/blog/log-v070-quartz-maturity',         kind: 'physical' },
      { label: '2026-05-10-v080-basalt-namespace-contract.mdx', url: '/blog/v080-basalt-namespace-contract', kind: 'physical' },
    ],
  },
];

const DEMO_VIRTUAL: VSMNode[] = [
  {
    label: '/blog/tags/',
    kind: 'tag_index',
    url: '/blog/tags/',
    sourceFiles: ['blog/2026-05-07-log-v070-quartz.mdx', 'blog/2026-05-10-v080-basalt-namespace-contract.mdx'],
  },
  {
    label: '/blog/tags/ci-cd/',
    kind: 'tag',
    url: '/blog/tags/ci-cd/',
    sourceFiles: ['blog/2026-05-07-log-v070-quartz.mdx'],
  },
  {
    label: '/blog/tags/zenzic/',
    kind: 'tag',
    url: '/blog/tags/zenzic/',
    sourceFiles: ['blog/2026-05-07-log-v070-quartz.mdx', 'blog/2026-05-10-v080-basalt-namespace-contract.mdx'],
  },
  {
    label: '/blog/page/1/',
    kind: 'pagination',
    url: '/blog/page/1/',
    sourceFiles: ['blog/2026-05-07-log-v070-quartz.mdx', 'blog/2026-05-10-v080-basalt-namespace-contract.mdx'],
  },
  {
    label: '/blog/authors/',
    kind: 'author_index',
    url: '/blog/authors/',
    sourceFiles: ['blog/2026-05-07-log-v070-quartz.mdx'],
  },
];

// ── Node kind config ─────────────────────────────────────────────────────────

interface KindConfig {
  icon: string;
  labelClass: string;
  badgeClass: string;
  badgeText: string;
}

const KIND_CONFIG: Record<NodeKind, KindConfig> = {
  physical: {
    icon: '📄',
    labelClass: 'dark:text-zinc-300 text-zinc-700',
    badgeClass: 'dark:bg-emerald-900/30 bg-emerald-100 dark:text-emerald-300 text-emerald-700',
    badgeText: 'physical',
  },
  dir: {
    icon: '📁',
    labelClass: 'dark:text-zinc-400 text-zinc-500 font-semibold',
    badgeClass: '',
    badgeText: '',
  },
  tag: {
    icon: '🏷',
    labelClass: 'dark:text-indigo-300 text-indigo-700',
    badgeClass: 'dark:bg-indigo-900/30 bg-indigo-100 dark:text-indigo-300 text-indigo-700',
    badgeText: 'virtual · tag',
  },
  tag_index: {
    icon: '🏷',
    labelClass: 'dark:text-indigo-300 text-indigo-700',
    badgeClass: 'dark:bg-indigo-900/30 bg-indigo-100 dark:text-indigo-300 text-indigo-700',
    badgeText: 'virtual · tag index',
  },
  pagination: {
    icon: '📑',
    labelClass: 'dark:text-violet-300 text-violet-700',
    badgeClass: 'dark:bg-violet-900/30 bg-violet-100 dark:text-violet-300 text-violet-700',
    badgeText: 'virtual · pagination',
  },
  author: {
    icon: '👤',
    labelClass: 'dark:text-sky-300 text-sky-700',
    badgeClass: 'dark:bg-sky-900/30 bg-sky-100 dark:text-sky-300 text-sky-700',
    badgeText: 'virtual · author',
  },
  author_index: {
    icon: '👤',
    labelClass: 'dark:text-sky-300 text-sky-700',
    badgeClass: 'dark:bg-sky-900/30 bg-sky-100 dark:text-sky-300 text-sky-700',
    badgeText: 'virtual · author index',
  },
};

// ── Source files disclosure panel ─────────────────────────────────────────────

function SourceFilesPanel({ files }: { files: string[] }): React.JSX.Element {
  if (files.length === 0) {
    return (
      <div className="mt-1 ml-6 pl-3 border-l-2 border-amber-400/60 py-1">
        <span className="text-amber-500 text-[11px] font-mono select-none">⚠ </span>
        <span className="dark:text-amber-400 text-amber-600 text-[11px] font-mono">
          source_files = ∅ — Reverse-Mapping violation
        </span>
      </div>
    );
  }
  return (
    <div className="mt-1 ml-6 pl-3 border-l-2 dark:border-indigo-700/40 border-indigo-300/60 py-1 space-y-0.5">
      <div className="dark:text-zinc-500 text-zinc-400 text-[10px] font-mono mb-1 select-none">
        source_files ({files.length})
      </div>
      {files.map((f) => (
        <div key={f} className="flex items-center gap-1.5">
          <span className="dark:text-zinc-600 text-zinc-400 select-none text-[11px]">↳</span>
          <span className="dark:text-emerald-400 text-emerald-600 font-mono text-[11px]">{f}</span>
        </div>
      ))}
    </div>
  );
}

// ── Single tree node ──────────────────────────────────────────────────────────

function TreeNode({ node, depth = 0 }: { node: VSMNode; depth?: number }): React.JSX.Element {
  const isVirtual = node.kind !== 'physical' && node.kind !== 'dir';
  const hasChildren = node.children && node.children.length > 0;
  const hasSourceFiles = isVirtual;

  const [expanded, setExpanded] = useState(false);

  const cfg = KIND_CONFIG[node.kind];

  const indent = depth * 16;

  const canExpand = hasChildren || hasSourceFiles;

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-0.5 rounded px-1 ${canExpand ? 'cursor-pointer hover:dark:bg-zinc-800/40 hover:bg-zinc-100/60' : ''}`}
        style={{ paddingLeft: `${indent + 4}px` }}
        onClick={canExpand ? () => setExpanded((v) => !v) : undefined}
        role={canExpand ? 'button' : undefined}
        aria-expanded={canExpand ? expanded : undefined}
      >
        {/* expand chevron */}
        {canExpand ? (
          <span className="dark:text-zinc-500 text-zinc-400 text-[11px] w-3 flex-shrink-0 select-none">
            {expanded ? '▾' : '▸'}
          </span>
        ) : (
          <span className="w-3 flex-shrink-0" />
        )}

        {/* kind icon */}
        <span className="select-none text-[13px]">{cfg.icon}</span>

        {/* label */}
        <span className={`font-mono text-[12px] ${cfg.labelClass}`}>{node.label}</span>

        {/* url chip */}
        {node.url && (
          <span className="dark:text-zinc-600 text-zinc-400 font-mono text-[10px] ml-1 truncate max-w-[180px]">
            {node.url}
          </span>
        )}

        {/* kind badge */}
        {cfg.badgeText && (
          <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-mono ${cfg.badgeClass}`}>
            {cfg.badgeText}
          </span>
        )}

        {/* Reverse-Mapping violation marker */}
        {isVirtual && node.sourceFiles?.length === 0 && (
          <span className="ml-auto text-amber-500 text-[11px] select-none" title="Reverse-Mapping violation: empty source_files">⚠</span>
        )}
      </div>

      {/* in-place expansion */}
      {expanded && (
        <>
          {hasSourceFiles && (
            <SourceFilesPanel files={node.sourceFiles ?? []} />
          )}
          {hasChildren && node.children!.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </>
      )}
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────

function Legend({ virtual }: { virtual: boolean }): React.JSX.Element {
  const physical = [
    { icon: '📁', label: 'directory', cls: 'dark:text-zinc-400 text-zinc-500' },
    { icon: '📄', label: 'physical file', cls: 'dark:text-emerald-400 text-emerald-700' },
  ];
  const virtualItems = [
    { icon: '🏷', label: 'virtual · tag / tag index', cls: 'dark:text-indigo-300 text-indigo-700' },
    { icon: '📑', label: 'virtual · pagination',      cls: 'dark:text-violet-300 text-violet-700' },
    { icon: '👤', label: 'virtual · author / index',  cls: 'dark:text-sky-300 text-sky-700' },
    { icon: '⚠',  label: 'Reverse-Mapping violation', cls: 'text-amber-500' },
  ];
  const items = virtual ? [...physical, ...virtualItems] : physical;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 pt-3 border-t dark:border-zinc-800/40 border-zinc-200">
      {items.map((it) => (
        <div key={it.label} className="flex items-center gap-1">
          <span className="select-none text-[12px]">{it.icon}</span>
          <span className={`font-mono text-[10px] ${it.cls}`}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function VSMVisualizer({
  roots,
  virtual = false,
  nodes,
}: VSMVisualizerProps): React.JSX.Element {
  // Build the display tree: custom nodes OR demo nodes filtered by roots
  let displayNodes: VSMNode[];
  if (nodes !== undefined) {
    displayNodes = nodes;
  } else {
    // Filter demo physical tree to the specified roots
    const rootSet = new Set(roots.map((r) => r.replace(/\/$/, '') + '/'));
    displayNodes = DEMO_PHYSICAL.filter((n) => rootSet.has(n.label));
  }

  const virtualNodes: VSMNode[] = virtual && nodes === undefined ? DEMO_VIRTUAL : [];

  const scannedCount = displayNodes.reduce((acc, n) => acc + countPhysical(n), 0);
  const virtualCount = virtualNodes.length;

  return (
    <div className="max-w-2xl mx-auto my-6">
      <div className="dark:bg-zinc-900/20 bg-zinc-50 backdrop-blur-md rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl border dark:border-zinc-700/20 border-zinc-200">

        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b dark:border-zinc-800/40 border-zinc-200">
          <span className="select-none">🗺</span>
          <span className="dark:text-zinc-300 text-zinc-700 font-semibold text-[13px]">Virtual Site Map</span>
          <span className="dark:text-zinc-600 text-zinc-400 text-[11px] ml-auto">
            roots: [{roots.map((r) => `"${r}"`).join(', ')}]
          </span>
        </div>

        {/* Physical tree */}
        <div className="space-y-0.5">
          {displayNodes.map((node, i) => (
            <TreeNode key={i} node={node} depth={0} />
          ))}
        </div>

        {/* Virtual routes section */}
        {virtual && (
          <>
            <div className="mt-4 mb-2 pt-3 border-t dark:border-indigo-900/30 border-indigo-200/60">
              <div className="dark:text-indigo-300 text-indigo-700 font-semibold text-[11px] tracking-widest select-none mb-2">
                VIRTUAL ROUTES  (inferred from frontmatter)
              </div>
              <div className="space-y-0.5">
                {virtualNodes.map((node, i) => (
                  <TreeNode key={i} node={node} depth={0} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Footer telemetry */}
        <div className="mt-3 pt-3 border-t dark:border-zinc-800/40 border-zinc-200 flex flex-wrap gap-4 text-[11px]">
          <span className="dark:text-zinc-500 text-zinc-500">
            Physical nodes: <span className="dark:text-zinc-300 text-zinc-700 font-bold">{scannedCount}</span>
          </span>
          {virtual && (
            <span className="dark:text-zinc-500 text-zinc-500">
              Virtual routes: <span className="dark:text-indigo-300 text-indigo-700 font-bold">{virtualCount}</span>
            </span>
          )}
          <span className="dark:text-zinc-500 text-zinc-500">
            Click any node to expand ▸
          </span>
        </div>

        {/* Legend */}
        <Legend virtual={virtual} />
      </div>
    </div>
  );
}

// ── Utility ───────────────────────────────────────────────────────────────────

function countPhysical(node: VSMNode): number {
  if (node.kind === 'physical') return 1;
  if (!node.children) return 0;
  return node.children.reduce((acc, c) => acc + countPhysical(c), 0);
}
