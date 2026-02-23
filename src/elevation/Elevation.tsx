import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdElevation} from '@material/web/elevation/elevation.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ElevationProps extends WebComponentProps<MdElevation> {}

export const Elevation = forwardRef<MdElevation, ElevationProps>(function Elevation(
  {children, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdElevation>(
    {
      tagName: 'md-elevation',
      importer: () => import('@material/web/elevation/elevation.js'),
    },
    rest,
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-elevation ref={mergedRef} {...domProps}>
      {children}
    </md-elevation>
  );
});
