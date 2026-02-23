import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdChipSet} from '@material/web/chips/chip-set.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ChipSetProps extends WebComponentProps<MdChipSet> {}

export const ChipSet = forwardRef<MdChipSet, ChipSetProps>(function ChipSet(
  {children, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdChipSet>(
    {
      tagName: 'md-chip-set',
      importer: () => import('@material/web/chips/chip-set.js'),
    },
    rest,
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-chip-set ref={mergedRef} {...domProps}>
      {children}
    </md-chip-set>
  );
});
