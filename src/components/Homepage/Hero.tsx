// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';

export function ZenzicBadge(): React.JSX.Element {
  return (
    <span className="relative flex h-2 w-2 mr-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
    </span>
  );
}

function Metric({value, label}: {value: React.ReactNode; label: React.ReactNode}): React.JSX.Element {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[11px] font-mono tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
        {label}
      </div>
    </div>
  );
}

export default function Hero(): React.JSX.Element {
  const iconUrl = useBaseUrl('/assets/brand/svg/zenzic-icon.svg');

  return (
    <div className="relative dark:bg-zinc-900/40 bg-zinc-50/40 border-b dark:border-zinc-800/60 border-zinc-200">
      <section className="max-w-5xl mx-auto mt-0 px-6 pt-8 md:pt-10 pb-14 md:pb-20 text-center flex flex-col items-center justify-start">
      {/* Stealth Logo */}
      <img src={iconUrl} alt="Zenzic Icon" style={{ width: '56px' }} className="mb-8 drop-shadow-sm opacity-60 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 hover:contrast-100 transition-all duration-500 cursor-pointer" />

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-zinc-800/80 border-zinc-200 dark:bg-zinc-900/30 bg-zinc-50 dark:text-zinc-400 text-zinc-500 text-[11px] font-mono mb-10 tracking-wide dark:hover:bg-zinc-800/50 hover:bg-zinc-100 transition-colors cursor-pointer shadow-sm">
        <ZenzicBadge />
        <Translate id="homepage.hero.badge" description="Release version badge">
          v0.7.1
        </Translate>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight dark:text-white text-zinc-900 leading-[1.05] mb-8 max-w-4xl">
        <Translate id="homepage.hero.title" description="Main hero headline">
          Documentation Quality Gate
        </Translate>
        <br />
        <span className="dark:text-zinc-500 text-zinc-400">
          <Translate id="homepage.hero.titleMuted" description="Muted part of the hero headline">
            for CI/CD pipelines.
          </Translate>
        </span>
      </h1>
      <p className="text-lg md:text-xl dark:text-zinc-400 text-zinc-500 max-w-2xl leading-relaxed mb-12">
        <Translate id="homepage.hero.subtitle" description="Hero sub headline">
          Detect broken links, leaked credentials, and navigation drift before merge.
        </Translate>
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto mb-16 md:mb-20">
        <a
          href="#quickstart"
          className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-900 text-white text-sm font-medium dark:hover:bg-white hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-0.5"
        >
          <Translate id="homepage.hero.getStarted" description="Get started button">
            Get started
          </Translate>
        </a>
        <a href="https://github.com/PythonWoods/zenzic" rel="noopener noreferrer" className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-transparent dark:text-zinc-300 text-zinc-600 text-sm font-medium border dark:border-zinc-700 border-zinc-300 dark:hover:border-zinc-500 hover:border-zinc-400 dark:hover:text-white hover:text-zinc-900 transition-all duration-300 hover:-translate-y-0.5">
          <Translate id="homepage.hero.viewOnGithub" description="View on GitHub button">
            View on GitHub
          </Translate>
        </a>
      </div>

      {/* Engineering Metrics Strip — anchors abstraction to real engineering data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl">
        <Metric
          value="100%"
          label={<Translate id="homepage.metrics.deterministic.label" description="Metrics strip label — deterministic">Deterministic</Translate>}
        />
        <Metric
          value="0"
          label={<Translate id="homepage.metrics.subprocesses.label" description="Metrics strip label — subprocesses">Subprocesses</Translate>}
        />
        <Metric
          value="O(N)"
          label={<Translate id="homepage.metrics.re2.label" description="Metrics strip label — RE2 engine">RE2 Engine</Translate>}
        />
        <Metric
          value="CI/CD"
          label={<Translate id="homepage.metrics.gates.label" description="Metrics strip label — native gates">Native Gates</Translate>}
        />
      </div>
    </section>
    </div>
  );
}
