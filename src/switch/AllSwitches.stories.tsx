import React from 'react';

import {Switch} from './Switch';

const meta = {
  title: 'switch/AllSwitches',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    disabled: {control: 'boolean'},
    icons: {control: 'boolean'},
    showOnlySelectedIcon: {control: 'boolean'},
    required: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    disabled: false,
    required: false,
    icons: true,
    showOnlySelectedIcon: false,
  },
  render: ({disabled, required, icons, showOnlySelectedIcon}) => {
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

    const row = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    };

    return (
      <div style={page}>
        <p style={title}>Switch</p>

        <div style={grid}>
          <div style={card}>
            <p style={cardTitle}>Basic</p>
            <div style={row}>
              <span className="md-typescale-body-medium">Off</span>
              <Switch aria-label="Switch off" disabled={disabled} required={required} />
            </div>
            <div style={row}>
              <span className="md-typescale-body-medium">On</span>
              <Switch aria-label="Switch on" selected disabled={disabled} required={required} />
            </div>
          </div>

          <div style={card}>
            <p style={cardTitle}>Icons</p>
            <div style={row}>
              <span className="md-typescale-body-medium">Icons</span>
              <Switch
                aria-label="Switch with icons"
                icons={icons}
                showOnlySelectedIcon={showOnlySelectedIcon}
                selected
                disabled={disabled}
                required={required}
              />
            </div>
          </div>

          <div style={card}>
            <p style={cardTitle}>Label</p>
            <label style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12}}>
              <span className="md-typescale-body-medium">Bluetooth</span>
              <Switch aria-label="Bluetooth" disabled={disabled} required={required} />
            </label>
          </div>
        </div>
      </div>
    );
  },
};
