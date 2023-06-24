const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Great Knowledge',
  staticDirectories: ['public', 'static'],
  tagline: '🤠😎😴🧐',
  favicon: 'img/logo.png',
  url: 'https://main.pulsarforge.io',
  baseUrl: '/',
  organizationName: 'pulsarforge',
  projectName: 'Build and ship cool projects',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
        {
          indexDocs: true,
          docsRouteBasePath: '/'
        }
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
      image: 'img/logo.png',
      navbar: {
        title: 'Main',
        logo: {
          alt: 'Web3 Labs',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'shipping',
            position: 'left',
            label: 'Devs Docs',
          },
          {
            href: 'https://pulsarforge.io',
            label: 'Web3 Labs',
            position: 'right',
          },
          {
            href: 'https://pulsarforge.substack.com/',
            label: 'Newsletter',
            position: 'right',
          },
          {
            href: 'https://www.youtube.com/@pulsarforge',
            label: 'Channel',
            position: 'right',
          },
          {
            href: 'https://github.com/pulsarforge/devs-docs-lab',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://discord.com/invite/4mXg6QSyY8',
            label: 'Discord',
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
