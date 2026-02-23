import React from 'react';
import {action} from '@storybook/addon-actions';

import {Button} from './Button';
import {Icon} from '../icon';

const meta = {
  title: 'button/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      // Keep `variant` at the top.
      sort: 'none',
      include: [
        'variant',
        'size',
        'disabled',
        'href',
        'target',
        'trailingIcon',
        'type',
        'value',
        'name',
        'form',
      ],
    },
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: ['elevated', 'filled', 'filledTonal', 'outlined', 'text'],
    },
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    disabled: {control: 'boolean'},
    href: {control: 'text'},
    target: {control: 'text'},
    trailingIcon: {control: 'boolean'},
    type: {control: {type: 'select'}, options: ['submit', 'button', 'reset']},
    value: {control: 'text'},
    name: {control: 'text'},
    form: {control: 'text'},
  },
};

export default meta;

const baseArgs = {
  size: 'medium',
  disabled: false,
  trailingIcon: false,
  href: '',
  target: '',
  type: 'submit',
  value: '',
  name: '',
  form: '',
  onClick: action('click'),
};

export const Elevated = {
  args: {
    ...baseArgs,
    variant: 'elevated',
  },
  render: (args) => (
    <Button {...args} aria-label="Elevated button">
      <Icon slot="icon">upload</Icon>
      Elevated
    </Button>
  ),
};

export const Filled = {
  args: {
    ...baseArgs,
    variant: 'filled',
  },
  render: (args) => (
    <Button {...args} aria-label="Filled button">
      <Icon slot="icon">upload</Icon>
      Filled
    </Button>
  ),
};

export const FilledTonal = {
  args: {
    ...baseArgs,
    variant: 'filledTonal',
  },
  render: (args) => (
    <Button {...args} aria-label="Filled tonal button">
      <Icon slot="icon">upload</Icon>
      Filled tonal
    </Button>
  ),
};

export const Outlined = {
  args: {
    ...baseArgs,
    variant: 'outlined',
  },
  render: (args) => (
    <Button {...args} aria-label="Outlined button">
      <Icon slot="icon">upload</Icon>
      Outlined
    </Button>
  ),
};

export const Docs = {
  parameters: {
    controls: {disable: true},
  },
  render: () => (
    <div style={{width: 520, maxWidth: '100%'}} className="md-typescale-body-medium">
      Use the Docs tab for the full API and props table.
    </div>
  ),
};
