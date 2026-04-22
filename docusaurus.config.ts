import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
        },
        blog: {
          blogTitle: 'The Obsidian Journal',
          blogDescription: 'Engineering insights, security post-mortems, and the evolution of Zenzic.',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 8,
          postsPerPage: 5,
          showReadingTime: true,
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
      {property: 'og:image:width', content: '1200'},
      {property: 'og:image:height', content: '630'},
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
        src: '/brand/svg/zenzic-icon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'html',
          position: 'left',
          value: '<span class="badge badge--secondary" style="margin-left: -0.5rem; font-size: 0.75rem;">v0.7.0</span>',
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
  } satisfies Preset.ThemeConfig,
};

export default config;
