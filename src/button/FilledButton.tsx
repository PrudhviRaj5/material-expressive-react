import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdFilledButton} from '@material/web/button/filled-button.js';

import {useEnsureDefined, useImperativeProps, useMergedRefs} from '../internal/hooks';

import type {ButtonSize} from './buttonSizes';
import {getButtonSizeStyleVars} from './buttonSizes';

export interface FilledButtonProps
  extends Omit<React.HTMLAttributes<MdFilledButton>, 'disabled'> {
  size?: ButtonSize;
  disabled?: boolean;
  trailingIcon?: boolean;
  href?: string;
  target?: string;
  type?: 'button' | 'reset' | 'submit';
  value?: string;
  name?: string;
  /** Associates the button with a form by id (sets the `form` attribute). */
  form?: string;
}

export const FilledButton = forwardRef<MdFilledButton, FilledButtonProps>(
  function FilledButton(
    {
      size = 'medium',
      disabled,
      trailingIcon,
      href,
      target,
      type,
      value,
      name,
      form,
      children,
      style,
      ...rest
    },
    ref,
  ) {
    useEnsureDefined('md-filled-button', () => import('@material/web/button/filled-button.js'));
    const innerRef = useRef<MdFilledButton>(null);
    const mergedRef = useMergedRefs(ref, innerRef);

    useImperativeProps(
      innerRef,
      (el) => {
        if (disabled !== undefined) el.disabled = disabled;
        if (trailingIcon !== undefined) (el as unknown as {trailingIcon: boolean}).trailingIcon = trailingIcon;
        if (href !== undefined) (el as unknown as {href: string}).href = href;
        if (target !== undefined) (el as unknown as {target: string}).target = target;
        if (type !== undefined) (el as unknown as {type: string}).type = type;
        if (value !== undefined) (el as unknown as {value: string}).value = value;
        if (name !== undefined) (el as unknown as {name: string}).name = name;
        if (form !== undefined) {
          if (form) {
            el.setAttribute('form', form);
          } else {
            el.removeAttribute('form');
          }
        }
      },
      [
        disabled,
        trailingIcon,
        href,
        target,
        type,
        value,
        name,
        form,
      ],
    );

    const sizeVars = getButtonSizeStyleVars('filled-button', size);
    const mergedStyle = size === 'medium' ? style : {...style, ...sizeVars};

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-filled-button
        ref={mergedRef}
        {...rest}
        style={mergedStyle}
      >
        {children}
      </md-filled-button>
    );
  },
);
