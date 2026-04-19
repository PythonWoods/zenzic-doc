import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import { TrendIcon } from './Shared';

function SimpleDotIcon({color}: {color: 'sky' | 'rose'}): React.JSX.Element {
  const cls = color === 'sky' ? 'text-sky-400/80' : 'text-rose-400/80';
  return <span className={`inline-flex w-4 h-4 rounded-full ${cls} border border-current items-center justify-center`}><span className="w-1 h-1 rounded-full bg-current" /></span>;
}

function ScoreSubRow({icon, label, value}: {icon: ReactNode; label: ReactNode; value: ReactNode}): React.JSX.Element {
  return (
    <div className="flex items-center justify-between group px-4 py-2 rounded-lg dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-3">{icon}<span className="text-[13px] dark:text-zinc-400 text-zinc-500">{label}</span></div>
      <span className="text-[13px] dark:text-zinc-600 text-zinc-400 font-mono">{value}</span>
    </div>
  );
}

function ScoreRow({color, label, value}: {color: 'sky' | 'rose'; label: ReactNode; value: ReactNode}): React.JSX.Element {
  const palette = color === 'sky'
    ? { ring: 'border-sky-500/30 bg-sky-500/10', dot: 'bg-sky-400' }
    : { ring: 'border-rose-500/30 bg-rose-500/10', dot: 'bg-rose-400' };

  return (
    <div className="flex items-center justify-between group px-4 py-3 rounded-lg dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${palette.ring}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${palette.dot}`} />
        </div>
        <span className="text-[13px] dark:text-zinc-200 text-zinc-700 font-medium">{label}</span>
      </div>
      <span className="text-[13px] dark:text-zinc-500 text-zinc-400 font-mono">{value}</span>
    </div>
  );
}

export default function QualityScore(): React.JSX.Element {
  return (
    <section className="border-t dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-white py-24 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="homepage.score.title">Quality Score</Translate>
          </h2>
          <p className="dark:text-zinc-500 text-zinc-500 text-lg max-w-2xl">
            <Translate id="homepage.score.sub">
              Track a deterministic score in CI to block regressions. A holistic, elegant view of your documentation health.
            </Translate>
          </p>
        </div>
        <div className="w-full bg-transparent border dark:border-zinc-800/40 border-zinc-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-72 dark:bg-[#0d0d11]/30 bg-zinc-50/50 backdrop-blur-sm border-b md:border-b-0 md:border-r dark:border-zinc-800/40 border-zinc-200 p-6 flex flex-col">
            <div className="text-[13px] font-medium dark:text-zinc-300 text-zinc-600 mb-8">
              <Translate id="homepage.score.metrics">Metrics</Translate>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-sm font-medium dark:text-zinc-500 text-zinc-400 mb-2">
                <Translate id="homepage.score.overall">Overall Health</Translate>
              </div>
              <div className="text-7xl font-light tracking-tighter dark:text-white text-zinc-900 mb-4">98</div>
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium w-max border border-emerald-500/20">
                <TrendIcon />+2%
              </div>
            </div>
            <div className="mt-12 pt-6 border-t dark:border-zinc-800/40 border-zinc-200">
              <div className="text-xs dark:text-zinc-500 text-zinc-400 mb-2">
                <Translate id="homepage.score.ciLabel">CI Command</Translate>
              </div>
              <code className="text-xs dark:text-zinc-400 text-zinc-600 font-mono">zenzic score --save</code>
            </div>
          </div>
          <div className="flex-1 p-2 dark:bg-zinc-950/10 bg-white backdrop-blur-sm">
            <div className="p-2">
              <ScoreRow color="sky" label={<Translate id="score.linksHealth">Internal Links Health</Translate>} value="99" />
              <div className="ml-5 pl-4 border-l dark:border-zinc-800/40 border-zinc-200 flex flex-col py-1">
                <ScoreSubRow icon={<SimpleDotIcon color="sky" />} label={<Translate id="score.anchor">Anchor stability</Translate>} value="28" />
                <ScoreSubRow icon={<SimpleDotIcon color="sky" />} label={<Translate id="score.external">External references</Translate>} value="16" />
              </div>
            </div>

            <div className="border-t dark:border-zinc-800/50 border-zinc-200 mx-2 my-1" />

            <div className="p-2">
              <ScoreRow color="rose" label={<Translate id="score.orphan">Orphan Detection</Translate>} value="21" />
              <div className="ml-5 pl-4 border-l dark:border-zinc-800/40 border-zinc-200 flex flex-col py-1">
                <ScoreSubRow icon={<SimpleDotIcon color="rose" />} label={<Translate id="score.unused">Unused Assets</Translate>} value="12" />
                <ScoreSubRow icon={<SimpleDotIcon color="rose" />} label={<Translate id="score.nav">Nav Isolation</Translate>} value="9" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
