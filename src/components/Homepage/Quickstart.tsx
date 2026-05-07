// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';

export default function Quickstart(): React.JSX.Element {
  const docsHref = useBaseUrl('/docs/');

  return (
    <section
      id="quickstart"
      className="dark:bg-zinc-950 bg-white py-24 md:py-32 border-t dark:border-zinc-800/60 border-zinc-200"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Label */}
        <p className="text-[11px] font-mono tracking-[0.18em] dark:text-zinc-600 text-zinc-400 mb-6 uppercase">
          <Translate id="quickstart.label">Get Started</Translate>
        </p>

        {/* Heading — mirrors Paperclip "From zero to autonomous company in one command." */}
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          <Translate id="quickstart.heading">
            From zero to documentation integrity in one command.
          </Translate>
        </h2>
        <p className="dark:text-zinc-500 text-zinc-500 text-base mb-12">
          <Translate id="quickstart.sub">
            No configuration required. No account needed. Works on any Markdown project.
          </Translate>
        </p>

        {/* Terminal box */}
        <div className="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-sm text-left mb-10 shadow-xl">
          {/* macOS window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b dark:border-zinc-800/40 border-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
              zenzic · quickstart
            </span>
          </div>

          {/* Commands */}
          <div className="px-5 py-5 space-y-1">
            {/* Shell ready line */}
            <div className="flex items-center gap-2 pb-3 mb-3 border-b dark:border-zinc-800/40 border-zinc-200/50">
              <span className="text-emerald-400 text-[12px]">✓</span>
              <span className="dark:text-zinc-500 text-zinc-400 text-[12px]">zenzic 0.7.0 · python 3.12 · ready</span>
            </div>
            <p className="dark:text-zinc-600 text-zinc-400 text-[12px]">
              # explore the interactive lab (9 acts, zero setup)
            </p>
            <div className="flex items-center gap-2 pb-4">
              <span className="dark:text-indigo-400 text-indigo-600 select-none font-semibold">
                $
              </span>
              <span className="dark:text-zinc-200 text-zinc-800">uvx zenzic lab</span>
            </div>
            <p className="dark:text-zinc-600 text-zinc-400 text-[12px]">
              # audit your documentation right now
            </p>
            <div className="flex items-center gap-2">
              <span className="dark:text-indigo-400 text-indigo-600 select-none font-semibold">
                $
              </span>
              <span className="dark:text-zinc-200 text-zinc-800">uvx zenzic check all .</span>
            </div>
          </div>
        </div>

        {/* Action buttons — Left=Light=Primary action, Right=Dark=Secondary action */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link
            to={docsHref}
            className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-900 text-white text-sm font-medium dark:hover:bg-white hover:bg-zinc-800 transition-colors"
          >
            <Translate id="quickstart.docs">Read the full docs →</Translate>
          </Link>

          <a
            href="https://github.com/PythonWoods/zenzic"
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-transparent dark:text-zinc-300 text-zinc-600 text-sm font-medium border dark:border-zinc-700 border-zinc-300 dark:hover:border-zinc-500 hover:border-zinc-400 dark:hover:text-white hover:text-zinc-900 transition-colors"
          >
            {/* GitHub icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <Translate id="quickstart.github">Star on GitHub</Translate>
          </a>
        </div>
      </div>
    </section>
  );
}
