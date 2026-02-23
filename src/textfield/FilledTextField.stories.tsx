import React from 'react';
import {action} from '@storybook/addon-actions';

import {FilledTextField} from './FilledTextField';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';
import {FilledButton} from '../button';

const meta = {
  title: 'textfield/FilledTextField',
  component: FilledTextField,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    label: {control: 'text'},
    value: {control: 'text'},
    type: {
      control: {type: 'select'},
      options: ['text', 'email', 'number', 'password', 'search', 'tel', 'url', 'textarea'],
    },
    placeholder: {control: 'text'},
    supportingText: {control: 'text'},
    error: {control: 'boolean'},
    errorText: {control: 'text'},
    required: {control: 'boolean'},
    noAsterisk: {control: 'boolean'},
    disabled: {control: 'boolean'},
    prefixText: {control: 'text'},
    suffixText: {control: 'text'},
    maxLength: {control: {type: 'number'}},
  },
};

export default meta;

export const Playground = {
  args: {
    label: 'Label',
    value: 'Value',
    type: 'text',
    placeholder: '',
    supportingText: '',
    error: false,
    errorText: '',
    required: false,
    noAsterisk: false,
    disabled: false,
    prefixText: '',
    suffixText: '',
    maxLength: -1,
    onInput: action('input'),
    onChange: action('change'),
    onSelect: action('select'),
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value);

    React.useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <FilledTextField
        {...args}
        value={value}
        onInput={(ev) => {
          args.onInput?.(ev);
          const el = ev.currentTarget;
          setValue(el.value);
        }}
        style={{width: 320}}
      />
    );
  },
};

export const Textarea = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <FilledTextField
      {...args}
      type="textarea"
      label="Vertical resize"
      rows={3}
      supportingText="Use CSS resize to control behavior"
      style={{width: 320, resize: 'vertical'}}
    />
  ),
};

export const Icons = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <div style={{display: 'grid', gap: 14, width: 340, maxWidth: '100%'}}>
      <FilledTextField
        {...args}
        placeholder="Search for messages"
        hasLeadingIcon
        style={{width: '100%'}}
      >
        <Icon slot="leading-icon">search</Icon>
      </FilledTextField>

      <FilledTextField
        {...args}
        label="Password"
        type="password"
        hasTrailingIcon
        style={{width: '100%'}}
      >
        <IconButton toggle slot="trailing-icon" aria-label="Toggle password visibility">
          <Icon>visibility</Icon>
          <Icon slot="selected">visibility_off</Icon>
        </IconButton>
      </FilledTextField>

      <FilledTextField
        {...args}
        label="Username"
        value="jdoe"
        error
        errorText="Username not available"
        hasTrailingIcon
        style={{width: '100%'}}
      >
        <Icon slot="trailing-icon">error</Icon>
      </FilledTextField>
    </div>
  ),
};

export const PrefixAndSuffix = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <FilledTextField
      {...args}
      label="Dollar amount"
      type="number"
      value="0"
      prefixText="$"
      suffixText=".00"
      style={{width: 320}}
    />
  ),
};

export const SupportingTextAndErrorText = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <div style={{display: 'grid', gap: 14, width: 340, maxWidth: '100%'}}>
      <FilledTextField
        {...args}
        label="Comments"
        supportingText="Provide comments for the issue"
        style={{width: '100%'}}
      />

      <FilledTextField
        {...args}
        label="Name"
        required
        supportingText="*required"
        errorText="Please fill out this field"
        style={{width: '100%'}}
      />
    </div>
  ),
};

export const CharacterCounter = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <FilledTextField
      {...args}
      label="Title"
      value="Short"
      maxLength={10}
      style={{width: 320}}
    />
  ),
};

export const ConstraintValidation = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => {
    const ref = React.useRef(null);

    return (
      <div style={{display: 'grid', gap: 12, width: 360, maxWidth: '100%'}}>
        <FilledTextField
          {...args}
          ref={ref}
          name="name"
          label="Name"
          required
          supportingText="Required"
          errorText="Please fill out this field"
          style={{width: '100%'}}
        />

        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          <FilledButton
            type="button"
            onClick={() => {
              ref.current?.reportValidity?.();
            }}
          >
            reportValidity()
          </FilledButton>
        </div>
      </div>
    );
  },
};
