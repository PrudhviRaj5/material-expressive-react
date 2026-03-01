import * as React from 'react';
import {forwardRef} from 'react';

import type {MdElevatedCard} from '@material/web/labs/card/elevated-card.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';
import {Ripple} from '../ripple';

export interface ElevatedCardProps extends WebComponentProps<MdElevatedCard> {
  /** Disables the pressed/hover ripple overlay. */
  disableRipple?: boolean;
}

export const ElevatedCard = forwardRef<MdElevatedCard, ElevatedCardProps>(
  function ElevatedCard({children, disableRipple, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdElevatedCard>(
      {
        tagName: 'md-elevated-card',
        importer: () => import('@material/web/labs/card/elevated-card.js'),
      },
      rest,
      ref,
    );

    const style = domProps.style as React.CSSProperties | undefined;
    const resolvedStyle: React.CSSProperties = {
      ...(style ?? {}),
      // Needed for the absolutely-positioned ripple overlay.
      position:
        style?.position && style.position !== 'static'
          ? (style.position as React.CSSProperties['position'])
          : 'relative',
    };

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-elevated-card ref={mergedRef} {...domProps} style={resolvedStyle}>
        {children}
        {!disableRipple ? (
          <Ripple
            aria-hidden={true}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        ) : null}
      </md-elevated-card>
    );
  },
);
