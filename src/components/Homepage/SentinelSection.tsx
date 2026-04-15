import React from 'react';
import Translate from '@docusaurus/Translate';

export default function SentinelSection(): React.JSX.Element {
  return (
    <section className="border-t dark:border-zinc-800 border-zinc-200 dark:bg-zinc-950 bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-medium tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="homepage.sentinel.title">Sentinel in Action</Translate>
          </h2>
          <p className="dark:text-zinc-500 text-zinc-500 max-w-xl mx-auto">
            <Translate id="homepage.sentinel.sub">
              Every finding is pinned to file, line, and source. Structured output for human eyes and machine parsing alike.
            </Translate>
          </p>
        </div>

        <div className="space-y-32">
          {/* Gutter Reporter */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 md:pr-8">
              <h3 className="text-xl font-medium dark:text-white text-zinc-900 mb-3">
                <Translate id="sentinel.gutter.title">Gutter reporter</Translate>
              </h3>
              <p className="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
                <Translate id="sentinel.gutter.desc">
                  Each error shows the exact offending source line with gutter context. No scrolling through logs to find what broke.
                </Translate>
              </p>
            </div>
            <div className="flex-[1.5] w-full">
              <div className="dark:bg-zinc-900/20 bg-zinc-50 backdrop-blur-md border dark:border-zinc-800/60 border-zinc-200 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl">
                <div className="dark:text-zinc-500 text-zinc-400 mb-3 border-b dark:border-zinc-800/40 border-zinc-200 pb-2 font-medium">docs/guide.md</div>
                <div className="flex gap-3 mb-4">
                  <span className="text-rose-500">✘</span>
                  <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">[FILE_NOT_FOUND]</span>
                  <span className="dark:text-zinc-300 text-zinc-700">
                    <Translate id="sentinel.gutter.msg">'intro.md' not reachable from nav</Translate>
                  </span>
                </div>
                <div className="dark:text-zinc-600 text-zinc-400 flex"><span className="w-6 text-right mr-3">15</span>│ <Translate id="sentinel.gutter.ctx1">before continuing.</Translate></div>
                <div className="dark:text-zinc-300 text-zinc-700 flex dark:bg-zinc-800/30 bg-zinc-100 -mx-6 px-6 py-0.5">
                  <span className="w-6 text-right mr-3 text-rose-500 font-bold">16</span>
                  <span className="text-rose-500 mr-1 font-bold">➡</span> <Translate id="sentinel.gutter.line">See the getting started page for details.</Translate>
                </div>
                <div className="dark:text-zinc-600 text-zinc-400 flex"><span className="w-6 text-right mr-3">17</span>│ <Translate id="sentinel.gutter.ctx2">Then configure your environment.</Translate></div>
              </div>
            </div>
          </div>

          {/* Shield Breaches */}
          <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-20 items-center">
            <div className="flex-1 md:pl-8">
              <h3 className="text-xl font-medium dark:text-white text-zinc-900 mb-3">
                <Translate id="sentinel.shield.title">Zenzic Shield</Translate>
              </h3>
              <p className="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
                <Translate id="sentinel.shield.desc" values={{ code1: (str: string) => <code>{str}</code>, code2: (str: string) => <code>{str}</code>, code3: (str: string) => <code>{str}</code> }}>
                  {'Scans every line - including fenced <code>bash</code> and <code>yaml</code> blocks - for leaked credentials. Exit code <code>2</code> is reserved exclusively for security events.'}
                </Translate>
              </p>
            </div>
            <div className="flex-[1.5] w-full">
              <div className="dark:bg-zinc-900/20 bg-rose-50/30 backdrop-blur-md border dark:border-rose-900/30 border-rose-200 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl">
                <div className="text-rose-500/90 text-xs text-center tracking-[0.2em] font-bold mb-4 border-b dark:border-rose-900/20 border-rose-200 pb-3">
                  <Translate id="sentinel.shield.banner">SECURITY BREACH DETECTED</Translate>
                </div>
                <div className="flex items-center gap-3 mb-2"><span className="text-rose-500">✘</span><span className="w-24 dark:text-zinc-500 text-zinc-400"><Translate id="sentinel.shield.finding">Finding:</Translate></span><span className="dark:text-zinc-200 text-zinc-700">GitHub token detected</span></div>
                <div className="flex items-center gap-3 mb-2"><span className="text-rose-500">✘</span><span className="w-24 dark:text-zinc-500 text-zinc-400"><Translate id="sentinel.shield.location">Location:</Translate></span><span className="dark:text-zinc-200 text-zinc-700">docs/tutorial.md:42</span></div>
                <div className="flex items-center gap-3 mb-4"><span className="text-rose-500">✘</span><span className="w-24 dark:text-zinc-500 text-zinc-400"><Translate id="sentinel.shield.credential">Credential:</Translate></span><span className="bg-rose-500/10 dark:text-rose-200 text-rose-600 px-2 py-0.5 rounded-sm">ghp_************3456</span></div>
                <div className="flex items-start gap-3 mt-4 pt-4 border-t dark:border-rose-900/20 border-rose-200"><span className="w-24 dark:text-zinc-600 text-zinc-400 pt-0.5"><Translate id="sentinel.shield.action">Action:</Translate></span><span className="dark:text-zinc-400 text-zinc-600"><Translate id="sentinel.shield.actionVal">Rotate this credential immediately and purge it from the repository history.</Translate></span></div>
              </div>
            </div>
          </div>

          {/* Severity summary */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
            <div className="flex-1 md:pr-8">
              <h3 className="text-xl font-medium dark:text-white text-zinc-900 mb-3">
                <Translate id="sentinel.summary.title">Severity summary</Translate>
              </h3>
              <p className="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
                <Translate id="sentinel.summary.desc">
                  Every run ends with a compact summary. You know immediately whether the check failed hard or only emitted warnings.
                </Translate>
              </p>
            </div>
            <div className="flex-[1.5] w-full">
              <div className="dark:bg-zinc-900/20 bg-zinc-50 backdrop-blur-md border dark:border-zinc-800/60 border-zinc-200 rounded-xl py-5 px-6 font-mono text-[12px] leading-relaxed shadow-2xl">
                <div className="flex gap-6 mb-4 border-b dark:border-zinc-800/40 border-zinc-200 pb-4">
                  <span className="text-rose-500 font-medium"><Translate id="sentinel.summary.errors">✘ 2 errors</Translate></span>
                  <span className="text-amber-500 font-medium"><Translate id="sentinel.summary.warnings">⚠ 1 warning</Translate></span>
                  <span className="dark:text-zinc-500 text-zinc-400"><Translate id="sentinel.summary.files">• 1 file with findings</Translate></span>
                </div>
                <div className="text-rose-500 font-bold tracking-wide"><Translate id="sentinel.summary.failed">FAILED: One or more checks failed.</Translate></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
