import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zenzic',
  tagline: 'Documentation security layer',
  favicon: 'img/favicon.ico',

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
      it: { label: 'Italiano' },
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
        blog: false,
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
    // Social sharing image
    image: '/assets/social/social-card.svg',
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
          value: '<span class="badge badge--secondary" style="margin-left: -0.5rem; font-size: 0.75rem;">v0.6.1rc2</span>',
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
      copyright: `© ${new Date().getFullYear()} PythonWoods. Zenzic v0.6.1rc2. Apache-2.0 License. · Python 3.11+ · Zero runtime dependencies`,
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