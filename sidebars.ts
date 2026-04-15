import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'philosophy',
    {
      type: 'category',
      label: 'User Guide',
      link: {type: 'generated-index', description: 'Install, configure, and run Zenzic on your documentation.'},
      items: [
        'usage/index',
        'usage/commands',
        'usage/advanced',
        'usage/badges',
      ],
    },
    {
      type: 'category',
      label: 'Developers',
      link: {type: 'generated-index', description: 'Extend Zenzic with custom adapters, plugin rules, and integrations.'},
      items: [
        'internals/developers/index',
        'internals/developers/writing-an-adapter',
        'internals/developers/plugins',
        'internals/developers/examples',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'generated-index', description: 'Configuration reference, engine adapters, and custom rules.'},
      items: [
        'guides/checks',
        'guides/configuration-reference',
        'guides/discovery',
        'guides/custom-rules-dsl',
        'guides/engines',
        'guides/adapters-config',
        'guides/core-settings',
        'guides/ci-cd',
        'guides/migration',
        'guides/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Ecosystem',
      link: {type: 'generated-index', description: 'Adapters, integrations, and how Zenzic fits into your documentation pipeline.'},
      items: [
        'ecosystem/overview',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      link: {type: 'generated-index', description: 'Contribute, report bugs, request features, and explore the project.'},
      items: [
        {
          type: 'category',
          label: 'How to Contribute',
          link: {type: 'doc', id: 'community/contribute/index'},
          items: [
            'community/contribute/pull-requests',
            'community/contribute/report-a-bug',
            'community/contribute/report-a-docs-issue',
            'community/contribute/request-a-change',
          ],
        },
        'community/faqs',
        'community/brand-kit',
        'community/license',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      link: {type: 'generated-index', description: 'Reference projects that demonstrate Zenzic in real-world scenarios.'},
      items: [
        'examples/overview',
      ],
    },
  ],
};

export default sidebars;
