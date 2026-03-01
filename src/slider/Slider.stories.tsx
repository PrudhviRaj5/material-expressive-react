import React from 'react';
import {action} from '@storybook/addon-actions';

import {Slider} from './Slider';

const meta = {
  title: 'misc/Slider',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: ({mode, ...args}: any) => {
    const card = {
      width: 360,
      maxWidth: '100%',
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      padding: 16,
      boxSizing: 'border-box' as const,
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sliderProps: any = {
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

export const Docs = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    disabled: false,
    labeled: false,
    ticks: true,
    step: 5,
  },
  render: ({disabled, labeled, ticks, step}) => {
    const page = {
      padding: 24,
      boxSizing: 'border-box' as const,
      display: 'grid',
      gap: 18,
      alignContent: 'start',
      maxWidth: 980,
    };

    const title = {
      margin: 0,
      fontSize: 22,
      lineHeight: '28px',
      fontWeight: 650,
    };

    const grid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 16,
      alignItems: 'start',
    };

    const card = {
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      padding: 16,
      display: 'grid',
      gap: 12,
    };

    const cardTitle = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase' as const,
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    return (
      <div style={page}>
        <p style={title}>Sliders</p>

        <div style={grid}>
          <div style={card}>
            <p style={cardTitle}>Continuous</p>
            <Slider
              aria-label="Continuous slider"
              min={0}
              max={100}
              value={50}
              disabled={disabled}
              style={{width: '100%'}}
            />
          </div>

          <div style={card}>
            <p style={cardTitle}>Discrete</p>
            <Slider
              aria-label="Discrete slider"
              min={0}
              max={20}
              step={step}
              ticks={ticks}
              labeled={labeled}
              disabled={disabled}
              style={{width: '100%'}}
            />
          </div>

          <div style={card}>
            <p style={cardTitle}>Range</p>
            <Slider
              range
              min={0}
              max={100}
              valueStart={25}
              valueEnd={75}
              step={step}
              ticks={ticks}
              labeled={labeled}
              ariaLabelStart="Minimum value"
              ariaLabelEnd="Maximum value"
              disabled={disabled}
              style={{width: '100%'}}
            />
          </div>

          <div style={card}>
            <p style={cardTitle}>Value label</p>
            <Slider
              aria-label="Labeled slider"
              labeled
              valueLabel="Value"
              min={0}
              max={100}
              value={50}
              disabled={disabled}
              style={{width: '100%'}}
            />
          </div>
        </div>
      </div>
    );
  },
};
