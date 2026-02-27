import * as React from 'react';

import './tooltip.css';

export interface PlainTooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  width?: number | string;
}

export const PlainTooltip = React.forwardRef<HTMLDivElement, PlainTooltipProps>(
  function PlainTooltip({width, style, className, children, ...rest}, ref) {
    const resolvedWidth =
      width == null ? undefined : typeof width === 'number' ? `${width}px` : width;

    const classNames = ['mer-tooltip-reset', 'mer-plain-tooltip', className]
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
        <div className="mer-plain-tooltip__text">{children}</div>
      </div>
    );
  },
);
