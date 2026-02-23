import * as React from 'react';

import './navigation.css';

export type NavigationBarItemVariant = 'vertical' | 'horizontal';

export interface NavigationBarItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'itemRef'> {
  /** Label displayed under/next to the icon. */
  label?: string;
  /** Icon shown when inactive. */
  icon?: React.ReactNode;
  /** Icon shown when active (falls back to `icon`). */
  activeIcon?: React.ReactNode;
  /** Optional badge shown on the icon. */
  badge?: React.ReactNode;

  /** Internal: set by NavigationBar. */
  index?: number;
  /** Internal: set by NavigationBar. */
  active?: boolean;
  /** Internal: set by NavigationBar. */
  variant?: NavigationBarItemVariant;
  /** Internal: set by NavigationBar. */
  hideInactiveLabel?: boolean;
  /** Internal: set by NavigationBar. */
  onSelect?: () => void;
  /** Internal: set by NavigationBar. */
  itemRef?: (el: HTMLButtonElement | null) => void;
}

export const NavigationBarItem = React.forwardRef<
  HTMLButtonElement,
  NavigationBarItemProps
>(function NavigationBarItem(
  {
    label,
    icon,
    activeIcon,
    badge,
    index,
    active = false,
    variant = 'vertical',
    hideInactiveLabel = false,
    onSelect,
    itemRef,
    className,
    disabled,
    onClick,
    ...rest
  },
  ref,
) {
  const mergedRef = (el: HTMLButtonElement | null) => {
    if (typeof ref === 'function') ref(el);
    else if (ref && typeof ref === 'object') (ref as any).current = el;
    itemRef?.(el);
  };

  return (
    <button
      {...rest}
      ref={mergedRef}
      type="button"
      role="tab"
      aria-selected={active ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={active ? 0 : -1}
      className={[
        'mer-nav-item',
        variant === 'horizontal' ? 'mer-nav-item--horizontal' : 'mer-nav-item--vertical',
        hideInactiveLabel ? 'mer-nav-item--hide-inactive-label' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled}
      onClick={(ev) => {
        onClick?.(ev);
        if (ev.defaultPrevented) return;
        onSelect?.();
      }}
    >
      <span className="mer-nav-item__pill" aria-hidden="true">
        <span className="mer-nav-item__icon">{active ? activeIcon ?? icon : icon}</span>
        {variant === 'horizontal' && label ? (
          <span className="mer-nav-item__label">{label}</span>
        ) : null}
        {badge}
      </span>
      {variant === 'vertical' && label ? (
        <span className="mer-nav-item__label">{label}</span>
      ) : null}
    </button>
  );
});
