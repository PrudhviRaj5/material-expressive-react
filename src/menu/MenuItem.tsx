import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdMenuItem} from '@material/web/menu/menu-item.js';

import {useWebComponent} from '../internal/useWebComponent';

export type MenuItemType = 'menuitem' | 'option' | 'button' | 'link';

export interface MenuItemProps
  extends Omit<React.HTMLAttributes<MdMenuItem>, 'children'> {
  children?: React.ReactNode;

  disabled?: boolean;
  type?: MenuItemType;
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | '';
  keepOpen?: boolean;
  selected?: boolean;
  typeaheadText?: string;

  /** Re-emits the `close-menu` CustomEvent emitted on item activation. */
  onCloseMenu?: (event: Event) => void;
}

export const MenuItem = forwardRef<MdMenuItem, MenuItemProps>(function MenuItem(
  {children, onCloseMenu, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdMenuItem>(
    {
      tagName: 'md-menu-item',
      importer: () => import('@material/web/menu/menu-item.js'),
      events: {
        'close-menu': 'onCloseMenu',
      },
    },
    {onCloseMenu, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-menu-item ref={mergedRef} {...domProps}>
      {children}
    </md-menu-item>
  );
});
