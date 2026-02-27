import * as React from 'react';

import './menu-supporting.css';

import {Icon} from '../icon';
import {useMenuContext} from './menu-context';

export interface MenuItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  value: string;
  label: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** If false, do not replace trailing icon with a checkmark when selected. */
  showSelectedIcon?: boolean;
  disabled?: boolean;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  function MenuItem(
    {
      value,
      label,
      leadingIcon,
      trailingIcon,
      showSelectedIcon = true,
      disabled,
      className,
      onClick,
      ...rest
    },
    ref,
  ) {
    const ctx = useMenuContext();
    const selected = ctx ? ctx.selected.has(value) : false;

    const trailing = selected && showSelectedIcon ? <Icon>check</Icon> : trailingIcon ?? null;
    const leading = leadingIcon ? (
      <span className="mer-menu-item__iconWrap" aria-hidden="true">
        {leadingIcon}
      </span>
    ) : (
      <span className="mer-menu-item__iconPlaceholder" aria-hidden="true" />
    );

    return (
      <button
        {...rest}
        ref={ref}
        type="button"
        className={['mer-menu-item', className].filter(Boolean).join(' ')}
        aria-selected={selected ? 'true' : 'false'}
        aria-disabled={disabled ? 'true' : 'false'}
        disabled={disabled}
        onClick={(ev) => {
          onClick?.(ev);
          if (ev.defaultPrevented) return;
          ctx?.toggleValue(value);
        }}
      >
        {leading}
        <span className="mer-menu-item__label">{label}</span>
        <span className="mer-menu-item__trailing" aria-hidden="true">
          {trailing}
        </span>
      </button>
    );
  },
);
