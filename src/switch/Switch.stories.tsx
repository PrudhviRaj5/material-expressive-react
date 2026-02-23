import React from 'react';
import {action} from '@storybook/addon-actions';

import {Switch} from './Switch';

const meta = {
  title: 'switch/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    selected: {control: 'boolean'},
    disabled: {control: 'boolean'},
    required: {control: 'boolean'},
    icons: {control: 'boolean'},
    showOnlySelectedIcon: {control: 'boolean'},
    name: {control: 'text'},
    value: {control: 'text'},
    'aria-label': {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    onChange: action('change'),
    onInput: action('input'),
    selected: true,
    disabled: false,
    required: false,
    icons: true,
    showOnlySelectedIcon: false,
    name: 'wifi',
    value: 'on',
    'aria-label': 'Wi-Fi',
  },
  render: (args) => {
    const id = 'switch-single';
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <Switch {...args} id={id} />
        <label htmlFor={id} className="md-typescale-body-medium">
          Wi-Fi
        </label>
      </div>
    );
  },
};

export const Icons = {
  args: {
    disabled: false,
    required: false,
    onChange: action('change'),
    onInput: action('input'),
  },
  render: ({disabled, required, onChange, onInput}) => {
    const container = {
      width: 360,
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    };

    const label = {
      display: 'grid',
      gap: 2,
    };

    const title = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    return (
      <div style={container}>
        <p style={title}>Icons</p>

        <div style={row}>
          <div style={label}>
            <span className="md-typescale-body-medium">Both icons</span>
            <span className="md-typescale-body-small" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
              icons
            </span>
          </div>
          <Switch
            aria-label="Both icons"
            icons
            selected
            disabled={disabled}
            required={required}
            onChange={onChange}
            onInput={onInput}
          />
        </div>

        <div style={row}>
          <div style={label}>
            <span className="md-typescale-body-medium">Selected icon only</span>
            <span className="md-typescale-body-small" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
              show-only-selected-icon
            </span>
          </div>
          <Switch
            aria-label="Selected icon only"
            icons
            showOnlySelectedIcon
            selected
            disabled={disabled}
            required={required}
            onChange={onChange}
            onInput={onInput}
          />
        </div>
      </div>
    );
  },
};
