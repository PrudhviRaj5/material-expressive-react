import React from 'react';
import {action} from '@storybook/addon-actions';

import {Textfield} from './Textfield';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';
import {FilledButton} from '../button';

const meta = {
  title: 'textfield/Textfield',
  component: Textfield,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    variant: {control: {type: 'select'}, options: ['filled', 'outlined']},
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

export const Default = {
  args: {
    variant: 'filled',
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
      <Textfield
        {...args}
        value={value}
        onInput={(ev) => {
          const el = ev.currentTarget as unknown as {value: string} | null;
          const nextValue = el?.value ?? '';
          args.onInput?.({value: nextValue});
          setValue(nextValue);
        }}
        style={{width: 320}}
      />
    );
  },
};

export const Docs = {
  parameters: {
    layout: 'fullscreen',
    controls: {disable: true},
  },
  render: () => {
    const page = {
      padding: 24,
      boxSizing: 'border-box' as const,
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

    const sectionTitle = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase' as const,
      color: 'var(--md-sys-color-on-surface-variant)',
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

    const pair = (renderField: (variant: 'filled' | 'outlined') => React.ReactNode) => (
      <div style={grid}>
        <div style={card}>
          <p style={sectionTitle}>Filled</p>
          {renderField('filled')}
        </div>
        <div style={card}>
          <p style={sectionTitle}>Outlined</p>
          {renderField('outlined')}
        </div>
      </div>
    );

    const one = (children: React.ReactNode) => (
      <div style={{...grid, gridTemplateColumns: 'minmax(320px, 1fr)'}}>
        <div style={card}>{children}</div>
      </div>
    );

    const PasswordTrailingIcon = () => (
      <IconButton toggle slot="trailing-icon" aria-label="Toggle password visibility">
        <Icon>visibility</Icon>
        <Icon slot="selected">visibility_off</Icon>
      </IconButton>
    );

    return (
      <div style={page}>
        <p style={title}>Textfield</p>

        {pair((variant) => (
          <Textfield variant={variant} label="Label" value="Value" style={{width: '100%'}} />
        ))}

        <p style={title}>Labels</p>
        {pair((variant) => (
          <div style={{display: 'grid', gap: 14}}>
            <Textfield variant={variant} label="Favorite food" style={{width: '100%'}} />
            <Textfield
              variant={variant}
              placeholder="email@domain.com"
              aria-label="Email address"
              style={{width: '100%'}}
            />
            <div>
              <div className="md-typescale-body-medium" style={{marginBottom: 6}}>
                First name
              </div>
              <Textfield variant={variant} aria-label="First name" style={{width: '100%'}} />
            </div>
          </div>
        ))}

        <p style={title}>Textarea</p>
        {pair((variant) => (
          <Textfield
            variant={variant}
            type="textarea"
            label="Vertical resize"
            rows={3}
            supportingText="Use CSS resize to control behavior"
            style={{width: '100%', resize: 'vertical'}}
          />
        ))}

        <p style={title}>Icons</p>
        {pair((variant) => (
          <div style={{display: 'grid', gap: 14}}>
            <Textfield
              variant={variant}
              placeholder="Search for messages"
              hasLeadingIcon
              style={{width: '100%'}}
            >
              <Icon slot="leading-icon">search</Icon>
            </Textfield>

            <Textfield
              variant={variant}
              label="Password"
              type="password"
              hasTrailingIcon
              style={{width: '100%'}}
            >
              <PasswordTrailingIcon />
            </Textfield>

            <Textfield
              variant={variant}
              label="Username"
              value="jdoe"
              error
              errorText="Username not available"
              hasTrailingIcon
              style={{width: '100%'}}
            >
              <Icon slot="trailing-icon">error</Icon>
            </Textfield>
          </div>
        ))}

        <p style={title}>Prefix And Suffix</p>
        {pair((variant) => (
          <Textfield
            variant={variant}
            label="Dollar amount"
            type="number"
            value="0"
            prefixText="$"
            suffixText=".00"
            style={{width: '100%'}}
          />
        ))}

        <p style={title}>Supporting Text And Error Text</p>
        {pair((variant) => (
          <div style={{display: 'grid', gap: 14}}>
            <Textfield
              variant={variant}
              label="Comments"
              supportingText="Provide comments for the issue"
              style={{width: '100%'}}
            />

            <Textfield
              variant={variant}
              label="Name"
              required
              supportingText="*required"
              errorText="Please fill out this field"
              error
              style={{width: '100%'}}
            />
          </div>
        ))}

        <p style={title}>Character Counter</p>
        {pair((variant) => (
          <Textfield
            variant={variant}
            label="Title"
            value="Short"
            maxLength={10}
            style={{width: '100%'}}
          />
        ))}

        <p style={title}>Constraint Validation</p>
        {one(<ConstraintValidationExample />)}
      </div>
    );
  },
};

function ConstraintValidationExample() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = React.useRef<any>(null);

  return (
    <div style={{display: 'grid', gap: 12, width: 360, maxWidth: '100%'}}>
      <p style={{margin: 0, fontSize: 14, fontWeight: 650}}>Use reportValidity()</p>
      <div style={{display: 'grid', gap: 16}}>
        <div style={{display: 'grid', gap: 10}}>
          <Textfield
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
                (ref.current as {reportValidity?: () => boolean} | null)?.reportValidity?.();
              }}
            >
              reportValidity()
            </FilledButton>
          </div>
        </div>
        <div style={{display: 'grid', gap: 10}}>
          <Textfield
            variant="outlined"
            name="name-outlined"
            label="Name (outlined)"
            required
            supportingText="Required"
            errorText="Please fill out this field"
            style={{width: '100%'}}
          />
        </div>
      </div>
    </div>
  );
}
