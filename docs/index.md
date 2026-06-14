---
hide:
  - navigation
  - toc
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<div class="zz-homepage">

  <!-- 1. Hero Section -->
  <div class="relative dark:bg-zinc-900/40 bg-zinc-50/40 border-b dark:border-zinc-800/60 border-zinc-200">
    <section class="max-w-5xl mx-auto mt-0 px-6 pt-8 md:pt-10 pb-14 md:pb-20 text-center flex flex-col items-center justify-start">
      <!-- Stealth Logo -->
      <img src="assets/brand/svg/zenzic-icon.svg" alt="Zenzic Icon" style="width: 56px;" class="mb-8 drop-shadow-sm opacity-60 grayscale contrast-125 hover:opacity-100 hover:grayscale-0 hover:contrast-100 transition-all duration-500 cursor-pointer" />

      <!-- Release version badge -->
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-zinc-800/80 border-zinc-200 dark:bg-zinc-900/30 bg-zinc-50 dark:text-zinc-400 text-zinc-500 text-[11px] font-mono mb-10 tracking-wide dark:hover:bg-zinc-800/50 hover:bg-zinc-100 transition-colors cursor-pointer shadow-sm">
        <span class="relative flex h-2 w-2 mr-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        v0.10.4
      </div>

      <!-- Hero Headline -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 max-w-4xl">
        <span class="zz-gradient-text">Documentation Quality Gate</span><br />
        <span class="dark:text-zinc-500 text-zinc-400">for CI/CD pipelines.</span>
      </h1>

      <!-- Hero Subtitle -->
      <p class="text-lg md:text-xl dark:text-zinc-400 text-zinc-500 max-w-2xl leading-relaxed mb-12">
        Detect broken links, leaked credentials, and navigation drift before merge.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto mb-16 md:mb-20">
        <a href="#quickstart" class="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-900 text-white text-sm font-medium dark:hover:bg-white hover:bg-zinc-800 transition-all duration-300 hover:-translate-y-0.5">
          Get started
        </a>
        <a href="https://github.com/PythonWoods/zenzic" target="_blank" rel="noopener noreferrer" class="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-transparent dark:text-zinc-300 text-zinc-600 text-sm font-medium border dark:border-zinc-700 border-zinc-300 dark:hover:border-zinc-500 hover:border-zinc-400 dark:hover:text-white hover:text-zinc-900 transition-all duration-300 hover:-translate-y-0.5">
          View on GitHub
        </a>
      </div>

      <!-- Engineering Metrics Strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl">
        <div class="flex flex-col items-center text-center">
          <div class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 tabular-nums">100%</div>
          <div class="mt-2 text-[11px] font-mono tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">Deterministic</div>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 tabular-nums">0</div>
          <div class="mt-2 text-[11px] font-mono tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">Subprocesses</div>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 tabular-nums">O(N)</div>
          <div class="mt-2 text-[11px] font-mono tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">RE2 Engine</div>
        </div>
        <div class="flex flex-col items-center text-center">
          <div class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 tabular-nums">CI/CD</div>
          <div class="mt-2 text-[11px] font-mono tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">Native Gates</div>
        </div>
      </div>
    </section>
  </div>

  <!-- Divider: EXECUTION_LAYER -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// EXECUTION_LAYER</span>
    </div>
  </div>

  <!-- 2. Features / Pain Point Section -->
  <section class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="mb-12 max-w-3xl">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
          Pain Point
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          Documentation drift is silent.
          <span class="dark:text-zinc-500 text-zinc-400">Teams usually see it after deployment.</span>
        </h2>
      </div>

      <!-- CLI Terminal Preview -->
      <div class="dark:bg-zinc-950/80 bg-zinc-50 backdrop-blur-md border dark:border-zinc-800/60 border-zinc-200 rounded-xl shadow-2xl font-mono text-[12px] md:text-[13px] leading-relaxed overflow-hidden">
        <!-- Terminal chrome -->
        <div class="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/60 border-zinc-200 dark:bg-zinc-900/40 bg-zinc-100/60">
          <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span class="ml-3 text-[11px] dark:text-zinc-500 text-zinc-500 tracking-wide">zenzic check all · v0.10.4</span>
        </div>

        <!-- Output body -->
        <div class="px-5 md:px-8 py-6 dark:text-zinc-300 text-zinc-700 space-y-5">
          <!-- Z201 SECURITY BREACH — verbatim structured banner -->
          <div class="space-y-1">
            <div class="text-rose-500 font-semibold">✘ SECURITY BREACH DETECTED</div>
            <div class="pl-2">
              <div><span class="text-rose-500">✘</span> Finding:    Secret detected (aws-access-key) — rotate immediately.</div>
              <div><span class="text-rose-500">✘</span> Location:   docs/deploy.md:4</div>
              <div><span class="text-rose-500">✘</span> Credential: <span class="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">AKIA************MPLE</span></div>
            </div>
            <div class="pt-1 dark:text-zinc-400 text-zinc-600">
              Action: Rotate this credential immediately and purge it from the repository history.
            </div>
          </div>

          <!-- Status line — verbatim -->
          <div class="dark:text-zinc-500 text-zinc-500">standalone • 3 files (2 docs, 1 assets) • 0.0s • 87 files/s</div>

          <!-- Z405 — UNUSED_ASSET -->
          <div>
            <span class="dark:text-zinc-400 text-zinc-600">docs/assets/unused.png</span>
            <span class="text-amber-500">⚠</span>
            <span class="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z405]</span>
            <span>File not referenced in any documentation page.</span>
          </div>

          <!-- Z502 — SHORT_CONTENT (deploy.md) -->
          <div class="space-y-1">
            <div>
              <span class="dark:text-zinc-400 text-zinc-600">docs/deploy.md:1</span>
              <span class="text-amber-500">⚠</span>
              <span class="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z502]</span>
              <span>Page has only 6 words (minimum 50).</span>
            </div>
            <pre class="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">    1  ❱  # Deploy
    2  │
    3  │  ```bash</pre>
          </div>

          <!-- Z502 — SHORT_CONTENT (index.md) -->
          <div class="space-y-1">
            <div>
              <span class="dark:text-zinc-400 text-zinc-600">docs/index.md:1</span>
              <span class="text-amber-500">⚠</span>
              <span class="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z502]</span>
              <span>Page has only 18 words (minimum 50).</span>
            </div>
            <pre class="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">    1  ❱  # Welcome
    2  │
    3  │  See the [intro page]&#40;./intro.md&#41; for details.</pre>
          </div>

          <!-- Z104 — FILE_NOT_FOUND (link target) -->
          <div class="space-y-1">
            <div>
              <span class="dark:text-zinc-400 text-zinc-600">docs/index.md:3:8</span>
              <span class="text-rose-500">✘</span>
              <span class="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm font-medium">[Z104]</span>
              <span>&apos;./intro.md&apos; not found in docs</span>
            </div>
            <pre class="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">    1  │  # Welcome
    2  │
    3  ❱  See the [intro page]&#40;./intro.md&#41; for details.
       │          ^^^^^^^^^^^^^^^^^^^^^^^^
    4  │
    5  │  !&#91;architecture&#93;&#40;./assets/old-diagram.png&#41;</pre>
          </div>

          <!-- Z104 — FILE_NOT_FOUND (image asset) -->
          <div class="space-y-1">
            <div>
              <span class="dark:text-zinc-400 text-zinc-600">docs/index.md:5</span>
              <span class="text-rose-500">✘</span>
              <span class="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm font-medium">[Z104]</span>
              <span>&apos;./assets/old-diagram.png&apos; not found in docs</span>
            </div>
            <pre class="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">    3  │  See the [intro page]&#40;./intro.md&#41; for details.
    4  │
    5  ❱  !&#91;architecture&#93;&#40;./assets/old-diagram.png&#41;
       │  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6  │
    7  │  This project was migrated from **OldPlatform** in Q1 2026.</pre>
          </div>

          <!-- Z601 — BRAND_OBSOLESCENCE -->
          <div class="space-y-1">
            <div class="flex flex-wrap items-baseline gap-x-2">
              <span class="dark:text-zinc-400 text-zinc-600">docs/index.md:7:33</span>
              <span class="text-amber-500">⚠</span>
              <span class="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-sm font-medium">[Z601]</span>
              <span class="dark:text-zinc-300 text-zinc-700">[Z601] Obsolete or unauthorized brand term &apos;OldPlatform&apos; detected. Use semantic versioning (e.g., &apos;vX.Y.Z&apos;) in active prose, or suppress if this is a historical ledger.</span>
            </div>
            <pre class="dark:bg-zinc-900/40 bg-white border dark:border-zinc-800/40 border-zinc-200 rounded-md px-3 py-2 dark:text-zinc-400 text-zinc-600 whitespace-pre overflow-x-auto">    5  │  !&#91;architecture&#93;&#40;./assets/old-diagram.png&#41;
    6  │
    7  ❱  This project was migrated from **OldPlatform** in Q1 2026.
       │                                   ^^^^^^^^^^^</pre>
          </div>

          <!-- Divider + Summary — verbatim -->
          <div class="dark:text-zinc-700 text-zinc-300 select-none">────────────────────────────────────────────────────────────────────────────────</div>
          <div class="space-y-1.5">
            <div>
              Summary:
              <span class="text-rose-500">✘ 1 security breach</span>
              <span class="text-rose-500">✘ 2 errors</span>
              <span class="text-amber-500">⚠ 4 warnings</span>
              <span class="dark:text-zinc-500 text-zinc-500">💡 0 info</span>
              <span class="dark:text-zinc-500 text-zinc-500">• 3 files with findings</span>
            </div>
            <div class="text-rose-500 font-semibold tracking-wide">
              FAILED: Hard errors detected. Exit code 1 is mandatory.
            </div>
            <div class="dark:text-zinc-500 text-zinc-500">
              Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try &apos;zenzic check --help&apos; for options.
            </div>
            <div class="dark:text-zinc-500 text-zinc-500">🔒 Suppression Audit: 0/30 (inline: 0, per-file: 0)</div>
          </div>
        </div>
      </div>

      <!-- FindingCodeIndex -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mt-10 max-w-5xl mx-auto px-2">
        <a href="user-manual/reference/finding-codes.md#z104" class="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <span class="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">Z104</span>
          <span>File not found</span>
          <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z201" class="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <span class="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">Z201</span>
          <span>Credential leak (exit 2)</span>
          <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z405" class="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <span class="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">Z405</span>
          <span>Unused asset</span>
          <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z502" class="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <span class="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">Z502</span>
          <span>Short content</span>
          <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z601" class="group flex items-center gap-3 text-sm dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <span class="font-mono text-[11px] tracking-wider dark:text-zinc-500 text-zinc-500 group-hover:text-indigo-500">Z601</span>
          <span>Brand obsolescence</span>
          <span class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 text-xs">→</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Divider: FAILURE_TOPOLOGY -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// FAILURE_TOPOLOGY</span>
    </div>
  </div>

  <!-- 3. SecuritySection / Zenzic in Action -->
  <section class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="max-w-3xl mb-12">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
          Outcome
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          Zenzic in Action
          <span class="dark:text-zinc-500 text-zinc-400">CI gate blocks regressions before merge.</span>
        </h2>
        <p class="dark:text-zinc-500 text-zinc-500 max-w-xl">
          Findings are deterministic by file and line. Exit code 1 blocks documentation debt, and the DQS flat-cost model keeps suppression debt explicit.
        </p>
      </div>

      <div class="space-y-16">
        <!-- Row 1: Gutter Context -->
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div class="lg:col-span-4 lg:max-w-sm">
            <h3 class="text-xl font-medium dark:text-white text-zinc-900 mb-3">
              Deterministic finding context
            </h3>
            <p class="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
              Each finding shows exact source line context. Teams can fix the issue without hunting through logs.
            </p>
          </div>
          <div class="lg:col-span-8 w-full lg:translate-x-10 xl:translate-x-16">
            <div class="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl overflow-hidden font-mono text-[12px] leading-relaxed shadow-2xl">
              <div class="terminal-header">
                <span class="dot-rose"></span>
                <span class="dot-amber"></span>
                <span class="dot-emerald"></span>
                <span class="terminal-title">docs/guide.md</span>
              </div>
              <div class="terminal-body">
                <div class="flex gap-3 mb-4">
                  <span class="text-rose-500">✘</span>
                  <span class="bg-rose-50/10 dark:bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded-sm">[FILE_NOT_FOUND]</span>
                  <span class="dark:text-zinc-300 text-zinc-700">&apos;intro.md&apos; not reachable from nav (would return 404)</span>
                </div>
                <div class="dark:text-zinc-600 text-zinc-400 flex"><span class="w-6 text-right mr-3">15</span>│ before continuing.</div>
                <div class="dark:text-zinc-300 text-zinc-700 flex dark:bg-zinc-800/30 bg-zinc-100 -mx-5 px-5 py-0.5">
                  <span class="w-6 text-right mr-3 text-rose-500 font-bold">16</span>
                  <span class="text-rose-500 mr-1 font-bold">❱</span> See the getting started page for details.
                </div>
                <div class="dark:text-zinc-600 text-zinc-400 flex"><span class="w-6 text-right mr-3">17</span>│ Then configure your environment.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2: Credential Breaches -->
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div class="lg:col-span-5 lg:col-start-8 lg:max-w-sm lg:justify-self-end">
            <h3 class="text-xl font-medium dark:text-white text-zinc-900 mb-3">
              Credential leak blocked (exit 2)
            </h3>
            <p class="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
              Scans every line, including fenced <code>bash</code> and <code>yaml</code> blocks, for leaked credentials. Exit code <code>2</code> is reserved for security events.
            </p>
          </div>
          <div class="lg:col-span-7 lg:col-start-1 w-full lg:row-start-1">
            <div class="zz-terminal-monolith bg-zinc-900/20 bg-rose-50/30 backdrop-blur-md border dark:border-rose-900/30 border-rose-200 rounded-xl overflow-hidden font-mono text-[12px] leading-relaxed shadow-2xl">
              <div class="terminal-header border-b dark:border-rose-900/20 border-rose-200">
                <span class="dot-rose"></span>
                <span class="dot-amber"></span>
                <span class="dot-emerald"></span>
                <span class="terminal-title text-rose-500">security scanner</span>
              </div>
              <div class="terminal-body">
                <div class="text-rose-500/90 text-xs text-center tracking-[0.2em] font-bold mb-4 border-b dark:border-rose-900/20 border-rose-200 pb-3">SECURITY BREACH DETECTED</div>
                <div class="flex items-center gap-3 mb-2"><span class="text-rose-500">✘</span><span class="w-24 dark:text-zinc-500 text-zinc-400">Finding:</span><span class="dark:text-zinc-200 text-zinc-700">GitHub token detected</span></div>
                <div class="flex items-center gap-3 mb-2"><span class="text-rose-500">✘</span><span class="w-24 dark:text-zinc-500 text-zinc-400">Location:</span><span class="dark:text-zinc-200 text-zinc-700">docs/tutorial.md:42</span></div>
                <div class="flex items-center gap-3 mb-4"><span class="text-rose-500">✘</span><span class="w-24 dark:text-zinc-500 text-zinc-400">Credential:</span><span class="bg-rose-500/10 dark:text-rose-200 text-rose-400 px-2 py-0.5 rounded-sm">ghp_************3456</span></div>
                <div class="flex items-start gap-3 mt-4 pt-4 border-t dark:border-rose-900/20 border-rose-200"><span class="w-24 dark:text-zinc-600 text-zinc-400 pt-0.5">Action:</span><span class="dark:text-zinc-400 text-zinc-600">Rotate this credential immediately and purge it from the repository history.</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Row 3: Severity Summary -->
        <div class="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <div class="lg:col-span-4 lg:max-w-sm">
            <h3 class="text-xl font-medium dark:text-white text-zinc-900 mb-3">
              Gate result summary
            </h3>
            <p class="dark:text-zinc-400 text-zinc-500 leading-relaxed text-sm">
              Every run ends with a compact status. Exit code 1 indicates a blocked merge due to quality findings.
            </p>
          </div>
          <div class="lg:col-span-8 w-full lg:translate-x-10 xl:translate-x-16">
            <div class="zz-terminal-monolith bg-zinc-900/20 backdrop-blur-md border border-zinc-800/60 rounded-xl overflow-hidden font-mono text-[12px] leading-relaxed shadow-2xl">
              <div class="terminal-header">
                <span class="dot-rose"></span>
                <span class="dot-amber"></span>
                <span class="dot-emerald"></span>
                <span class="terminal-title">gate verdict</span>
              </div>
              <div class="terminal-body">
                <div class="flex gap-6 mb-4 border-b dark:border-zinc-800/40 border-zinc-200 pb-4">
                  <span class="text-rose-500 font-medium">✘ 2 errors</span>
                  <span class="text-amber-500 font-medium">⚠ 1 warning</span>
                  <span class="dark:text-zinc-500 text-zinc-400">• 1 file with findings</span>
                </div>
                <div class="text-rose-500 font-bold tracking-wide">FAILED: Quality gate blocked merge (exit code 1).</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Divider: DIAGNOSTIC_OUTPUT -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// DIAGNOSTIC_OUTPUT</span>
    </div>
  </div>

  <!-- 4. Ecosystem Section (Engineering Ledger) -->
  <section class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="mb-4 max-w-3xl">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
          Ecosystem
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          Run the same quality gate across documentation stacks.
          <span class="dark:text-zinc-500 text-zinc-400">Docusaurus, MkDocs, Zensical, and standalone repositories.</span>
        </h2>
        <p class="dark:text-zinc-500 text-zinc-500 text-base">
          Adapters normalize path and topology checks so CI behavior stays deterministic regardless of generator.
        </p>
      </div>

      <!-- Row 1: Docusaurus -->
      <div class="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-12 border-t dark:border-zinc-800/60 border-zinc-200 items-start">
        <div>
          <span class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 block uppercase">
            01
          </span>
          <h3 class="text-lg font-semibold dark:text-white text-zinc-900 mb-3 leading-snug">
            Docusaurus Adapter
          </h3>
          <p class="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">
            Validates internal links, anchors, and navigation topology from Markdown source and Docusaurus configuration.
          </p>
        </div>
        <div class="md:-mr-8 lg:-mr-16">
          <div class="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-[12px] leading-relaxed shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/40 border-zinc-200 bg-zinc-900/30">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
              <span class="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
                docusaurus.config.ts · adapter run
              </span>
            </div>
            <div class="px-5 py-4 dark:text-zinc-400 text-zinc-600 overflow-x-auto">
              <pre class="m-0 bg-transparent whitespace-pre"><code># Docusaurus project
uvx zenzic check all .

# Outcome
# exit 0 -> no blocking findings
# exit 1 -> quality gate blocks merge</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2: MkDocs -->
      <div class="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-12 border-t dark:border-zinc-800/60 border-zinc-200 items-start">
        <div>
          <span class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 block uppercase">
            02
          </span>
          <h3 class="text-lg font-semibold dark:text-white text-zinc-900 mb-3 leading-snug">
            MkDocs Adapter
          </h3>
          <p class="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">
            Reads MkDocs navigation topology and checks Markdown source directly, without requiring a site build.
          </p>
        </div>
        <div class="md:-mr-8 lg:-mr-16">
          <div class="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-[12px] leading-relaxed shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/40 border-zinc-200 bg-zinc-900/30">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
              <span class="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
                mkdocs.yml · adapter run
              </span>
            </div>
            <div class="px-5 py-4 dark:text-zinc-400 text-zinc-600 overflow-x-auto">
              <pre class="m-0 bg-transparent whitespace-pre"><code># MkDocs project
uvx zenzic check all .

# Same gate semantics as Docusaurus
# deterministic findings, same exit codes</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 3: Zensical -->
      <div class="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-12 border-t dark:border-zinc-800/60 border-zinc-200 items-start">
        <div>
          <span class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 block uppercase">
            03
          </span>
          <h3 class="text-lg font-semibold dark:text-white text-zinc-900 mb-3 leading-snug">
            Zensical Adapter
          </h3>
          <p class="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">
            Uses zensical configuration to validate structure and content constraints with deterministic reporting.
          </p>
        </div>
        <div class="md:-mr-8 lg:-mr-16">
          <div class="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-[12px] leading-relaxed shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/40 border-zinc-200 bg-zinc-900/30">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
              <span class="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
                zensical.toml · adapter run
              </span>
            </div>
            <div class="px-5 py-4 dark:text-zinc-400 text-zinc-600 overflow-x-auto">
              <pre class="m-0 bg-transparent whitespace-pre"><code># Zensical project
uvx zenzic check all .

# Output is machine-readable and human-readable
# for CI and local review</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 4: Standalone -->
      <div class="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-8 md:gap-12 py-12 border-t dark:border-zinc-800/60 border-zinc-200 items-start">
        <div>
          <span class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 block uppercase">
            04
          </span>
          <h3 class="text-lg font-semibold dark:text-white text-zinc-900 mb-3 leading-snug">
            Standalone Markdown Repositories
          </h3>
          <p class="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">
            Runs on repositories without a framework-specific adapter by validating Markdown files and internal references directly.
          </p>
        </div>
        <div class="md:-mr-8 lg:-mr-16">
          <div class="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-[12px] leading-relaxed shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/40 border-zinc-200 bg-zinc-900/30">
              <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
              <span class="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
                standalone repository · adapter run
              </span>
            </div>
            <div class="px-5 py-4 dark:text-zinc-400 text-zinc-600 overflow-x-auto">
              <pre class="m-0 bg-transparent whitespace-pre"><code># Plain Markdown repository
uvx zenzic check all docs/

# Use in CI, pre-commit, or local checks
# without changing repository structure</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Divider: ADAPTER_SURFACE -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// ADAPTER_SURFACE</span>
    </div>
  </div>

  <!-- 5. Quickstart Section -->
  <section id="quickstart" class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="max-w-3xl mb-12">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-6 uppercase">
          Get Started
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          From zero to documentation integrity
          <span class="dark:text-zinc-500 text-zinc-400">in one command.</span>
        </h2>
        <p class="dark:text-zinc-500 text-zinc-500 text-base">
          No configuration required. No account needed. Works on any Markdown project.
        </p>
      </div>

      <!-- Terminal box -->
      <div class="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-sm text-left mb-10 shadow-xl md:-mx-8 lg:-mx-16">
        <div class="flex items-center gap-2 px-4 py-3 border-b dark:border-zinc-800/40 border-zinc-200 bg-zinc-900/30">
          <span class="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true"></span>
          <span class="ml-2 dark:text-zinc-400 text-zinc-500 text-[11px] tracking-wide font-semibold">
            zenzic · quickstart
          </span>
        </div>
        <div class="px-5 py-5 space-y-1">
          <div class="flex items-center gap-2 pb-3 mb-3 border-b dark:border-zinc-800/40 border-zinc-200/50">
            <span class="text-emerald-400 text-[12px]">✓</span>
            <span class="dark:text-zinc-500 text-zinc-400 text-[12px]">zenzic · python 3.10+ · ready</span>
          </div>
          <p class="dark:text-zinc-600 text-zinc-400 text-[12px]">
            # run the documentation quality gate
          </p>
          <div class="flex items-center gap-2">
            <span class="dark:text-indigo-400 text-indigo-600 select-none font-semibold">$</span>
            <span class="dark:text-zinc-200 text-zinc-800">uvx zenzic check all</span>
          </div>
          <div class="mt-4 pt-3 border-t dark:border-zinc-800/40 border-zinc-200/50 space-y-1">
            <p class="dark:text-zinc-600 text-zinc-400 text-[12px]"># exit 0: no blocking findings</p>
            <p class="dark:text-zinc-600 text-zinc-400 text-[12px]"># exit 1: quality gate blocks merge</p>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-col sm:flex-row gap-4 items-start">
        <a href="user-manual/index.md" class="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center rounded-full dark:bg-zinc-100 dark:text-zinc-950 bg-zinc-900 text-white text-sm font-medium dark:hover:bg-white hover:bg-zinc-800 transition-colors">
          Read the full docs →
        </a>
        <a href="https://github.com/PythonWoods/zenzic" target="_blank" rel="noopener noreferrer" class="h-11 px-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-transparent dark:text-zinc-300 text-zinc-600 text-sm font-medium border dark:border-zinc-700 border-zinc-300 dark:hover:border-zinc-500 hover:border-zinc-400 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Star on GitHub
        </a>
      </div>
    </div>
  </section>

  <!-- 6. Enterprise Section -->
  <section class="py-10">
    <div class="max-w-5xl mx-auto px-6">
      <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
        Enterprise
      </p>
      <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900">
        Enterprise Governance &amp; Scoring
      </h2>
      <p class="mt-4 dark:text-zinc-500 text-zinc-500 max-w-xl text-sm leading-relaxed">
        Track suppression debt, enforce quality policies, and govern documentation health across teams and repositories.
      </p>
    </div>
  </section>

  <!-- Divider: GOVERNANCE_GATE -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// GOVERNANCE_GATE</span>
    </div>
  </div>

  <!-- 7. Quality Score Section -->
  <section class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="mb-12 max-w-3xl">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
          Health Metrics
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          Quality Score
          <span class="dark:text-zinc-500 text-zinc-400">Deterministic health check, per commit.</span>
        </h2>
        <p class="dark:text-zinc-500 text-zinc-500 text-lg max-w-2xl">
          Track a deterministic score in CI to block regressions. A holistic, elegant view of your documentation health.
        </p>
      </div>
      <div class="w-full bg-transparent border dark:border-zinc-800/40 border-zinc-200 rounded-xl overflow-hidden flex flex-col md:flex-row md:translate-x-8 lg:translate-x-12 shadow-2xl">
        <!-- Overall health panel -->
        <div class="w-full md:w-72 dark:bg-[#0d0d11]/30 bg-zinc-50/50 backdrop-blur-sm border-b md:border-b-0 md:border-r dark:border-zinc-800/40 border-zinc-200 p-6 flex flex-col justify-between">
          <div>
            <div class="text-[13px] font-medium dark:text-zinc-300 text-zinc-600 mb-8">
              Metrics
            </div>
            <div class="flex-1 flex flex-col justify-center">
              <div class="text-sm font-medium dark:text-zinc-500 text-zinc-400 mb-2">
                Overall Health
              </div>
              <div class="text-7xl font-light tracking-tighter dark:text-white text-zinc-900 mb-4">98</div>
              <div class="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 text-xs font-medium w-max border border-emerald-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>+2%
              </div>
            </div>
          </div>
          <div class="mt-12 pt-6 border-t dark:border-zinc-800/40 border-zinc-200">
            <div class="text-xs dark:text-zinc-500 text-zinc-400 mb-2">
              CI Command
            </div>
            <code class="text-xs dark:text-zinc-400 text-zinc-600 font-mono">zenzic score --save</code>
          </div>
        </div>

        <!-- Metric details panel -->
        <div class="flex-1 p-2 dark:bg-zinc-950/10 bg-white backdrop-blur-sm">
          <div class="p-2">
            <!-- Row: Internal Links -->
            <div class="flex items-center justify-between group px-4 py-3 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full border flex items-center justify-center border-sky-500/30 bg-sky-500/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </div>
                <span class="text-[13px] dark:text-zinc-200 text-zinc-700 font-medium">Internal Links Health</span>
              </div>
              <span class="text-[13px] dark:text-zinc-500 text-zinc-400 font-mono">99</span>
            </div>
            <!-- Subrows -->
            <div class="ml-5 pl-4 border-l dark:border-zinc-800/40 border-zinc-200 flex flex-col py-1">
              <div class="flex items-center justify-between group px-4 py-2 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="inline-flex w-4 h-4 rounded-full text-sky-400/80 border border-current items-center justify-center"><span class="w-1 h-1 rounded-full bg-current" /></span>
                  <span class="text-[13px] dark:text-zinc-400 text-zinc-500">Anchor stability</span>
                </div>
                <span class="text-[13px] dark:text-zinc-600 text-zinc-400 font-mono">100</span>
              </div>
              <div class="flex items-center justify-between group px-4 py-2 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="inline-flex w-4 h-4 rounded-full text-sky-400/80 border border-current items-center justify-center"><span class="w-1 h-1 rounded-full bg-current" /></span>
                  <span class="text-[13px] dark:text-zinc-400 text-zinc-500">External references</span>
                </div>
                <span class="text-[13px] dark:text-zinc-600 text-zinc-400 font-mono">97</span>
              </div>
            </div>
          </div>

          <div class="border-t dark:border-zinc-800/50 border-zinc-200 mx-2 my-1" />

          <div class="p-2">
            <!-- Row: Orphan Detection -->
            <div class="flex items-center justify-between group px-4 py-3 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full border flex items-center justify-center border-rose-500/30 bg-rose-500/10">
                  <div class="w-1.5 h-1.5 rounded-full bg-rose-400" />
                </div>
                <span class="text-[13px] dark:text-zinc-200 text-zinc-700 font-medium">Orphan Detection</span>
              </div>
              <span class="text-[13px] dark:text-zinc-500 text-zinc-400 font-mono">95</span>
            </div>
            <!-- Subrows -->
            <div class="ml-5 pl-4 border-l dark:border-zinc-800/40 border-zinc-200 flex flex-col py-1">
              <div class="flex items-center justify-between group px-4 py-2 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="inline-flex w-4 h-4 rounded-full text-rose-400/80 border border-current items-center justify-center"><span class="w-1 h-1 rounded-full bg-current" /></span>
                  <span class="text-[13px] dark:text-zinc-400 text-zinc-500">Unused Assets</span>
                </div>
                <span class="text-[13px] dark:text-zinc-600 text-zinc-400 font-mono">91</span>
              </div>
              <div class="flex items-center justify-between group px-4 py-2 rounded-md dark:hover:bg-zinc-800/30 hover:bg-zinc-50 transition-colors">
                <div class="flex items-center gap-3">
                  <span class="inline-flex w-4 h-4 rounded-full text-rose-400/80 border border-current items-center justify-center"><span class="w-1 h-1 rounded-full bg-current" /></span>
                  <span class="text-[13px] dark:text-zinc-400 text-zinc-500">Nav Isolation</span>
                </div>
                <span class="text-[13px] dark:text-zinc-600 text-zinc-400 font-mono">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Divider: SUPPRESSION_POLICY -->
  <div class="zz-divider px-6 py-2">
    <div class="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
      <span>// SUPPRESSION_POLICY</span>
    </div>
  </div>

  <!-- 8. Suppression CAP Live Preview -->
  <section class="py-16 md:py-24">
    <div class="max-w-5xl mx-auto px-6">
      <div class="max-w-3xl mb-16">
        <p class="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
          Governance
        </p>
        <h2 class="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
          Suppression CAP
          <span class="dark:text-zinc-500 text-zinc-400">— Live Preview</span>
        </h2>
        <p class="dark:text-zinc-500 text-zinc-500 max-w-xl text-sm leading-relaxed">
          When active suppressions exceed the configured CAP, zenzic-action writes this summary directly to the GitHub Actions job panel. No log diving required.
        </p>
      </div>

      <div class="grid md:grid-cols-12 gap-8 items-stretch">
        <!-- CAP breached — exit 1 -->
        <div class="md:col-span-7 h-full flex flex-col">
          <p class="text-[11px] font-mono font-semibold tracking-widest dark:text-zinc-400 text-zinc-500 mb-3 uppercase">
            CAP exceeded — exit 1
          </p>
          <div class="my-6 overflow-hidden rounded-xl border dark:bg-zinc-900/40 bg-white font-mono shadow-2xl dark:border-rose-900/40 border-rose-200 flex-1 flex flex-col justify-between">
            <div>
              <!-- Header -->
              <div class="flex items-center justify-between border-b px-6 py-3 dark:border-rose-900/40 border-rose-200 dark:bg-rose-900/20 bg-rose-50">
                <span class="text-[13px] font-semibold tracking-wide text-rose-500">
                  ✘ <span class="dark:text-zinc-200 text-zinc-800">Suppression CAP Exceeded</span>
                </span>
                <span class="rounded-sm px-2 py-0.5 text-[11px] font-bold tabular-nums text-rose-400 bg-rose-500/10">
                  +13
                </span>
              </div>
              <!-- Metrics grid -->
              <div class="grid grid-cols-3 divide-x dark:divide-zinc-800 divide-zinc-100">
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">Active suppressions</span>
                  <span class="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">43</span>
                </div>
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">CAP limit</span>
                  <span class="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">30</span>
                </div>
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">Excess debt</span>
                  <span class="text-2xl font-light tabular-nums text-rose-400">+13</span>
                </div>
              </div>
            </div>
            <!-- Remediation link -->
            <div class="border-t px-5 py-3 dark:bg-zinc-900/20 bg-zinc-50 dark:border-rose-900/40 border-rose-200">
              <a href="contributor-guide/how-to/release-governance-protocol.md" class="text-[11px] tracking-wide dark:text-amber-400 text-amber-600 hover:underline">
                📋 Remediation Playbook →
              </a>
            </div>
          </div>
        </div>

        <!-- CAP within limit — exit 0 -->
        <div class="md:col-span-5 h-full flex flex-col">
          <p class="text-[11px] font-mono font-semibold tracking-widest dark:text-zinc-400 text-zinc-500 mb-3 uppercase">
            CAP within limit — exit 0
          </p>
          <div class="my-6 overflow-hidden rounded-xl border dark:bg-zinc-900/40 bg-white font-mono shadow-2xl dark:border-emerald-900/40 border-emerald-200 flex-1 flex flex-col justify-between">
            <div>
              <!-- Header -->
              <div class="flex items-center justify-between border-b px-6 py-3 dark:border-emerald-900/40 border-emerald-200 dark:bg-emerald-900/20 bg-emerald-50">
                <span class="text-[13px] font-semibold tracking-wide text-emerald-500">
                  ✔ <span class="dark:text-zinc-200 text-zinc-800">Suppression CAP — Within Limit</span>
                </span>
              </div>
              <!-- Metrics grid -->
              <div class="grid grid-cols-3 divide-x dark:divide-zinc-800 divide-zinc-100">
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">Active suppressions</span>
                  <span class="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">18</span>
                </div>
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">CAP limit</span>
                  <span class="dark:text-zinc-100 text-zinc-900 text-2xl font-light tabular-nums">30</span>
                </div>
                <div class="flex flex-col items-center gap-1 px-3 py-5">
                  <span class="dark:text-zinc-500 text-zinc-400 text-[10px] tracking-widest uppercase">Excess debt</span>
                  <span class="text-2xl font-light tabular-nums dark:text-emerald-400 text-emerald-600">-12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</div>
