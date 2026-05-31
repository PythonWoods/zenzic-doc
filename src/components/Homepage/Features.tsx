// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

// ZenzicOutput — 1:1 mirror of `zenzic check all` on a fixture containing
// Z104 (broken link), Z201 (credential), Z405 (unused asset), Z502 (short
// content), Z601 (brand obsolescence). Markers, brackets, status line and
// banner are copied verbatim from the real CLI. No fabrication, no styling
// shortcuts that misrepresent the engine's output.
function ZenzicOutput(): React.JSX.Element {
  return (
    <div className="dark:bg-zinc-950/80 bg-zinc-50 backdrop-blur-md border dark:border-zinc-800/60 border-zinc-200 rounded-xl shadow-2xl font-mono text-[12px] md:text-[13px] leading-relaxed overflow-hidden">
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/60 border-zinc-200 dark:bg-zinc-900/40 bg-zinc-100/60">
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-3 text-[11px] dark:text-zinc-500 text-zinc-500 tracking-wide">zenzic check all · v0.9.0</span>
      </div>

      {/* Output body */}
      <div className="px-5 md:px-8 py-6 dark:text-zinc-300 text-zinc-700 space-y-5">
        {/* Z201 SECURITY BREACH — verbatim structured banner */}
        <div className="space-y-1">
          <div className="text-rose-500 font-semibold">✘ SECURITY BREACH DETECTED</div>
          <div className="pl-2">
            <div><span className="text-rose-500">✘</span> Finding:    Secret detected (aws-access-key) — rotate immediately.</div>
            <div><span className="text-rose-500">✘</span> Location:   docs/deploy.md:4</div>
            <div><span className="text-rose-500">✘</span> Credential: <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">AKIA************MPLE</span></div>
          </div>
          <div className="pt-1 dark:text-zinc-400 text-zinc-600">
            Action: Rotate this credential immediately and purge it from the repository history.
          </div>
        </div>

        {/* Status line — verbatim */}
        <div className="dark:text-zinc-500 text-zinc-500">standalone • 3 files (2 docs, 1 assets) • 0.0s • 87 files/s</div>

        {/* Z405 — UNUSED_ASSET */}
        <div>
          <span className="dark:text-zinc-400 text-zinc-600">docs/assets/unused.png</span>{'  '}
          <span className="text-amber-500">⚠</span>{'  '}
          <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z405]</span>{'  '}
          <span>File not referenced in any documentation page.</span>
        </div>

        {/* Z502 — SHORT_CONTENT (deploy.md) */}
        <div className="space-y-1">
          <div>
            <span className="dark:text-zinc-400 text-zinc-600">docs/deploy.md:1</span>{'  '}
            <span className="text-amber-500">⚠</span>{'  '}
            <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z502]</span>{'  '}
            <span>Page has only 6 words (minimum 50).</span>
          </div>
          <pre className="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">
{`    1  ❱  # Deploy
    2  │
    3  │  \`\`\`bash`}
          </pre>
        </div>

        {/* Z502 — SHORT_CONTENT (index.md) */}
        <div className="space-y-1">
          <div>
            <span className="dark:text-zinc-400 text-zinc-600">docs/index.md:1</span>{'  '}
            <span className="text-amber-500">⚠</span>{'  '}
            <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z502]</span>{'  '}
            <span>Page has only 18 words (minimum 50).</span>
          </div>
          <pre className="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">
{`    1  ❱  # Welcome
    2  │
    3  │  See the [intro page](./intro.md) for details.`}
          </pre>
        </div>

        {/* Z104 — FILE_NOT_FOUND (link target) */}
        <div className="space-y-1">
          <div>
            <span className="dark:text-zinc-400 text-zinc-600">docs/index.md:3:8</span>{'  '}
            <span className="text-rose-500">✘</span>{'  '}
            <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm font-medium">[Z104]</span>{'  '}
            <span>&apos;./intro.md&apos; not found in docs</span>
          </div>
          <pre className="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">
{`    1  │  # Welcome
    2  │
    3  ❱  See the [intro page](./intro.md) for details.
       │          ^^^^^^^^^^^^^^^^^^^^^^^^
    4  │
    5  │  ![architecture](./assets/old-diagram.png)`}
          </pre>
        </div>

        {/* Z104 — FILE_NOT_FOUND (image asset) */}
        <div className="space-y-1">
          <div>
            <span className="dark:text-zinc-400 text-zinc-600">docs/index.md:5</span>{'  '}
            <span className="text-rose-500">✘</span>{'  '}
            <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm font-medium">[Z104]</span>{'  '}
            <span>&apos;./assets/old-diagram.png&apos; not found in docs</span>
          </div>
          <pre className="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">
{`    3  │  See the [intro page](./intro.md) for details.
    4  │
    5  ❱  ![architecture](./assets/old-diagram.png)
       │  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6  │
    7  │  This project was migrated from **OldPlatform** in Q1 2026.`}
          </pre>
        </div>

        {/* Z601 — BRAND_OBSOLESCENCE */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="dark:text-zinc-400 text-zinc-600">docs/index.md:7:33</span>
            <span className="text-amber-500">⚠</span>
            <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z601]</span>
            <span className="dark:text-zinc-300 text-zinc-700">[Z601] Obsolete or unauthorized brand term &apos;OldPlatform&apos; detected. Use semantic versioning (e.g., &apos;vX.Y.Z&apos;) in active prose, or suppress if this is a historical ledger.</span>
          </div>
          <pre className="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">
{`    5  │  ![architecture](./assets/old-diagram.png)
    6  │
    7  ❱  This project was migrated from **OldPlatform** in Q1 2026.
       │                                   ^^^^^^^^^^^`}
          </pre>
        </div>

        {/* Divider + Summary — verbatim */}
        <div className="dark:text-zinc-700 text-zinc-300 select-none">────────────────────────────────────────────────────────────────────────────────</div>
        <div className="space-y-1.5">
          <div>
            Summary:{'  '}
            <span className="text-rose-500">✘ 2 errors</span>{'  '}
            <span className="text-amber-500">⚠ 4 warnings</span>{'  '}
            <span className="dark:text-zinc-500 text-zinc-500">💡 0 info</span>{'  '}
            <span className="dark:text-zinc-500 text-zinc-500">• 3 files with findings</span>
          </div>
          <div className="text-rose-500 font-semibold tracking-wide">
            FAILED: Hard errors detected. Exit code 1 is mandatory.
          </div>
          <div className="dark:text-zinc-500 text-zinc-500">
            Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try &apos;zenzic check --help&apos; for options.
          </div>
          <div className="dark:text-zinc-500 text-zinc-500">🔒 Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
        </div>
      </div>
    </div>
  );
}

// FindingCodeIndex — anchor links to /docs/reference/finding-codes, one per
// code actually emitted in the terminal above. Codes match what the CLI
// prints verbatim; no aspirational entries.
function FindingCodeIndex(): React.JSX.Element {
  const codes: { code: string; title: React.ReactNode; href: string }[] = [
    {
      code: 'Z104',
      title: <Translate id="findings.Z104.title">File not found</Translate>,
      href: '/docs/reference/finding-codes#z104',
    },
    {
      code: 'Z201',
      title: <Translate id="findings.Z201.title">Credential leak (exit 2)</Translate>,
      href: '/docs/reference/finding-codes#z201',
    },
    {
      code: 'Z405',
      title: <Translate id="findings.Z405.title">Unused asset</Translate>,
      href: '/docs/reference/finding-codes#z405',
    },
    {
      code: 'Z502',
      title: <Translate id="findings.Z502.title">Short content</Translate>,
      href: '/docs/reference/finding-codes#z502',
    },
    {
      code: 'Z601',
      title: <Translate id="findings.Z601.title">Brand obsolescence</Translate>,
      href: '/docs/reference/finding-codes#z601',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-10 max-w-5xl mx-auto px-2">
      {codes.map(({code, title, href}) => (
        <Link
          key={code}
          to={href}
          className="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors"
        >
          <span className="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">{code}</span>
          <span>{title}</span>
          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </Link>
      ))}
    </div>
  );
}

export default function Features(): React.JSX.Element {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 max-w-3xl">
          <p className="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
            <Translate id="homepage.pain.label" description="Pain point section label">
              Pain Point
            </Translate>
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="homepage.features.title" description="Features section title">
              Documentation drift is silent.
            </Translate>{' '}
            <span className="dark:text-zinc-500 text-zinc-400">
              <Translate id="homepage.features.muted" description="Muted part of features title">
                Teams usually see it after deployment.
              </Translate>
            </span>
          </h2>
        </div>
        <ZenzicOutput />
        <FindingCodeIndex />
      </div>
    </section>
  );
}
