import * as React from 'react';

import './navigation.css';

import type {NavigationDrawerItemProps} from './NavigationDrawerItem';

export type NavigationDrawerVariant = 'standard' | 'modal';
export type NavigationDrawerPivot = 'start' | 'end';

export interface NavigationDrawerProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  variant?: NavigationDrawerVariant;
  pivot?: NavigationDrawerPivot;

  /** Controls visibility for modal/animated drawers. */
  opened?: boolean;
  defaultOpened?: boolean;
  onChanged?: (event: CustomEvent<{opened: boolean}>) => void;

  /** Selection value used by child NavigationDrawerItem. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onValueReselect?: (value: string) => void;

  header?: React.ReactNode;
}

export const NavigationDrawer = React.forwardRef<HTMLElement, NavigationDrawerProps>(
  function NavigationDrawer(
    {
      variant = 'standard',
      pivot = 'start',
      opened: openedProp,
      defaultOpened = true,
      onChanged,
      value: valueProp,
      defaultValue,
      onValueChange,
      onValueReselect,
      header,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const isOpenedControlled = openedProp !== undefined;
    const [uncontrolledOpened, setUncontrolledOpened] = React.useState(defaultOpened);
    const opened = isOpenedControlled ? openedProp : uncontrolledOpened;

    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
      defaultValue,
    );
    const value = isValueControlled ? valueProp : uncontrolledValue;

    const items = React.Children.toArray(children).filter(React.isValidElement);

    const setOpened = React.useCallback(
      (next: boolean) => {
        if (!isOpenedControlled) setUncontrolledOpened(next);
        onChanged?.(
          new CustomEvent('navigation-drawer-changed', {
            detail: {opened: next},
          }),
        );
      },
      [isOpenedControlled, onChanged],
    );

    const setValue = React.useCallback(
      (next: string) => {
        if (value !== undefined && next === value) {
          onValueReselect?.(next);
          return;
        }
        if (!isValueControlled) setUncontrolledValue(next);
        onValueChange?.(next);
      },
      [isValueControlled, onValueChange, onValueReselect, value],
    );

    const drawer = (
      <aside
        {...rest}
        ref={ref as React.Ref<HTMLElement>}
        className={[
          'mer-nav-reset',
          'mer-nav-drawer',
          variant === 'modal' ? 'mer-nav-drawer--modal' : null,
          pivot === 'start' ? 'mer-nav-drawer--pivot-start' : 'mer-nav-drawer--pivot-end',
          opened ? null : 'mer-nav-drawer--closed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={opened ? 'false' : 'true'}
      >
        {header ? <div className="mer-nav-drawer__header">{header}</div> : null}
        <nav
          className="mer-nav-drawer__content"
          aria-label={(rest as any)['aria-label'] ?? 'Navigation'}
        >
          {items.map((child) => {
            const el = child as React.ReactElement<NavigationDrawerItemProps>;
            const itemValue = (el.props as any).value as string | undefined;
            const selected = itemValue !== undefined && value !== undefined && itemValue === value;
            return React.cloneElement(el, {
              selected,
              onSelect: itemValue ? () => setValue(itemValue) : undefined,
            });
          })}
        </nav>
      </aside>
    );

    if (variant !== 'modal') {
      return drawer;
    }

    return opened ? (
      <div
        className={[
          'mer-nav-drawer-modal-root',
          pivot === 'start' ? 'mer-nav-drawer-modal-root--start' : 'mer-nav-drawer-modal-root--end',
        ].join(' ')}
      >
        <div
          className="mer-nav-drawer-scrim"
          onClick={() => {
            setOpened(false);
          }}
        />
        {drawer}
      </div>
    ) : null;
  },
);
