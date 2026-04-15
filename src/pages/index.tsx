import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import '@site/src/css/homepage.css';

import Hero from '../components/Homepage/Hero';
import Features from '../components/Homepage/Features';
import SentinelSection from '../components/Homepage/SentinelSection';
import QualityScore from '../components/Homepage/QualityScore';

export default function Home(): React.JSX.Element {
  return (
    <Layout
      noFooter
      wrapperClassName="zz-homepage"
      title="High-performance documentation linter"
      description="Engineering-grade, engine-agnostic linter and security shield for Markdown documentation."
    >
      <div data-theme="dark" className="flex flex-col min-h-screen relative w-full">
        <Head>
          <meta property="og:title" content="Zenzic - High-performance documentation linter" />
        </Head>

        <main className="flex-grow mt-0 pt-0">
          <Hero />
          <div className="w-full border-t dark:border-zinc-800 border-zinc-200" />
          <Features />
          <SentinelSection />
          <QualityScore />
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
