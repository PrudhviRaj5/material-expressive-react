import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdMenu} from '@material/web/menu/menu.js';

import {useWebComponent} from '../internal/useWebComponent';

export type MenuCorner = 'start-start' | 'start-end' | 'end-start' | 'end-end';
export type MenuDefaultFocus = 'first-item' | 'last-item' | 'list-root' | 'none';
export type MenuPositioning = 'absolute' | 'fixed' | 'document' | 'popover';

export interface MenuProps
  extends Omit<
    React.HTMLAttributes<MdMenu>,
    'children' | 'onOpening' | 'onOpened' | 'onClosing' | 'onClosed'
  > {
  children?: React.ReactNode;

  anchor?: string;
  anchorElement?: HTMLElement | null;
  positioning?: MenuPositioning;
  quick?: boolean;
  hasOverflow?: boolean;
  open?: boolean;
  xOffset?: number;
  yOffset?: number;
  noHorizontalFlip?: boolean;
  noVerticalFlip?: boolean;
  typeaheadDelay?: number;
  anchorCorner?: MenuCorner;
  menuCorner?: MenuCorner;
  stayOpenOnOutsideClick?: boolean;
  stayOpenOnFocusout?: boolean;
  skipRestoreFocus?: boolean;
  defaultFocus?: MenuDefaultFocus;
  noNavigationWrap?: boolean;

  /** Alias for the menu's `tabIndex` used in demos/controls. */
  listTabIndex?: number;

  onOpening?: (event: Event) => void;
  onOpened?: (event: Event) => void;
  onClosing?: (event: Event) => void;
  onClosed?: (event: Event) => void;
  /** Re-emits the `close-menu` CustomEvent (bubbles from menu items). */
  onCloseMenu?: (event: Event) => void;
}

export const Menu = forwardRef<MdMenu, MenuProps>(function Menu(
  {
    children,
    listTabIndex,
    onOpening,
    onOpened,
    onClosing,
    onClosed,
    onCloseMenu,
    ...rest
  },
  ref,
) {
  const mergedProps =
    listTabIndex === undefined ? rest : {...rest, tabIndex: listTabIndex};

  const {ref: mergedRef, domProps} = useWebComponent<MdMenu>(
    {
      tagName: 'md-menu',
      importer: () => import('@material/web/menu/menu.js'),
      events: {
        opening: 'onOpening',
        opened: 'onOpened',
        closing: 'onClosing',
        closed: 'onClosed',
        'close-menu': 'onCloseMenu',
      },
    },
    {onOpening, onOpened, onClosing, onClosed, onCloseMenu, ...mergedProps},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-menu ref={mergedRef} {...domProps}>
      {children}
    </md-menu>
  );
});
