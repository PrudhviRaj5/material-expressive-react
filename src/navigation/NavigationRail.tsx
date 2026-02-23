import * as React from 'react';

import './navigation.css';

import type {NavigationRailItemProps} from './NavigationRailItem';

export interface NavigationRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;

  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onValueReselect?: (value: string) => void;

  header?: React.ReactNode;
}

export const NavigationRail = React.forwardRef<HTMLElement, NavigationRailProps>(
  function NavigationRail(
    {
      expanded: expandedProp,
      defaultExpanded = false,
      onExpandedChange,
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
    const isExpandedControlled = expandedProp !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded);
    const expanded = isExpandedControlled ? expandedProp : uncontrolledExpanded;

    const isValueControlled = valueProp !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(
      defaultValue,
    );
    const value = isValueControlled ? valueProp : uncontrolledValue;

    const items = React.Children.toArray(children).filter(React.isValidElement);

    const setExpanded = React.useCallback(
      (next: boolean) => {
        if (!isExpandedControlled) setUncontrolledExpanded(next);
        onExpandedChange?.(next);
      },
      [isExpandedControlled, onExpandedChange],
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

    return (
      <aside
        {...rest}
        ref={ref as React.Ref<HTMLElement>}
        className={[
          'mer-nav-reset',
          'mer-nav-rail',
          expanded ? 'mer-nav-rail--expanded' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {header ? (
          <div className="mer-nav-rail__header">
            {header}
          </div>
        ) : null}

        <nav
          className="mer-nav-rail__items"
          aria-label={(rest as any)['aria-label'] ?? 'Navigation'}
        >
          {items.map((child) => {
            const el = child as React.ReactElement<NavigationRailItemProps>;
            const itemValue = (el.props as any).value as string | undefined;
            const selected = itemValue !== undefined && value !== undefined && itemValue === value;
            return React.cloneElement(el, {
              expanded,
              selected,
              onSelect: itemValue ? () => setValue(itemValue) : undefined,
            });
          })}
        </nav>
      </aside>
    );
  },
);
