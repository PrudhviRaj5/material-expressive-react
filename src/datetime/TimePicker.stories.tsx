import React from 'react';
import {action} from '@storybook/addon-actions';

import {TimePicker} from './TimePicker';
import {FilledButton} from '../button';

const meta = {
  title: 'Date & Time/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['variant', 'format', 'inputMode', 'open', 'title', 'supportingText', 'showClear', 'minTime', 'maxTime', 'minuteStep'],
    },
  },
  argTypes: {
    variant: {control: {type: 'radio'}, options: ['modal', 'docked']},
    format: {control: {type: 'radio'}, options: ['12h', '24h']},
    inputMode: {control: {type: 'radio'}, options: ['clock', 'keyboard']},
    open: {control: {type: 'boolean'}},
    title: {control: {type: 'text'}},
    supportingText: {control: {type: 'text'}},
    showClear: {control: {type: 'boolean'}},
    minTime: {control: {type: 'text'}},
    maxTime: {control: {type: 'text'}},
    minuteStep: {control: {type: 'select'}, options: [1, 5, 10, 15, 30]},
    onValueChange: {table: {disable: true}},
    onOpenChange: {table: {disable: true}},
    onConfirm: {table: {disable: true}},
    onCancel: {table: {disable: true}},
    onDismiss: {table: {disable: true}},
    constraints: {table: {disable: true}},
    className: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'modal',
    format: '12h',
    inputMode: undefined,
    open: false,
    title: 'Select time',
    supportingText: '',
    showClear: true,
    minTime: '',
    maxTime: '',
    minuteStep: 5,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [open, setOpen] = React.useState(Boolean(args.open));
    const [value, setValue] = React.useState<number | null>(10 * 60 + 10);

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    const picker = (
      <TimePicker
        variant={args.variant}
        format={args.format}
        inputMode={args.inputMode || undefined}
        minuteStep={args.minuteStep}
        open={open}
        onOpenChange={(next) => {
          action('open-change')(next);
          setOpen(next);
        }}
        value={value}
        onValueChange={(next) => {
          action('value-change')(next as any);
          setValue(next as any);
        }}
        title={args.title}
        supportingText={args.supportingText}
        showClear={args.showClear}
        minTime={args.minTime || undefined}
        maxTime={args.maxTime || undefined}
        onConfirm={(next) => action('confirm')(next as any)}
        onCancel={() => action('cancel')()}
        onDismiss={() => action('dismiss')()}
      />
    );

    if (args.variant === 'docked') return picker;

    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setOpen(true)}>Open time picker</FilledButton>
        {picker}
      </div>
    );
  },
};
