import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdFilterChip} from '@material/web/chips/filter-chip.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface FilterChipProps
  extends Omit<WebComponentProps<MdFilterChip>, 'onRemove' | 'onUpdateFocus'> {
  onRemove?: (event: Event) => void;
  onUpdateFocus?: (event: Event) => void;
}

export const FilterChip = forwardRef<MdFilterChip, FilterChipProps>(function FilterChip(
  {children, onRemove, onUpdateFocus, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdFilterChip>(
    {
      tagName: 'md-filter-chip',
      importer: () => import('@material/web/chips/filter-chip.js'),
      events: {remove: 'onRemove', 'update-focus': 'onUpdateFocus'},
    },
    {onRemove, onUpdateFocus, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-filter-chip ref={mergedRef} {...domProps}>
      {children}
    </md-filter-chip>
  );
});
