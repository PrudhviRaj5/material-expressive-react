import * as React from 'react';
import {forwardRef} from 'react';

import type {ButtonSize} from './buttonSizes';
import {Icon} from '../icon';

export type ToggleButtonState =
  | 'enabled'
  | 'hovered'
  | 'focused'
  | 'pressed'
  | 'disabled';

export type ToggleButtonVariant = 'default' | 'tonal' | 'outline' | 'elevated';

export type ToggleButtonShape = 'round' | 'square';

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  variant?: ToggleButtonVariant;
  /** Visual shape at rest. */
  shape?: ToggleButtonShape;
  /**
   * Forces a visual state (useful for Storybook).
   * If omitted, the component uses normal browser interactions.
   */
  state?: ToggleButtonState;
  size?: ButtonSize;

  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;

  disabled?: boolean;
}

function sizeStyles(size: ButtonSize) {
  switch (size) {
    case 'xsmall':
      return {h: 32, px: 18, fs: 14, lh: '18px'};
    case 'small':
      return {h: 36, px: 20, fs: 15, lh: '20px'};
    case 'large':
      return {h: 52, px: 30, fs: 18, lh: '22px'};
    case 'xlarge':
      return {h: 60, px: 34, fs: 20, lh: '24px'};
    case 'medium':
    default:
      return {h: 44, px: 26, fs: 16, lh: '20px'};
  }
}

function getVariantStyle(variant: ToggleButtonVariant, isSelected: boolean) {
  const shadowColor = 'color-mix(in srgb, var(--md-sys-color-on-surface) 26%, transparent)';
  const elevatedShadow = `0 2px 6px ${shadowColor}, 0 1px 2px ${shadowColor}`;

  const selected = {
    background: 'var(--md-sys-color-primary)',
    color: 'var(--md-sys-color-on-primary)',
    borderColor: 'transparent',
    boxShadow: undefined as string | undefined,
  };

  switch (variant) {
    case 'tonal':
      return isSelected
        ? {
            background: 'var(--md-sys-color-secondary)',
            color: 'var(--md-sys-color-on-secondary)',
            borderColor: 'transparent',
            boxShadow: undefined,
          }
        : {
            background: 'var(--md-sys-color-secondary-container)',
            color: 'var(--md-sys-color-on-secondary-container)',
            borderColor: 'transparent',
            boxShadow: undefined,
          };
    case 'outline':
      return isSelected
        ? {
            ...selected,
            borderColor: 'var(--md-sys-color-primary)',
          }
        : {
            background: 'transparent',
            color: 'var(--md-sys-color-on-surface)',
            borderColor: 'var(--md-sys-color-outline)',
            boxShadow: undefined,
          };
    case 'elevated': {
      return isSelected
        ? {
            ...selected,
            boxShadow: elevatedShadow,
          }
        : {
            background: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            borderColor: 'color-mix(in srgb, var(--md-sys-color-outline) 45%, transparent)',
            boxShadow: elevatedShadow,
          };
    }
    case 'default':
    default:
      return isSelected
        ? selected
        : {
            // Matches Material Web filled-toggle look: light container when unselected.
            background: 'var(--md-sys-color-primary-container)',
            color: 'var(--md-sys-color-on-primary-container)',
            borderColor: 'transparent',
            boxShadow: undefined,
          };
  }
}

function getStateOverlay(state: ToggleButtonState | undefined) {
  if (!state || state === 'enabled') return {};
  if (state === 'disabled') {
    return {opacity: 0.45, cursor: 'not-allowed'};
  }
  if (state === 'hovered') {
    return {filter: 'brightness(0.985)'};
  }
  if (state === 'pressed') {
    return {transform: 'translateY(0.5px) scale(0.99)', filter: 'brightness(0.97)'};
  }
  if (state === 'focused') {
    return {
      boxShadow:
        '0 0 0 3px color-mix(in srgb, var(--md-sys-color-primary) 35%, transparent)',
    };
  }
  return {};
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  function ToggleButton(
    {
      variant = 'default',
      shape = 'round',
      state,
      size = 'medium',
      selected,
      defaultSelected,
      onSelectedChange,
      disabled,
      onClick,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const isControlled = selected !== undefined;
    const [uncontrolledSelected, setUncontrolledSelected] = React.useState(
      Boolean(defaultSelected),
    );

    const isSelected = Boolean(isControlled ? selected : uncontrolledSelected);
    const forcedState = state;
    const isDisabled = disabled || forcedState === 'disabled';
    const isPressed = forcedState === 'pressed';
    const isActive = isSelected || isPressed;

    const s = sizeStyles(size);

    const restRadius = shape === 'round' ? 999 : 16;
    const activeRadius = shape === 'round' ? 16 : 999;

    const fill = getVariantStyle(variant, isSelected);

    const base: React.CSSProperties = {
      height: s.h,
      paddingInline: s.px,
      borderRadius: isActive ? activeRadius : restRadius,
      border: '1px solid',
      borderColor: fill.borderColor,
      background: fill.background,
      color: fill.color,
      font: 'inherit',
      fontSize: s.fs,
      lineHeight: s.lh,
      fontWeight: 650,
      letterSpacing: '0.2px',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      outline: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition:
        'border-radius 180ms cubic-bezier(0.2, 0.0, 0, 1), transform 120ms ease, filter 120ms ease, box-shadow 120ms ease',
      boxShadow: fill.boxShadow,
      ...getStateOverlay(forcedState),
      ...(style ?? {}),
    };

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(ev);
      if (isDisabled) return;

      const next = !isSelected;
      if (!isControlled) setUncontrolledSelected(next);
      onSelectedChange?.(next);
    };

    return (
      <button
        {...rest}
        ref={ref}
        type={rest.type ?? 'button'}
        disabled={isDisabled}
        aria-pressed={isSelected}
        onClick={handleClick}
        style={base}
      >
        {children}
      </button>
    );
  },
);

export function ToggleButtonIcon({children}: {children: string}) {
  return <Icon style={{fontSize: '1.1em'}}>{children}</Icon>;
}
