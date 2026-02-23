import React from 'react';
import {action} from '@storybook/addon-actions';

import {DatePicker} from './DatePicker';
import {FilledButton} from '../button';

const meta = {
  title: 'Date & Time/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'variant',
        'selectionMode',
        'open',
        'title',
        'supportingText',
        'showClear',
        'minDate',
        'maxDate',
      ],
    },
  },
  argTypes: {
    variant: {control: {type: 'radio'}, options: ['modal', 'docked']},
    selectionMode: {control: {type: 'radio'}, options: ['single', 'range']},
    open: {control: {type: 'boolean'}},
    title: {control: {type: 'text'}},
    supportingText: {control: {type: 'text'}},
    showClear: {control: {type: 'boolean'}},
    minDate: {control: {type: 'date'}},
    maxDate: {control: {type: 'date'}},
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
    selectionMode: 'single',
    open: false,
    title: 'Select date',
    supportingText: '',
    showClear: true,
    minDate: undefined,
    maxDate: undefined,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [open, setOpen] = React.useState(Boolean(args.open));
    const [value, setValue] = React.useState<number | null>(Date.UTC(2025, 7, 17));
    const [range, setRange] = React.useState({
      start: Date.UTC(2025, 7, 17),
      end: Date.UTC(2025, 7, 23),
    });

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    const selectionMode = args.selectionMode as 'single' | 'range';
    const currentValue = selectionMode === 'single' ? value : range;

    const picker = (
      <DatePicker
        variant={args.variant}
        selectionMode={selectionMode}
        open={open}
        onOpenChange={(next) => {
          action('open-change')(next);
          setOpen(next);
        }}
        value={currentValue}
        onValueChange={(next) => {
          action('value-change')(next as any);
          if (selectionMode === 'single') setValue(next as number);
          else setRange(next as any);
        }}
        title={args.title}
        supportingText={args.supportingText}
        showClear={args.showClear}
        minDate={args.minDate ?? undefined}
        maxDate={args.maxDate ?? undefined}
        onConfirm={(next) => action('confirm')(next as any)}
        onCancel={() => action('cancel')()}
        onDismiss={() => action('dismiss')()}
        constraints={{
          firstDayOfWeek: 0,
        }}
      />
    );

    if (args.variant === 'docked') {
      return picker;
    }

    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setOpen(true)}>Open date picker</FilledButton>
        {picker}
      </div>
    );
  },
};
