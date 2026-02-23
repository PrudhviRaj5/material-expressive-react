import React from 'react';
import {action} from '@storybook/addon-actions';

import {Radio} from './Radio';

const meta = {
  title: 'radio/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
    required: {control: 'boolean'},
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
    checked: true,
    disabled: false,
    required: false,
    name: 'example',
    value: 'on',
    'aria-label': 'Radio',
  },
  render: (args) => {
    const id = 'radio-single';
    return (
      <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
        <Radio {...args} id={id} />
        <label htmlFor={id} className="md-typescale-body-medium">
          Radio
        </label>
      </div>
    );
  },
};

export const Group = {
  args: {
    disabled: false,
    required: false,
    onChange: action('change'),
    onInput: action('input'),
  },
  render: ({disabled, required, onChange, onInput}) => {
    const [selected, setSelected] = React.useState('birds');

    const container = {
      display: 'grid',
      gap: 10,
      padding: 16,
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      width: 320,
      boxSizing: 'border-box',
    };

    const row = {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    };

    const titleId = 'animals-title';
    const name = 'animals';

    const makeHandlers = (value) => ({
      onChange: (ev) => {
        onChange?.(ev);
        setSelected(value);
      },
      onInput: (ev) => {
        onInput?.(ev);
      },
    });

    return (
      <div role="radiogroup" aria-labelledby={titleId} style={container}>
        <div id={titleId} className="md-typescale-title-medium">
          Animals
        </div>

        <div style={row}>
          <Radio
            id="radio-cats"
            aria-label="Cats"
            name={name}
            value="cats"
            checked={selected === 'cats'}
            disabled={disabled}
            required={required}
            {...makeHandlers('cats')}
          />
          <label htmlFor="radio-cats" className="md-typescale-body-medium">
            Cats
          </label>
        </div>

        <div style={row}>
          <Radio
            id="radio-dogs"
            aria-label="Dogs"
            name={name}
            value="dogs"
            checked={selected === 'dogs'}
            disabled={disabled}
            required={required}
            {...makeHandlers('dogs')}
          />
          <label htmlFor="radio-dogs" className="md-typescale-body-medium">
            Dogs
          </label>
        </div>

        <div style={row}>
          <Radio
            id="radio-birds"
            aria-label="Birds"
            name={name}
            value="birds"
            checked={selected === 'birds'}
            disabled={disabled}
            required={required}
            {...makeHandlers('birds')}
          />
          <label htmlFor="radio-birds" className="md-typescale-body-medium">
            Birds
          </label>
        </div>
      </div>
    );
  },
};
