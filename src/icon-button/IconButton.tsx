import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdIconButton} from '@material/web/iconbutton/icon-button.js';
import type {MdFilledIconButton} from '@material/web/iconbutton/filled-icon-button.js';
import type {MdFilledTonalIconButton} from '@material/web/iconbutton/filled-tonal-icon-button.js';
import type {MdOutlinedIconButton} from '@material/web/iconbutton/outlined-icon-button.js';

import {
  DefaultIconButton,
  type DefaultIconButtonProps,
} from './DefaultIconButton';
import {FilledIconButton} from './FilledIconButton';
import {FilledTonalIconButton} from './FilledTonalIconButton';
import {OutlinedIconButton} from './OutlinedIconButton';

export type IconButtonVariant =
  | 'default'
  | 'outlined'
  | 'filled'
  | 'filledTonal';

export type IconButtonStyle = 'standard' | 'outline' | 'filled' | 'tonal';
export type IconButtonType = 'round' | 'square';
export type IconButtonWidth = 'narrow' | 'default' | 'wide';

export type IconButtonRef =
  | MdIconButton
  | MdOutlinedIconButton
  | MdFilledIconButton
  | MdFilledTonalIconButton;

export interface IconButtonProps extends Omit<DefaultIconButtonProps, 'style'> {
  /** Visual style (Figma). */
  style?: IconButtonStyle;
  /** Back-compat alias; prefer `style`. */
  variant?: IconButtonVariant;

  /** Shape type (Figma). */
  type?: IconButtonType;
  /** Size (Figma). */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /** Width (Figma). */
  width?: IconButtonWidth;

  /** Inline styles for the host element. */
  containerStyle?: React.CSSProperties;
}

function getStylePrefix(style: IconButtonStyle): {
  tagVariant: IconButtonVariant;
  varPrefix: string;
} {
  switch (style) {
    case 'filled':
      return {tagVariant: 'filled', varPrefix: 'md-filled-icon-button'};
    case 'tonal':
      return {tagVariant: 'filledTonal', varPrefix: 'md-filled-tonal-icon-button'};
    case 'outline':
      return {tagVariant: 'outlined', varPrefix: 'md-outlined-icon-button'};
    case 'standard':
    default:
      return {tagVariant: 'default', varPrefix: 'md-icon-button'};
  }
}

function sizeConfig(size: IconButtonProps['size'] | undefined) {
  switch (size) {
    case 'xsmall':
      return {h: 32, icon: 18};
    case 'small':
      return {h: 36, icon: 20};
    case 'large':
      return {h: 56, icon: 28};
    case 'xlarge':
      return {h: 72, icon: 32};
    case 'medium':
    default:
      return {h: 40, icon: 24};
  }
}

function widthRatio(width: IconButtonWidth | undefined) {
  switch (width) {
    case 'narrow':
      return 1;
    case 'wide':
      return 1.7;
    case 'default':
    default:
      return 1.25;
  }
}

function shapeValue(type: IconButtonType | undefined) {
  return type === 'square'
    ? 'var(--md-sys-shape-corner-large, 16px)'
    : 'var(--md-sys-shape-corner-full, 9999px)';
}

export const IconButton = forwardRef<IconButtonRef, IconButtonProps>(
  function IconButton({
    style: styleProp = 'filled',
    variant,
    type,
    size,
    width,
    containerStyle,
    ...rest
  }, ref) {
    // If `variant` is passed (older API), map it to the equivalent style.
    const styleFromVariant: IconButtonStyle | undefined =
      variant === 'filled'
        ? 'filled'
        : variant === 'filledTonal'
          ? 'tonal'
          : variant === 'outlined'
            ? 'outline'
            : variant === 'default'
              ? 'standard'
              : undefined;

    const resolvedStyle = styleFromVariant ?? styleProp;
    const {tagVariant, varPrefix} = getStylePrefix(resolvedStyle);

    const s = sizeConfig(size);
    const w = Math.round(s.h * widthRatio(width));
    const shape = shapeValue(type);

    const styleVars: React.CSSProperties =
      varPrefix === 'md-icon-button'
        ? {
            // Standard uses state-layer tokens.
            ['--md-icon-button-state-layer-height' as any]: `${s.h}px`,
            ['--md-icon-button-state-layer-width' as any]: `${w}px`,
            ['--md-icon-button-state-layer-shape' as any]: shape,
            ['--md-icon-button-icon-size' as any]: `${s.icon}px`,
          }
        : {
            // Filled/tonal/outlined use container tokens.
            [`--${varPrefix}-container-height` as any]: `${s.h}px`,
            [`--${varPrefix}-container-width` as any]: `${w}px`,
            [`--${varPrefix}-container-shape` as any]: shape,
            [`--${varPrefix}-icon-size` as any]: `${s.icon}px`,
          };

    const mergedStyle = {...styleVars, ...(containerStyle ?? {})};

    switch (tagVariant) {
      case 'outlined':
        return (
          <OutlinedIconButton
            ref={ref as React.Ref<MdOutlinedIconButton>}
            {...(rest as any)}
            style={mergedStyle}
          />
        );
      case 'filled':
        return (
          <FilledIconButton
            ref={ref as React.Ref<MdFilledIconButton>}
            {...(rest as any)}
            style={mergedStyle}
          />
        );
      case 'filledTonal':
        return (
          <FilledTonalIconButton
            ref={ref as React.Ref<MdFilledTonalIconButton>}
            {...(rest as any)}
            style={mergedStyle}
          />
        );
      case 'default':
      default:
        return (
          <DefaultIconButton
            ref={ref as React.Ref<MdIconButton>}
            {...(rest as any)}
            style={mergedStyle}
          />
        );
    }
  },
);
