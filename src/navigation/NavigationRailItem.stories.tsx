import React from 'react';

import {NavigationRail} from './NavigationRail';
import {NavigationRailItem} from './NavigationRailItem';
import {Icon} from '../icon';

const meta = {
  title: 'Navigation/NavigationRailItem',
  component: NavigationRailItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['label', 'disabled', 'expanded'],
    },
  },
  argTypes: {
    label: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    expanded: {control: {type: 'boolean'}},
    icon: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Mail',
    disabled: false,
    expanded: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <NavigationRail expanded={args.expanded} value="mail">
      <NavigationRailItem {...args} value="mail" icon={<Icon>mail</Icon>} />
      <NavigationRailItem value="chat" label="Chat" icon={<Icon>chat</Icon>} />
    </NavigationRail>
  ),
};
