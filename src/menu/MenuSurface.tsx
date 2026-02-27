import * as React from 'react';

import './menu-supporting.css';

export type MenuVariant = 'standard' | 'vibrant';

export interface MenuSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: MenuVariant;
  /** If true, removes gaps/dividers styling for compact context menus. */
  context?: boolean;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /** Gap between menu items. Sets `--mer-menu-item-gap`. */
  gap?: number | string;
  width?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  scroll?: boolean;
}

function cssLen(v: number | string | undefined) {
  if (v === undefined) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

export const MenuSurface = React.forwardRef<HTMLDivElement, MenuSurfaceProps>(
  function MenuSurface(
    {
      variant = 'standard',
      context = false,
      size,
      gap,
      width,
      height,
      maxHeight,
      scroll = true,
      className,
      style,
      onClick,
      children,
      ...rest
    },
    ref,
  ) {
    const normalizedGap =
      gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined;

    return (
      <div
        {...rest}
        ref={ref}
        className={[
          'mer-menu-surface',
          context ? 'mer-menu-surface--context' : null,
          size && size !== 'medium' ? `mer-menu-surface--size-${size}` : null,
          variant === 'vibrant' ? 'mer-menu-surface--vibrant' : null,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          ...(normalizedGap
            ? ({['--mer-menu-item-gap' as any]: normalizedGap} as React.CSSProperties)
            : null),
          width: cssLen(width),
          height: cssLen(height),
          maxHeight: cssLen(maxHeight),
          ...(style ?? {}),
        }}
        onClick={onClick}
      >
        <div className="mer-menu-surface__scroll" style={{overflow: scroll ? 'auto' : 'visible'}}>
          {children}
        </div>
      </div>
    );
  },
);
