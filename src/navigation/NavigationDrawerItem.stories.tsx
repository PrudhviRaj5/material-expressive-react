import React from 'react';

import {NavigationDrawer} from './NavigationDrawer';
import {NavigationDrawerItem} from './NavigationDrawerItem';
import {Icon} from '../icon';

const meta = {
  title: 'Navigation/NavigationDrawerItem',
  component: NavigationDrawerItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['label', 'disabled', 'supporting'],
    },
  },
  argTypes: {
    label: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    supporting: {control: {type: 'text'}},
    icon: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Inbox',
    disabled: false,
    supporting: '24',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <NavigationDrawer opened pivot="start" value="inbox">
      <NavigationDrawerItem {...args} value="inbox" icon={<Icon>inbox</Icon>} />
      <NavigationDrawerItem value="outbox" label="Outbox" icon={<Icon>send</Icon>} />
    </NavigationDrawer>
  ),
};
