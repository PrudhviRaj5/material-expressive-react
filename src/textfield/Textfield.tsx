import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdFilledTextField} from '@material/web/textfield/filled-text-field.js';
import type {MdOutlinedTextField} from '@material/web/textfield/outlined-text-field.js';

import {useWebComponent} from '../internal/useWebComponent';

export type TextfieldVariant = 'filled' | 'outlined';

export type TextFieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url';

export type TextFieldSelectionDirection = 'forward' | 'backward' | 'none' | null;

type TextFieldInputMode = React.InputHTMLAttributes<HTMLInputElement>['inputMode'];

type MdTextfield = MdFilledTextField | MdOutlinedTextField;

export interface TextfieldProps
  extends Omit<React.HTMLAttributes<MdTextfield>, 'onChange' | 'onInput' | 'onSelect'> {
  variant?: TextfieldVariant;

  children?: React.ReactNode;

  error?: boolean;
  errorText?: string;
  label?: string;
  noAsterisk?: boolean;
  required?: boolean;
  value?: string;

  prefixText?: string;
  suffixText?: string;
  hasLeadingIcon?: boolean;
  hasTrailingIcon?: boolean;
  supportingText?: string;
  textDirection?: string;

  rows?: number;
  cols?: number;
  inputMode?: TextFieldInputMode;

  max?: string;
  maxLength?: number;
  min?: string;
  minLength?: number;
  noSpinner?: boolean;
  pattern?: string;
  placeholder?: string;
  readOnly?: boolean;
  multiple?: boolean;
  step?: string;
  type?: TextFieldType;
  autocomplete?: string;

  selectionDirection?: TextFieldSelectionDirection;
  selectionEnd?: number | null;
  selectionStart?: number | null;
  valueAsNumber?: number;
  valueAsDate?: Date | null;

  disabled?: boolean;
  name?: string;
  autofocus?: boolean;

  onSelect?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
}

export const Textfield = forwardRef<MdTextfield, TextfieldProps>(function Textfield(
  {variant = 'filled', children, onSelect, onChange, onInput, ...rest},
  ref,
) {
  const isOutlined = variant === 'outlined';

  const tagName = isOutlined ? 'md-outlined-text-field' : 'md-filled-text-field';
  const importer = isOutlined
    ? () => import('@material/web/textfield/outlined-text-field.js')
    : () => import('@material/web/textfield/filled-text-field.js');

  const {ref: mergedRef, domProps} = useWebComponent<MdTextfield>(
    {
      tagName,
      importer,
      events: {select: 'onSelect', change: 'onChange', input: 'onInput'},
    },
    {onSelect, onChange, onInput, ...rest},
    ref,
  );

  if (isOutlined) {
    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-outlined-text-field ref={mergedRef} {...domProps}>
        {children}
      </md-outlined-text-field>
    );
  }

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-filled-text-field ref={mergedRef} {...domProps}>
      {children}
    </md-filled-text-field>
  );
});
