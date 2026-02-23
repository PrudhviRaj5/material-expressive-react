import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdSwitch} from '@material/web/switch/switch.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface SwitchProps
  extends Omit<
    React.HTMLAttributes<MdSwitch>,
    'children' | 'onChange' | 'onInput'
  > {
  selected?: boolean;
  icons?: boolean;
  showOnlySelectedIcon?: boolean;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  name?: string;

  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
}

export const Switch = forwardRef<MdSwitch, SwitchProps>(function Switch(
  {onChange, onInput, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdSwitch>(
    {
      tagName: 'md-switch',
      importer: () => import('@material/web/switch/switch.js'),
      events: {change: 'onChange', input: 'onInput'},
    },
    {onChange, onInput, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-switch ref={mergedRef} {...domProps} />
  );
});
