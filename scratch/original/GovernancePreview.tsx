// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Translate from '@docusaurus/Translate';
import CapExceededSummary from '@site/src/components/CapExceededSummary';

export default function GovernancePreview(): React.JSX.Element {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
            <Translate id="governance.label">Governance</Translate>
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="homepage.governance.title">Suppression CAP</Translate>{' '}
            <span className="dark:text-zinc-500 text-zinc-400">
              <Translate id="homepage.governance.title.muted">— Live Preview</Translate>
            </span>
          </h2>
          <p className="dark:text-zinc-500 text-zinc-500 max-w-xl text-sm leading-relaxed">
            <Translate id="homepage.governance.sub">
              When active suppressions exceed the configured CAP, zenzic-action writes this summary
              directly to the GitHub Actions job panel. No log diving required.
            </Translate>
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* CAP breached */}
          <div className="md:col-span-7 h-full flex flex-col [&>div]:flex-1 [&>div]:my-0">
            <p className="text-[11px] font-mono font-semibold tracking-widest dark:text-zinc-400 text-zinc-500 mb-3 uppercase">
              <Translate id="governance.preview.breach">CAP exceeded — exit 1</Translate>
            </p>
            <CapExceededSummary
              activeSuppressions={43}
              globalCap={30}
              remediationUrl="/developers/how-to/release-governance-protocol"
            />
          </div>

          {/* CAP within limit */}
          <div className="md:col-span-5 h-full flex flex-col [&>div]:flex-1 [&>div]:my-0">
            <p className="text-[11px] font-mono font-semibold tracking-widest dark:text-zinc-400 text-zinc-500 mb-3 uppercase">
              <Translate id="governance.preview.ok">CAP within limit — exit 0</Translate>
            </p>
            <CapExceededSummary activeSuppressions={18} globalCap={30} />
          </div>
        </div>
      </div>
    </section>
  );
}
