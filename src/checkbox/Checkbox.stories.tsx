// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

import React from 'react';
import {action} from '@storybook/addon-actions';

import {Checkbox} from './Checkbox';

/** @type {import('@storybook/react').Meta} */
const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {control: 'boolean'},
    indeterminate: {control: 'boolean'},
    disabled: {control: 'boolean'},
    required: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    onChange: action('change'),
    onInput: action('input'),
  },
  render: (args: Any) => (
    <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <Checkbox {...args} />
      <span className="md-typescale-body-medium">Checkbox</span>
    </label>
  ),
};
