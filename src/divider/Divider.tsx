import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdDivider} from '@material/web/divider/divider.js';

import {useWebComponent} from '../internal/useWebComponent';

export type DividerVariant = 'horizontal' | 'vertical';
export type DividerType = 'full-width' | 'inset' | 'middle-inset';

export interface DividerProps
  extends Omit<React.HTMLAttributes<MdDivider>, 'children'> {
  variant?: DividerVariant;
  type?: DividerType;
}

export const Divider = forwardRef<MdDivider, DividerProps>(function Divider(
  {
    variant = 'horizontal',
    type = 'full-width',
    style,
    ...rest
  },
  ref,
) {
  const inset = variant === 'horizontal' && type === 'middle-inset';
  const insetStart = variant === 'horizontal' && type === 'inset';

  const verticalStyle: React.CSSProperties =
    variant === 'vertical'
      ? {
          width: 'var(--md-divider-thickness, 1px)',
          height: '100%',
          ...(type === 'inset'
            ? {paddingBlockStart: 16}
            : type === 'middle-inset'
              ? {paddingBlock: 16}
              : null),
        }
      : {};

  const {ref: mergedRef, domProps} = useWebComponent<MdDivider>(
    {
      tagName: 'md-divider',
      importer: () => import('@material/web/divider/divider.js'),
    },
    {
      ...rest,
      // Map our API to the underlying divider API for horizontal dividers.
      inset,
      insetStart,
      // Always merge styles last so callers can override.
      style: {
        ...verticalStyle,
        ...(style as React.CSSProperties),
      },
    },
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-divider ref={mergedRef} {...domProps} />
  );
});
