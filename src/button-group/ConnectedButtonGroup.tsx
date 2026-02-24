import * as React from 'react';

import type {ButtonSize} from '../button/buttonSizes';
import {Icon} from '../icon';

import type {ConnectedButtonProps} from './ConnectedButton';

export type ConnectedButtonGroupVariant = 'standard' | 'connected';
export type ConnectedButtonGroupSelectType = 'single' | 'multi';
export type ConnectedButtonGroupType = 'round' | 'square';
export type ConnectedButtonGroupWidth = 'narrow' | 'default' | 'wide';
export type ConnectedButtonGroupStyle =
  | 'filled'
  | 'tonal'
  | 'outlined'
  | 'elevated';

export interface ConnectedButtonGroupProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    // Omit conflicting DOM event handler names / attributes that we redefine with custom signatures.
    'children' | 'onClick' | 'onChange' | 'style'
  > {
  children?: React.ReactNode;

  variant?: ConnectedButtonGroupVariant;
  size?: ButtonSize;
  selectType?: ConnectedButtonGroupSelectType;
  type?: ConnectedButtonGroupType;
  width?: ConnectedButtonGroupWidth;
  style?: ConnectedButtonGroupStyle;

  /** Inline styles for the wrapper element. */
  containerStyle?: React.CSSProperties;

  selectedIcon?: React.ReactNode | string;

  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;

  onClick?: (value: string, selected: boolean) => void;
}

function sizeConfig(size: ButtonSize) {
  switch (size) {
    case 'xsmall':
      return {h: 28, fs: 12, lh: '16px', icon: 16, px: 14, gap: 2};
    case 'small':
      return {h: 32, fs: 13, lh: '18px', icon: 18, px: 16, gap: 4};
    case 'large':
      return {h: 56, fs: 20, lh: '24px', icon: 26, px: 28, gap: 8};
    case 'xlarge':
      return {h: 72, fs: 24, lh: '28px', icon: 30, px: 34, gap: 10};
    case 'medium':
    default:
      return {h: 44, fs: 16, lh: '20px', icon: 22, px: 22, gap: 12};
  }
}

function widthConfig(width: ConnectedButtonGroupWidth) {
  switch (width) {
    case 'narrow':
      return {pxScale: 0.7, minScale: 0.8};
    case 'wide':
      return {pxScale: 1.25, minScale: 1.25};
    case 'default':
    default:
      return {pxScale: 1, minScale: 1};
  }
}

function groupRadius(type: ConnectedButtonGroupType) {
  return type === 'square'
    ? 'var(--md-sys-shape-corner-large, 16px)'
    : 'var(--md-sys-shape-corner-full, 9999px)';
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

function stylePalette(style: ConnectedButtonGroupStyle, selected: boolean) {
  const shadow =
    '0 2px 6px color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent), 0 1px 2px color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent)';

  if (style === 'filled') {
    return selected
      ? {
          bg: 'var(--md-sys-color-primary)',
          fg: 'var(--md-sys-color-on-primary)',
          border: 'transparent',
          shadow: undefined,
        }
      : {
          bg: 'var(--md-sys-color-primary-container)',
          fg: 'var(--md-sys-color-on-primary-container)',
          border: 'transparent',
          shadow: undefined,
        };
  }

  if (style === 'tonal') {
    return selected
      ? {
          bg: 'var(--md-sys-color-secondary)',
          fg: 'var(--md-sys-color-on-secondary)',
          border: 'transparent',
          shadow: undefined,
        }
      : {
          bg: 'var(--md-sys-color-secondary-container)',
          fg: 'var(--md-sys-color-on-secondary-container)',
          border: 'transparent',
          shadow: undefined,
        };
  }

  if (style === 'outlined') {
    return selected
      ? {
          bg: 'var(--md-sys-color-secondary-container)',
          fg: 'var(--md-sys-color-on-secondary-container)',
          border: 'var(--md-sys-color-outline)',
          shadow: undefined,
        }
      : {
          bg: 'var(--md-sys-color-surface)',
          fg: 'var(--md-sys-color-on-surface)',
          border: 'var(--md-sys-color-outline)',
          shadow: undefined,
        };
  }

  // elevated
  return selected
    ? {
        bg: 'var(--md-sys-color-primary)',
        fg: 'var(--md-sys-color-on-primary)',
        border: 'transparent',
        shadow,
      }
    : {
        bg: 'var(--md-sys-color-surface)',
        fg: 'var(--md-sys-color-on-surface)',
        border: 'color-mix(in srgb, var(--md-sys-color-outline) 40%, transparent)',
        shadow,
      };
}

function getChildProps(node: React.ReactNode): ConnectedButtonProps | null {
  if (!React.isValidElement(node)) return null;
  const t: any = node.type;
  const name = t?.name ?? t?.displayName;
  if (name !== 'ConnectedButton') return null;
  return node.props as ConnectedButtonProps;
}

export function ConnectedButtonGroup({
  children,
  variant = 'standard',
  size = 'medium',
  selectType = 'single',
  type = 'round',
  width = 'default',
  style = 'tonal',
  selectedIcon = 'check',
  value,
  defaultValue,
  onChange,
  onClick,
  containerStyle,
  ...rest
}: ConnectedButtonGroupProps) {
  const items = React.Children.toArray(children)
    .map(getChildProps)
    .filter(Boolean) as ConnectedButtonProps[];

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(() => {
    if (defaultValue !== undefined) return defaultValue;
    if (selectType === 'multi') return [] as string[];
    return items[0]?.value ?? '';
  });

  const current = isControlled ? value : uncontrolled;
  const s = sizeConfig(size);
  const w = widthConfig(width);
  const radius = groupRadius(type);

  // const gap = variant === 'standard' ? Math.round(10 + (s.h - 44) / 10) : 0;
  const gap = variant === 'standard' ? 2 : 0;

  const asArray = (v: string | string[]) => (Array.isArray(v) ? v : [v]);
  const currentArray = () => (Array.isArray(current) ? current : current ? [current] : []);
  const currentSingle = () => (Array.isArray(current) ? current[0] ?? '' : current ?? '');
  const selected = (val: string) => {
    if (selectType === 'multi') return currentArray().includes(val);
    return currentSingle() === val;
  };

  const setValue = (next: string | string[]) => {
    if (!isControlled) setUncontrolled(next);
    onChange?.(next);
  };

  const groupStyle: React.CSSProperties = {
    display: 'inline-block',
    ...(containerStyle ?? {}),
  };

  const connectedShell: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'stretch',
    gap,
    ...(variant === 'connected'
      ? {
          gap: 2,
          borderRadius: radius,
          overflow: 'hidden',
          border:
            style === 'outlined'
              ? '1px solid var(--md-sys-color-outline)'
              : '1px solid transparent',
        }
      : null),
  };

  const dividerStyle: React.CSSProperties = {
    width: 1,
    background: 'var(--md-sys-color-outline-variant, var(--md-sys-color-outline))',
    opacity: 0.9,
  };

  const buttonBase: React.CSSProperties = {
    appearance: 'none',
    border: variant === 'connected' ? 'none' : '1px solid transparent',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    fontWeight: 650,
    letterSpacing: '0.2px',
    height: s.h,
    paddingInline: Math.round(s.px * w.pxScale),
    minWidth: Math.round((s.h * 2.8) * w.minScale),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    cursor: 'pointer',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'background-color 120ms ease, color 120ms ease, box-shadow 120ms ease',
    fontSize: s.fs,
    lineHeight: s.lh,
    borderRadius: variant === 'standard' ? radius : 0,
  };

  return (
    <div {...rest} role="group" style={groupStyle}>
      <div style={connectedShell}>
        {items.map((item, i) => {
          const isSel = selected(item.value);
          const pal = stylePalette(style, isSel);
          const icon = isSel ? selectedIcon : item.icon;
          const hasLabel = Boolean(item.label);
          const hasIcon = Boolean(icon);

          const isIconOnly = hasIcon && !hasLabel;
          const innerRadius =
            variant === 'connected'
              ? {
                  borderTopLeftRadius: i === 0 ? radius : 0,
                  borderBottomLeftRadius: i === 0 ? radius : 0,
                  borderTopRightRadius: i === items.length - 1 ? radius : 0,
                  borderBottomRightRadius: i === items.length - 1 ? radius : 0,
                }
              : null;

          return (
            <React.Fragment key={item.value}>
              <button
                type="button"
                aria-pressed={isSel}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  let next: string | string[];
                  if (selectType === 'multi') {
                    const arr = currentArray();
                    next = isSel
                      ? arr.filter((v) => v !== item.value)
                      : [...arr, item.value];
                  } else {
                    next = item.value;
                  }
                  setValue(next);
                  onClick?.(item.value, !isSel);
                }}
                style={{
                  ...buttonBase,
                  ...(isIconOnly
                    ? {
                        minWidth: s.h,
                        width: Math.round(s.h * (width === 'narrow' ? 1 : width === 'wide' ? 1.6 : 1.25)),
                        paddingInline: 0,
                      }
                    : null),
                  background: pal.bg,
                  color: pal.fg,
                  ...(variant === 'connected'
                    ? null
                    : {
                        borderColor: pal.border,
                      }),
                  boxShadow: pal.shadow,
                  ...(innerRadius ?? {}),
                }}
              >
                {renderIcon(icon, s.icon)}
                {hasLabel ? <span>{item.label}</span> : null}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
