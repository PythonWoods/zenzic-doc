import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Zenzic',
  tagline: 'Documentation security layer',
  favicon: 'assets/favicon/png/zenzic-icon-32.png',

  // Future flags for v4 compatibility
  future: {
    v4: true,
  },

  url: 'https://zenzic.dev',
  baseUrl: '/',
  organizationName: 'PythonWoods',
  projectName: 'zenzic-doc',

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib',
      crossorigin: 'anonymous',
    },
  ],

  onBrokenLinks: 'throw',

  markdown: {
    format: 'mdx',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
    mdx1Compat: {
      headingIds: true,
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    localeConfigs: {
      en: { label: 'English' },
      it: { label: 'Italiano', htmlLang: 'it-IT', path: 'it' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/PythonWoods/zenzic-doc/edit/main/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          lastVersion: 'current',
          versions: {
            current: {
              label: '0.7.0',
              badge: false,
              banner: 'none',
            },
          },
        },
        blog: {
          blogTitle: 'The Obsidian Journal',
          blogDescription: 'Engineering insights, security post-mortems, and the evolution of Zenzic.',
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 5,
          showReadingTime: true,
          admonitions: true,
          onInlineTags: 'throw',
          feedOptions: {
            type: ['rss', 'atom'],
            title: 'The Obsidian Journal — Zenzic Engineering Blog',
            description: 'Engineering insights, security post-mortems, and the evolution of Zenzic.',
            copyright: `© ${new Date().getFullYear()} PythonWoods`,
          },
          editUrl: 'https://github.com/PythonWoods/zenzic-doc/edit/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    function tailwindPlugin() {
      return {
        name: 'tailwindcss-docusaurus',
        configurePostCss(postcssOptions: {plugins: unknown[]}) {
          postcssOptions.plugins.push(require('@tailwindcss/postcss'));
          return postcssOptions;
        },
      };
    },
  ],

  themeConfig: {
    // Social sharing image (OG + Twitter Cards)
    image: 'assets/social/social-card.png',
    metadata: [
      {name: 'keywords', content: 'markdown, linter, docusaurus, mkdocs, static analysis, documentation, security, broken links, orphan pages'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@PythonWoods'},
      {name: 'twitter:creator', content: '@PythonWoods'},
      {name: 'twitter:image:alt', content: 'Zenzic — The Safe Harbor for Markdown Documentation'},
      {name: 'theme-color', content: '#4f46e5'},
      {property: 'og:image', content: 'https://zenzic.dev/assets/social/social-card.png'},
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'https://zenzic.dev/'},
    ],
    headTags: [
      {
        tagName: 'link',
        attributes: {
          rel: 'canonical',
          href: 'https://zenzic.dev/',
        },
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Zenzic',
      logo: {
        alt: 'Zenzic Logo',
        src: '/assets/brand/svg/zenzic-icon.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/blog',
          label: 'Journal',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/PythonWoods/zenzic',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `© ${new Date().getFullYear()} PythonWoods. Zenzic v0.7.0. Apache-2.0 License. · Python 3.11+ · Zero runtime dependencies`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      // Language support for Zenzic-scanned file types
      additionalLanguages: ['toml', 'bash', 'yaml', 'json'],
    },
    // ── ObsidianPalette Mermaid Integration ──────────────────────────────────
    // Hex values only — Mermaid's renderer cannot consume CSS var().
    // Dark mode: exact CLI ObsidianPalette matches.
    // Light mode uses Docusaurus 'neutral' base; themeVariables below are
    // applied to both — optimised for the default dark surface.
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
      options: {
        themeVariables: {
          // Primary nodes → BRAND Indigo
          primaryColor:        '#4f46e5',
          primaryTextColor:    '#e4e4e7',
          primaryBorderColor:  '#3730a3',
          // Edges / connectors → DIM Slate
          lineColor:           '#64748b',
          // Secondary / tertiary surfaces → Obsidian depth
          secondaryColor:      '#1e1e27',
          tertiaryColor:       '#111118',
          edgeLabelBackground: '#0f0f13',
          // Cluster boxes
          clusterBkg:          '#0c0c10',
          clusterBorder:       '#3730a3',
          // Error nodes → ERROR Rose (exit codes 1–3)
          errorBkgColor:       '#1a0005',
          errorTextColor:      '#f43f5e',
          // Title and general text
          titleColor:          '#fafafa',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
