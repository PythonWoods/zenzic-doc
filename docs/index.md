---
template: home.html
hide:
  - navigation
  - toc
---

<!-- SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev> -->
<!-- SPDX-License-Identifier: Apache-2.0 -->

<div class="zz-homepage">

  <!-- 1. Hero Section -->
  <div class="zz-hero">
    <div class="zz-hero__inner">
      <img class="zz-hero__logo" src="assets/brand/svg/zenzic-icon.svg" alt="Zenzic Logo" />

      <div class="zz-hero__badge">
        <span class="zz-badge-dot"></span>
        v0.10.4
      </div>

      <h1 class="zz-hero__headline">
        <span class="zz-gradient-text">Documentation Quality Gate</span><br>
        <span class="zz-hero__muted">for CI/CD pipelines.</span>
      </h1>

      <p class="zz-hero__sub">
        Detect broken links, leaked credentials, and navigation drift before merge.
      </p>

      <div class="zz-hero__ctas">
        <a href="#quickstart" class="zz-btn zz-btn--primary">Get started</a>
        <a href="https://github.com/PythonWoods/zenzic" target="_blank" rel="noopener noreferrer" class="zz-btn zz-btn--outline">View on GitHub</a>
      </div>

      <div class="zz-metrics">
        <div>
          <div class="zz-metric__value">100%</div>
          <div class="zz-metric__label">Deterministic</div>
        </div>
        <div>
          <div class="zz-metric__value">0</div>
          <div class="zz-metric__label">Subprocesses</div>
        </div>
        <div>
          <div class="zz-metric__value">O(N)</div>
          <div class="zz-metric__label">RE2 Engine</div>
        </div>
        <div>
          <div class="zz-metric__value">CI/CD</div>
          <div class="zz-metric__label">Native Gates</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Divider: EXECUTION_LAYER -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// EXECUTION_LAYER</div>
  </div>

  <!-- 2. Features / Pain Point Section -->
  <div class="zz-section">
    <div class="zz-section__inner">
      <p class="zz-overline">Pain Point</p>
      <h2 class="zz-section__title">Documentation drift is silent. <span class="zz-hero__muted">Teams usually see it after deployment.</span></h2>
    </div>
  </div>

  <div class="zz-terminal-wrap" markdown="1">

````terminal title="zenzic check all · v0.10.4"
✘ SECURITY BREACH DETECTED
  ✘ Finding:    Secret detected (aws-access-key) — rotate immediately.
  ✘ Location:   docs/deploy.md:4
  ✘ Credential: AKIA************MPLE
Action: Rotate this credential immediately and purge it from the repository history.

standalone • 3 files (2 docs, 1 assets) • 0.0s • 87 files/s
docs/assets/unused.png  ⚠  [Z405]  File not referenced in any documentation page.
docs/deploy.md:1  ⚠  [Z502]  Page has only 6 words (minimum 50).
    1  ❱  # Deploy
    2  │
    3  │  ```bash
docs/index.md:1  ⚠  [Z502]  Page has only 18 words (minimum 50).
    1  ❱  # Welcome
    2  │
    3  │  See the [intro page](./intro.md) for details.
docs/index.md:3:8  ✘  [Z104]  './intro.md' not found in docs
    1  │  # Welcome
    2  │
    3  ❱  See the [intro page](./intro.md) for details.
       │          ^^^^^^^^^^^^^^^^^^^^^^^^
    4  │
    5  │  ![architecture](./assets/old-diagram.png)
docs/index.md:5  ✘  [Z104]  './assets/old-diagram.png' not found in docs
    3  │  See the [intro page](./intro.md) for details.
    4  │
    5  ❱  ![architecture](./assets/old-diagram.png)
       │  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6  │
    7  │  This project was migrated from **OldPlatform** in Q1 2026.
docs/index.md:7:33  ⚠  [Z601]  [Z601] Obsolete or unauthorized brand term 'OldPlatform' detected. Use semantic versioning (e.g., 'vX.Y.Z') in active prose, or suppress if this is a historical ledger.
    5  │  ![architecture](./assets/old-diagram.png)
    6  │
    7  ❱  This project was migrated from **OldPlatform** in Q1 2026.
       │                                   ^^^^^^^^^^^
────────────────────────────────────────────────────────────────────────────────
Summary:  ✘ 1 security breach  ✘ 2 errors  ⚠ 4 warnings  💡 0 info  • 3 files with findings
FAILED: Hard errors detected. Exit code 1 is mandatory.
Refer to https://zenzic.dev/docs/reference/finding-codes for remediation · Try 'zenzic check --help' for options.
🔒 Suppression Audit: 0/30 (inline: 0, per-file: 0)
````

  </div>

  <div class="zz-section" style="padding-top: 0;">
    <div class="zz-section__inner">
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
        <a href="user-manual/reference/finding-codes.md#z104" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border: 1px solid var(--zz-border); border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: var(--zz-text); transition: border-color 0.2s;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--zz-muted);">Z104</span>
          <span>File not found</span>
          <span style="color: var(--zz-muted);">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z201" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border: 1px solid var(--zz-border); border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: var(--zz-text); transition: border-color 0.2s;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--zz-muted);">Z201</span>
          <span>Credential leak (exit 2)</span>
          <span style="color: var(--zz-muted);">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z405" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border: 1px solid var(--zz-border); border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: var(--zz-text); transition: border-color 0.2s;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--zz-muted);">Z405</span>
          <span>Unused asset</span>
          <span style="color: var(--zz-muted);">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z502" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border: 1px solid var(--zz-border); border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: var(--zz-text); transition: border-color 0.2s;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--zz-muted);">Z502</span>
          <span>Short content</span>
          <span style="color: var(--zz-muted);">→</span>
        </a>
        <a href="user-manual/reference/finding-codes.md#z601" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 1rem; border: 1px solid var(--zz-border); border-radius: 6px; text-decoration: none; font-size: 0.85rem; color: var(--zz-text); transition: border-color 0.2s;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: var(--zz-muted);">Z601</span>
          <span>Brand obsolescence</span>
          <span style="color: var(--zz-muted);">→</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Divider: FAILURE_TOPOLOGY -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// FAILURE_TOPOLOGY</div>
  </div>

  <!-- 3. Features Grid Section -->
  <div class="zz-section zz-section--dark">
    <div class="zz-section__inner">
      <p class="zz-overline">Features</p>
      <h2 class="zz-section__title">The Zenzic Standard <span class="zz-hero__muted">— Professional-grade static quality gates.</span></h2>
    </div>
  </div>

  <div class="zz-features grid cards" markdown="1">

-   :material-bullseye-arrow:{ .lg .middle } **Deterministic Defaults**

    Every finding resolves to a physical file and line number. Zero heuristics, zero stochastic predictions, and 100% reproducible pipeline outcomes.

-   :material-shield-check-outline:{ .lg .middle } **Zero-Config Security**

    Point Zenzic at any repository and run audits instantly out of the box. Sensible default rules require zero configuration to secure your codebase.

-   :material-language-python:{ .lg .middle } **Pure Python Scanners**

    AST-based parser with zero subprocesses. Safe, air-gapped execution that scans hundreds of files per second using the RE2 regular expression engine.

-   :material-transit-connection-variant:{ .lg .middle } **Engine-Agnostic Adapters**

    Native adapters for MkDocs, Zensical, and a zero-assumption Standalone mode. Keep CI behavior uniform across all documentation frameworks.

</div>

  <!-- Divider: DIAGNOSTIC_OUTPUT -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// DIAGNOSTIC_OUTPUT</div>
  </div>

  <!-- 4. Outcome / Security Section -->
  <div class="zz-section">
    <div class="zz-section__inner">
      <p class="zz-overline">Outcome</p>
      <h2 class="zz-section__title">Zenzic in Action <span class="zz-hero__muted">— CI gate blocks regressions before merge.</span></h2>
      <p class="zz-hero__sub" style="margin-bottom: 3.5rem;">
        Findings are deterministic by file and line. Exit code 1 blocks documentation debt, and the DQS flat-cost model keeps suppression debt explicit.
      </p>

      <div style="display: flex; flex-direction: column; gap: 4rem;">

        <!-- Row 1: Gutter Context -->
        <div class="zz-security-row">
          <div class="zz-ecosystem-row__info">
            <h3 class="zz-ecosystem-row__title">Deterministic finding context</h3>
            <p class="zz-ecosystem-row__desc">
              Each finding shows exact source line context. Teams can fix the issue without hunting through logs.
            </p>
          </div>
          <div class="highlight" style="border: 1px solid var(--zz-border); border-radius: 12px; background: rgba(13, 17, 23, 0.4); padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; box-shadow: 0 12px 32px rgba(0,0,0,0.25); overflow-x: auto; width: 100%; box-sizing: border-box;">
            <div style="color: var(--zz-muted); border-bottom: 1px solid var(--zz-border); padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-weight: 500;">docs/guide.md</div>
            <div style="display: flex; gap: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
              <span style="color: #f85149;">✘</span>
              <span style="background: rgba(248, 81, 73, 0.1); color: #f85149; padding: 0.1rem 0.3rem; border-radius: 2px;">[FILE_NOT_FOUND]</span>
              <span style="color: var(--zz-text);">'intro.md' not reachable from nav (would return 404)</span>
            </div>
            <div style="color: #484f58;"><span style="display: inline-block; width: 1.5rem; text-align: right; margin-right: 0.75rem;">15</span>│ before continuing.</div>
            <div style="background: rgba(255, 255, 255, 0.05); margin: 0.25rem -1.25rem; padding: 0.1rem 1.25rem; display: flex;">
              <span style="display: inline-block; width: 1.5rem; text-align: right; margin-right: 0.75rem; color: #f85149; font-weight: bold;">16</span>
              <span style="color: #f85149; margin-right: 0.25rem; font-weight: bold;">❱</span> <span style="color: var(--zz-text);">See the getting started page for details.</span>
            </div>
            <div style="color: #484f58;"><span style="display: inline-block; width: 1.5rem; text-align: right; margin-right: 0.75rem;">17</span>│ Then configure your environment.</div>
          </div>
        </div>

        <!-- Row 2: Credential Breaches -->
        <div class="zz-security-row">
          <div class="zz-ecosystem-row__info">
            <h3 class="zz-ecosystem-row__title">Credential leak blocked (exit 2)</h3>
            <p class="zz-ecosystem-row__desc">
              Scans every line, including fenced code blocks, for leaked credentials. Exit code 2 is reserved for security events.
            </p>
          </div>
          <div class="highlight" style="border: 1px solid rgba(248, 81, 73, 0.3); border-radius: 12px; background: rgba(248, 81, 73, 0.05); padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; box-shadow: 0 12px 32px rgba(0,0,0,0.25); overflow-x: auto; width: 100%; box-sizing: border-box;">
            <div style="color: #f85149; text-align: center; font-weight: bold; letter-spacing: 0.2em; font-size: 11px; border-bottom: 1px solid rgba(248, 81, 73, 0.15); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">SECURITY BREACH DETECTED</div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.25rem;"><span style="color: #f85149;">✘</span><span style="width: 6rem; color: var(--zz-muted);">Finding:</span><span style="color: var(--zz-text);">GitHub token detected</span></div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.25rem;"><span style="color: #f85149;">✘</span><span style="width: 6rem; color: var(--zz-muted);">Location:</span><span style="color: var(--zz-text);">docs/tutorial.md:42</span></div>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;"><span style="color: #f85149;">✘</span><span style="width: 6rem; color: var(--zz-muted);">Credential:</span><span style="background: rgba(248, 81, 73, 0.15); color: #ff7b72; padding: 0.1rem 0.3rem; border-radius: 2px;">ghp_•••••••••••••••••3456</span></div>
            <div style="border-top: 1px solid rgba(248, 81, 73, 0.15); padding-top: 0.75rem; margin-top: 0.75rem; display: flex; gap: 0.5rem;">
              <span style="width: 6rem; color: #484f58;">Action:</span>
              <span style="color: var(--zz-muted); flex: 1;">Rotate this credential immediately and purge it from the repository history.</span>
            </div>
          </div>
        </div>

        <!-- Row 3: Severity Summary -->
        <div class="zz-security-row">
          <div class="zz-ecosystem-row__info">
            <h3 class="zz-ecosystem-row__title">Gate result summary</h3>
            <p class="zz-ecosystem-row__desc">
              Every run ends with a compact status. Exit code 1 indicates a blocked merge due to quality findings.
            </p>
          </div>
          <div class="highlight" style="border: 1px solid var(--zz-border); border-radius: 12px; background: rgba(13, 17, 23, 0.4); padding: 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; box-shadow: 0 12px 32px rgba(0,0,0,0.25); overflow-x: auto; width: 100%; box-sizing: border-box;">
            <div style="display: flex; gap: 1.5rem; border-bottom: 1px solid var(--zz-border); padding-bottom: 0.75rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
              <span style="color: #f85149; font-weight: 500;">✘ 2 errors</span>
              <span style="color: #d29922; font-weight: 500;">⚠ 1 warning</span>
              <span style="color: var(--zz-muted);">• 1 file with findings</span>
            </div>
            <div style="color: #f85149; font-weight: bold; letter-spacing: 0.02em;">FAILED: Quality gate blocked merge (exit code 1).</div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- Divider: ADAPTER_SURFACE -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// ADAPTER_SURFACE</div>
  </div>

  <!-- 5. Ecosystem Section (Engineering Ledger) -->
  <div class="zz-section zz-section--dark">
    <div class="zz-section__inner">
      <p class="zz-overline">Ecosystem</p>
      <h2 class="zz-section__title">Run the same quality gate across stacks. <span class="zz-hero__muted">Docusaurus, MkDocs, Zensical, and standalone.</span></h2>
      <p class="zz-hero__sub" style="margin-bottom: 3.5rem;">
        Adapters normalize path and topology checks so CI behavior stays deterministic regardless of generator.
      </p>

      <!-- Adapter 1 -->
      <div class="zz-ecosystem-row">
        <div class="zz-ecosystem-row__info">
          <div class="zz-ecosystem-row__index">01</div>
          <h3 class="zz-ecosystem-row__title">Docusaurus Adapter</h3>
          <p class="zz-ecosystem-row__desc">
            Validates internal links, anchors, and navigation topology from Markdown source and Docusaurus configuration.
          </p>
        </div>
        <div class="zz-terminal">
          <div class="zz-terminal__bar">
            <span class="zz-dot zz-dot--red"></span>
            <span class="zz-dot zz-dot--yellow"></span>
            <span class="zz-dot zz-dot--green"></span>
            <span class="zz-terminal__title">docusaurus.config.ts · adapter run</span>
          </div>
          <pre class="zz-terminal__body"><code># Docusaurus project
uvx zenzic check all .

# Outcome
# exit 0 -> no blocking findings
# exit 1 -> quality gate blocks merge</code></pre>
        </div>
      </div>

      <!-- Adapter 2 -->
      <div class="zz-ecosystem-row">
        <div class="zz-ecosystem-row__info">
          <div class="zz-ecosystem-row__index">02</div>
          <h3 class="zz-ecosystem-row__title">MkDocs Adapter</h3>
          <p class="zz-ecosystem-row__desc">
            Reads MkDocs navigation topology and checks Markdown source directly, without requiring a site build.
          </p>
        </div>
        <div class="zz-terminal">
          <div class="zz-terminal__bar">
            <span class="zz-dot zz-dot--red"></span>
            <span class="zz-dot zz-dot--yellow"></span>
            <span class="zz-dot zz-dot--green"></span>
            <span class="zz-terminal__title">mkdocs.yml · adapter run</span>
          </div>
          <pre class="zz-terminal__body"><code># MkDocs project
uvx zenzic check all .

# Same gate semantics as Docusaurus
# deterministic findings, same exit codes</code></pre>
        </div>
      </div>

      <!-- Adapter 3 -->
      <div class="zz-ecosystem-row">
        <div class="zz-ecosystem-row__info">
          <div class="zz-ecosystem-row__index">03</div>
          <h3 class="zz-ecosystem-row__title">Zensical Adapter</h3>
          <p class="zz-ecosystem-row__desc">
            Uses zensical configuration to validate structure and content constraints with deterministic reporting.
          </p>
        </div>
        <div class="zz-terminal">
          <div class="zz-terminal__bar">
            <span class="zz-dot zz-dot--red"></span>
            <span class="zz-dot zz-dot--yellow"></span>
            <span class="zz-dot zz-dot--green"></span>
            <span class="zz-terminal__title">zensical.toml · adapter run</span>
          </div>
          <pre class="zz-terminal__body"><code># Zensical project
uvx zenzic check all .

# Output is machine-readable and human-readable
# for CI and local review</code></pre>
        </div>
      </div>

      <!-- Adapter 4 -->
      <div class="zz-ecosystem-row">
        <div class="zz-ecosystem-row__info">
          <div class="zz-ecosystem-row__index">04</div>
          <h3 class="zz-ecosystem-row__title">Standalone Repositories</h3>
          <p class="zz-ecosystem-row__desc">
            Runs on repositories without a framework-specific adapter by validating Markdown files and internal references directly.
          </p>
        </div>
        <div class="zz-terminal">
          <div class="zz-terminal__bar">
            <span class="zz-dot zz-dot--red"></span>
            <span class="zz-dot zz-dot--yellow"></span>
            <span class="zz-dot zz-dot--green"></span>
            <span class="zz-terminal__title">standalone repository · adapter run</span>
          </div>
          <pre class="zz-terminal__body"><code># Plain Markdown repository
uvx zenzic check all docs/

# Use in CI, pre-commit, or local checks
# without changing repository structure</code></pre>
        </div>
      </div>

    </div>
  </div>

  <!-- 6. Quickstart Section -->
  <div id="quickstart" class="zz-section">
    <div class="zz-section__inner">
      <p class="zz-overline">Get Started</p>
      <h2 class="zz-section__title">From zero to documentation integrity <span class="zz-hero__muted">in one command.</span></h2>
      <p class="zz-hero__sub" style="margin-bottom: 2.5rem;">
        No configuration required. No account needed. Works on any Markdown project.
      </p>

      <div class="zz-terminal" style="margin-bottom: 2.5rem;">
        <div class="zz-terminal__bar">
          <span class="zz-dot zz-dot--red"></span>
          <span class="zz-dot zz-dot--yellow"></span>
          <span class="zz-dot zz-dot--green"></span>
          <span class="zz-terminal__title">zenzic · quickstart</span>
        </div>
        <pre class="zz-terminal__body"><code><span class="zz-t-green">✓</span> <span class="zz-t-dim">zenzic · python 3.10+ · ready</span>

<span class="zz-t-dim"># run the documentation quality gate</span>
<span class="zz-t-dim">$</span> uvx zenzic check all

<span class="zz-t-dim"># exit 0: no blocking findings</span>
<span class="zz-t-dim"># exit 1: quality gate blocks merge</span></code></pre>
      </div>

      <div class="zz-hero__ctas" style="justify-content: flex-start; margin-bottom: 0;">
        <a href="user-manual/index.md" class="zz-btn zz-btn--primary">Read the full docs →</a>
        <a href="https://github.com/PythonWoods/zenzic" target="_blank" rel="noopener noreferrer" class="zz-btn zz-btn--outline" style="display: flex; gap: 0.5rem; align-items: center;">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
          Star on GitHub
        </a>
      </div>

    </div>
  </div>

  <!-- 7. Enterprise Section -->
  <div class="zz-section zz-section--dark">
    <div class="zz-section__inner">
      <p class="zz-overline">Enterprise</p>
      <h2 class="zz-section__title">Enterprise Governance &amp; Scoring</h2>
      <p class="zz-hero__sub" style="margin-bottom: 0;">
        Track suppression debt, enforce quality policies, and govern documentation health across teams and repositories.
      </p>
    </div>
  </div>

  <!-- Divider: GOVERNANCE_GATE -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// GOVERNANCE_GATE</div>
  </div>

  <!-- 8. Quality Score Section -->
  <div class="zz-section">
    <div class="zz-section__inner">
      <p class="zz-overline">Health Metrics</p>
      <h2 class="zz-section__title">Quality Score <span class="zz-hero__muted">— Deterministic health check, per commit.</span></h2>
      <p class="zz-hero__sub">
        Track a deterministic score in CI to block regressions. A holistic, elegant view of your documentation health.
      </p>

      <!-- Score Card Component -->
      <div class="zz-score-card">
        <div class="zz-score-card__left">
          <div class="zz-score-card__metrics-title">Metrics</div>
          <div>
            <div class="zz-score-card__overall-label">Overall Health</div>
            <div class="zz-score-card__overall-value">98</div>
            <div class="zz-score-card__trend-badge">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
              +2%
            </div>
          </div>
          <div style="margin-top: 2rem;">
            <div class="zz-score-card__ci-label">CI Command</div>
            <div class="zz-score-card__ci-cmd">zenzic score --save</div>
          </div>
        </div>

        <div class="zz-score-card__right">
          <div>
            <div class="zz-score-card__row">
              <span class="zz-score-card__row-label">
                <span class="zz-score-card__dot zz-score-card__dot--sky"></span>
                Internal Links Health
              </span>
              <span class="zz-score-card__row-value">99</span>
            </div>
            <div class="zz-score-card__sub-rows">
              <div class="zz-score-card__sub-row">
                <span class="zz-score-card__sub-row-label">
                  <span class="zz-score-card__sub-dot zz-score-card__sub-dot--sky"></span>
                  Anchor stability
                </span>
                <span class="zz-score-card__sub-row-value">100</span>
              </div>
              <div class="zz-score-card__sub-row">
                <span class="zz-score-card__sub-row-label">
                  <span class="zz-score-card__sub-dot zz-score-card__sub-dot--sky"></span>
                  External references
                </span>
                <span class="zz-score-card__sub-row-value">97</span>
              </div>
            </div>
          </div>

          <div style="border-top: 1px solid var(--zz-border); margin: 0.75rem 1rem;"></div>

          <div>
            <div class="zz-score-card__row">
              <span class="zz-score-card__row-label">
                <span class="zz-score-card__dot zz-score-card__dot--rose"></span>
                Orphan Detection
              </span>
              <span class="zz-score-card__row-value">95</span>
            </div>
            <div class="zz-score-card__sub-rows">
              <div class="zz-score-card__sub-row">
                <span class="zz-score-card__sub-row-label">
                  <span class="zz-score-card__sub-dot zz-score-card__sub-dot--rose"></span>
                  Unused Assets
                </span>
                <span class="zz-score-card__sub-row-value">91</span>
              </div>
              <div class="zz-score-card__sub-row">
                <span class="zz-score-card__sub-row-label">
                  <span class="zz-score-card__sub-dot zz-score-card__sub-dot--rose"></span>
                  Nav Isolation
                </span>
                <span class="zz-score-card__sub-row-value">100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- Divider: SUPPRESSION_POLICY -->
  <div class="zz-divider">
    <div class="zz-divider__inner">// SUPPRESSION_POLICY</div>
  </div>

  <!-- 9. Governance Preview Section -->
  <div class="zz-section zz-section--dark">
    <div class="zz-section__inner">
      <p class="zz-overline">Governance</p>
      <h2 class="zz-section__title">Suppression CAP <span class="zz-hero__muted">— Live Preview</span></h2>
      <p class="zz-hero__sub">
        When active suppressions exceed the configured CAP, zenzic-action writes this summary directly to the GitHub Actions job panel. No log diving required.
      </p>

      <div class="zz-cap-grid">
        <!-- Card 1: Breach -->
        <div>
          <div class="zz-ecosystem-row__index" style="margin-bottom: 0.5rem;">CAP exceeded — exit 1</div>
          <div class="zz-cap-card zz-cap-card--breach">
            <div class="zz-cap-card__header">
              <span class="zz-cap-card__title">✘ Suppression CAP Exceeded</span>
              <span class="zz-cap-card__badge">+13</span>
            </div>
            <div class="zz-cap-card__metrics">
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Active</div>
                <div class="zz-cap-card__metric-value">43</div>
              </div>
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Limit</div>
                <div class="zz-cap-card__metric-value">30</div>
              </div>
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Debt</div>
                <div class="zz-cap-card__metric-value zz-cap-card__metric-value--debt">+13</div>
              </div>
            </div>
            <div class="zz-cap-card__remediation">
              📋 <a href="contributor-guide/how-to/release-governance-protocol.md">Remediation Playbook →</a>
            </div>
          </div>
        </div>

        <!-- Card 2: OK -->
        <div>
          <div class="zz-ecosystem-row__index" style="margin-bottom: 0.5rem;">CAP within limit — exit 0</div>
          <div class="zz-cap-card zz-cap-card--ok">
            <div class="zz-cap-card__header">
              <span class="zz-cap-card__title">✔ Suppression CAP — Within Limit</span>
            </div>
            <div class="zz-cap-card__metrics">
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Active</div>
                <div class="zz-cap-card__metric-value">18</div>
              </div>
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Limit</div>
                <div class="zz-cap-card__metric-value">30</div>
              </div>
              <div class="zz-cap-card__metric">
                <div class="zz-cap-card__metric-label">Debt</div>
                <div class="zz-cap-card__metric-value zz-cap-card__metric-value--debt">-12</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 10. Entry Points & GitHub Integration Section -->
  <div class="zz-section">
    <div class="zz-section__inner" markdown="1">

<h2 class="zz-section__title" style="margin-top: 0; font-family: 'Inter', system-ui, sans-serif;">Four Entry Points</h2>

| | |
| :--- | :--- |
| **[Tutorials →](user-manual/tutorials/first-audit.md)** | From zero to a passing audit in 3 minutes. |
| **[How-to →](user-manual/how-to/configure-ci-cd.md)** | Integrate with GitHub Actions for automated CI/CD checks. |
| **[Reference →](user-manual/reference/cli.md)** | Every flag, every `Zxxx` code, every option. |
| **[Explanation →](user-manual/explanation/scoring-system.md)** | How findings reduce the 100-point baseline and how `fail_under` sets your CI threshold. |

<h2 class="zz-section__title" style="margin-top: 3.5rem; font-family: 'Inter', system-ui, sans-serif;">Native GitHub Integration</h2>

```yaml
- uses: PythonWoods/zenzic-action@<version>
  with:
    format: sarif
    upload-sarif: "true"
```

Findings can appear as **inline Pull Request annotations** and in the **Security tab** — no log parsing, no custom scripts, no post-processing. The official [`PythonWoods/zenzic-action`](https://github.com/PythonWoods/zenzic-action) handles installation, execution, and SARIF upload in a single workflow step.

CI verification in this repository uses an Ubuntu runner.

<div style="border-top: 1px solid var(--zz-border); margin: 3.5rem 0 2rem;"></div>

<p style="text-align: center; font-style: italic; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--zz-muted); margin: 0;">
  "The Code is Law. The Documentation is Truth. Zenzic is vigilant."
</p>

    </div>
  </div>

</div>
