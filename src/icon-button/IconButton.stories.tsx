import React from 'react';
import {action} from '@storybook/addon-actions';

import {IconButton} from './IconButton';
import {Icon} from '../icon';

const meta = {
  title: 'icon-button/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: ['filled', 'tonal', 'outline', 'standard'],
    },
    type: {control: {type: 'select'}, options: ['round', 'square']},
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    width: {
      control: {type: 'select'},
      options: ['narrow', 'default', 'wide'],
    },
    disabled: {control: 'boolean'},
    softDisabled: {control: 'boolean'},
    flipIconInRtl: {control: 'boolean'},
    href: {control: 'text'},
    target: {control: 'text'},
    toggle: {control: 'boolean'},
    selected: {control: 'boolean'},
    ariaLabelSelected: {control: 'text'},
    buttonType: {control: {type: 'select'}, options: ['submit', 'button', 'reset']},
    value: {control: 'text'},
    name: {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'filled',
    type: 'round',
    size: 'medium',
    width: 'default',
    disabled: false,
    softDisabled: false,
    flipIconInRtl: false,
    href: '',
    target: '',
    toggle: false,
    selected: false,
    ariaLabelSelected: '',
    buttonType: 'submit',
    value: '',
    name: '',
    onClick: action('click'),
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <IconButton {...args} aria-label="Favorite">
      <Icon>favorite</Icon>
      {args.toggle ? <Icon slot="selected">bookmark</Icon> : null}
    </IconButton>
  ),
};

const baseArgs = {
  variant: 'filled',
  type: 'round',
  size: 'medium',
  width: 'default',
  disabled: false,
  softDisabled: false,
  flipIconInRtl: false,
  href: '',
  target: '',
  toggle: false,
  selected: false,
  ariaLabelSelected: '',
  buttonType: 'submit',
  value: '',
  name: '',
  onClick: action('click'),
  onInput: action('input'),
  onChange: action('change'),
};

export const Outlined = {
  args: {
    ...baseArgs,
    variant: 'outline',
  },
  render: (args) => (
    <IconButton {...args} aria-label="Outlined">
      <Icon>search</Icon>
    </IconButton>
  ),
};

export const Filled = {
  args: {
    ...baseArgs,
    variant: 'filled',
  },
  render: (args) => (
    <IconButton {...args} aria-label="Filled">
      <Icon>done</Icon>
    </IconButton>
  ),
};

export const FilledTonal = {
  args: {
    ...baseArgs,
    variant: 'tonal',
  },
  render: (args) => (
    <IconButton {...args} aria-label="Filled tonal">
      <Icon>add</Icon>
    </IconButton>
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
