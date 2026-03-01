import React from 'react';
import {action} from '@storybook/addon-actions';

import {Checkbox} from './Checkbox';

const meta = {
  title: 'selection/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    checked: {control: 'boolean'},
    indeterminate: {control: 'boolean'},
    disabled: {control: 'boolean'},
    required: {control: 'boolean'},
    value: {control: 'text'},
    name: {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
    value: 'on',
    name: 'example',
    onChange: action('change'),
    onInput: action('input'),
  },
  render: (args) => (
    <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
      <Checkbox {...args} />
      <span className="md-typescale-body-medium">Checkbox</span>
    </label>
  ),
};
