import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import { Iso } from './Shared';

function BrokenLinksIso(): React.JSX.Element {
  return <Iso><path d="M100 40 L140 60 L100 80 L60 60 Z" /><path d="M140 60 L140 80 L100 100 L100 80 Z" /><path d="M60 60 L100 80 L100 100 L60 80 Z" /><path d="M100 120 L140 140 L100 160 L60 140 Z" /><path d="M140 140 L140 160 L100 180 L100 160 Z" /><path d="M60 140 L100 160 L100 180 L60 160 Z" /><path d="M100 100 L100 105" strokeDasharray="2 2" stroke="#f43f5e" strokeWidth="1.5" /><path d="M100 115 L100 120" strokeDasharray="2 2" stroke="#f43f5e" strokeWidth="1.5" /><path d="M80 90 L80 95" strokeDasharray="2 2" stroke="#f43f5e" strokeWidth="1.5" /><path d="M120 90 L120 95" strokeDasharray="2 2" stroke="#f43f5e" strokeWidth="1.5" /></Iso>;
}

function OrphanIso(): React.JSX.Element {
  return <Iso><path d="M80 60 L110 75 L80 90 L50 75 Z" /><path d="M110 75 L110 115 L80 130 L80 90 Z" /><path d="M50 75 L80 90 L80 130 L50 115 Z" /><path d="M115 80 L145 95 L115 110 L85 95 Z" /><path d="M145 95 L145 135 L115 150 L115 110 Z" /><path d="M140 30 L160 40 L140 50 L120 40 Z" stroke="#f59e0b" strokeWidth="1" /><path d="M160 40 L160 60 L140 70 L140 50 Z" stroke="#f59e0b" strokeWidth="1" /><path d="M120 40 L140 50 L140 70 L120 60 Z" stroke="#f59e0b" strokeWidth="1" /><path d="M130 80 L140 65" strokeDasharray="2 3" stroke="#f59e0b" /></Iso>;
}

function SnippetIso(): React.JSX.Element {
  return <Iso><path d="M50 90 L150 40 L150 120 L50 170 Z" /><path d="M60 100 L110 75" /><path d="M60 115 L140 75" /><path d="M60 130 L100 110" /><path d="M60 145 L130 110" /><path d="M90 125 L120 110" stroke="#f43f5e" strokeWidth="2" /></Iso>;
}

function PlaceholderIso(): React.JSX.Element {
  return <Iso><path d="M60 150 L140 110 L140 30 L60 70 Z" /><path d="M75 85 L125 60" /><path d="M75 100 L115 80" /><path d="M75 115 L125 90 L125 105 L75 130 Z" strokeDasharray="2 3" stroke="#f59e0b" strokeWidth="1.5" /></Iso>;
}

function AssetsIso(): React.JSX.Element {
  return <Iso><path d="M50 70 L100 45 L150 70 L100 95 Z" /><path d="M50 90 L100 115 L150 90" /><path d="M50 110 L100 135 L150 110" /><path d="M50 150 L100 125 L150 150 L100 175 Z" strokeDasharray="3 3" stroke="#38bdf8" strokeWidth="1" /><ellipse cx="100" cy="70" rx="20" ry="10" stroke="#38bdf8" strokeWidth="1" /></Iso>;
}

function ShieldIso(): React.JSX.Element {
  return <Iso><path d="M100 160 L60 130 L60 80 L100 60 L140 80 L140 130 Z" /><path d="M100 90 A 10 5 0 1 0 100 110" stroke="#10b981" strokeWidth="1.5" /><path d="M96 110 L96 125 L104 125 L104 110" stroke="#10b981" strokeWidth="1.5" /><path d="M60 80 L100 100 L140 80" /><path d="M100 100 L100 160" /></Iso>;
}

function CheckCard({code, visual, title, desc}: {code: string; visual: ReactNode; title: ReactNode; desc: ReactNode}): React.JSX.Element {
  return (
    <div className="border-t dark:border-zinc-800/60 border-zinc-200 pt-6 group">
      <div className="text-[10px] font-mono tracking-widest dark:text-zinc-600 text-zinc-400 mb-8 uppercase">CHK {code}</div>
      <div className="h-48 w-full flex items-center justify-center mb-8 bg-transparent">{visual}</div>
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
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="homepage.features.title" description="Features section title">
              A new standard for docs.
            </Translate>{' '}
            <span className="dark:text-zinc-500 text-zinc-400">
              <Translate id="homepage.features.muted" description="Muted part of features title">
                Purpose-built engines for structural integrity.
              </Translate>
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          <CheckCard
            code="0.1"
            visual={<BrokenLinksIso />}
            title={<Translate id="chk01.title">Broken links</Translate>}
            desc={<Translate id="chk01.desc">Detects dead internal links, missing anchors, and unreachable URLs before the build runs.</Translate>}
          />
          <CheckCard
            code="0.2"
            visual={<OrphanIso />}
            title={<Translate id="chk02.title">Orphan pages</Translate>}
            desc={<Translate id="chk02.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Finds <code>.md</code> files that exist on disk but are absent from the site navigation.'}</Translate>}
          />
          <CheckCard
            code="0.3"
            visual={<SnippetIso />}
            title={<Translate id="chk03.title">Invalid snippets</Translate>}
            desc={<Translate id="chk03.desc">Compiles every fenced Python block. Catches syntax errors before readers copy-paste code.</Translate>}
          />
          <CheckCard
            code="0.4"
            visual={<PlaceholderIso />}
            title={<Translate id="chk04.title">Placeholder stubs</Translate>}
            desc={<Translate id="chk04.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Flags pages below a word-count threshold or containing patterns like <code>TODO</code>, <code>WIP</code>.'}</Translate>}
          />
          <CheckCard
            code="0.5"
            visual={<AssetsIso />}
            title={<Translate id="chk05.title">Unused assets</Translate>}
            desc={<Translate id="chk05.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Reports images and files that exist in <code>docs/</code> but are never referenced by any page.'}</Translate>}
          />
          <CheckCard
            code="0.6"
            visual={<ShieldIso />}
            title={<Translate id="chk06.title">Zenzic Shield</Translate>}
            desc={<Translate id="chk06.desc" values={{ code: (str: string) => <code>{str}</code> }}>{'Scans every URL for leaked credentials - API keys, tokens. Exits with code <code>2</code> immediately.'}</Translate>}
          />
        </div>
      </div>
    </section>
  );
}
