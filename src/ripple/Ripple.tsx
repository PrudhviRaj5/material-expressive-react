import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdRipple} from '@material/web/ripple/ripple.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface RippleProps
  extends Omit<React.HTMLAttributes<MdRipple>, 'children'> {
  /** Disables the ripple. */
  disabled?: boolean;
  /**
   * References the id of an element to attach to.
   *
   * (Maps to the underlying ripple's `htmlFor` property.)
   */
  htmlFor?: string | null;
  /** Alias for `htmlFor` to match the docs `<md-ripple for="...">` */
  'for'?: string;
  /** Attach to an element directly. */
  control?: HTMLElement | null;
}

export const Ripple = forwardRef<MdRipple, RippleProps>(function Ripple(
  {disabled, htmlFor, for: forProp, control, ...rest},
  ref,
) {
  const resolvedHtmlFor = htmlFor ?? forProp;

  const {ref: mergedRef, domProps} = useWebComponent<MdRipple>(
    {
      tagName: 'md-ripple',
      importer: () => import('@material/web/ripple/ripple.js'),
    },
    {disabled, htmlFor: resolvedHtmlFor, control, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-ripple ref={mergedRef} {...domProps} />
  );
});
