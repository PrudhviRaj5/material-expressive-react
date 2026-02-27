import React from 'react';

import {FocusRing} from './FocusRing';

const meta = {
  title: 'focus/FocusRing',
  component: FocusRing,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    visible: {control: 'boolean'},
    inward: {control: 'boolean'},
    htmlFor: {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    visible: true,
    inward: false,
  },
  render: (args) => (
    <div style={{display: 'grid', gap: 16, justifyItems: 'center'}}>
      <p
        style={{
          margin: 0,
          maxWidth: 520,
          textAlign: 'center',
          color: 'var(--md-sys-color-on-surface-variant)',
          fontSize: 13,
          lineHeight: '18px',
        }}
      >
        Focus rings are usually shown on keyboard navigation. This story forces
        visibility by default so you can see it render.
      </p>

      <div style={{display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center'}}>
        <button
          type="button"
          style={{
            appearance: 'none',
            background: 'var(--md-sys-color-surface)',
            border: '1px solid var(--md-sys-color-outline-variant, rgba(0,0,0,0.12))',
            borderRadius: 16,
            height: 64,
            outline: 'none',
            position: 'relative',
            width: 160,
            display: 'grid',
            placeItems: 'center',
            color: 'var(--md-sys-color-on-surface)',
            fontWeight: 560,
            ['--md-focus-ring-shape' as any]: '16px',
          }}
        >
          Button
          <FocusRing {...args} />
        </button>

        <div
          style={{
            position: 'relative',
            width: 240,
            display: 'grid',
            alignContent: 'start',
            gap: 8,
          }}
        >
          <label
            htmlFor="focus-ring-input"
            style={{
              fontSize: 12,
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              fontWeight: 650,
              color: 'var(--md-sys-color-on-surface-variant)',
            }}
          >
            Referenced Element
          </label>
          <FocusRing {...args} visible={undefined} htmlFor="focus-ring-input" />
          <input
            id="focus-ring-input"
            placeholder="Tab to focus"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: '12px 12px',
              borderRadius: 14,
              border: '1px solid var(--md-sys-color-outline)',
              outline: 'none',
              fontSize: 14,
              background: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
            }}
            onFocus={(ev) => {
              (ev.currentTarget as HTMLInputElement).style.borderColor =
                'var(--md-sys-color-primary)';
            }}
            onBlur={(ev) => {
              (ev.currentTarget as HTMLInputElement).style.borderColor =
                'var(--md-sys-color-outline)';
            }}
          />
        </div>
      </div>
    </div>
  ),
};
