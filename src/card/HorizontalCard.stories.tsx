import React from 'react';
import {action} from '@storybook/addon-actions';

import {Card} from './Card';

const meta = {
  title: 'card/HorizontalCard',
  component: Card,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    variant: {control: {type: 'select'}, options: ['elevated', 'filled', 'outlined']},
    containerColor: {control: 'color'},
    containerShadowColor: {control: 'color'},
    containerElevation: {control: {type: 'number'}},
    containerShape: {control: 'text'},
    outlineColor: {control: 'color'},
    outlineWidth: {control: 'text'},
  },
};

export default meta;

function MediaPlaceholder() {
  const ink = 'color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent)';
  return (
    <svg width={56} height={56} viewBox="0 0 96 96" fill="none" aria-hidden focusable="false">
      <path
        d="M58.9 18.9c4.1-4.9 11.6-4.9 15.7 0l8.8 10.6c3.3 4 3.3 9.9 0 13.9l-8.8 10.6c-4.1 4.9-11.6 4.9-15.7 0l-8.8-10.6c-3.3-4-3.3-9.9 0-13.9l8.8-10.6z"
        fill={ink}
      />
      <path
        d="M16 62c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15-15-6.7-15-15z"
        fill={ink}
      />
      <path
        d="M58 58c0-6.1 4.9-11 11-11h10c6.1 0 11 4.9 11 11v14c0 6.1-4.9 11-11 11H69c-6.1 0-11-4.9-11-11V58z"
        fill={ink}
      />
    </svg>
  );
}

export const Default = {
  args: {
    variant: 'outlined',
    containerShape: '22px',
    outlineColor:
      'color-mix(in srgb, var(--md-sys-color-outline-variant) 80%, var(--md-sys-color-outline) 20%)',
    onClick: action('click'),
  },
  render: (args) => {
    const cardStyle: React.CSSProperties = {
      width: 520,
      maxWidth: '100%',
      overflow: 'hidden',
    };

    const row: React.CSSProperties = {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: 96,
    };

    const left: React.CSSProperties = {
      flex: 1,
      padding: 16,
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      background:
        'color-mix(in srgb, var(--md-sys-color-primary) 4%, var(--md-sys-color-surface))',
    };

    const avatar: React.CSSProperties = {
      width: 44,
      height: 44,
      borderRadius: 999,
      display: 'grid',
      placeItems: 'center',
      background:
        'color-mix(in srgb, var(--md-sys-color-primary) 16%, var(--md-sys-color-surface))',
      color: 'var(--md-sys-color-primary)',
      fontWeight: 650,
      flex: 'none',
    };

    const text: React.CSSProperties = {display: 'grid', gap: 2, minWidth: 0};
    const title: React.CSSProperties = {
      margin: 0,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 650,
    };
    const sub: React.CSSProperties = {
      margin: 0,
      fontSize: 16,
      lineHeight: '20px',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const media: React.CSSProperties = {
      width: 140,
      display: 'grid',
      placeItems: 'center',
      background:
        'color-mix(in srgb, var(--md-sys-color-surface-container) 82%, var(--md-sys-color-primary) 18%)',
    };

    return (
      <Card
        {...args}
        variant={args.variant}
        style={cardStyle}
      >
        <div style={row}>
          <div style={left}>
            <div style={avatar}>A</div>
            <div style={text}>
              <p style={title}>Header</p>
              <p style={sub}>Subhead</p>
            </div>
          </div>
          <div style={media}>
            <MediaPlaceholder />
          </div>
        </div>
      </Card>
    );
  },
};
