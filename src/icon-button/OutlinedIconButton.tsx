import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdOutlinedIconButton} from '@material/web/iconbutton/outlined-icon-button.js';

import {useEnsureDefined, useEventListener, useImperativeProps, useMergedRefs} from '../internal/hooks';

export type OutlinedIconButtonTarget = '_blank' | '_parent' | '_self' | '_top' | '';

export interface OutlinedIconButtonProps
  extends Omit<
    React.HTMLAttributes<MdOutlinedIconButton>,
    'disabled' | 'onChange' | 'onInput'
  > {
  disabled?: boolean;
  /** Disabled but still focusable. */
  softDisabled?: boolean;
  flipIconInRtl?: boolean;
  href?: string;
  target?: OutlinedIconButtonTarget;
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

export const OutlinedIconButton = forwardRef<MdOutlinedIconButton, OutlinedIconButtonProps>(
  function OutlinedIconButton(
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
    useEnsureDefined('md-outlined-icon-button', () => import('@material/web/iconbutton/outlined-icon-button.js'));

    const innerRef = useRef<MdOutlinedIconButton>(null);
    const mergedRef = useMergedRefs(ref, innerRef);

    useImperativeProps(
      innerRef,
      (el) => {
        if (disabled !== undefined) el.disabled = disabled;
        if (softDisabled !== undefined) (el as unknown as {softDisabled: boolean}).softDisabled = softDisabled;
        if (flipIconInRtl !== undefined) (el as unknown as {flipIconInRtl: boolean}).flipIconInRtl = flipIconInRtl;
        if (href !== undefined) (el as unknown as {href: string}).href = href;
        if (target !== undefined) (el as unknown as {target: OutlinedIconButtonTarget}).target = target;
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
      <md-outlined-icon-button ref={mergedRef} {...rest}>
        {children}
      </md-outlined-icon-button>
    );
  },
);
