import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdBadge} from '@material/web/labs/badge/badge.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface BadgeProps extends WebComponentProps<MdBadge> {}

export const Badge = forwardRef<MdBadge, BadgeProps>(function Badge(
  {children, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdBadge>(
    {
      tagName: 'md-badge',
      importer: () => import('@material/web/labs/badge/badge.js'),
    },
    rest,
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-badge ref={mergedRef} {...domProps}>
      {children}
    </md-badge>
  );
});
