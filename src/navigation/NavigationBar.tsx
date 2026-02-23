import * as React from 'react';

import './navigation.css';

import type {NavigationBarItemProps} from './NavigationBarItem';

export type NavigationBarVariant = 'vertical' | 'horizontal';

export interface NavigationBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Layout of each item (icon+label stacked vs inline). */
  variant?: NavigationBarVariant;
  /** Controlled active index. */
  activeIndex?: number;
  /** Uncontrolled initial active index. */
  defaultActiveIndex?: number;
  /** Hide labels for inactive items. */
  hideInactiveLabels?: boolean;
  /** Fires when the active item changes. */
  onActivated?: (event: CustomEvent<{activeIndex: number}>) => void;
}

export const NavigationBar = React.forwardRef<HTMLDivElement, NavigationBarProps>(
  function NavigationBar(
    {
      variant = 'vertical',
      activeIndex: activeIndexProp,
      defaultActiveIndex = 0,
      hideInactiveLabels = false,
      onActivated,
      className,
      children,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const isControlled = activeIndexProp !== undefined;
    const [uncontrolledIndex, setUncontrolledIndex] = React.useState(defaultActiveIndex);
    const activeIndex = isControlled ? activeIndexProp : uncontrolledIndex;

    const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

    const items = React.Children.toArray(children).filter(React.isValidElement);

    const setActiveIndex = React.useCallback(
      (nextIndex: number) => {
        if (nextIndex < 0 || nextIndex >= items.length) return;
        if (!isControlled) setUncontrolledIndex(nextIndex);
        const ev = new CustomEvent('navigation-bar-activated', {
          detail: {activeIndex: nextIndex},
        });
        onActivated?.(ev);
      },
      [isControlled, items.length, onActivated],
    );

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(ev);
      if (ev.defaultPrevented) return;

      const keys = new Set([
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'Enter',
        ' ',
      ]);
      if (!keys.has(ev.key)) return;

      const focusIndex = itemRefs.current.findIndex((el) => el && el.matches(':focus'));
      const max = items.length - 1;
      const isHorizontal = variant === 'horizontal';

      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

      if (ev.key === 'Home') {
        itemRefs.current[0]?.focus();
        ev.preventDefault();
        return;
      }

      if (ev.key === 'End') {
        itemRefs.current[max]?.focus();
        ev.preventDefault();
        return;
      }

      if (ev.key === 'Enter' || ev.key === ' ') {
        if (focusIndex >= 0) setActiveIndex(focusIndex);
        ev.preventDefault();
        return;
      }

      if (ev.key === nextKey) {
        const next = focusIndex === -1 ? 0 : (focusIndex + 1) % (max + 1);
        itemRefs.current[next]?.focus();
        ev.preventDefault();
        return;
      }

      if (ev.key === prevKey) {
        const prev =
          focusIndex === -1 ? max : (focusIndex - 1 + (max + 1)) % (max + 1);
        itemRefs.current[prev]?.focus();
        ev.preventDefault();
        return;
      }
    };

    return (
      <div
        {...rest}
        ref={ref}
        className={['mer-nav-reset', 'mer-nav-bar', className].filter(Boolean).join(' ')}
        role="tablist"
        onKeyDown={handleKeyDown}
      >
        <div className="mer-nav-bar__items">
          {items.map((child, index) => {
            const element = child as React.ReactElement<NavigationBarItemProps>;
            return React.cloneElement(element, {
              index,
              variant,
              active: index === activeIndex,
              hideInactiveLabel: hideInactiveLabels,
              onSelect: () => {
                setActiveIndex(index);
              },
              itemRef: (el: HTMLButtonElement | null) => {
                itemRefs.current[index] = el;
                const originalRef = (element.props as any).itemRef;
                if (typeof originalRef === 'function') originalRef(el);
              },
            });
          })}
        </div>
      </div>
    );
  },
);
