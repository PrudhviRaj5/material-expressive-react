import * as React from 'react';

import {Button, type ButtonStyle, type ButtonVariant} from './Button';
import type {ButtonSize} from './buttonSizes';
import {Icon} from '../icon';
import {Menu, MenuItem} from '../menu';
import {Ripple} from '../ripple';

export interface SplitButtonOption {
  label: string;
  icon?: React.ReactNode | string;
  value: string;
}

export interface SplitButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'onSelect'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;

  primaryLabel: React.ReactNode;
  primaryIcon?: React.ReactNode | string;
  onPrimaryClick?: (event: React.MouseEvent) => void;

  options: SplitButtonOption[];
  onSelect?: (value: string) => void;

  arrowAriaLabel?: string;
  menuAriaLabel?: string;
}

function renderStartIcon(icon: React.ReactNode): React.ReactNode {
  if (!icon) return null;
  if (typeof icon === 'string') return <Icon slot="start">{icon}</Icon>;
  if (React.isValidElement(icon)) {
    const props = (icon.props ?? {}) as Record<string, unknown>;
    if (props.slot) return icon;
    return React.cloneElement(icon as React.ReactElement, {slot: 'start'});
  }
  return <span slot="start">{icon}</span>;
}

function renderPrimaryIcon(icon: React.ReactNode | string | undefined): React.ReactNode {
  if (!icon) return null;
  if (typeof icon === 'string') return <Icon slot="icon">{icon}</Icon>;
  return icon;
}

function getTokenPrefix(variant: ButtonVariant) {
  return variant === 'outlined'
    ? 'outlined-button'
    : variant === 'filledTonal' || variant === 'tonal'
      ? 'filled-tonal-button'
    : variant === 'text'
      ? 'text-button'
    : variant === 'elevated'
      ? 'elevated-button'
      : 'filled-button';
}

function resolveButtonStyle(variant: ButtonVariant): ButtonStyle {
  if (variant === 'filledTonal') return 'tonal';
  return (variant as ButtonStyle) || 'filled';
}

function getExpandPalette(style: ButtonStyle) {
  const shadowColor =
    'color-mix(in srgb, var(--md-sys-color-on-surface) 18%, transparent)';
  const elevatedShadow = `0 2px 6px ${shadowColor}, 0 1px 2px ${shadowColor}`;

  switch (style) {
    case 'filled':
      return {
        background: 'var(--md-sys-color-primary)',
        color: 'var(--md-sys-color-on-primary)',
        border: '1px solid transparent',
        boxShadow: undefined as string | undefined,
        dividerInk: 'var(--md-sys-color-on-primary)',
      };
    case 'tonal':
      return {
        background: 'var(--md-sys-color-secondary-container)',
        color: 'var(--md-sys-color-on-secondary-container)',
        border: '1px solid transparent',
        boxShadow: undefined as string | undefined,
        dividerInk: 'var(--md-sys-color-on-secondary-container)',
      };
    case 'outlined':
      return {
        background: 'var(--md-sys-color-surface)',
        color: 'var(--md-sys-color-on-surface)',
        border: '1px solid var(--md-sys-color-outline)',
        boxShadow: undefined as string | undefined,
        dividerInk: 'var(--md-sys-color-on-surface)',
      };
    case 'text':
      return {
        background: 'transparent',
        color: 'var(--md-sys-color-primary)',
        border: '1px solid transparent',
        boxShadow: undefined as string | undefined,
        dividerInk: 'var(--md-sys-color-on-surface)',
      };
    case 'elevated':
    default:
      return {
        background: 'var(--md-sys-color-surface)',
        color: 'var(--md-sys-color-on-surface)',
        border:
          '1px solid color-mix(in srgb, var(--md-sys-color-outline) 40%, transparent)',
        boxShadow: elevatedShadow,
        dividerInk: 'var(--md-sys-color-on-surface)',
      };
  }
}

function getPillShapeVars(variant: ButtonVariant): React.CSSProperties {
  const prefix = getTokenPrefix(variant);
  return {
    [`--md-${prefix}-container-shape` as any]: '999px',
  };
}

function getSegmentShapeVars(
  variant: ButtonVariant,
  segment: 'primary' | 'arrow',
): React.CSSProperties {
  const prefix = getTokenPrefix(variant);
  const full = '999px';
  const flat = '0px';

  // primary: rounded left, flat right
  if (segment === 'primary') {
    return {
      [`--md-${prefix}-container-shape-start-start` as any]: full,
      [`--md-${prefix}-container-shape-end-start` as any]: full,
      [`--md-${prefix}-container-shape-start-end` as any]: flat,
      [`--md-${prefix}-container-shape-end-end` as any]: flat,
    };
  }

  // arrow: flat left, rounded right
  return {
    [`--md-${prefix}-container-shape-start-start` as any]: flat,
    [`--md-${prefix}-container-shape-end-start` as any]: flat,
    [`--md-${prefix}-container-shape-start-end` as any]: full,
    [`--md-${prefix}-container-shape-end-end` as any]: full,
  };
}

function getButtonDiameter(size: ButtonSize) {
  // Matches Material button container heights.
  if (size === 'xsmall') return 28;
  if (size === 'small') return 32;
  if (size === 'large') return 48;
  if (size === 'xlarge') return 56;
  return 40; // medium
}

export function SplitButton({
  variant = 'filled',
  size = 'medium',
  disabled,
  primaryLabel,
  primaryIcon,
  onPrimaryClick,
  options,
  onSelect,
  arrowAriaLabel = 'Open options',
  menuAriaLabel = 'Split button options',
  style,
  className,
  ...rest
}: SplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [expandButtonEl, setExpandButtonEl] = React.useState<HTMLButtonElement | null>(null);
  // React's useId() includes characters like ':' which break querySelector `#id`.
  // md-menu resolves `anchor` via a selector, so keep this CSS-selector-safe.
  const reactId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const expandButtonId = `split-button-expand-${reactId}`;

  React.useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 0,
    position: 'relative',
    ...((style as React.CSSProperties) ?? {}),
  };

  // Keep the primary button styling stable when the menu toggles.
  const primaryButtonStyle = {
    ...getPillShapeVars(variant),
    ...getSegmentShapeVars(variant, 'primary'),
  };

  const diameter = getButtonDiameter(size);
  const expandStyle = resolveButtonStyle(variant);
  const palette = getExpandPalette(expandStyle);
  const expandShellStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    boxSizing: 'border-box',
    height: diameter,
    width: diameter,
    minWidth: diameter,
    maxWidth: diameter,
    background: palette.background,
    color: palette.color,
    border: palette.border,
    // Avoid a double border between primary + expand when closed.
    borderLeft: open ? palette.border : '0',
    boxShadow: palette.boxShadow,
    overflow: 'hidden',
    borderTopLeftRadius: open ? 999 : 0,
    borderBottomLeftRadius: open ? 999 : 0,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    transition:
      'width 200ms cubic-bezier(0.2, 0.0, 0, 1), min-width 200ms cubic-bezier(0.2, 0.0, 0, 1), max-width 200ms cubic-bezier(0.2, 0.0, 0, 1)',
  };

  const expandButtonStyle: React.CSSProperties = {
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 0,
    margin: 0,
    border: 0,
    borderRadius: 'inherit',
    background: 'transparent',
    color: 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outlineOffset: 2,
  };

  const shellStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'stretch',
    borderRadius: open ? 0 : 999,
    overflow: open ? 'visible' : 'hidden',
    gap: open ? 2 : 0,
    transition: 'gap 180ms cubic-bezier(0.2, 0.0, 0, 1)',
  };

  const dividerStyle: React.CSSProperties = {
    width: 2
  };

  const arrowIconStyle: React.CSSProperties = {
    transition: 'transform 160ms cubic-bezier(0.2, 0.0, 0, 1)',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const close = () => setOpen(false);

  return (
    <div {...rest} className={className} style={containerStyle}>
      <div style={shellStyle}>
        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          onClick={onPrimaryClick}
          style={primaryButtonStyle}
        >
          {renderPrimaryIcon(primaryIcon)}
          {primaryLabel}
        </Button>

        {!open && <div aria-hidden style={dividerStyle} />}

        <div style={expandShellStyle}>
          <Ripple disabled={disabled} control={expandButtonEl} />
          <button
            type="button"
            disabled={disabled}
            aria-label={arrowAriaLabel}
            aria-expanded={open}
            onClick={(ev) => {
              // Prevent md-menu from treating the opener click as an outside click.
              ev.preventDefault();
              ev.stopPropagation();
              setOpen((v) => !v);
            }}
            id={expandButtonId}
            ref={setExpandButtonEl}
            style={expandButtonStyle}
          >
            <Icon style={arrowIconStyle}>expand_more</Icon>
          </button>
        </div>
      </div>

      <Menu
        open={open}
        quick
        anchor={expandButtonId}
        positioning="absolute"
        anchorCorner="end-end"
        menuCorner="start-end"
        stayOpenOnOutsideClick={false}
        stayOpenOnFocusout={false}
        skipRestoreFocus
        aria-label={menuAriaLabel}
        onCloseMenu={() => close()}
        onClosed={() => close()}
        style={{minWidth: 220}}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            onClick={() => {
              onSelect?.(opt.value);
              close();
            }}
          >
            {renderStartIcon(opt.icon)}
            <div slot="headline">{opt.label}</div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
