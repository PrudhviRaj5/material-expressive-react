import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdInputChip} from '@material/web/chips/input-chip.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface InputChipProps
  extends Omit<WebComponentProps<MdInputChip>, 'onRemove' | 'onUpdateFocus'> {
  onRemove?: (event: Event) => void;
  onUpdateFocus?: (event: Event) => void;
}

export const InputChip = forwardRef<MdInputChip, InputChipProps>(function InputChip(
  {children, onRemove, onUpdateFocus, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdInputChip>(
    {
      tagName: 'md-input-chip',
      importer: () => import('@material/web/chips/input-chip.js'),
      events: {remove: 'onRemove', 'update-focus': 'onUpdateFocus'},
    },
    {onRemove, onUpdateFocus, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-input-chip ref={mergedRef} {...domProps}>
      {children}
    </md-input-chip>
  );
});
