import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdItem} from '@material/web/labs/item/item.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ItemProps extends WebComponentProps<MdItem> {}

export const Item = forwardRef<MdItem, ItemProps>(function Item(
  {children, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdItem>(
    {
      tagName: 'md-item',
      importer: () => import('@material/web/labs/item/item.js'),
    },
    rest,
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-item ref={mergedRef} {...domProps}>
      {children}
    </md-item>
  );
});
