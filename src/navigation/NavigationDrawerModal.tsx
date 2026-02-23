import * as React from 'react';

import {
  NavigationDrawer,
  type NavigationDrawerProps,
} from './NavigationDrawer';

export type NavigationDrawerModalProps = Omit<NavigationDrawerProps, 'variant'>;

export const NavigationDrawerModal = React.forwardRef<
  HTMLElement,
  NavigationDrawerModalProps
>(function NavigationDrawerModal(props, ref) {
  return <NavigationDrawer {...props} ref={ref} variant="modal" />;
});
