import type * as React from 'react';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

type ButtonTokenPrefix =
  | 'filled-button'
  | 'outlined-button'
  | 'elevated-button'
  | 'filled-tonal-button'
  | 'text-button';

interface SizeConfig {
  containerHeight: string;
  leadingSpace: string;
  trailingSpace: string;
  withLeadingIconLeadingSpace: string;
  withLeadingIconTrailingSpace: string;
  withTrailingIconLeadingSpace: string;
  withTrailingIconTrailingSpace: string;
  iconSize: string;
  labelTextSize: string;
  labelTextLineHeight: string;
}

const SIZE_CONFIG: Record<Exclude<ButtonSize, 'medium'>, SizeConfig> = {
  xsmall: {
    containerHeight: '28px',
    leadingSpace: '12px',
    trailingSpace: '12px',
    withLeadingIconLeadingSpace: '10px',
    withLeadingIconTrailingSpace: '12px',
    withTrailingIconLeadingSpace: '12px',
    withTrailingIconTrailingSpace: '10px',
    iconSize: '16px',
    labelTextSize: '0.75rem',
    labelTextLineHeight: '1rem',
  },
  small: {
    containerHeight: '32px',
    leadingSpace: '16px',
    trailingSpace: '16px',
    withLeadingIconLeadingSpace: '12px',
    withLeadingIconTrailingSpace: '16px',
    withTrailingIconLeadingSpace: '16px',
    withTrailingIconTrailingSpace: '12px',
    iconSize: '18px',
    labelTextSize: '0.8125rem',
    labelTextLineHeight: '1.125rem',
  },
  large: {
    containerHeight: '48px',
    leadingSpace: '28px',
    trailingSpace: '28px',
    withLeadingIconLeadingSpace: '20px',
    withLeadingIconTrailingSpace: '28px',
    withTrailingIconLeadingSpace: '28px',
    withTrailingIconTrailingSpace: '20px',
    iconSize: '20px',
    labelTextSize: '0.9375rem',
    labelTextLineHeight: '1.375rem',
  },
  xlarge: {
    containerHeight: '56px',
    leadingSpace: '32px',
    trailingSpace: '32px',
    withLeadingIconLeadingSpace: '24px',
    withLeadingIconTrailingSpace: '32px',
    withTrailingIconLeadingSpace: '32px',
    withTrailingIconTrailingSpace: '24px',
    iconSize: '24px',
    labelTextSize: '1rem',
    labelTextLineHeight: '1.5rem',
  },
};

export function getButtonSizeStyleVars(
  prefix: ButtonTokenPrefix,
  size: ButtonSize | undefined,
): React.CSSProperties {
  if (!size || size === 'medium') return {};

  const c = SIZE_CONFIG[size];

  return {
    [`--md-${prefix}-container-height` as any]: c.containerHeight,
    [`--md-${prefix}-leading-space` as any]: c.leadingSpace,
    [`--md-${prefix}-trailing-space` as any]: c.trailingSpace,
    [`--md-${prefix}-with-leading-icon-leading-space` as any]:
      c.withLeadingIconLeadingSpace,
    [`--md-${prefix}-with-leading-icon-trailing-space` as any]:
      c.withLeadingIconTrailingSpace,
    [`--md-${prefix}-with-trailing-icon-leading-space` as any]:
      c.withTrailingIconLeadingSpace,
    [`--md-${prefix}-with-trailing-icon-trailing-space` as any]:
      c.withTrailingIconTrailingSpace,
    [`--md-${prefix}-icon-size` as any]: c.iconSize,
    [`--md-${prefix}-label-text-size` as any]: c.labelTextSize,
    [`--md-${prefix}-label-text-line-height` as any]: c.labelTextLineHeight,
  };
}
