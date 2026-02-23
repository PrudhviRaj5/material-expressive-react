import type {StorybookConfig} from '@storybook/react-vite';

const base = (process.env.STORYBOOK_BASE_PATH ?? '/').endsWith('/')
  ? (process.env.STORYBOOK_BASE_PATH ?? '/')
  : `${process.env.STORYBOOK_BASE_PATH}/`;

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  viteFinal: async (viteConfig) => {
    // GitHub Pages hosts project sites under `/<repo>/`, so allow a configurable base.
    // Local dev defaults to '/'.
    viteConfig.base = base;
    return viteConfig;
  },
  typescript: {
    // Ensure TS props (interfaces) show up in Docs/Props tables.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        // Hide React's intrinsic DOM attributes and keep our wrapper props.
        if (prop.parent) {
          const fileName = prop.parent.fileName || '';
          if (fileName.includes('node_modules')) return false;
        }
        return true;
      },
    },
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
