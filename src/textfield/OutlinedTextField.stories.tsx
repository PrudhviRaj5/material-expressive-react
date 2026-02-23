import React from 'react';
import {action} from '@storybook/addon-actions';

import {OutlinedTextField} from './OutlinedTextField';
import {Icon} from '../icon';

const meta = {
  title: 'textfield/OutlinedTextField',
  component: OutlinedTextField,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    label: {control: 'text'},
    value: {control: 'text'},
    placeholder: {control: 'text'},
    required: {control: 'boolean'},
    disabled: {control: 'boolean'},
    supportingText: {control: 'text'},
    error: {control: 'boolean'},
    errorText: {control: 'text'},
  },
};

export default meta;

export const Playground = {
  args: {
    label: 'Label',
    value: 'Value',
    placeholder: '',
    required: false,
    disabled: false,
    supportingText: '',
    error: false,
    errorText: '',
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
      <OutlinedTextField
        {...args}
        value={value}
        onInput={(ev) => {
          args.onInput?.(ev);
          setValue(ev.currentTarget.value);
        }}
        style={{width: 320}}
      />
    );
  },
};

export const Labels = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <div style={{display: 'grid', gap: 14, width: 340, maxWidth: '100%'}}>
      <OutlinedTextField {...args} label="Favorite food" style={{width: '100%'}} />

      <OutlinedTextField
        {...args}
        placeholder="email@domain.com"
        aria-label="Email address"
        style={{width: '100%'}}
      />

      <div>
        <div className="md-typescale-body-medium" style={{marginBottom: 6}}>
          First name
        </div>
        <OutlinedTextField
          {...args}
          aria-label="First name"
          style={{width: '100%'}}
        />
      </div>
    </div>
  ),
};

export const Icons = {
  args: {
    onInput: action('input'),
    onChange: action('change'),
  },
  render: (args) => (
    <OutlinedTextField
      {...args}
      label="Username"
      value="jdoe"
      error
      errorText="Username is not available"
      hasTrailingIcon
      style={{width: 320}}
    >
      <Icon slot="trailing-icon">error</Icon>
    </OutlinedTextField>
  ),
};
