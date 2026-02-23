import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdFilledTonalButton} from '@material/web/button/filled-tonal-button.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

export interface FilledTonalButtonProps
  extends Omit<React.HTMLAttributes<MdFilledTonalButton>, 'disabled'> {
  disabled?: boolean;
  softDisabled?: boolean;
  trailingIcon?: boolean;
  href?: string;
  target?: string;
  type?: string;
}

export const FilledTonalButton = forwardRef<MdFilledTonalButton, FilledTonalButtonProps>(
  function FilledTonalButton(
    {disabled, softDisabled, trailingIcon, href, target, type, children, ...rest},
    ref,
  ) {
    useEnsureDefined('md-filled-tonal-button', () => import('@material/web/button/filled-tonal-button.js'));
    const innerRef = useRef<MdFilledTonalButton>(null);
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
      <md-filled-tonal-button ref={mergedRef} {...rest}>
        {children}
      </md-filled-tonal-button>
    );
  },
);

