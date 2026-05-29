// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import Translate from '@docusaurus/Translate';

function EcosystemPanel({
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

function EcosystemRow({
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

export default function EngineeringLedger(): React.JSX.Element {
  return (
    <section className="dark:bg-zinc-950 bg-white py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-4 max-w-3xl">
          <p className="text-[11px] font-mono tracking-[0.18em] dark:text-zinc-600 text-zinc-400 mb-4 uppercase">
            <Translate id="ledger.label">Ecosystem</Translate>
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900 mb-4">
            <Translate id="ledger.heading">Run the same quality gate across documentation stacks.</Translate>{' '}
            <span className="dark:text-zinc-500 text-zinc-400">
              <Translate id="ledger.heading.muted">Docusaurus, MkDocs, Zensical, and standalone repositories.</Translate>
            </span>
          </h2>
          <p className="dark:text-zinc-500 text-zinc-500 text-base">
            <Translate id="ledger.sub">
              Adapters normalize path and topology checks so CI behavior stays deterministic regardless of generator.
            </Translate>
          </p>
        </div>

        <EcosystemRow
          index="01"
          title={
            <Translate id="ledger.01.title">Docusaurus Adapter</Translate>
          }
          desc={
            <Translate id="ledger.01.desc">
              Validates internal links, anchors, and navigation topology from Markdown source and Docusaurus configuration.
            </Translate>
          }
          terminal={
            <EcosystemPanel filename="docusaurus.config.ts · adapter run">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# Docusaurus project
uvx zenzic check all .

# Outcome
# exit 0 -> no blocking findings
# exit 1 -> quality gate blocks merge`}
                </code>
              </pre>
            </EcosystemPanel>
          }
        />

        <EcosystemRow
          index="02"
          title={<Translate id="ledger.02.title">MkDocs Adapter</Translate>}
          desc={
            <Translate id="ledger.02.desc">
              Reads MkDocs navigation topology and checks Markdown source directly, without requiring a site build.
            </Translate>
          }
          terminal={
            <EcosystemPanel filename="mkdocs.yml · adapter run">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# MkDocs project
uvx zenzic check all .

# Same gate semantics as Docusaurus
# deterministic findings, same exit codes`}
                </code>
              </pre>
            </EcosystemPanel>
          }
        />

        <EcosystemRow
          index="03"
          title={
            <Translate id="ledger.03.title">Zensical Adapter</Translate>
          }
          desc={
            <Translate id="ledger.03.desc">
              Uses zensical configuration to validate structure and content constraints with deterministic reporting.
            </Translate>
          }
          terminal={
            <EcosystemPanel filename="zensical.toml · adapter run">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# Zensical project
uvx zenzic check all .

# Output is machine-readable and human-readable
# for CI and local review`}
                </code>
              </pre>
            </EcosystemPanel>
          }
        />

        <EcosystemRow
          index="04"
          title={<Translate id="ledger.04.title">Standalone Markdown Repositories</Translate>}
          desc={
            <Translate id="ledger.04.desc">
              Runs on repositories without a framework-specific adapter by validating Markdown files and internal references directly.
            </Translate>
          }
          terminal={
            <EcosystemPanel filename="standalone repository · adapter run">
              <pre className="m-0 bg-transparent whitespace-pre">
                <code>
                  {`# Plain Markdown repository
uvx zenzic check all docs/

# Use in CI, pre-commit, or local checks
# without changing repository structure`}
                </code>
              </pre>
            </EcosystemPanel>
          }
        />
      </div>
    </section>
  );
}
