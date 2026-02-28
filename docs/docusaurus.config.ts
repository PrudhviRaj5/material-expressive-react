import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

function ensureBaseUrl(v: string): string {
  // Docusaurus expects a leading and trailing slash.
  const withLeading = v.startsWith('/') ? v : `/${v}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'material-expressive-react';
const repoOwner = process.env.GITHUB_REPOSITORY?.split('/')[0] ?? 'prudhviraj5';

// Allow overriding for previews, but keep sensible defaults.
//
// Production deploy target for this repo:
//   https://prudhviraj5.github.io/<repo>/docs/
// Local dev:
//   http://localhost:3000/
const baseUrl = ensureBaseUrl(
  process.env.DOCUSAURUS_BASE_URL ??
    // Default production build assumes the docs site is hosted under `/docs/`.
    // GitHub Pages project sites are hosted under `/<repo>/...`, so CI sets
    // `DOCUSAURUS_BASE_URL=/<repo>/docs/` in
    // [`.github/workflows/storybook-pages.yml`](.github/workflows/storybook-pages.yml:1).
    (process.env.NODE_ENV === 'production' ? `/docs/` : '/'),
);

const storybookPath = ensureBaseUrl(
  process.env.STORYBOOK_BASE_URL ??
    (process.env.NODE_ENV === 'production' ? `/${repoName}/storybook/` : '/storybook/'),
);

// Prefer a fully-qualified URL to avoid baseUrl prefixing issues.
const storybookUrl =
  process.env.STORYBOOK_URL ??
  (process.env.NODE_ENV === 'production'
    ? `https://${repoOwner}.github.io/${repoName}/storybook/`
    : 'http://localhost:6006/');

const config: Config = {
  title: 'material-expressive-react',
  tagline: 'React wrappers for Material 3 Material Web components (@material/web)',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Docs are deployed to GitHub Pages under:
  //   https://prudhviraj5.github.io/<repo>/docs/
  url: 'https://prudhviraj5.github.io',
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'prudhviraj5',
  projectName: repoName,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: `https://github.com/prudhviraj5/${repoName}/tree/main/docs/`,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'material-expressive-react',
      logo: {
        alt: 'material-expressive-react',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: storybookUrl,
          label: 'Storybook',
          position: 'left',
        },
        {
          href: `https://github.com/prudhviraj5/${repoName}`,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Storybook',
              href: storybookUrl,
            },
            {
              label: 'GitHub',
              href: `https://github.com/prudhviraj5/${repoName}`,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} material-expressive-react. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
