import * as React from 'react';

import './list.css';

import {Icon} from '../icon';
import {useListContext} from './list-context';

export type IconListItemType = 'text' | 'button' | 'link';
export type LeadingIconContainer = 'none' | 'square' | 'circle';

export interface IconListItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  type?: IconListItemType;
  href?: string;
  leadingIcon?: string;
  leadingIconContainer?: LeadingIconContainer;
  trailingText?: string;
  trailingIcon?: string;
  selectedTrailingIcon?: string;
  headline: string;
  supportText?: string;
  isSelected?: boolean;
}

export const IconListItem = React.forwardRef<HTMLElement, IconListItemProps>(
  function IconListItem(
    {
      type = 'button',
      href,
      leadingIcon = 'person',
      leadingIconContainer = 'none',
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
    // Ensure this component stays aligned with List semantics.
    useListContext();

    const interactive = type !== 'text';
    const Root = type === 'button' ? 'button' : type === 'link' ? 'a' : 'div';

    const resolvedTrailingIcon = isSelected ? selectedTrailingIcon : trailingIcon;

    const leadingIconNode =
      leadingIcon && leadingIcon.trim().length > 0 ? (
        <Icon>{leadingIcon}</Icon>
      ) : null;

    const leading = leadingIconNode ? (
      leadingIconContainer === 'none' ? (
        <span className="mer-list-item__leading mer-list-item__leadingIcon" aria-hidden="true">
          {leadingIconNode}
        </span>
      ) : (
        <span
          className={
            [
              'mer-list-item__leading',
              'mer-list-item__leadingIconWrap',
              leadingIconContainer === 'circle'
                ? 'mer-list-item__leadingIconWrap--circle'
                : 'mer-list-item__leadingIconWrap--square',
            ]
              .filter(Boolean)
              .join(' ')
          }
          aria-hidden="true"
        >
          <span className="mer-list-item__leadingIcon">{leadingIconNode}</span>
        </span>
      )
    ) : (
      <span className="mer-list-item__leadingPlaceholder" aria-hidden="true" />
    );

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
      leading,
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
