import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdFilledCard} from '@material/web/labs/card/filled-card.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface FilledCardProps extends WebComponentProps<MdFilledCard> {}

export const FilledCard = forwardRef<MdFilledCard, FilledCardProps>(
  function FilledCard({children, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdFilledCard>(
      {
        tagName: 'md-filled-card',
        importer: () => import('@material/web/labs/card/filled-card.js'),
      },
      rest,
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-filled-card ref={mergedRef} {...domProps}>
        {children}
      </md-filled-card>
    );
  },
);
