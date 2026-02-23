import React from 'react';
import {action} from '@storybook/addon-actions';

import {
  Button,
} from './index';
import {Icon} from '../icon';

const meta = {
  title: 'button/All Buttons',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {control: 'text'},
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    disabled: {control: 'boolean'},
    hasIcon: {control: 'boolean'},
  },
};

export default meta;

export const All = {
  args: {
    label: '',
    size: 'medium',
    disabled: false,
    hasIcon: true,
  },
  render: (args) => {
    const {label, size, disabled, hasIcon} = args;
    const click = action('click');

    const baseProps = {
      size,
      disabled,
      onClick: click,
    };

    const linkProps = {
      ...baseProps,
      href: 'https://material-web.dev/',
      target: '_blank' as const,
    };

    const leadingIcon = <Icon slot="icon">upload</Icon>;
    const trailingLinkIcon = <Icon slot="icon">open_in_new</Icon>;

    const gridStyle = {
      background: 'var(--md-sys-color-surface-container-lowest)',
      borderRadius: 16,
      padding: 24,
      width: 'min(960px, calc(100vw - 48px))',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 24,
    };

    const rowStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center',
    };

    const titleStyle = {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      margin: 0,
    };

    const sectionTitleStyle = {
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 600,
      margin: 0,
    };

    const textOr = (fallback: string) => {
      const text = typeof label === 'string' ? label.trim() : '';
      return text || fallback;
    };

    return (
      <div style={gridStyle}>
        <div style={{display: 'grid', gap: 12}}>
          <p style={titleStyle}>Button variants</p>
          <div style={rowStyle}>
            <Button {...baseProps} variant="filled">
              {textOr('Filled')}
            </Button>
            <Button {...baseProps} variant="outlined">
              {textOr('Outlined')}
            </Button>
            <Button {...baseProps}>{textOr('Elevated')}</Button>
            <Button {...baseProps} variant="filledTonal">
              {textOr('Tonal')}
            </Button>
            <Button {...baseProps} variant="text">
              {textOr('Text')}
            </Button>
          </div>
          {hasIcon ? (
            <div style={rowStyle}>
              <Button {...baseProps} variant="filled">
                {leadingIcon}
                {textOr('Filled')}
              </Button>
              <Button {...baseProps} variant="outlined">
                {leadingIcon}
                {textOr('Outlined')}
              </Button>
              <Button {...baseProps}>
                {leadingIcon}
                {textOr('Elevated')}
              </Button>
              <Button {...baseProps} variant="filledTonal">
                {leadingIcon}
                {textOr('Tonal')}
              </Button>
              <Button {...baseProps} variant="text">
                {leadingIcon}
                {textOr('Text')}
              </Button>
            </div>
          ) : null}
        </div>

        <div style={{display: 'grid', gap: 12}}>
          <p style={sectionTitleStyle}>Links</p>
          <div style={rowStyle}>
            <Button {...linkProps} variant="filled">
              {textOr('Filled')}
            </Button>
            <Button {...linkProps} variant="outlined">
              {textOr('Outlined')}
            </Button>
            <Button {...linkProps}>{textOr('Elevated')}</Button>
            <Button {...linkProps} variant="filledTonal">
              {textOr('Tonal')}
            </Button>
            <Button {...linkProps} variant="text">
              {textOr('Text')}
            </Button>
          </div>
          {hasIcon ? (
            <div style={rowStyle}>
              <Button {...linkProps} variant="filled" trailingIcon>
                {trailingLinkIcon}
                {textOr('Filled')}
              </Button>
              <Button {...linkProps} variant="outlined" trailingIcon>
                {trailingLinkIcon}
                {textOr('Outlined')}
              </Button>
              <Button {...linkProps} trailingIcon>
                {trailingLinkIcon}
                {textOr('Elevated')}
              </Button>
              <Button {...linkProps} variant="filledTonal" trailingIcon>
                {trailingLinkIcon}
                {textOr('Tonal')}
              </Button>
              <Button {...linkProps} variant="text" trailingIcon>
                {trailingLinkIcon}
                {textOr('Text')}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
};
