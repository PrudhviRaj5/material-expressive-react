import React from 'react';

import {Divider} from './Divider';

const meta = {
  title: 'divider/AllDividers',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
};

export default meta;

export const Default = {
  render: () => {
    const page = {
      padding: 28,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 36,
      alignContent: 'start',
      maxWidth: 980,
    };

    const h1 = {
      margin: 0,
      fontSize: 44,
      lineHeight: '52px',
      fontWeight: 650,
    };

    const section = {
      display: 'grid',
      gap: 18,
    };

    const row = {
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      alignItems: 'center',
      gap: 16,
    };

    const label = {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--md-sys-color-primary)',
      fontWeight: 600,
    };

    const diamond = {
      width: 10,
      height: 10,
      transform: 'rotate(45deg)',
      background: 'var(--md-sys-color-primary)',
      borderRadius: 2,
      flex: 'none',
    };


    const verticalGrid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 60,
      width: 360,
      maxWidth: '100%',
    };

    const verticalItem = {
      display: 'grid',
      justifyItems: 'center',
      gap: 12,
    };

    const dots = {
      fontSize: 18,
      lineHeight: '18px',
      letterSpacing: 2,
      color: 'var(--md-sys-color-primary)',
      opacity: 0.8,
    };

    const verticalLineWrap = {
      height: 240,
      display: 'grid',
      alignItems: 'stretch',
    };

    return (
      <div style={page}>
        <div style={section}>
          <div style={h1}>Horizontal</div>

          <div style={row}>
            <div style={label}>
              <span style={diamond} />
              Horizontal/Full-width
            </div>
            <Divider />
          </div>

          <div style={row}>
            <div style={label}>
              <span style={diamond} />
              Horizontal/Inset
            </div>
            <Divider type="inset" />
          </div>

          <div style={row}>
            <div style={label}>
              <span style={diamond} />
              Horizontal/Middle-inset
            </div>
            <Divider type="middle-inset" />
          </div>
        </div>

        <div style={section}>
          <div style={h1}>Vertical</div>

          <div style={verticalGrid}>
            <div style={verticalItem}>
              <div style={dots}>...</div>
              <div style={verticalLineWrap}>
                <Divider variant="vertical" type="full-width" />
              </div>
            </div>

            <div style={verticalItem}>
              <div style={dots}>...</div>
              <div style={verticalLineWrap}>
                <Divider variant="vertical" type="inset" />
              </div>
            </div>

            <div style={verticalItem}>
              <div style={dots}>...</div>
              <div style={verticalLineWrap}>
                <Divider variant="vertical" type="middle-inset" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
