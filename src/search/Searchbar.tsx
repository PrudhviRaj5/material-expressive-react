import * as React from 'react';

import './search.css';

import {Icon} from '../icon';

export interface SearchbarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
  leadingIcon?: string;
  hintedText?: string;
  trailingIcon?: string;
  isTrailingAvatar?: boolean;

  onLeadingIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSearchbarClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onTrailingIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onTrailingAvatarClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Searchbar = React.forwardRef<HTMLDivElement, SearchbarProps>(
  function Searchbar(
    {
      leadingIcon = 'menu',
      hintedText = 'search',
      trailingIcon = 'search',
      isTrailingAvatar = true,
      onLeadingIconClick,
      onSearchbarClick,
      onTrailingIconClick,
      onTrailingAvatarClick,
      className,
      role,
      tabIndex,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const interactive = Boolean(onSearchbarClick);

    return (
      <div
        {...rest}
        ref={ref}
        role={role ?? (interactive ? 'button' : undefined)}
        tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
        className={['mer-searchbar', className].filter(Boolean).join(' ')}
        data-mer-interactive={interactive ? 'true' : 'false'}
        onClick={(ev) => {
          onSearchbarClick?.(ev);
        }}
        onKeyDown={(ev) => {
          onKeyDown?.(ev);
          if (ev.defaultPrevented) return;
          if (!interactive) return;
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.currentTarget.click();
            ev.preventDefault();
          }
        }}
      >
        <button
          type="button"
          className="mer-searchbar__iconButton"
          aria-label="Search leading action"
          onClick={(ev) => {
            ev.stopPropagation();
            onLeadingIconClick?.(ev);
          }}
        >
          <Icon>{leadingIcon}</Icon>
        </button>

        <span className="mer-searchbar__text">{hintedText}</span>

        <span className="mer-searchbar__trailing">
          <button
            type="button"
            className="mer-searchbar__iconButton"
            aria-label="Search trailing action"
            onClick={(ev) => {
              ev.stopPropagation();
              onTrailingIconClick?.(ev);
            }}
          >
            <Icon>{trailingIcon}</Icon>
          </button>

          {isTrailingAvatar ? (
            <button
              type="button"
              className="mer-searchbar__avatarButton"
              aria-label="Search avatar action"
              onClick={(ev) => {
                ev.stopPropagation();
                onTrailingAvatarClick?.(ev);
              }}
            >
              A
            </button>
          ) : null}
        </span>
      </div>
    );
  },
);
