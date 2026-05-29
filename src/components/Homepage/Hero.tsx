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

export default function Hero(): React.JSX.Element {
  const iconUrl = useBaseUrl('/assets/brand/svg/zenzic-icon.svg');

  return (
    <section className="max-w-4xl mx-auto mt-0 px-6 pt-8 md:pt-10 pb-14 md:pb-20 text-center flex flex-col items-center justify-start">
      {/* Stealth Logo */}
      <img src={iconUrl} alt="Zenzic Icon" style={{ width: '40px' }} className="mb-8 drop-shadow-sm opacity-60 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 hover:contrast-100 transition-all duration-500 cursor-pointer" />

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-zinc-800/80 border-zinc-200 dark:bg-zinc-900/30 bg-zinc-50 dark:text-zinc-400 text-zinc-500 text-[11px] font-mono mb-10 tracking-wide dark:hover:bg-zinc-800/50 hover:bg-zinc-100 transition-colors cursor-pointer shadow-sm">
        <ZenzicBadge />
        <Translate id="homepage.hero.badge" description="Wait release version badge">
          CI Ready
        </Translate>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-[56px] font-semibold tracking-tight dark:text-white text-zinc-900 leading-[1.1] mb-8">
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
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
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

      <div className="mt-10 w-full max-w-3xl">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
          <span>{'// hero_baseline'}</span>
          <span className="dark:text-zinc-400 text-zinc-600">scan::hero_a1</span>
        </div>
        <div className="mt-3 relative h-px dark:bg-zinc-700/80 bg-zinc-300/90 overflow-hidden">
          <span className="zz-scanline absolute -top-[1px] left-0 h-[3px] w-20" />
        </div>
      </div>
    </section>
  );
}
