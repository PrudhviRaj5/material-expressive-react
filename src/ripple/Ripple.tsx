import * as React from 'react';
import {forwardRef} from 'react';

import type {MdRipple} from '@material/web/ripple/ripple.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface RippleProps
  extends Omit<React.HTMLAttributes<MdRipple>, 'children' | 'onClick'> {
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

  /** Explicit click handler (wired via addEventListener for CustomElements). */
  onClick?: (event: Event) => void;
}

export const Ripple = forwardRef<MdRipple, RippleProps>(function Ripple(
  {disabled, htmlFor, for: forProp, control, onClick, ...rest},
  ref,
) {
  const resolvedHtmlFor = htmlFor ?? forProp;

  const {ref: mergedRef, domProps, innerRef} = useWebComponent<MdRipple>(
    {
      tagName: 'md-ripple',
      importer: () => import('@material/web/ripple/ripple.js'),
    },
    {disabled, htmlFor: resolvedHtmlFor, control, ...rest},
    ref,
  );

  // `md-ripple` is typically pointer-events:none; clicks happen on the attached control.
  // Wire onClick to the resolved control/anchor or the parent element.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (!onClick) return;
    if (typeof window === 'undefined') return;

    const byId = resolvedHtmlFor
      ? (document.getElementById(resolvedHtmlFor) as HTMLElement | null)
      : null;
    const target = control ?? byId ?? innerRef.current?.parentElement ?? null;
    if (!target) return;

    const handler = (ev: Event) => {
      onClick(ev);
    };

    target.addEventListener('click', handler);
    return () => {
      target.removeEventListener('click', handler);
    };
  }, [onClick, control, resolvedHtmlFor, innerRef]);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-ripple ref={mergedRef} {...domProps} />
  );
});
