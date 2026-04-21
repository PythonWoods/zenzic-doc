// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Translate from '@docusaurus/Translate';

// ── Minimal terminal box ───────────────────────────────────────────────────
function LedgerTerminal({
  filename,
  children,
}: {
  filename: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="rounded-xl overflow-hidden border dark:border-zinc-800/60 border-zinc-200 bg-zinc-900/20 backdrop-blur-md font-mono text-[12px] leading-relaxed shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b dark:border-zinc-800/40 border-zinc-200">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 dark:text-zinc-500 text-zinc-400 text-[11px] tracking-wide">
          {filename}
        </span>
      </div>
      <div className="px-5 py-4 dark:text-zinc-400 text-zinc-600 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

// ── One ledger row ─────────────────────────────────────────────────────────
function LedgerRow({
  index,
  title,
  desc,
  terminal,
}: {
  index: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  terminal: React.ReactNode;
}): React.JSX.Element {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-16 py-12 border-t dark:border-zinc-800/60 border-zinc-200 items-start">
      <div>
        <span className="text-[11px] font-mono tracking-[0.18em] dark:text-zinc-600 text-zinc-400 mb-4 block uppercase">
          {index}
        </span>
        <h3 className="text-lg font-semibold dark:text-white text-zinc-900 mb-3 leading-snug">
          {title}
        </h3>
        <p className="dark:text-zinc-500 text-zinc-500 text-sm leading-relaxed">{desc}</p>
      </div>
      <div>{terminal}</div>
    </div>
  );
}

// ── The Obsidian Engineering Ledger ───────────────────────────────────────
export default function EngineeringLedger(): React.JSX.Element {
  return (
    <section className="dark:bg-zinc-950 bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section header */}
        <div className="mb-4 max-w-3xl">
          <p className="text-[11px] font-mono tracking-[0.18em] dark:text-zinc-600 text-zinc-400 mb-4 uppercase">
            <Translate id="ledger.label">The Obsidian Engineering Ledger</Translate>
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="ledger.heading">Three invariants enforced on every commit.</Translate>{' '}
            <span className="dark:text-zinc-500 text-zinc-400">
              <Translate id="ledger.heading.muted">No exceptions. No shortcuts.</Translate>
            </span>
          </h2>
          <p className="dark:text-zinc-500 text-zinc-500 text-base">
            <Translate id="ledger.sub">
              These are not aspirations — they are gates. Every release of Zenzic ships only when
              all three pass.
            </Translate>
          </p>
        </div>

        {/* ── 01 — Zero Assumptions ─────────────────────────────────────── */}
        <LedgerRow
          index="01"
          title={
            <Translate id="ledger.01.title">Zero Assumptions at System Boundaries</Translate>
          }
          desc={
            <Translate id="ledger.01.desc">
              Every public entry point validates its inputs at the boundary. Internal hot paths
              carry no defensive checks — the shape is guaranteed by the type system, enforced by
              mypy --strict on every merge.
            </Translate>
          }
          terminal={
            <LedgerTerminal filename="pyproject.toml · type enforcement">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`[tool.mypy]
strict            = true
warn_return_any   = true
warn_unreachable  = true

# Every public function has a typed signature.
# Every Any must be justified in a comment.`}
                </code>
              </pre>
            </LedgerTerminal>
          }
        />

        {/* ── 02 — Subprocess-Free ──────────────────────────────────────── */}
        <LedgerRow
          index="02"
          title={<Translate id="ledger.02.title">Subprocess-Free Analysis</Translate>}
          desc={
            <Translate id="ledger.02.desc">
              Production-grade tools do not shell out during analysis. No subprocess.run(), no
              os.system() inside per-item loops. Zenzic validates your documentation stack without
              executing it.
            </Translate>
          }
          terminal={
            <LedgerTerminal filename="pillar-2 · subprocess boundary">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# ✓ ALLOWED — single setup phase
class ZenzicEngine:
    def __init__(self, config: Config):
        self._vsm = build_vsm(config)   # I/O once

# ✗ BLOCKED — subprocess inside analysis loop
for page in corpus:
    subprocess.run([...])  # ← architectural defect`}
                </code>
              </pre>
            </LedgerTerminal>
          }
        />

        {/* ── 03 — Deterministic Dependency Graph ───────────────────────── */}
        <LedgerRow
          index="03"
          title={
            <Translate id="ledger.03.title">Deterministic Dependency Graph</Translate>
          }
          desc={
            <Translate id="ledger.03.desc">
              Every dependency is pinned in a lockfile, audited by Dependabot, and scanned for
              SPDX licence compatibility. No transitive surprises at release time. uv lock and
              reuse lint run on every commit.
            </Translate>
          }
          terminal={
            <LedgerTerminal filename="reuse · SPDX compliance">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# runs on every commit via pre-commit
nox -s reuse

✓ SPDX headers present   │ all source files
✓ Apache-2.0 declared    │ LICENSES/
✓ Third-party notices    │ NOTICE
# No dependency ships
# without a licence audit.`}
                </code>
              </pre>
            </LedgerTerminal>
          }
        />
      </div>
    </section>
  );
}
