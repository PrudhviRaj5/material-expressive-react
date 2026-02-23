import type {MdFocusRing} from '@material/web/focus/md-focus-ring.js';

import type * as React from 'react';
import {forwardRef} from 'react';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface FocusRingProps extends WebComponentProps<MdFocusRing> {}

export const FocusRing = forwardRef<MdFocusRing, FocusRingProps>(function FocusRing(
  {children, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdFocusRing>(
    {
      tagName: 'md-focus-ring',
      importer: () => import('@material/web/focus/md-focus-ring.js'),
    },
    rest,
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-focus-ring ref={mergedRef} {...domProps}>
      {children}
    </md-focus-ring>
  );
});
