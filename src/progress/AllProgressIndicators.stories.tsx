import React from 'react';

import {CircularProgress} from './CircularProgress';
import {LinearProgress} from './LinearProgress';

const meta = {
  title: 'progress/AllProgressIndicators',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    indeterminate: {control: 'boolean'},
    fourColor: {control: 'boolean'},
    value: {control: {type: 'range', min: 0, max: 1, step: 0.01}},
    buffer: {control: {type: 'range', min: 0, max: 1, step: 0.01}},
    max: {control: {type: 'number', min: 0.01, step: 0.01}},
  },
};

export default meta;

export const Default = {
  args: {
    indeterminate: false,
    fourColor: false,
    value: 0.6,
    buffer: 0.8,
    max: 1,
  },
  render: ({indeterminate, fourColor, value, buffer, max}) => {
    const page = {
      padding: 24,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 18,
      alignContent: 'start',
    };

    const grid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 16,
      alignItems: 'start',
      maxWidth: 980,
    };

    const card = {
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      padding: 16,
      display: 'grid',
      gap: 12,
    };

    const title = {
      margin: 0,
      fontSize: 22,
      lineHeight: '28px',
      fontWeight: 650,
    };

    const cardTitle = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const row = {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
    };

    const determinateValue = indeterminate ? undefined : value;
    const determinateBuffer = indeterminate ? undefined : buffer;

    return (
      <div style={page}>
        <p style={title}>Progress indicators</p>

        <div style={grid}>
          <div style={card}>
            <p style={cardTitle}>Circular</p>
            <div style={row}>
              <CircularProgress
                aria-label="Circular progress"
                indeterminate={indeterminate}
                fourColor={fourColor}
                value={determinateValue}
                max={max}
              />
              <CircularProgress aria-label="Indeterminate circular" indeterminate fourColor={fourColor} />
            </div>
          </div>

          <div style={card}>
            <p style={cardTitle}>Linear</p>
            <div style={{display: 'grid', gap: 12}}>
              <LinearProgress
                aria-label="Linear progress"
                style={{inlineSize: 320}}
                indeterminate={indeterminate}
                fourColor={fourColor}
                value={determinateValue}
                buffer={determinateBuffer}
                max={max}
              />
              <LinearProgress aria-label="Indeterminate linear" style={{inlineSize: 320}} indeterminate fourColor={fourColor} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
