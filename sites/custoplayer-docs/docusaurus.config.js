// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Custoplayer',
  tagline: 'A Quicker Way to Create Customizable Video Players',
  favicon:
    'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Ficon.svg',

  // Set the production url of your site here
  url: 'https://etesam913.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Custoplayer/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'etesam913', // Usually your GitHub org/user name.
  projectName: 'Custoplayer', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Custoplayer',
        logo: {
          alt: 'Custoplayer Logo',
          src: 'https://custoplayer.nyc3.cdn.digitaloceanspaces.com/docs%2Ficon.svg',
        },
        items: [
          // { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/Etesam913/Custoplayer',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'T887KLC3F1',

        // Public API key: it is safe to commit it
        apiKey: 'fb9b48a10fc8f36b781875fee2b40a15',

        indexName: 'custoplayer',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Quick Start',
                to: '/quick-start',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/etesam913/custoplayer',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Custoplayer`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
