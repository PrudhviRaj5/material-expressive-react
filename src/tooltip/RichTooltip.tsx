import * as React from 'react';

import './tooltip.css';

export interface RichTooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  width?: number | string;
}

export const RichTooltip = React.forwardRef<HTMLDivElement, RichTooltipProps>(
  function RichTooltip({width, style, className, children, ...rest}, ref) {
    const resolvedWidth =
      width == null ? undefined : typeof width === 'number' ? `${width}px` : width;

    const classNames = ['mer-tooltip-reset', 'mer-rich-tooltip', className]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        {...rest}
        ref={ref}
        className={classNames}
        style={{...style, width: resolvedWidth}}
        role={rest.role ?? 'tooltip'}
      >
        {children}
      </div>
    );
  },
);
