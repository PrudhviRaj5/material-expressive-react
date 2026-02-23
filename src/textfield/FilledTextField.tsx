import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdFilledTextField} from '@material/web/textfield/filled-text-field.js';

import {useWebComponent} from '../internal/useWebComponent';

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

export interface FilledTextFieldProps
  extends Omit<
    React.HTMLAttributes<MdFilledTextField>,
    'onChange' | 'onInput' | 'onSelect'
  > {
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

  onSelect?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
}

export const FilledTextField = forwardRef<MdFilledTextField, FilledTextFieldProps>(
  function FilledTextField({children, onSelect, onChange, onInput, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdFilledTextField>(
      {
        tagName: 'md-filled-text-field',
        importer: () => import('@material/web/textfield/filled-text-field.js'),
        events: {select: 'onSelect', change: 'onChange', input: 'onInput'},
      },
      {onSelect, onChange, onInput, ...rest},
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-filled-text-field ref={mergedRef} {...domProps}>
        {children}
      </md-filled-text-field>
    );
  },
);
