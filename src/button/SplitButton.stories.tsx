import React from 'react';
import {action} from '@storybook/addon-actions';

import {SplitButton} from './SplitButton';

const meta = {
  title: 'button/SplitButton',
  component: SplitButton,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: ['filled', 'elevated', 'filledTonal', 'outlined', 'text'],
    },
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    disabled: {control: 'boolean'},
    arrowAriaLabel: {control: 'text'},
    menuAriaLabel: {control: 'text'},
    options: {table: {disable: true}},
    primaryLabel: {table: {disable: true}},
    primaryIcon: {table: {disable: true}},
    onPrimaryClick: {table: {disable: true}},
    onSelect: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'filled',
    size: 'medium',
    disabled: false,
    arrowAriaLabel: 'More reply options',
    menuAriaLabel: 'Reply options',
  },
  render: (args) => {
    const logPrimaryClick = action('primary-click');
    const logSelect = action('select');

    return (
      <SplitButton
        {...args}
        primaryLabel="Reply"
        primaryIcon="reply"
        onPrimaryClick={() => logPrimaryClick('reply')}
        onSelect={(value) => logSelect(value)}
        options={[
          {label: 'Reply all', value: 'replyAll', icon: 'reply_all'},
          {label: 'Forward', value: 'forward', icon: 'forward'},
        ]}
      />
    );
  },
};
