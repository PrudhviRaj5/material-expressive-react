import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdListItem} from '@material/web/list/list-item.js';

import {useEnsureDefined, useEventListener, useImperativeProps, useMergedRefs} from '../internal/hooks';

export type ListItemType = 'text' | 'button' | 'link';
export type ListItemTarget = '_blank' | '_parent' | '_self' | '_top' | '';

export interface ListItemProps
  extends Omit<React.HTMLAttributes<MdListItem>, 'disabled'> {
  disabled?: boolean;
  type?: ListItemType;
  href?: string;
  target?: ListItemTarget;

  onRequestActivation?: (event: Event) => void;
  children?: React.ReactNode;
}

export const ListItem = forwardRef<MdListItem, ListItemProps>(function ListItem(
  {disabled, type, href, target, onRequestActivation, children, ...rest},
  ref,
) {
  useEnsureDefined('md-list-item', () => import('@material/web/list/list-item.js'));

  const innerRef = useRef<MdListItem>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  useImperativeProps(
    innerRef,
    (el) => {
      if (disabled !== undefined) el.disabled = disabled;
      if (type !== undefined) (el as unknown as {type: ListItemType}).type = type;
      if (href !== undefined) (el as unknown as {href: string}).href = href;
      if (target !== undefined) (el as unknown as {target: ListItemTarget}).target = target;
    },
    [disabled, type, href, target],
  );

  useEventListener(innerRef, 'request-activation', onRequestActivation);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-list-item ref={mergedRef} {...rest}>
      {children}
    </md-list-item>
  );
});
