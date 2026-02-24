import * as React from 'react';

import './fab-menu.css';

import {Icon} from '../icon';

export type FabMenuItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
};

export interface FABMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  items: FabMenuItem[];
  onItemSelect?: (id: string) => void;

  fabAriaLabel?: string;
  openIcon?: string;
  closeIcon?: string;
}

export const FABMenu = React.forwardRef<HTMLDivElement, FABMenuProps>(function FABMenu(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    items,
    onItemSelect,
    fabAriaLabel = 'Open FAB menu',
    openIcon = 'add',
    closeIcon = 'close',
    className,
    ...rest
  },
  ref,
) {
  const isControlled = openProp !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isControlled ? openProp : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={['mer-fabmenu', className].filter(Boolean).join(' ')}
    >
      <div className="mer-fabmenu__stack" aria-hidden={open ? 'false' : 'true'}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="mer-fabmenu__item"
            disabled={item.disabled}
            onClick={() => {
              item.onSelect?.();
              onItemSelect?.(item.id);
              setOpen(false);
            }}
          >
            <span className="mer-fabmenu__icon" aria-hidden="true">
              {item.icon ?? <Icon>star</Icon>}
            </span>
            <span className="mer-fabmenu__label">{item.label}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mer-fabmenu__fab"
        aria-label={fabAriaLabel}
        aria-expanded={open ? 'true' : 'false'}
        onClick={() => setOpen(!open)}
      >
        <Icon>{open ? closeIcon : openIcon}</Icon>
      </button>
    </div>
  );
});
