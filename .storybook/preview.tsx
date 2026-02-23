import type {Preview} from '@storybook/react';
import React from 'react';

import '../src/theme/storybook.css';
import {applyMaterialTypography} from '../src/theme/applyMaterialTypography';

applyMaterialTypography();

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;

