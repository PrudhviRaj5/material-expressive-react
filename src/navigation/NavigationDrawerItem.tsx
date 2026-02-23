import * as React from 'react';

import './navigation.css';

export interface NavigationDrawerItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  value?: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  supporting?: React.ReactNode;
  disabled?: boolean;

  /** Internal: set by NavigationDrawer. */
  selected?: boolean;
  /** Internal: set by NavigationDrawer. */
  onSelect?: () => void;
}

export const NavigationDrawerItem = React.forwardRef<
  HTMLButtonElement,
  NavigationDrawerItemProps
>(function NavigationDrawerItem(
  {
    label,
    icon,
    supporting,
    disabled,
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
      className={['mer-nav-drawer-item', className].filter(Boolean).join(' ')}
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
      <span className="mer-nav-drawer-item__label">{label}</span>
      {supporting ? <span className="mer-nav-drawer-item__supporting">{supporting}</span> : <span />}
    </button>
  );
});
