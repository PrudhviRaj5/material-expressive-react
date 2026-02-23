import React from 'react';
import {action} from '@storybook/addon-actions';

import {Slider} from './Slider';

const meta = {
  title: 'slider/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    mode: {
      control: {type: 'select'},
      options: ['continuous', 'discrete', 'range', 'value-label'],
    },
    disabled: {control: 'boolean'},
    min: {control: {type: 'number'}},
    max: {control: {type: 'number'}},
    step: {control: {type: 'number'}},
    ticks: {control: 'boolean'},
    labeled: {control: 'boolean'},
    value: {control: {type: 'number'}},
    valueStart: {control: {type: 'number'}},
    valueEnd: {control: {type: 'number'}},
  },
};

export default meta;

export const Default = {
  args: {
    onChange: action('change'),
    onInput: action('input'),
    mode: 'discrete',
    disabled: false,
    min: 0,
    max: 100,
    step: 5,
    ticks: true,
    labeled: true,
    value: 50,
    valueStart: 25,
    valueEnd: 75,
  },
  render: ({mode, ...args}) => {
    const card = {
      width: 360,
      maxWidth: '100%',
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      padding: 16,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 14,
    };

    const title = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    let sliderProps = {
      ...args,
      style: {width: '100%', ...(args.style ?? {})},
    };

    if (mode === 'continuous') {
      sliderProps = {
        ...sliderProps,
        ticks: false,
        labeled: false,
        range: false,
        value: args.value ?? 50,
        'aria-label': 'Continuous slider',
      };
    }

    if (mode === 'discrete') {
      sliderProps = {
        ...sliderProps,
        ticks: args.ticks ?? true,
        labeled: args.labeled ?? false,
        range: false,
        'aria-label': 'Discrete slider',
      };
    }

    if (mode === 'range') {
      sliderProps = {
        ...sliderProps,
        range: true,
        value: undefined,
        valueStart: args.valueStart ?? 25,
        valueEnd: args.valueEnd ?? 75,
        ariaLabelStart: 'Minimum value',
        ariaLabelEnd: 'Maximum value',
      };
    }

    if (mode === 'value-label') {
      sliderProps = {
        ...sliderProps,
        labeled: true,
        range: false,
        valueLabel: 'Value',
        'aria-label': 'Labeled slider',
      };
    }

    return (
      <div style={card}>
        <p style={title}>{mode.replace('-', ' ')}</p>
        <Slider {...sliderProps} />
      </div>
    );
  },
};
