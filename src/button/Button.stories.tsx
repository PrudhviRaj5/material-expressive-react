import React from 'react';
import {action} from '@storybook/addon-actions';

import {
  ElevatedButton,
  FilledButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
} from './index';
import {Icon} from '../icon';

const meta = {
  title: 'Buttons/Button variants',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {control: 'text'},
    disabled: {control: 'boolean'},
    softDisabled: {control: 'boolean'},
    withIcon: {control: 'boolean'},
  },
};

export default meta;

export const Variants = {
  args: {
    label: 'Button',
    disabled: false,
    softDisabled: false,
    withIcon: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {label, disabled, softDisabled, withIcon} = args;
    const common = {
      disabled,
      softDisabled,
      onClick: action('click'),
    };

    const icon = withIcon ? (
      <Icon slot="icon">upload</Icon>
    ) : null;

    return (
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 16}}>
        <FilledButton {...common} aria-label="Filled">
          {icon}
          {label}
        </FilledButton>
        <OutlinedButton {...common} aria-label="Outlined">
          {icon}
          {label}
        </OutlinedButton>
        <ElevatedButton {...common} aria-label="Elevated">
          {icon}
          {label}
        </ElevatedButton>
        <FilledTonalButton {...common} aria-label="Tonal">
          {icon}
          {label}
        </FilledTonalButton>
        <TextButton {...common} aria-label="Text">
          {icon}
          {label}
        </TextButton>
      </div>
    );
  },
};
