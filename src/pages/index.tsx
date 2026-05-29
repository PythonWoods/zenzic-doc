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

function DiagnosticDivider({label, coord, className}: {label: string; coord: string; className?: string}): React.JSX.Element {
  return (
    <div className={`zz-divider px-6 py-3 ${className ?? ''}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 text-[10px] font-mono font-semibold tracking-[0.16em] uppercase dark:text-zinc-500 text-zinc-500">
        <span>{label}</span>
        <span className="dark:text-zinc-400 text-zinc-600">{coord}</span>
      </div>
    </div>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <Layout
      noFooter
      wrapperClassName="zz-homepage"
      title="Zenzic — Documentation Quality Gate for CI/CD"
      description="Detect broken links, leaked credentials, and documentation drift before merge."
    >
      <div data-theme="dark" className="flex flex-col min-h-screen relative w-full">
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
          <DiagnosticDivider label="// EXECUTION_LAYER" coord="SCAN::A001" className="mt-16" />
          <Features />
          <DiagnosticDivider label="// FAILURE_TOPOLOGY" coord="SCAN::B014" />
          <SecuritySection />
          <DiagnosticDivider label="// DIAGNOSTIC_OUTPUT" coord="SCAN::C030" />
          <EngineeringLedger />
          <DiagnosticDivider label="// ADAPTER_SURFACE" coord="SCAN::D042" />
          <Quickstart />
          {/* Enterprise Zone — Progressive Disclosure for advanced users */}
          <section className="dark:bg-zinc-950 bg-white py-16">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <p className="text-[11px] font-mono font-semibold tracking-[0.18em] dark:text-zinc-400 text-zinc-500 mb-4 uppercase">
                <Translate id="enterprise.section.label">Enterprise</Translate>
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white text-zinc-900">
                <Translate id="homepage.enterprise.title">Enterprise Governance &amp; Scoring</Translate>
              </h2>
            </div>
          </section>
          <DiagnosticDivider label="// GOVERNANCE_GATE" coord="SCAN::F070" />
          <QualityScore />
          <DiagnosticDivider label="// SUPPRESSION_POLICY" coord="SCAN::G089" />
          <GovernancePreview />
        </main>

        <DiagnosticDivider label="// RUNTIME_FOOTER" coord="SCAN::H0AF" />
        <footer className="py-12 mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] dark:text-zinc-500 text-zinc-400">
            <p>© 2026 PythonWoods. Apache-2.0 License.</p>
            <div className="flex items-center gap-4">
              <span>Python 3.11+</span>
              <span className="w-1 h-1 rounded-full dark:bg-zinc-700 bg-zinc-300" />
              <span>Zero runtime dependencies</span>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
}
