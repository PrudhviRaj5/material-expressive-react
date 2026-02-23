import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdLinearProgress} from '@material/web/progress/linear-progress.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface LinearProgressProps
  extends Omit<React.HTMLAttributes<MdLinearProgress>, 'children'> {
  /** Buffer amount to display, a fraction between 0 and `max`. */
  buffer?: number;
  /** Progress to display, a fraction between 0 and `max`. */
  value?: number;
  /** Maximum progress to display, defaults to 1. */
  max?: number;
  /** Display indeterminate progress. */
  indeterminate?: boolean;
  /** Cycle between 4 colors when indeterminate. */
  fourColor?: boolean;
}

export const LinearProgress = forwardRef<MdLinearProgress, LinearProgressProps>(
  function LinearProgress({buffer, value, max, indeterminate, fourColor, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdLinearProgress>(
      {
        tagName: 'md-linear-progress',
        importer: () => import('@material/web/progress/linear-progress.js'),
      },
      {buffer, value, max, indeterminate, fourColor, ...rest},
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-linear-progress ref={mergedRef} {...domProps} />
    );
  },
);
