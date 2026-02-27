import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdElevatedCard} from '@material/web/labs/card/elevated-card.js';
import type {MdFilledCard} from '@material/web/labs/card/filled-card.js';
import type {MdOutlinedCard} from '@material/web/labs/card/outlined-card.js';

import type {WebComponentProps} from '../internal/createComponent';

import {ElevatedCard} from './ElevatedCard';
import {FilledCard} from './FilledCard';
import {OutlinedCard} from './OutlinedCard';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

export type CardRef = MdElevatedCard | MdFilledCard | MdOutlinedCard;

export interface CardProps extends WebComponentProps<CardRef> {
  variant?: CardVariant;

  /** Overrides the variant's container color via Material Web CSS custom properties. */
  containerColor?: string;
  /** Overrides the variant's elevation level (number, e.g. 0, 1, 2). */
  containerElevation?: number;
  /** Overrides the variant's corner shape (CSS border-radius value). */
  containerShape?: string;
  /** Overrides the elevation shadow color. */
  containerShadowColor?: string;
  /** Outlined-only: overrides the outline stroke color. */
  outlineColor?: string;
  /** Outlined-only: overrides the outline stroke width (px if number). */
  outlineWidth?: number | string;
}

export const Card = forwardRef<CardRef, CardProps>(function Card(
  {
    variant = 'elevated',
    containerColor,
    containerElevation,
    containerShape,
    containerShadowColor,
    outlineColor,
    outlineWidth,
    style,
    ...rest
  },
  ref,
) {
  const varPrefix =
    variant === 'outlined'
      ? 'md-outlined-card'
      : variant === 'filled'
        ? 'md-filled-card'
        : 'md-elevated-card';

  const resolvedStyle: React.CSSProperties = {...(style as React.CSSProperties)};

  if (containerColor !== undefined) {
    (resolvedStyle as any)[`--${varPrefix}-container-color`] = containerColor;
  }
  if (containerElevation !== undefined) {
    (resolvedStyle as any)[`--${varPrefix}-container-elevation`] = String(containerElevation);
  }
  if (containerShadowColor !== undefined) {
    (resolvedStyle as any)[`--${varPrefix}-container-shadow-color`] = containerShadowColor;
  }
  if (containerShape !== undefined) {
    (resolvedStyle as any)[`--${varPrefix}-container-shape`] = containerShape;
  }

  if (variant === 'outlined') {
    if (outlineColor !== undefined) {
      (resolvedStyle as any)['--md-outlined-card-outline-color'] = outlineColor;
    }
    if (outlineWidth !== undefined) {
      (resolvedStyle as any)['--md-outlined-card-outline-width'] =
        typeof outlineWidth === 'number' ? `${outlineWidth}px` : outlineWidth;
    }
  }

  const props = {
    ...rest,
    style: resolvedStyle,
  };

  switch (variant) {
    case 'outlined':
      return <OutlinedCard ref={ref as React.Ref<MdOutlinedCard>} {...(props as any)} />;
    case 'elevated':
      return <ElevatedCard ref={ref as React.Ref<MdElevatedCard>} {...(props as any)} />;
    case 'filled':
    default:
      return <FilledCard ref={ref as React.Ref<MdFilledCard>} {...(props as any)} />;
  }
});
