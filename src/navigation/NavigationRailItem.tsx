import * as React from 'react';

import './navigation.css';

export interface NavigationRailItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  value?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;

  /** Internal: set by NavigationRail. */
  expanded?: boolean;
  /** Internal: set by NavigationRail. */
  selected?: boolean;
  /** Internal: set by NavigationRail. */
  onSelect?: () => void;
}

export const NavigationRailItem = React.forwardRef<
  HTMLButtonElement,
  NavigationRailItemProps
>(function NavigationRailItem(
  {
    label,
    icon,
    disabled,
    expanded = false,
    selected = false,
    onSelect,
    className,
    onClick,
    ...rest
  },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      className={[
        'mer-nav-rail-item',
        expanded ? 'mer-nav-rail-item--expanded' : 'mer-nav-rail-item--collapsed',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-selected={selected ? 'true' : 'false'}
      aria-disabled={disabled ? 'true' : 'false'}
      disabled={disabled}
      onClick={(ev) => {
        onClick?.(ev);
        if (ev.defaultPrevented) return;
        onSelect?.();
      }}
    >
      <span aria-hidden="true">{icon}</span>
      {label ? <span className="mer-nav-rail-item__label">{label}</span> : null}
    </button>
  );
});
