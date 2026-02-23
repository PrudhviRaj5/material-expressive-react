import * as React from 'react';

import {
  DatePicker,
  type DatePickerConstraints,
  type DatePickerInputMode,
  type DatePickerVariant,
  type DateRange,
} from './DatePicker';

export interface DateRangePickerProps
  extends Omit<
    React.ComponentProps<typeof DatePicker>,
    'selectionMode' | 'value' | 'defaultValue' | 'onValueChange' | 'onValueReselect' | 'title'
  > {
  /** Controlled selected range (UTC ms). */
  value?: DateRange;
  /** Uncontrolled selected range. */
  defaultValue?: DateRange;
  onValueChange?: (value: DateRange) => void;
  onValueReselect?: (value: DateRange) => void;

  variant?: DatePickerVariant;
  inputMode?: DatePickerInputMode;
  defaultInputMode?: DatePickerInputMode;
  constraints?: DatePickerConstraints;

  title?: string;
}

export const DateRangePicker = React.forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      value,
      defaultValue,
      onValueChange,
      onValueReselect,
      title = 'Select dates',
      ...rest
    },
    ref,
  ) {
    return (
      <DatePicker
        {...rest}
        ref={ref}
        selectionMode="range"
        title={title}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange as any}
        onValueReselect={onValueReselect as any}
      />
    );
  },
);
