import * as React from 'react';

import {Button, type ButtonVariant} from './Button';
import type {ButtonSize} from './buttonSizes';
import {Icon} from '../icon';
import {Menu, MenuItem} from '../menu';

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
    : variant === 'filledTonal'
      ? 'filled-tonal-button'
      : variant === 'text'
        ? 'text-button'
        : variant === 'elevated'
          ? 'elevated-button'
          : 'filled-button';
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

function getArrowCircleVars(variant: ButtonVariant): React.CSSProperties {
  const prefix = getTokenPrefix(variant);
  return {
    [`--md-${prefix}-leading-space` as any]: '0px',
    [`--md-${prefix}-trailing-space` as any]: '0px',
    [`--md-${prefix}-with-leading-icon-leading-space` as any]: '0px',
    [`--md-${prefix}-with-leading-icon-trailing-space` as any]: '0px',
    [`--md-${prefix}-container-shape` as any]: '999px',
  };
}

function getArrowSpacingVars(variant: ButtonVariant, size: ButtonSize): React.CSSProperties {
  const prefix = getTokenPrefix(variant);

  const space =
    size === 'xsmall'
      ? '8px'
      : size === 'small'
        ? '10px'
        : size === 'large'
          ? '14px'
          : size === 'xlarge'
            ? '16px'
            : '12px';

  return {
    [`--md-${prefix}-leading-space` as any]: space,
    [`--md-${prefix}-trailing-space` as any]: space,
    [`--md-${prefix}-with-leading-icon-leading-space` as any]: space,
    [`--md-${prefix}-with-leading-icon-trailing-space` as any]: space,
  };
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
  // React's useId() includes characters like ':' which break querySelector `#id`.
  // md-menu resolves `anchor` via a selector, so keep this CSS-selector-safe.
  const reactId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '_');
  const arrowId = `split-button-arrow-${reactId}`;

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

  const leftStyle = {
    ...getPillShapeVars(variant),
    ...getSegmentShapeVars(variant, 'primary'),
  };
  const diameter = getButtonDiameter(size);
  const prefix = getTokenPrefix(variant);
  const arrowStyle = {
    ...getArrowCircleVars(variant),
    // Force the button's internal container height to match our circle.
    [`--md-${prefix}-container-height` as any]: `${diameter}px`,
    ...getSegmentShapeVars(variant, 'arrow'),
    minWidth: diameter,
    width: diameter,
    maxWidth: diameter,
    paddingInline: 0,
  } as React.CSSProperties;

  const shellStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'stretch',
    borderRadius: 999,
    overflow: 'hidden',
  };

  const dividerInk =
    variant === 'filled'
      ? 'var(--md-sys-color-on-primary)'
      : variant === 'filledTonal'
        ? 'var(--md-sys-color-on-secondary-container)'
        : 'var(--md-sys-color-on-surface)';

  const dividerStyle: React.CSSProperties = {
    width: 2,
    // dotted divider like the gif
    backgroundImage:
      'repeating-linear-gradient(to bottom, color-mix(in srgb, var(--_split-divider-ink) 80%, transparent) 0 2px, transparent 2px 6px)',
    ['--_split-divider-ink' as any]: dividerInk,
    opacity: open ? 0.9 : 0.7,
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
          style={leftStyle}
        >
          {renderPrimaryIcon(primaryIcon)}
          {primaryLabel}
        </Button>

        <div aria-hidden style={dividerStyle} />

        <Button
          variant={variant}
          size={size}
          disabled={disabled}
          aria-label={arrowAriaLabel}
          aria-expanded={open}
          onClick={(ev) => {
            // Prevent md-menu from treating the opener click as an outside click.
            ev.preventDefault();
            ev.stopPropagation();
            setOpen((v) => !v);
          }}
          id={arrowId}
          style={arrowStyle}
        >
          <Icon slot="icon" style={arrowIconStyle}>
            expand_more
          </Icon>
        </Button>
      </div>

      <Menu
        open={open}
        quick
        anchor={arrowId}
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
