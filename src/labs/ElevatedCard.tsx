import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdElevatedCard} from '@material/web/labs/card/elevated-card.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ElevatedCardProps extends WebComponentProps<MdElevatedCard> {}

export const ElevatedCard = forwardRef<MdElevatedCard, ElevatedCardProps>(
  function ElevatedCard({children, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdElevatedCard>(
      {
        tagName: 'md-elevated-card',
        importer: () => import('@material/web/labs/card/elevated-card.js'),
      },
      rest,
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-elevated-card ref={mergedRef} {...domProps}>
        {children}
      </md-elevated-card>
    );
  },
);
