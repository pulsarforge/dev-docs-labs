const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Developer Great Knowledge',
  staticDirectories: ['public', 'static'],
  tagline: '🤠😎😴🧐',
  favicon: 'img/devs-docs.png',
  url: 'https://main.pulsarforge.io',
  baseUrl: '/',
  organizationName: 'pulsarforge',
  projectName: 'Build and ship cool platforms',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
        {
          indexDocs: true,
          docsRouteBasePath: '/'
        },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/pulsarforge/devs-docs-lab/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/pulsarforge/devs-docs-lab/edit/main/',
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
      },
      image: 'img/devs-docs.png',
      navbar: {
        title: 'Main',
        logo: {
          alt: 'Web3 Labs',
          src: 'img/devs-docs.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'Mind',
            position: 'left',
            label: 'Devs Docs',
          },
          {
            href: 'https://pulsarforge.io/',
            label: 'Dev Labs',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Pulsarforge all rights reserved`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
