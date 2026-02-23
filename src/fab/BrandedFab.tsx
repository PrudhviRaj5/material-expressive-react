import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdBrandedFab} from '@material/web/fab/branded-fab.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

export type BrandedFabSize = 'medium' | 'large';
export type BrandedFabTouchTarget = 'none' | 'wrapper';

export interface BrandedFabProps
  extends Omit<React.HTMLAttributes<MdBrandedFab>, 'children'> {
  /** The size of the FAB. Branded FABs may be medium (default) or large. */
  size?: BrandedFabSize;
  /** The text to display on the FAB. When set, the FAB becomes extended. */
  label?: string;
  /** Lowers the FAB's elevation. */
  lowered?: boolean;
  touchTarget?: BrandedFabTouchTarget;
  children?: React.ReactNode;
}

export const BrandedFab = forwardRef<MdBrandedFab, BrandedFabProps>(function BrandedFab(
  {size, label, lowered, touchTarget, children, ...rest},
  ref,
) {
  useEnsureDefined('md-branded-fab', () => import('@material/web/fab/branded-fab.js'));

  const innerRef = useRef<MdBrandedFab>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  useImperativeProps(
    innerRef,
    (el) => {
      if (size !== undefined) (el as unknown as {size: BrandedFabSize}).size = size;
      if (label !== undefined) (el as unknown as {label: string}).label = label;
      if (lowered !== undefined) (el as unknown as {lowered: boolean}).lowered = lowered;
      if (touchTarget === undefined) {
        el.removeAttribute('touch-target');
      } else {
        el.setAttribute('touch-target', touchTarget);
      }
    },
    [size, label, lowered, touchTarget],
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-branded-fab ref={mergedRef} {...rest}>
      {children}
    </md-branded-fab>
  );
});
