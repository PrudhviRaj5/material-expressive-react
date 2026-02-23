import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdCircularProgress} from '@material/web/progress/circular-progress.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface CircularProgressProps
  extends Omit<React.HTMLAttributes<MdCircularProgress>, 'children'> {
  /** Progress to display, a fraction between 0 and `max`. */
  value?: number;
  /** Maximum progress to display, defaults to 1. */
  max?: number;
  /** Display indeterminate progress. */
  indeterminate?: boolean;
  /** Cycle between 4 colors when indeterminate. */
  fourColor?: boolean;
}

export const CircularProgress = forwardRef<MdCircularProgress, CircularProgressProps>(
  function CircularProgress({value, max, indeterminate, fourColor, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdCircularProgress>(
      {
        tagName: 'md-circular-progress',
        importer: () => import('@material/web/progress/circular-progress.js'),
      },
      {value, max, indeterminate, fourColor, ...rest},
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-circular-progress ref={mergedRef} {...domProps} />
    );
  },
);
