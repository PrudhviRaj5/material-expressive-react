import * as React from 'react';

import type {ButtonSize} from '../button/buttonSizes';
import {Icon} from '../icon';

import {OutlinedSegmentedButton, type OutlinedSegmentedButtonProps} from './OutlinedSegmentedButton';

export type OutlinedSegmentedButtonSelectType = 'single' | 'multi';

export interface OutlinedSegmentedButtonSetProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'children' | 'onClick' | 'onChange'
  > {
  children?: React.ReactNode;

  size?: ButtonSize;
  selectType?: OutlinedSegmentedButtonSelectType;
  selectedIcon?: React.ReactNode | string;

  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  onClick?: (value: string, selected: boolean) => void;
}

function sizeStyles(size: ButtonSize) {
  switch (size) {
    case 'xsmall':
      return {h: 32, px: 16, icon: 18, fs: 14, lh: '18px', min: 92};
    case 'small':
      return {h: 36, px: 18, icon: 20, fs: 15, lh: '20px', min: 104};
    case 'large':
      return {h: 52, px: 26, icon: 26, fs: 18, lh: '22px', min: 140};
    case 'xlarge':
      return {h: 60, px: 30, icon: 30, fs: 20, lh: '24px', min: 168};
    case 'medium':
    default:
      return {h: 44, px: 22, icon: 24, fs: 16, lh: '20px', min: 128};
  }
}

function renderIcon(icon: React.ReactNode | string | undefined, size: number) {
  if (!icon) return null;
  const style = {fontSize: size, width: size, height: size} as const;
  if (typeof icon === 'string') return <Icon style={style}>{icon}</Icon>;
  if (React.isValidElement(icon)) {
    const props = (icon.props ?? {}) as Record<string, unknown>;
    const nextStyle = {...style, ...(props.style as Record<string, unknown>)};
    return React.cloneElement(icon as React.ReactElement, {style: nextStyle});
  }
  return icon;
}

function getChildProps(node: React.ReactNode): OutlinedSegmentedButtonProps | null {
  if (!React.isValidElement(node)) return null;
  // Prefer referential identity (works in prod/minified builds).
  if (node.type === OutlinedSegmentedButton) return node.props as OutlinedSegmentedButtonProps;

  const type = node.type as any;
  // Fallback for cases where React wraps the type.
  const name = type?.displayName ?? type?.name;
  if (name !== 'OutlinedSegmentedButton') return null;
  return node.props as OutlinedSegmentedButtonProps;
}

export function OutlinedSegmentedButtonSet({
  children,
  size = 'medium',
  selectType = 'single',
  selectedIcon = 'check',
  value,
  defaultValue,
  onChange,
  onClick,
  style,
  ...rest
}: OutlinedSegmentedButtonSetProps) {
  const items = React.Children.toArray(children)
    .map(getChildProps)
    .filter(Boolean) as OutlinedSegmentedButtonProps[];

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (selectType === 'multi') return [] as string[];
    return items[0]?.value ?? '';
  });

  const current = isControlled ? value : uncontrolled;
  const s = sizeStyles(size);

  const asArray = (v: string | string[] | undefined | null): string[] =>
    Array.isArray(v) ? v : v ? [v] : [];

  const currentArray = asArray(current);
  const isSelected = (itemValue: string) => {
    if (selectType === 'multi') return currentArray.includes(itemValue);
    // Be tolerant if consumers accidentally pass `string[]` while in single mode.
    const currentSingle = Array.isArray(current) ? (current[0] ?? '') : (current ?? '');
    return String(currentSingle) === itemValue;
  };

  const setValue = (next: string | string[]) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  const groupStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'stretch',
    borderRadius: 999,
    overflow: 'hidden',
    border: '1px solid var(--md-sys-color-outline)',
    background: 'var(--md-sys-color-surface)',
    ...(style ?? {}),
  };

  const dividerStyle: React.CSSProperties = {
    width: 1,
    background: 'var(--md-sys-color-outline)',
    opacity: 0.85,
  };

  const buttonBase: React.CSSProperties = {
    appearance: 'none',
    border: 'none',
    background: 'transparent',
    color: 'var(--md-sys-color-on-surface)',
    font: 'inherit',
    fontWeight: 650,
    letterSpacing: '0.2px',
    height: s.h,
    paddingInline: s.px,
    minWidth: s.min,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'background-color 120ms ease, color 120ms ease',
    fontSize: s.fs,
    lineHeight: s.lh,
  };

  return (
    <div {...rest} role="group" style={groupStyle}>
      {items.map((item, i) => {
        const selected = isSelected(item.value);
        const icon = selected ? selectedIcon : item.icon;
        const hasLabel = Boolean(item.label);
        const hasIcon = Boolean(icon);
        const contentIcon = hasIcon ? renderIcon(icon, s.icon) : null;
        const contentLabel = hasLabel ? <span>{item.label}</span> : null;

        return (
          <React.Fragment key={item.value}>
            <button
              type="button"
              aria-pressed={selected}
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled) return;
                let next: string | string[];

                if (selectType === 'multi') {
                  const arr = currentArray;
                  next = selected
                    ? arr.filter((v) => v !== item.value)
                    : [...arr, item.value];
                } else {
                  next = item.value;
                }

                setValue(next);
                onClick?.(item.value, !selected);
              }}
              style={{
                ...buttonBase,
                ...(selected
                  ? {
                      background: 'var(--md-sys-color-secondary-container)',
                      color: 'var(--md-sys-color-on-secondary-container)',
                    }
                  : null),
                ...(!hasLabel && hasIcon
                  ? {minWidth: s.h, paddingInline: 0}
                  : null),
              }}
            >
              {contentIcon}
              {contentLabel}
            </button>
            {i < items.length - 1 ? <div style={dividerStyle} /> : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}
