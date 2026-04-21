import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import '@site/src/css/homepage.css';

import Hero from '../components/Homepage/Hero';
import EngineeringLedger from '../components/Homepage/EngineeringLedger';
import SentinelSection from '../components/Homepage/SentinelSection';
import QualityScore from '../components/Homepage/QualityScore';
import Quickstart from '../components/Homepage/Quickstart';

export default function Home(): React.JSX.Element {
  return (
    <Layout
      noFooter
      wrapperClassName="zz-homepage"
      title="Zenzic — The Safe Harbor for Markdown"
      description="High-performance, engine-agnostic, and security-hardened static analysis for Markdown documentation."
    >
      <div data-theme="dark" className="flex flex-col min-h-screen relative w-full">
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Zenzic — The Safe Harbor for Markdown Documentation" />
          <meta property="og:description" content="High-performance, engine-agnostic, and security-hardened static analysis. Catch broken links, orphan pages, and leaked credentials before your users do." />
          <meta property="og:image" content="https://zenzic.dev/assets/social/social-card.png" />
          <meta property="og:url" content="https://zenzic.dev/" />
          <meta name="twitter:title" content="Zenzic — The Safe Harbor for Markdown Documentation" />
          <meta name="twitter:description" content="High-performance, engine-agnostic, and security-hardened static analysis. Catch broken links, orphan pages, and leaked credentials before your users do." />
          <meta name="twitter:image" content="https://zenzic.dev/assets/social/social-card.png" />
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Zenzic",
            "operatingSystem": "Linux, macOS, Windows",
            "applicationCategory": "DeveloperApplication",
            "softwareVersion": "0.6.1",
            "description": "High-performance, engine-agnostic, and security-hardened static analysis for Markdown documentation.",
            "url": "https://zenzic.dev",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}</script>
        </Head>

        <main className="flex-grow mt-0 pt-0">
          <Hero />
          <div className="w-full border-t dark:border-zinc-800 border-zinc-200" />
          <EngineeringLedger />
          <SentinelSection />
          <QualityScore />
          <Quickstart />
        </main>

        <footer className="py-12 border-t dark:border-zinc-800/60 border-zinc-200 mt-auto">
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
