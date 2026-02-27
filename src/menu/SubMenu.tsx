import * as React from 'react';
import {createPortal} from 'react-dom';

import './menu-supporting.css';

import {Icon} from '../icon';
import {MenuItem, type MenuItemProps} from './MenuItem';

export interface SubMenuProps {
  item: Omit<MenuItemProps, 'trailingIcon'>;
  menu: React.ReactElement;
  /** Opens submenu on hover as well as click. */
  openOnHover?: boolean;
  /** Align submenu to the left of the parent item instead of right. */
  align?: 'right' | 'left';
}

export const SubMenu = React.forwardRef<HTMLDivElement, SubMenuProps>(function SubMenu(
  {item, menu, openOnHover = true, align = 'right'},
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);
  const [portalStyle, setPortalStyle] = React.useState<React.CSSProperties | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    if (!openOnHover) return;
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 120);
  }, [cancelClose, openOnHover]);

  React.useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (ev: MouseEvent) => {
      const t = ev.target as Node | null;
      if (!t) return;

      const root = triggerRef.current?.closest('.mer-submenu');
      if (root?.contains(t)) return;
      if (popoverRef.current?.contains(t)) return;

      setOpen(false);
    };

    const onDocKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onDocKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onDocKeyDown);
    };
  }, [open]);

  React.useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const pop = popoverRef.current;
    if (!trigger || !pop) return;

    const compute = () => {
      const rect = trigger.getBoundingClientRect();
      const popRect = pop.getBoundingClientRect();
      const gutter = 12;
      const viewportGutter = 8;

      // Prefer right, but flip if it would overflow.
      const desiredLeft = align === 'left' ? rect.left - gutter - popRect.width : rect.right + gutter;
      const desiredRight = desiredLeft + popRect.width;
      const vw = window.innerWidth;

      let left = desiredLeft;
      if (align !== 'left' && desiredRight > vw - viewportGutter) {
        // Flip to left side if possible.
        left = rect.left - gutter - popRect.width;
      }

      let top = rect.top;

      // Clamp to viewport.
      const vh = window.innerHeight;
      left = Math.max(viewportGutter, Math.min(left, vw - viewportGutter - popRect.width));
      top = Math.max(viewportGutter, Math.min(top, vh - viewportGutter - popRect.height));

      setPortalStyle({left, top});
    };

    compute();

    window.addEventListener('resize', compute);
    window.addEventListener('scroll', compute, true);
    return () => {
      window.removeEventListener('resize', compute);
      window.removeEventListener('scroll', compute, true);
    };
  }, [align, open]);

  return (
    <div
      ref={ref}
      className="mer-submenu"
      onPointerEnter={() => {
        if (openOnHover) {
          cancelClose();
          setOpen(true);
        }
      }}
      onPointerLeave={() => {
        scheduleClose();
      }}
    >
      <MenuItem
        {...(item as any)}
        ref={triggerRef}
        trailingIcon={<Icon>arrow_right</Icon>}
        showSelectedIcon={false}
        onClick={(ev) => {
          item.onClick?.(ev as any);
          if (ev.defaultPrevented) return;

          // Submenus shouldn't toggle selection; clicking and hovering both open the side menu.
          ev.preventDefault();
          cancelClose();
          setOpen(true);
        }}
      />

      {open
        ? createPortal(
            <div
              ref={popoverRef}
              className={[
                'mer-submenu__popover',
                'mer-submenu__popover--portal',
                align === 'left' ? 'mer-submenu__popover--left' : null,
              ]
                .filter(Boolean)
                .join(' ')}
              style={portalStyle ?? undefined}
              onPointerEnter={() => {
                cancelClose();
              }}
              onPointerLeave={() => {
                scheduleClose();
              }}
            >
              {menu}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});
