import * as React from 'react';

import './menu-supporting.css';

import {MenuContext, type MenuSelectType} from './menu-context';
import {MenuSurface, type MenuVariant} from './MenuSurface';

export interface MenuProps extends Omit<React.ComponentProps<typeof MenuSurface>, 'children'> {
  variant?: MenuVariant;
  selectType?: MenuSelectType;

  /** Controlled selection. */
  value?: string | string[];
  /** Uncontrolled selection. */
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  gap?: number | string;
  groupGap?: number | string;

  children: React.ReactNode;
}

export interface MenuGroupGapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between groups */
  groupGap?: number | string;
}

function toSet(v: string | string[] | undefined, selectType: MenuSelectType): Set<string> {
  if (selectType === 'multi') {
    const arr = Array.isArray(v) ? v : v ? [v] : [];
    return new Set(arr);
  }
  const one = Array.isArray(v) ? v[0] : v;
  return new Set(one ? [one] : []);
}

function fromSet(s: Set<string>, selectType: MenuSelectType): string | string[] {
  const arr = Array.from(s);
  return selectType === 'multi' ? arr : arr[0] ?? '';
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  {
    variant = 'standard',
    selectType = 'single',
    value,
    defaultValue,
    onValueChange,
    gap,
    groupGap,
    context,
    style,
    children,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const prevSelectTypeRef = React.useRef<MenuSelectType>(selectType);
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    toSet(defaultValue as any, selectType),
  );
  const selected = isControlled ? toSet(value as any, selectType) : uncontrolled;

  React.useEffect(() => {
    const prevType = prevSelectTypeRef.current;
    if (prevType === selectType) return;
    prevSelectTypeRef.current = selectType;
    if (isControlled) return;

    // Convert the existing uncontrolled selection to the new selectType.
    setUncontrolled((prev) => toSet(fromSet(prev, prevType), selectType));
  }, [isControlled, selectType]);

  const toggleValue = React.useCallback(
    (v: string) => {
      const next = new Set(selected);
      if (selectType === 'multi') {
        if (next.has(v)) next.delete(v);
        else next.add(v);
      } else {
        next.clear();
        next.add(v);
      }

      if (!isControlled) setUncontrolled(next);
      onValueChange?.(fromSet(next, selectType));
    },
    [isControlled, onValueChange, selectType, selected],
  );

  const ctx = React.useMemo(
    () => ({variant, selectType, selected, toggleValue}),
    [variant, selectType, selected, toggleValue],
  );

  const content = (
    <MenuContext.Provider value={ctx}>
      <MenuSurface
        {...rest}
        ref={ref}
        variant={variant}
        context={context}
        gap={gap}
        style={{
          ...(style ?? {}),
        }}
      >
        {children}
      </MenuSurface>
    </MenuContext.Provider>
  );

  return content;
});

export function MenuDivider() {
  return <div className="mer-menu-divider" role="separator" aria-hidden="true" />;
}

export const MenuGroupGap = React.forwardRef<HTMLDivElement, MenuGroupGapProps>(function MenuGap(
  {groupGap, className, style, ...rest},
  ref,
) {
  const resolvedGroupGap = groupGap ?? 10;
  const gapValue = typeof resolvedGroupGap === 'number' ? `${resolvedGroupGap}px` : resolvedGroupGap;

  return (
    <div
      {...rest}
      ref={ref}
      className={["mer-menu-gap", className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={{
        ...(style ?? {}),
        ...(gapValue ? ({['--mer-menu-group-gap' as any]: gapValue} as React.CSSProperties) : null),
      }}
    />
  );
});
