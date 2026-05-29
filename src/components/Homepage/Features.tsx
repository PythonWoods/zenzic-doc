// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import { VectorGrid } from './Shared';

// ── CHK 0.1 — Broken Links ────────────────────────────────────────────────
// Two rect-nodes (page.md → guide.md), solid edge, × break marker in
// --zenzic-error, dashed continuation, coordinate label "→ 404"
function BrokenLinkGraph(): React.JSX.Element {
  return (
    <VectorGrid>
      <rect x="15" y="82" width="58" height="28" strokeWidth="1" fill="none" />
      <text x="44" y="100" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">page.md</text>
      <rect x="127" y="82" width="58" height="28" strokeWidth="1" fill="none" />
      <text x="156" y="100" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">guide.md</text>
      <line x1="73" y1="96" x2="90" y2="96" strokeWidth="1" />
      <line x1="93" y1="89" x2="107" y2="103" stroke="var(--zenzic-error)" strokeWidth="1" />
      <line x1="107" y1="89" x2="93" y2="103" stroke="var(--zenzic-error)" strokeWidth="1" />
      <line x1="110" y1="96" x2="127" y2="96" stroke="var(--zenzic-error)" strokeWidth="0.75" strokeDasharray="5 4" />
      <polyline points="122,91 127,96 122,101" stroke="var(--zenzic-error)" strokeWidth="0.75" fill="none" />
      <text x="94" y="79" fontSize="8" fontFamily="monospace" fill="var(--zenzic-error)" stroke="none">→ 404</text>
      <line x1="73" y1="86" x2="73" y2="106" strokeWidth="0.25" />
    </VectorGrid>
  );
}

// ── CHK 0.2 — Orphan Pages ────────────────────────────────────────────────
// Directed nav triangle (3 rect-nodes) + isolated circle node with no edges
function OrphanNodeGraph(): React.JSX.Element {
  return (
    <VectorGrid>
      <rect x="75" y="28" width="50" height="22" strokeWidth="1" fill="none" />
      <text x="100" y="43" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">index.md</text>
      <rect x="18" y="82" width="58" height="22" strokeWidth="1" fill="none" />
      <text x="47" y="97" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">section.md</text>
      <rect x="124" y="82" width="58" height="22" strokeWidth="1" fill="none" />
      <text x="153" y="97" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">page.md</text>
      <line x1="90" y1="50" x2="57" y2="82" strokeWidth="0.75" />
      <polyline points="59,75 57,82 64,79" fill="none" strokeWidth="0.75" />
      <line x1="110" y1="50" x2="143" y2="82" strokeWidth="0.75" />
      <polyline points="141,75 143,82 136,79" fill="none" strokeWidth="0.75" />
      <line x1="76" y1="93" x2="124" y2="93" strokeWidth="0.5" strokeDasharray="5 4" />
      <circle cx="100" cy="158" r="18" stroke="var(--zenzic-warning)" strokeWidth="1" fill="none" />
      <text x="100" y="162" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">orphan</text>
      <text x="100" y="185" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">∅ nav</text>
    </VectorGrid>
  );
}

// ── CHK 0.3 — Invalid Snippets ────────────────────────────────────────────
// 6 code-line stripes; error line in --zenzic-error; scanline rect in
// --zenzic-brand sweeping across the error region; label "↯ FAIL"
function SnippetScanline(): React.JSX.Element {
  const lines: { y: number; x2: number; err?: boolean }[] = [
    { y: 45, x2: 150 },
    { y: 63, x2: 120 },
    { y: 81, x2: 160 },
    { y: 99, x2: 135, err: true },
    { y: 117, x2: 110 },
    { y: 135, x2: 145 },
  ];
  return (
    <VectorGrid>
      {lines.map(({ y, x2, err }) => (
        <line
          key={y}
          x1="30" y1={y} x2={x2} y2={y}
          strokeWidth={err ? 1 : 0.75}
          stroke={err ? 'var(--zenzic-error)' : 'currentColor'}
        />
      ))}
      <rect x="28" y="91" width="145" height="16" stroke="var(--zenzic-brand)" strokeWidth="1" fill="none" />
      <line x1="28" y1="85" x2="28" y2="91" stroke="var(--zenzic-brand)" strokeWidth="0.75" />
      <line x1="173" y1="85" x2="173" y2="91" stroke="var(--zenzic-brand)" strokeWidth="0.75" />
      <text x="172" y="88" textAnchor="end" fontSize="8" fontFamily="monospace" fill="var(--zenzic-error)" stroke="none">↯ FAIL</text>
    </VectorGrid>
  );
}

// ── CHK 0.4 — Placeholder Stubs ───────────────────────────────────────────
// 5 text-line stripes; dashed rect (--zenzic-warning) around stub region;
// "TODO" label inside; "△" glyph at corner
function PlaceholderDetect(): React.JSX.Element {
  return (
    <VectorGrid>
      {[50, 70, 90, 110, 130].map(y => (
        <line key={y} x1="30" y1={y} x2={(y >= 90 && y <= 110) ? 115 : 170} y2={y} strokeWidth="0.75" />
      ))}
      <rect x="28" y="82" width="95" height="36" stroke="var(--zenzic-warning)" strokeWidth="1" strokeDasharray="5 4" fill="none" />
      <text x="50" y="105" fontSize="9" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">TODO</text>
      <text x="118" y="80" fontSize="11" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">△</text>
    </VectorGrid>
  );
}

// ── CHK 0.5 — Unused Assets ───────────────────────────────────────────────
// Root page → 2 referenced assets (directed edges); 1 unreferenced asset
// node in --zenzic-warning with no incoming edge; label "∅ ref"
function AssetReferenceGraph(): React.JSX.Element {
  return (
    <VectorGrid>
      <rect x="70" y="22" width="60" height="22" strokeWidth="1" fill="none" />
      <text x="100" y="37" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">index.md</text>
      <rect x="15" y="95" width="60" height="22" strokeWidth="1" fill="none" />
      <text x="45" y="110" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">logo.svg</text>
      <rect x="125" y="95" width="60" height="22" strokeWidth="1" fill="none" />
      <text x="155" y="110" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">arch.png</text>
      <line x1="85" y1="44" x2="52" y2="95" strokeWidth="0.75" />
      <polyline points="54,88 52,95 59,91" fill="none" strokeWidth="0.75" />
      <line x1="115" y1="44" x2="148" y2="95" strokeWidth="0.75" />
      <polyline points="146,88 148,95 141,91" fill="none" strokeWidth="0.75" />
      <rect x="55" y="152" width="90" height="22" stroke="var(--zenzic-warning)" strokeWidth="1" fill="none" />
      <text x="100" y="167" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">img.png</text>
      <text x="100" y="190" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--zenzic-warning)" stroke="none">∅ ref</text>
    </VectorGrid>
  );
}

// ── CHK 0.6 — Credential Leak ─────────────────────────────────────────────
// 3 text-block segments; token block bordered in --zenzic-fatal; vertical
// scanline in --zenzic-brand intercepting the token; labels "→ Z201", "FATAL"
function CredentialScanline(): React.JSX.Element {
  return (
    <VectorGrid>
      <rect x="18" y="86" width="48" height="26" strokeWidth="0.5" fill="none" />
      <text x="42" y="103" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">export</text>
      <rect x="72" y="86" width="76" height="26" stroke="var(--zenzic-fatal)" strokeWidth="1" fill="none" />
      <text x="110" y="103" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="var(--zenzic-fatal)" stroke="none">sk_live_***</text>
      <rect x="154" y="86" width="28" height="26" strokeWidth="0.5" fill="none" />
      <text x="168" y="103" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" stroke="none">=…</text>
      <line x1="110" y1="72" x2="110" y2="125" stroke="var(--zenzic-brand)" strokeWidth="1" />
      <line x1="104" y1="72" x2="116" y2="72" stroke="var(--zenzic-brand)" strokeWidth="0.75" />
      <line x1="104" y1="125" x2="116" y2="125" stroke="var(--zenzic-brand)" strokeWidth="0.75" />
      <text x="116" y="70" fontSize="8" fontFamily="monospace" fill="var(--zenzic-fatal)" stroke="none">→ Z201</text>
      <text x="72" y="128" fontSize="8" fontFamily="monospace" fill="var(--zenzic-fatal)" stroke="none">FATAL</text>
    </VectorGrid>
  );
}

function CheckCard({code, visual, title, desc}: {code: string; visual: ReactNode; title: ReactNode; desc: ReactNode}): React.JSX.Element {
  return (
    <div className="border-t dark:border-zinc-800/60 border-zinc-200 pt-6 group">
      <div className="text-[10px] font-mono tracking-widest dark:text-zinc-600 text-zinc-400 mb-8 uppercase">CHK {code}</div>
      <div className="h-52 sm:h-56 md:h-64 w-full flex items-center justify-center mb-8 bg-transparent">{visual}</div>
      <h3 className="text-base font-medium dark:text-zinc-200 text-zinc-800 mb-3">{title}</h3>
      <p className="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Features(): React.JSX.Element {
  return (
    <section className="dark:bg-zinc-950 bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-20 max-w-3xl">
          <p className="text-[11px] font-mono tracking-[0.18em] dark:text-zinc-600 text-zinc-400 mb-4 uppercase">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <CheckCard
            code="0.1"
            visual={<BrokenLinkGraph />}
            title={<Translate id="chk01.title">Broken links</Translate>}
            desc={<Translate id="chk01.desc">A broken internal link becomes a 404 for users in production. Detect it before merge.</Translate>}
          />
          <CheckCard
            code="0.2"
            visual={<OrphanNodeGraph />}
            title={<Translate id="chk02.title">Orphan pages</Translate>}
            desc={<Translate id="chk02.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Finds <code>.md</code> files that are shipped but unreachable from navigation.'}</Translate>}
          />
          <CheckCard
            code="0.3"
            visual={<SnippetScanline />}
            title={<Translate id="chk03.title">Invalid snippets</Translate>}
            desc={<Translate id="chk03.desc">Compiles fenced Python snippets to prevent broken examples from reaching readers.</Translate>}
          />
          <CheckCard
            code="0.4"
            visual={<PlaceholderDetect />}
            title={<Translate id="chk04.title">Placeholder stubs</Translate>}
            desc={<Translate id="chk04.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Flags pages with unresolved placeholders like <code>TODO</code> and <code>WIP</code>.'}</Translate>}
          />
          <CheckCard
            code="0.5"
            visual={<AssetReferenceGraph />}
            title={<Translate id="chk05.title">Unused assets</Translate>}
            desc={<Translate id="chk05.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Reports files in <code>docs/</code> that are never referenced by any page.'}</Translate>}
          />
          <CheckCard
            code="0.6"
            visual={<CredentialScanline />}
            title={<Translate id="chk06.title">Credential leak detection</Translate>}
            desc={<Translate id="chk06.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Scans every file for leaked API keys and tokens. Security findings exit with code <code>2</code>.'}</Translate>}
          />
        </div>
      </div>
    </section>
  );
}
