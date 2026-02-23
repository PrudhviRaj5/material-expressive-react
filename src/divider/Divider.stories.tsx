import React from 'react';

import {Divider} from './Divider';

const meta = {
  title: 'divider/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    variant: {
      control: {type: 'select'},
      options: ['horizontal', 'vertical'],
    },
    type: {
      control: {type: 'select'},
      options: ['full-width', 'inset', 'middle-inset'],
    },
    role: {control: 'text'},
  },
};

export default meta;

export const Playground = {
  args: {
    variant: 'horizontal',
    type: 'full-width',
    role: '',
  },
  render: ({variant, type, role}) => {
    const card = {
      width: 420,
      maxWidth: '100%',
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      padding: 16,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 12,
    };

    const row = {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      alignItems: 'center',
      gap: 12,
    };

    const dot = {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: 'var(--md-sys-color-primary)',
      justifySelf: 'center',
      opacity: 0.75,
    };

    const getRole = () => {
      const r = typeof role === 'string' ? role.trim() : '';
      return r || undefined;
    };

    if (variant === 'vertical') {
      return (
        <div style={card}>
          <div className="md-typescale-title-medium">Vertical divider</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'stretch',
              gap: 16,
              height: 160,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: 'var(--md-sys-color-surface-container-lowest)',
                outline: '1px solid var(--md-sys-color-outline-variant)',
                display: 'grid',
                placeItems: 'center',
              }}
              className="md-typescale-body-medium"
            >
              Before
            </div>

            <div style={{height: '100%'}}>
              <Divider variant="vertical" type={type} role={getRole()} />
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 12,
                background: 'var(--md-sys-color-surface-container-lowest)',
                outline: '1px solid var(--md-sys-color-outline-variant)',
                display: 'grid',
                placeItems: 'center',
              }}
              className="md-typescale-body-medium"
            >
              After
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={card}>
        <div className="md-typescale-title-medium">Horizontal divider</div>

        <div style={row}>
          <div style={dot} />
          <div className="md-typescale-body-medium">Material 2</div>
        </div>
        <Divider variant="horizontal" type={type} role={getRole()} />
        <div style={row}>
          <div style={dot} />
          <div className="md-typescale-body-medium">Material 3</div>
        </div>
      </div>
    );
  },
};
