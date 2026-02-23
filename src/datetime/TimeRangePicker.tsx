import * as React from 'react';

import {
  TimePicker,
  type TimePickerConstraints,
  type TimePickerFormat,
  type TimePickerInputMode,
  type TimePickerVariant,
  type TimeRange,
  type TimeValue,
} from './TimePicker';

export interface TimeRangePickerProps
  extends Omit<
    React.ComponentProps<typeof TimePicker>,
    | 'selectionMode'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'onValueReselect'
    | 'title'
  > {
  value?: TimeRange;
  defaultValue?: TimeRange;
  onValueChange?: (value: TimeRange) => void;
  onValueReselect?: (value: TimeRange) => void;

  variant?: TimePickerVariant;
  format?: TimePickerFormat;
  inputMode?: TimePickerInputMode;
  defaultInputMode?: TimePickerInputMode;
  constraints?: TimePickerConstraints;

  minTime?: TimeValue;
  maxTime?: TimeValue;

  title?: string;
}

export const TimeRangePicker = React.forwardRef<HTMLDivElement, TimeRangePickerProps>(
  function TimeRangePicker(
    {
      value,
      defaultValue,
      onValueChange,
      onValueReselect,
      title = 'Select times',
      ...rest
    },
    ref,
  ) {
    return (
      <TimePicker
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
