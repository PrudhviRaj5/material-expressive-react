import * as React from 'react';

import './list.css';

import {Icon} from '../icon';
import {useListContext} from './list-context';

export type ImageListItemType = 'text' | 'button' | 'link';

export interface ImageListItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  type?: ImageListItemType;
  imgURL: string;
  href?: string;
  trailingText?: string;
  trailingIcon?: string;
  selectedTrailingIcon?: string;
  headline: string;
  supportText?: string;
  isSelected?: boolean;
}

export const ImageListItem = React.forwardRef<HTMLElement, ImageListItemProps>(
  function ImageListItem(
    {
      type = 'button',
      imgURL,
      href,
      trailingText = '100+',
      trailingIcon = 'star',
      selectedTrailingIcon = 'check',
      headline,
      supportText,
      isSelected = false,
      className,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    useListContext();

    const interactive = type !== 'text';
    const Root = type === 'button' ? 'button' : type === 'link' ? 'a' : 'div';

    const resolvedTrailingIcon = isSelected ? selectedTrailingIcon : trailingIcon;

    const sharedProps: Record<string, unknown> = {
      ...rest,
      ref,
      role: 'option',
      'aria-selected': isSelected ? 'true' : 'false',
      'data-mer-interactive': interactive ? 'true' : 'false',
      className: ['mer-list-item', className].filter(Boolean).join(' '),
      onClick: interactive ? onClick : undefined,
      onKeyDown: (ev: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown?.(ev);
        if (ev.defaultPrevented) return;
        if (type !== 'link' || href) return;
        if (ev.key === 'Enter' || ev.key === ' ') {
          (ev.currentTarget as HTMLElement).click();
          ev.preventDefault();
        }
      },
    };

    if (type === 'button') {
      (sharedProps as Record<string, unknown>).type = 'button';
    }

    if (type === 'link') {
      (sharedProps as Record<string, unknown>).href = href;
      if (!href) {
        (sharedProps as Record<string, unknown>).tabIndex = 0;
      }
    }

    return React.createElement(
      Root,
      sharedProps,
      <span key="leading" className="mer-list-item__leadingImage" aria-hidden="true">
        <img src={imgURL} alt="" />
      </span>,
      <span key="content" className="mer-list-item__content">
        <span className="mer-list-item__headline">{headline}</span>
        {supportText ? (
          <span className="mer-list-item__support">{supportText}</span>
        ) : null}
      </span>,
      <span key="trailing" className="mer-list-item__trailing" aria-hidden="true">
        {trailingText ? (
          <span className="mer-list-item__trailingText">{trailingText}</span>
        ) : null}
        {resolvedTrailingIcon ? (
          <span className="mer-list-item__trailingIcon">
            <Icon>{resolvedTrailingIcon}</Icon>
          </span>
        ) : null}
      </span>,
    );
  },
);
