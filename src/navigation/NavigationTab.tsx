import * as React from 'react';

import {Badge} from '../labs/Badge';
import {
  NavigationBarItem,
  type NavigationBarItemProps,
} from './NavigationBarItem';

export interface NavigationTabProps
  extends Omit<
    NavigationBarItemProps,
    'badge' | 'icon' | 'activeIcon' | 'onSelect' | 'hideInactiveLabel'
  > {
  /** Label text (also used for accessibility when icon-only). */
  label?: string;
  /** Mirrors the previous web component prop name. */
  hideInactiveLabel?: boolean;
  /** Show a badge over the icon. */
  showBadge?: boolean;
  /** Badge value string. */
  badgeValue?: string;
  /** Fired when clicked. */
  onInteraction?: (event: CustomEvent<{label?: string}>) => void;
}

function isSlottedIcon(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && typeof (child.props as any)?.slot === 'string';
}

export const NavigationTab = React.forwardRef<HTMLButtonElement, NavigationTabProps>(
  function NavigationTab(
    {
      label,
      hideInactiveLabel,
      showBadge,
      badgeValue,
      onInteraction,
      children,
      onClick,
      ...rest
    },
    ref,
  ) {
    let inactiveIcon: React.ReactNode = null;
    let activeIcon: React.ReactNode = null;

    for (const child of React.Children.toArray(children)) {
      if (!isSlottedIcon(child)) continue;
      const slot = (child.props as any).slot;
      if (slot === 'inactive-icon') inactiveIcon = child;
      if (slot === 'active-icon') activeIcon = child;
    }

    const badge = showBadge ? <Badge value={badgeValue ?? ''} /> : null;

    return (
      <NavigationBarItem
        {...rest}
        ref={ref}
        label={label}
        icon={inactiveIcon}
        activeIcon={activeIcon ?? inactiveIcon}
        hideInactiveLabel={hideInactiveLabel}
        badge={badge}
        onClick={(ev) => {
          onClick?.(ev);
          if (ev.defaultPrevented) return;
          onInteraction?.(
            new CustomEvent('navigation-tab-interaction', {
              detail: {label},
            }),
          );
        }}
      />
    );
  },
);
