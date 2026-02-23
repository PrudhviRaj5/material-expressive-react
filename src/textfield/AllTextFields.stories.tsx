import React from 'react';

import {FilledTextField} from './FilledTextField';
import {OutlinedTextField} from './OutlinedTextField';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';

const meta = {
  title: 'textfield/AllTextFields',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    disabled: {control: 'boolean'},
    error: {control: 'boolean'},
    required: {control: 'boolean'},
    type: {
      control: {type: 'select'},
      options: ['text', 'email', 'number', 'password', 'search', 'tel', 'url', 'textarea'],
    },
    label: {control: 'text'},
    placeholder: {control: 'text'},
    supportingText: {control: 'text'},
    errorText: {control: 'text'},
    prefixText: {control: 'text'},
    suffixText: {control: 'text'},
    withLeadingIcon: {control: 'boolean'},
    withTrailingIcon: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    disabled: false,
    error: false,
    required: false,
    type: 'text',
    label: 'Label',
    placeholder: '',
    supportingText: '',
    errorText: 'Something went wrong',
    prefixText: '',
    suffixText: '',
    withLeadingIcon: false,
    withTrailingIcon: false,
  },
  render: (args) => {
    const page = {
      padding: 24,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 18,
      alignContent: 'start',
    };

    const title = {
      margin: 0,
      fontSize: 22,
      lineHeight: '28px',
      fontWeight: 650,
    };

    const grid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: 16,
      alignItems: 'start',
      maxWidth: 980,
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

    const leadingIcon = args.withLeadingIcon ? <Icon slot="leading-icon">search</Icon> : null;
    const trailingIcon = args.withTrailingIcon ? (
      args.type === 'password' ? (
        <IconButton toggle slot="trailing-icon" aria-label="Toggle password visibility">
          <Icon>visibility</Icon>
          <Icon slot="selected">visibility_off</Icon>
        </IconButton>
      ) : (
        <Icon slot="trailing-icon">error</Icon>
      )
    ) : null;

    const iconProps = {
      hasLeadingIcon: args.withLeadingIcon || undefined,
      hasTrailingIcon: args.withTrailingIcon || undefined,
    };

    const sharedProps = {
      disabled: args.disabled,
      required: args.required,
      error: args.error,
      errorText: args.errorText,
      label: args.label,
      placeholder: args.placeholder,
      supportingText: args.supportingText,
      prefixText: args.prefixText,
      suffixText: args.suffixText,
      type: args.type,
      ...iconProps,
      style: {width: '100%'},
    };

    return (
      <div style={page}>
        <p style={title}>Text field</p>
        <div style={grid}>
          <div style={card}>
            <p style={cardTitle}>Filled</p>
            <FilledTextField {...sharedProps}>
              {leadingIcon}
              {trailingIcon}
            </FilledTextField>
          </div>

          <div style={card}>
            <p style={cardTitle}>Outlined</p>
            <OutlinedTextField {...sharedProps}>
              {leadingIcon}
              {trailingIcon}
            </OutlinedTextField>
          </div>
        </div>
      </div>
    );
  },
};
