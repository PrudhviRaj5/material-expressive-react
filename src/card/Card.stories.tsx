import React from 'react';
import {action} from '@storybook/addon-actions';

import {Card} from './Card';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';

const meta = {
  title: 'card/Card',
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

export const Default = {
  args: {
    variant: 'elevated',
    onClick: action('click'),
  },
  render: (args) => {
    const content = {
      width: 320,
      maxWidth: '100%',
      height: 120,
      padding: 16,
      boxSizing: 'border-box' as const,
      display: 'grid',
      alignContent: 'space-between',
    };

    const title = {
      margin: 0,
      fontSize: 18,
      lineHeight: '24px',
      fontWeight: 560,
    };

    const label = {
      margin: 0,
      fontSize: 13,
      letterSpacing: '0.2px',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    return (
      <Card {...args}>
        <div style={content}>
          <div style={{display: 'flex', justifyContent: 'space-between', gap: 12}}>
            <p style={title}>Card</p>
            <IconButton aria-label="More" variant="standard">
              <Icon>more_vert</Icon>
            </IconButton>
          </div>
          <p style={label}>{args.variant}</p>
        </div>
      </Card>
    );
  },
};
