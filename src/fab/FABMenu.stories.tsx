import React from 'react';
import {action} from '@storybook/addon-actions';

import {FABMenu} from './FABMenu';
import {Icon} from '../icon';

type ItemArg = {id: string; label: string; iconName?: string; disabled?: boolean};

const meta = {
  title: 'fab/FABMenu',
  component: FABMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['open'],
    },
    docs: {
      source: {
        code: `<FABMenu\n  open={open}\n  onOpenChange={setOpen}\n  items={[\n    { id: 'first', label: 'First', icon: <Icon>star</Icon> },\n    { id: 'second', label: 'Second', icon: <Icon>star</Icon> },\n    { id: 'third', label: 'Third', icon: <Icon>star</Icon> },\n  ]}\n/>`,
      },
    },
  },
  argTypes: {
    open: {control: {type: 'boolean'}},
    defaultOpen: {table: {disable: true}},
    onOpenChange: {table: {disable: true}},
    onItemSelect: {table: {disable: true}},
    items: {control: false, table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    open: false,
    items: [
      {id: 'first', label: 'First', iconName: 'star'},
      {id: 'second', label: 'Second', iconName: 'star'},
      {id: 'third', label: 'Third', iconName: 'star'},
    ] satisfies ItemArg[],
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const items = (args.items as ItemArg[]) ?? [];
    const [open, setOpen] = React.useState(Boolean(args.open));
    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div style={{height: 520, width: 360, position: 'relative'}}>
        <div style={{position: 'absolute', right: 24, bottom: 24}}>
          <FABMenu
            {...args}
            open={open}
            onOpenChange={(next) => {
              action('open-change')(next);
              setOpen(next);
            }}
            onItemSelect={action('item-select')}
            items={items.map((it) => ({
              id: it.id,
              label: it.label,
              disabled: it.disabled,
              icon: it.iconName ? <Icon>{it.iconName}</Icon> : undefined,
            }))}
          />
        </div>
      </div>
    );
  },
};
