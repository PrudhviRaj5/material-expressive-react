import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdElevatedButton} from '@material/web/button/elevated-button.js';
import type {MdFilledButton} from '@material/web/button/filled-button.js';
import type {MdFilledTonalButton} from '@material/web/button/filled-tonal-button.js';
import type {MdOutlinedButton} from '@material/web/button/outlined-button.js';
import type {MdTextButton} from '@material/web/button/text-button.js';

import {ElevatedButton, type ElevatedButtonProps} from './ElevatedButton';
import {FilledButton} from './FilledButton';
import {FilledTonalButton} from './FilledTonalButton';
import {OutlinedButton} from './OutlinedButton';
import {TextButton} from './TextButton';

export type ButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filledTonal'
  | 'outlined'
  | 'text';

export type ButtonRef =
  | MdElevatedButton
  | MdFilledButton
  | MdFilledTonalButton
  | MdOutlinedButton
  | MdTextButton;

export interface ButtonProps extends ElevatedButtonProps {
  variant?: ButtonVariant;
}

export const Button = forwardRef<ButtonRef, ButtonProps>(function Button(
  {variant = 'elevated', ...rest},
  ref,
) {
  switch (variant) {
    case 'filledTonal':
      return (
        <FilledTonalButton
          ref={ref as React.Ref<MdFilledTonalButton>}
          {...(rest as any)}
        />
      );
    case 'outlined':
      return (
        <OutlinedButton
          ref={ref as React.Ref<MdOutlinedButton>}
          {...(rest as any)}
        />
      );
    case 'text':
      return <TextButton ref={ref as React.Ref<MdTextButton>} {...(rest as any)} />;
    case 'elevated':
      return (
        <ElevatedButton
          ref={ref as React.Ref<MdElevatedButton>}
          {...(rest as any)}
        />
      );
    case 'filled':
    default:
      return <FilledButton ref={ref as React.Ref<MdFilledButton>} {...(rest as any)} />;
  }
});
