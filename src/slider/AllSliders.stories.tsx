import React from 'react';

import {Slider} from './Slider';

const meta = {
  title: 'slider/AllSliders',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    disabled: {control: 'boolean'},
    labeled: {control: 'boolean'},
    ticks: {control: 'boolean'},
    step: {control: {type: 'number'}},
  },
};

export default meta;

export const Default = {
  args: {
    disabled: false,
    labeled: false,
    ticks: true,
    step: 5,
  },
  render: ({disabled, labeled, ticks, step}) => {
    const page = {
      padding: 24,
      boxSizing: 'border-box',
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
      textTransform: 'uppercase',
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
