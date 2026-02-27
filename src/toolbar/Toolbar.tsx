import * as React from 'react';

import './toolbar.css';

export type ToolbarLayout = 'Horizontal' | 'Vertical';
export type ToolbarColor = 'Standard' | 'Vibrant';
export type ToolbarSize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type ToolbarVariant = 'Floating' | 'Docked';
export type ToolbarDockPosition = 'Left' | 'Right' | 'Top' | 'Bottom';

export interface ToolbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  layout?: ToolbarLayout;
  color?: ToolbarColor;
  size?: ToolbarSize;
  variant?: ToolbarVariant;
  dockPosition?: ToolbarDockPosition;
}

function sizeClass(size: ToolbarSize) {
  switch (size) {
    case 'XSmall':
      return 'mer-toolbar--xsmall';
    case 'Small':
      return 'mer-toolbar--small';
    case 'Large':
      return 'mer-toolbar--large';
    case 'XLarge':
      return 'mer-toolbar--xlarge';
    case 'Medium':
    default:
      return 'mer-toolbar--medium';
  }
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  {
    layout = 'Horizontal',
    color = 'Standard',
    size = 'Medium',
    variant = 'Floating',
    dockPosition = 'Bottom',
    className,
    role,
    children,
    ...rest
  },
  ref,
) {
  const orientationClass = layout === 'Vertical' ? 'mer-toolbar--vertical' : 'mer-toolbar--horizontal';
  const colorClass = color === 'Vibrant' ? 'mer-toolbar--vibrant' : 'mer-toolbar--standard';
  const variantClass = variant === 'Docked' ? 'mer-toolbar--docked' : 'mer-toolbar--floating';
  const dockClass =
    dockPosition === 'Top'
      ? 'mer-toolbar--dock-top'
      : dockPosition === 'Bottom'
        ? 'mer-toolbar--dock-bottom'
        : dockPosition === 'Left'
          ? 'mer-toolbar--dock-left'
          : 'mer-toolbar--dock-right';

  const classNames = [
    'mer-toolbar',
    orientationClass,
    colorClass,
    sizeClass(size),
    variantClass,
    variant === 'Docked' ? dockClass : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames}
      role={role ?? 'toolbar'}
      aria-orientation={layout === 'Vertical' ? 'vertical' : 'horizontal'}
      data-layout={layout}
      data-color={color}
      data-size={size}
      data-variant={variant}
      data-dock-position={dockPosition}
    >
      {children}
    </div>
  );
});
