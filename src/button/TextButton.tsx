import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdTextButton} from '@material/web/button/text-button.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

export interface TextButtonProps
  extends Omit<React.HTMLAttributes<MdTextButton>, 'disabled'> {
  disabled?: boolean;
  softDisabled?: boolean;
  trailingIcon?: boolean;
  href?: string;
  target?: string;
  type?: string;
}

export const TextButton = forwardRef<MdTextButton, TextButtonProps>(
  function TextButton(
    {disabled, softDisabled, trailingIcon, href, target, type, children, ...rest},
    ref,
  ) {
    useEnsureDefined('md-text-button', () => import('@material/web/button/text-button.js'));
    const innerRef = useRef<MdTextButton>(null);
    const mergedRef = useMergedRefs(ref, innerRef);

    useImperativeProps(
      innerRef,
      (el) => {
        if (disabled !== undefined) el.disabled = disabled;
        if (softDisabled !== undefined) (el as unknown as {softDisabled: boolean}).softDisabled = softDisabled;
        if (trailingIcon !== undefined) (el as unknown as {trailingIcon: boolean}).trailingIcon = trailingIcon;
        if (href !== undefined) (el as unknown as {href: string}).href = href;
        if (target !== undefined) (el as unknown as {target: string}).target = target;
        if (type !== undefined) (el as unknown as {type: string}).type = type;
      },
      [disabled, softDisabled, trailingIcon, href, target, type],
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-text-button ref={mergedRef} {...rest}>
        {children}
      </md-text-button>
    );
  },
);

