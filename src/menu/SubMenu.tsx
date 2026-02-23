import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdSubMenu} from '@material/web/menu/sub-menu.js';

import {useWebComponent} from '../internal/useWebComponent';

export type SubMenuCorner = 'start-start' | 'start-end' | 'end-start' | 'end-end';

export interface SubMenuProps
  extends Omit<
    React.HTMLAttributes<MdSubMenu>,
    | 'children'
    | 'onDeactivateItems'
    | 'onRequestActivation'
    | 'onDeactivateTypeahead'
    | 'onActivateTypeahead'
  > {
  children?: React.ReactNode;

  anchorCorner?: SubMenuCorner;
  menuCorner?: SubMenuCorner;
  hoverOpenDelay?: number;
  hoverCloseDelay?: number;

  onDeactivateItems?: (event: Event) => void;
  onRequestActivation?: (event: Event) => void;
  onDeactivateTypeahead?: (event: Event) => void;
  onActivateTypeahead?: (event: Event) => void;
}

export const SubMenu = forwardRef<MdSubMenu, SubMenuProps>(function SubMenu(
  {
    children,
    onDeactivateItems,
    onRequestActivation,
    onDeactivateTypeahead,
    onActivateTypeahead,
    ...rest
  },
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdSubMenu>(
    {
      tagName: 'md-sub-menu',
      importer: () => import('@material/web/menu/sub-menu.js'),
      events: {
        'deactivate-items': 'onDeactivateItems',
        'request-activation': 'onRequestActivation',
        'deactivate-typeahead': 'onDeactivateTypeahead',
        'activate-typeahead': 'onActivateTypeahead',
      },
    },
    {
      onDeactivateItems,
      onRequestActivation,
      onDeactivateTypeahead,
      onActivateTypeahead,
      ...rest,
    },
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-sub-menu ref={mergedRef} {...domProps}>
      {children}
    </md-sub-menu>
  );
});
