import React from 'react';
import {action} from '@storybook/addon-actions';

import {Card} from './Card';
import {FilledButton, OutlinedButton} from '../button';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';

const meta = {
  title: 'card/StackedCard',
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

function MediaPlaceholder({size = 88}: {size?: number}) {
  const ink = 'color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M52.9 18.9c4.1-4.9 11.6-4.9 15.7 0l11.8 14.3c3.3 4 3.3 9.9 0 13.9l-11.8 14.3c-4.1 4.9-11.6 4.9-15.7 0L41.1 47.1c-3.3-4-3.3-9.9 0-13.9l11.8-14.3z"
        fill={ink}
      />
      <path
        d="M14 54c0-9.4 7.6-17 17-17s17 7.6 17 17-7.6 17-17 17-17-7.6-17-17z"
        fill={ink}
      />
      <path
        d="M60 55c0-6.6 5.4-12 12-12h10c6.6 0 12 5.4 12 12v18c0 6.6-5.4 12-12 12H72c-6.6 0-12-5.4-12-12V55z"
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
      width: 360,
      maxWidth: '100%',
      overflow: 'hidden',
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      background:
        'color-mix(in srgb, var(--md-sys-color-primary) 6%, var(--md-sys-color-surface))',
      borderBottom:
        '1px solid color-mix(in srgb, var(--md-sys-color-outline-variant) 70%, transparent)',
    };

    const avatarStyle: React.CSSProperties = {
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

    const headerText: React.CSSProperties = {display: 'grid', gap: 2, minWidth: 0};
    const headerTitle: React.CSSProperties = {
      margin: 0,
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 650,
    };
    const headerSub: React.CSSProperties = {
      margin: 0,
      fontSize: 16,
      lineHeight: '20px',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const mediaStyle: React.CSSProperties = {
      height: 230,
      display: 'grid',
      placeItems: 'center',
      background:
        'color-mix(in srgb, var(--md-sys-color-surface-container) 82%, var(--md-sys-color-primary) 18%)',
    };

    const bodyStyle: React.CSSProperties = {
      padding: 18,
      display: 'grid',
      gap: 14,
      background:
        'color-mix(in srgb, var(--md-sys-color-primary) 4%, var(--md-sys-color-surface))',
    };

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 22,
      lineHeight: '26px',
      fontWeight: 520,
    };
    const subtitleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: 16,
      lineHeight: '20px',
      color: 'var(--md-sys-color-on-surface-variant)',
      marginTop: 2,
    };
    const copyStyle: React.CSSProperties = {
      margin: '10px 0 0',
      fontSize: 16,
      lineHeight: '22px',
      color: 'var(--md-sys-color-on-surface-variant)',
      maxWidth: 320,
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12,
      marginTop: 6,
      flexWrap: 'wrap',
    };

    return (
      <Card
        {...args}
        variant={args.variant}
        style={cardStyle}
      >
        <div style={headerStyle}>
          <div style={avatarStyle}>A</div>
          <div style={headerText}>
            <p style={headerTitle}>Header</p>
            <p style={headerSub}>Subhead</p>
          </div>
          <IconButton
            aria-label="More"
            variant="standard"
            onClick={() => action('more')('click')}
            style={{marginLeft: 'auto'}}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </div>

        <div style={mediaStyle}>
          <MediaPlaceholder />
        </div>

        <div style={bodyStyle}>
          <div>
            <p style={titleStyle}>Title</p>
            <p style={subtitleStyle}>Subtitle</p>
          </div>

          <p style={copyStyle}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          </p>

          <div style={actionsStyle}>
            <OutlinedButton onClick={action('secondary')}>Secondary</OutlinedButton>
            <FilledButton onClick={action('primary')}>Primary</FilledButton>
          </div>
        </div>
      </Card>
    );
  },
};
