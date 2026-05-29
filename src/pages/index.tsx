// SPDX-FileCopyrightText: 2026 PythonWoods <dev@pythonwoods.dev>
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';
import '@site/src/css/homepage.css';

import Hero from '../components/Homepage/Hero';
import Features from '../components/Homepage/Features';
import EngineeringLedger from '../components/Homepage/EngineeringLedger';
import SecuritySection from '../components/Homepage/SecuritySection';
import Quickstart from '../components/Homepage/Quickstart';
import QualityScore from '../components/Homepage/QualityScore';
import GovernancePreview from '../components/Homepage/GovernancePreview';

function DiagnosticDivider({label, className}: {label: string; className?: string}): React.JSX.Element {
  return (
    <div className={`zz-divider px-6 py-2 ${className ?? ''}`}>
      <div className="max-w-[1400px] mx-auto text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
        <span>{label}</span>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      wrapperClassName="zz-homepage"
      title="Zenzic — Documentation Quality Gate for CI/CD"
      description="Detect broken links, leaked credentials, and documentation drift before merge."
    >
      <div data-theme="dark" className="flex flex-col min-h-screen relative w-full dark:bg-zinc-950 bg-white">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Zenzic — Documentation Quality Gate for CI/CD" />
          <meta property="og:description" content="Detect broken links, leaked credentials, and documentation drift before merge." />
          <meta property="og:image" content="https://zenzic.dev/assets/social/social-card.png" />
          <meta property="og:url" content="https://zenzic.dev/" />
          <meta name="twitter:title" content="Zenzic — Documentation Quality Gate for CI/CD" />
          <meta name="twitter:description" content="Detect broken links, leaked credentials, and documentation drift before merge." />
          <meta name="twitter:image" content="https://zenzic.dev/assets/social/social-card.png" />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Zenzic",
            "operatingSystem": "Linux, macOS, Windows",
            "applicationCategory": "DeveloperApplication",
            "description": "Detect broken links, leaked credentials, and documentation drift before merge.",
            "url": "https://zenzic.dev",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}</script>
        </Head>

        <main className="zz-audit-grid flex-grow mt-0 pt-0">
          <Hero />
          <DiagnosticDivider label="// EXECUTION_LAYER" />
          <Features />
          <DiagnosticDivider label="// FAILURE_TOPOLOGY" />
          <SecuritySection />
          <DiagnosticDivider label="// DIAGNOSTIC_OUTPUT" />
          <EngineeringLedger />
          <DiagnosticDivider label="// ADAPTER_SURFACE" />
          <Quickstart />
          {/* Enterprise Zone — Progressive Disclosure for advanced users */}
          <section className="py-10">
            <div className="max-w-5xl mx-auto px-6">
              <p className="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
                <Translate id="enterprise.section.label">Enterprise</Translate>
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900">
                <Translate id="homepage.enterprise.title">Enterprise Governance &amp; Scoring</Translate>
              </h2>
              <p className="mt-4 dark:text-zinc-500 text-zinc-500 max-w-xl text-sm leading-relaxed">
                <Translate id="enterprise.section.sub">Track suppression debt, enforce quality policies, and govern documentation health across teams and repositories.</Translate>
              </p>
            </div>
          </section>
          <DiagnosticDivider label="// GOVERNANCE_GATE" />
          <QualityScore />
          <DiagnosticDivider label="// SUPPRESSION_POLICY" />
          <GovernancePreview />
        </main>
      </div>
    </Layout>
  );
}
