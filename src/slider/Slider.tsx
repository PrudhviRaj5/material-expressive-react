import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdSlider} from '@material/web/slider/slider.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface SliderProps
  extends Omit<
    React.HTMLAttributes<MdSlider>,
    'children' | 'onChange' | 'onInput'
  > {
  min?: number;
  max?: number;
  value?: number;
  valueStart?: number;
  valueEnd?: number;

  valueLabel?: string;
  valueLabelStart?: string;
  valueLabelEnd?: string;

  ariaLabelStart?: string;
  ariaValueTextStart?: string;
  ariaLabelEnd?: string;
  ariaValueTextEnd?: string;

  step?: number;
  ticks?: boolean;
  labeled?: boolean;
  range?: boolean;

  disabled?: boolean;
  name?: string;
  nameStart?: string;
  nameEnd?: string;

  onChange?: (event: Event) => void;
  onInput?: (event: InputEvent) => void;
}

export const Slider = forwardRef<MdSlider, SliderProps>(function Slider(
  {onChange, onInput, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdSlider>(
    {
      tagName: 'md-slider',
      importer: () => import('@material/web/slider/slider.js'),
      events: {change: 'onChange', input: 'onInput'},
    },
    {onChange, onInput, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-slider ref={mergedRef} {...domProps} />
  );
});
