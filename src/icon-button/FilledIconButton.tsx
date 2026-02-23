import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdFilledIconButton} from '@material/web/iconbutton/filled-icon-button.js';

import {useEnsureDefined, useEventListener, useImperativeProps, useMergedRefs} from '../internal/hooks';

export type FilledIconButtonTarget = '_blank' | '_parent' | '_self' | '_top' | '';

export interface FilledIconButtonProps
  extends Omit<
    React.HTMLAttributes<MdFilledIconButton>,
    'disabled' | 'onChange' | 'onInput'
  > {
  disabled?: boolean;
  /** Disabled but still focusable. */
  softDisabled?: boolean;
  flipIconInRtl?: boolean;
  href?: string;
  target?: FilledIconButtonTarget;
  ariaLabelSelected?: string;
  toggle?: boolean;
  selected?: boolean;
  type?: 'button' | 'reset' | 'submit';
  value?: string;
  name?: string;

  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
  children?: React.ReactNode;
}

export const FilledIconButton = forwardRef<MdFilledIconButton, FilledIconButtonProps>(
  function FilledIconButton(
    {
      disabled,
      softDisabled,
      flipIconInRtl,
      href,
      target,
      ariaLabelSelected,
      toggle,
      selected,
      type,
      value,
      name,
      onChange,
      onInput,
      children,
      ...rest
    },
    ref,
  ) {
    useEnsureDefined('md-filled-icon-button', () => import('@material/web/iconbutton/filled-icon-button.js'));

    const innerRef = useRef<MdFilledIconButton>(null);
    const mergedRef = useMergedRefs(ref, innerRef);

    useImperativeProps(
      innerRef,
      (el) => {
        if (disabled !== undefined) el.disabled = disabled;
        if (softDisabled !== undefined) (el as unknown as {softDisabled: boolean}).softDisabled = softDisabled;
        if (flipIconInRtl !== undefined) (el as unknown as {flipIconInRtl: boolean}).flipIconInRtl = flipIconInRtl;
        if (href !== undefined) (el as unknown as {href: string}).href = href;
        if (target !== undefined) (el as unknown as {target: FilledIconButtonTarget}).target = target;
        if (ariaLabelSelected !== undefined) (el as unknown as {ariaLabelSelected: string}).ariaLabelSelected = ariaLabelSelected;
        if (toggle !== undefined) (el as unknown as {toggle: boolean}).toggle = toggle;
        if (selected !== undefined) (el as unknown as {selected: boolean}).selected = selected;
        if (type !== undefined) (el as unknown as {type: string}).type = type;
        if (value !== undefined) (el as unknown as {value: string}).value = value;
        if (name !== undefined) (el as unknown as {name: string}).name = name;
      },
      [
        disabled,
        softDisabled,
        flipIconInRtl,
        href,
        target,
        ariaLabelSelected,
        toggle,
        selected,
        type,
        value,
        name,
      ],
    );

    useEventListener(innerRef, 'change', onChange);
    useEventListener(innerRef, 'input', onInput as unknown as ((e: Event) => void) | undefined);

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-filled-icon-button ref={mergedRef} {...rest}>
        {children}
      </md-filled-icon-button>
    );
  },
);
