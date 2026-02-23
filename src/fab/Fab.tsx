import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdFab} from '@material/web/fab/fab.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

export type FabVariant = 'surface' | 'primary' | 'secondary' | 'tertiary';
export type FabSize = 'small' | 'medium' | 'large';
export type FabTouchTarget = 'none' | 'wrapper';

export interface FabProps extends Omit<React.HTMLAttributes<MdFab>, 'children'> {
  /** The FAB color variant to render. */
  variant?: FabVariant;
  /** The size of the FAB. Extended FABs do not have different sizes. */
  size?: FabSize;
  /** The text to display on the FAB. When set, the FAB becomes extended. */
  label?: string;
  /** Lowers the FAB's elevation. */
  lowered?: boolean;
  /**
   * Controls the optional 48x48 touch target wrapper.
   *
   * Use `touchTarget="none"` with `size="small"` to reduce the touch target.
   */
  touchTarget?: FabTouchTarget;
  children?: React.ReactNode;
}

export const Fab = forwardRef<MdFab, FabProps>(function Fab(
  {variant, size, label, lowered, touchTarget, children, ...rest},
  ref,
) {
  useEnsureDefined('md-fab', () => import('@material/web/fab/fab.js'));

  const innerRef = useRef<MdFab>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  useImperativeProps(
    innerRef,
    (el) => {
      if (variant !== undefined) (el as unknown as {variant: FabVariant}).variant = variant;
      if (size !== undefined) (el as unknown as {size: FabSize}).size = size;
      if (label !== undefined) (el as unknown as {label: string}).label = label;
      if (lowered !== undefined) (el as unknown as {lowered: boolean}).lowered = lowered;

      if (touchTarget === undefined) {
        el.removeAttribute('touch-target');
      } else {
        el.setAttribute('touch-target', touchTarget);
      }
    },
    [variant, size, label, lowered, touchTarget],
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-fab ref={mergedRef} {...rest}>
      {children}
    </md-fab>
  );
});
