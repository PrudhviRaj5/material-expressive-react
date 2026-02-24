import React from 'react';

import {action} from '@storybook/addon-actions';

import {ToggleButton, ToggleButtonIcon} from './ToggleButton';

const meta = {
  title: 'button/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'none',
      include: ['variant', 'shape', 'state', 'size', 'disabled'],
    },
  },
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: ['default', 'tonal', 'outline', 'elevated'],
    },
    shape: {control: {type: 'select'}, options: ['round', 'square']},
    state: {
      control: {type: 'select'},
      options: [undefined, 'enabled', 'hovered', 'focused', 'pressed', 'disabled'],
    },
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    disabled: {control: 'boolean'},
    selected: {table: {disable: true}},
    defaultSelected: {table: {disable: true}},
    onSelectedChange: {table: {disable: true}},
  },
};

export default meta;

export const Example = {
  args: {
    variant: 'default',
    shape: 'round',
    state: undefined,
    size: 'medium',
    disabled: false,
  },
  render: (args) => {
    const [left, setLeft] = React.useState(false);
    const [right, setRight] = React.useState(true);
    const click = action('click');
    const selectedChange = action('selected-change');

    const wrap = {
      display: 'flex',
      gap: 22,
      alignItems: 'center',
      padding: 22,
      borderRadius: 18,
      background: 'var(--md-sys-color-surface-container-lowest)',
    };

    return (
      <div style={wrap}>
        <ToggleButton
          {...args}
          selected={left}
          onClick={click}
          onSelectedChange={(next) => {
            selectedChange(next);
            setLeft(next);
          }}
        >
          Unselected
        </ToggleButton>
        <ToggleButton
          {...args}
          selected={right}
          onClick={click}
          onSelectedChange={(next) => {
            selectedChange(next);
            setRight(next);
          }}
        >
          Selected
        </ToggleButton>
      </div>
    );
  },
};

export const IconOnly = {
  args: {
    variant: 'tonal',
    shape: 'square',
    state: undefined,
    size: 'large',
    disabled: false,
  },
  render: (args) => {
    const [on, setOn] = React.useState(false);
    const click = action('click');
    const selectedChange = action('selected-change');
    return (
      <ToggleButton
        {...args}
        selected={on}
        onClick={click}
        onSelectedChange={(next) => {
          selectedChange(next);
          setOn(next);
        }}
        aria-label="Toggle favorite"
        style={{paddingInline: 0, width: 72}}
      >
        <ToggleButtonIcon>star</ToggleButtonIcon>
      </ToggleButton>
    );
  },
};
