import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdCheckbox} from '@material/web/checkbox/checkbox.js';

import {
  useEnsureDefined,
  useEventListener,
  useImperativeProps,
  useMergedRefs,
} from '../internal/hooks';

export interface CheckboxProps
  extends Omit<
    React.HTMLAttributes<MdCheckbox>,
    'checked' | 'disabled' | 'onChange' | 'onInput'
  > {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  /** Readonly associated form element (custom element form-associated API). */
  form?: HTMLFormElement;

  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
}

export const Checkbox = forwardRef<MdCheckbox, CheckboxProps>(function Checkbox(
  {checked, indeterminate, disabled, required, name, value, onChange, onInput, ...rest},
  ref,
) {
  useEnsureDefined('md-checkbox', () => import('@material/web/checkbox/checkbox.js'));
  const innerRef = useRef<MdCheckbox>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  useImperativeProps(
    innerRef,
      (el) => {
        if (checked !== undefined) el.checked = checked;
        if (indeterminate !== undefined) (el as unknown as {indeterminate: boolean}).indeterminate = indeterminate;
        if (disabled !== undefined) el.disabled = disabled;
        if (required !== undefined) (el as unknown as {required: boolean}).required = required;
        if (name !== undefined) (el as unknown as {name: string}).name = name;
        if (value !== undefined) (el as unknown as {value: string}).value = value;
      },
    [checked, indeterminate, disabled, required, name, value],
  );

  // React will not reliably synthesize `change`/`input` for CustomElements in all setups,
  // so we attach DOM listeners directly.
  useEventListener(innerRef, 'change', onChange);
  useEventListener(innerRef, 'input', onInput);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-checkbox
      ref={mergedRef}
      {...rest}
    />
  );
});
