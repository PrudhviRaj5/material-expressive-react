import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdOutlinedButton} from '@material/web/button/outlined-button.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

export interface OutlinedButtonProps
  extends Omit<React.HTMLAttributes<MdOutlinedButton>, 'disabled'> {
  disabled?: boolean;
  softDisabled?: boolean;
  trailingIcon?: boolean;
  href?: string;
  target?: string;
  type?: string;
}

export const OutlinedButton = forwardRef<MdOutlinedButton, OutlinedButtonProps>(
  function OutlinedButton(
    {disabled, softDisabled, trailingIcon, href, target, type, children, ...rest},
    ref,
  ) {
    useEnsureDefined('md-outlined-button', () => import('@material/web/button/outlined-button.js'));
    const innerRef = useRef<MdOutlinedButton>(null);
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
      <md-outlined-button ref={mergedRef} {...rest}>
        {children}
      </md-outlined-button>
    );
  },
);

