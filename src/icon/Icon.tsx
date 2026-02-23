import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdIcon} from '@material/web/icon/icon.js';

import {useEnsureDefined, useMergedRefs} from '../internal/hooks';

export interface IconProps extends React.HTMLAttributes<MdIcon> {
  /** Named slot, typically `icon` when used inside buttons. */
  slot?: string;
}

export const Icon = forwardRef<MdIcon, IconProps>(function Icon(
  {children, ...rest},
  ref,
) {
  useEnsureDefined('md-icon', () => import('@material/web/icon/icon.js'));
  const innerRef = useRef<MdIcon>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-icon ref={mergedRef} {...rest}>
      {children}
    </md-icon>
  );
});

