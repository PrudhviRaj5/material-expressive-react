import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdRadio} from '@material/web/radio/radio.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface RadioProps
  extends Omit<React.HTMLAttributes<MdRadio>, 'children' | 'onChange' | 'onInput'> {
  required?: boolean;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;

  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
}

export const Radio = forwardRef<MdRadio, RadioProps>(function Radio(
  {onChange, onInput, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdRadio>(
    {
      tagName: 'md-radio',
      importer: () => import('@material/web/radio/radio.js'),
      events: {change: 'onChange', input: 'onInput'},
    },
    {onChange, onInput, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-radio ref={mergedRef} {...domProps} />
  );
});
