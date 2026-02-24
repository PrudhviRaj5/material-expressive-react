import React from 'react';

import {ConnectedButtonGroup} from './ConnectedButtonGroup';
import {ConnectedButton} from './ConnectedButton';

const meta = {
  title: 'button-group/ConnectedButtonGroup',
  component: ConnectedButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
        code: '<ConnectedButtonGroup>...</ConnectedButtonGroup>',
      },
    },
  },
  argTypes: {
    variant: {control: {type: 'select'}, options: ['standard', 'connected']},
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    selectType: {control: {type: 'select'}, options: ['single', 'multi']},
    type: {control: {type: 'select'}, options: ['round', 'square']},
    width: {control: {type: 'select'}, options: ['narrow', 'default', 'wide']},
    style: {
      control: {type: 'select'},
      options: ['filled', 'tonal', 'outlined', 'elevated'],
    },
    selectedIcon: {control: 'text'},
    value: {table: {disable: true}},
    defaultValue: {table: {disable: true}},
    onChange: {table: {disable: true}},
    onClick: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'standard',
    size: 'medium',
    selectType: 'single',
    type: 'round',
    width: 'default',
    style: 'tonal',
    selectedIcon: 'check',
  },
  render: (args: any) => {
    const [icons, setIcons] = React.useState('0');
    const [labels, setLabels] = React.useState('0');
    const [both, setBoth] = React.useState('0');

    const page = {
      display: 'grid',
      gap: 22,
      justifyItems: 'start',
      padding: 24,
      borderRadius: 18,
      background: 'var(--md-sys-color-surface-container-lowest)',
    };

    const h = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const section = {
      display: 'grid',
      gap: 12,
    };

    return (
      <div style={page}>
        <div style={section}>
          <p style={h}>Only Icons</p>
          <ConnectedButtonGroup {...args} value={icons} onChange={setIcons}>
            <ConnectedButton value="0" icon="star" />
            <ConnectedButton value="1" icon="alarm" />
            <ConnectedButton value="2" icon="bluetooth" />
            <ConnectedButton value="3" icon="flashlight_on" />
          </ConnectedButtonGroup>
        </div>

        <div style={section}>
          <p style={h}>Only Labels</p>
          <ConnectedButtonGroup {...args} value={labels} onChange={setLabels}>
            <ConnectedButton value="0" label="Label" />
            <ConnectedButton value="1" label="Label" />
            <ConnectedButton value="2" label="Label" />
            <ConnectedButton value="3" label="Label" />
          </ConnectedButtonGroup>
        </div>

        <div style={section}>
          <p style={h}>Both</p>
          <ConnectedButtonGroup {...args} value={both} onChange={setBoth}>
            <ConnectedButton value="0" icon="star" label="Label" />
            <ConnectedButton value="1" icon="star" label="Label" />
            <ConnectedButton value="2" icon="star" label="Label" />
            <ConnectedButton value="3" icon="star" label="Label" />
          </ConnectedButtonGroup>
        </div>
      </div>
    );
  },
};
