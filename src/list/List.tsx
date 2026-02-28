import * as React from 'react';

import './list.css';

import type {ListSelectType, ListSize, ListVariant} from './list-context';
import {ListContextProvider} from './list-context';

export interface ListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode;
  width?: number;
  gap?: number;
  size?: ListSize;
  variant?: ListVariant;
  selectType?: ListSelectType;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(function List(
  {
    children,
    width = 300,
    gap = 5,
    size = 'Medium',
    variant = 'standard',
    selectType = 'single',
    className,
    style,
    role,
    ...rest
  },
  ref,
) {
  const sizeClass = `mer-list--size-${size.toLowerCase()}`;

  const mergedStyle = {
    width: `${width}px`,
    ['--mer-list-gap' as never]: `${gap}px`,
    ['--mer-list-width' as never]: `${width}px`,
    ...(style ?? {}),
  } as React.CSSProperties;

  return (
    <ListContextProvider value={{size, variant, selectType}}>
      <div
        {...rest}
        ref={ref}
        role={role ?? 'listbox'}
        aria-multiselectable={selectType === 'multi' ? 'true' : undefined}
        className={
          [
            'mer-list',
            sizeClass,
            variant === 'vibrant' ? 'mer-list--vibrant' : null,
            className,
          ]
            .filter(Boolean)
            .join(' ')
        }
        style={mergedStyle}
        data-mer-variant={variant}
        data-mer-select-type={selectType}
      >
        {children}
      </div>
    </ListContextProvider>
  );
});
