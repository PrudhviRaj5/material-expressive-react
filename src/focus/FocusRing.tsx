import type {MdFocusRing} from '@material/web/focus/md-focus-ring.js';

import type * as React from 'react';
import {forwardRef} from 'react';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface FocusRingProps extends WebComponentProps<MdFocusRing> {
  /**
   * Alias for the underlying `for` attribute.
   * Material Web uses the `htmlFor` property name.
   */
  htmlFor?: string;
  /**
   * HTML attribute name alias (matches docs).
   * Prefer `htmlFor` in React.
   */
  'for'?: string;
}

export const FocusRing = forwardRef<MdFocusRing, FocusRingProps>(function FocusRing(
  // eslint-disable-next-line @typescript-eslint/naming-convention
  {children, htmlFor, 'for': forValue, ...rest},
  ref,
) {
  const resolvedHtmlFor = htmlFor ?? forValue;

  const {ref: mergedRef, domProps} = useWebComponent<MdFocusRing>(
    {
      tagName: 'md-focus-ring',
      importer: () => import('@material/web/focus/md-focus-ring.js'),
    },
    {
      ...rest,
      ...(resolvedHtmlFor ? {htmlFor: resolvedHtmlFor} : null),
    },
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-focus-ring ref={mergedRef} {...domProps}>
      {children}
    </md-focus-ring>
  );
});
