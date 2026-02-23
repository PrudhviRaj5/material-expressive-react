import React from 'react';

import {NavigationBar} from './NavigationBar';
import {NavigationBarItem} from './NavigationBarItem';
import {Icon} from '../icon';

const meta = {
  title: 'Navigation/NavigationBarItem',
  component: NavigationBarItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['label', 'disabled', 'variant'],
    },
  },
  argTypes: {
    label: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    variant: {control: {type: 'radio'}, options: ['vertical', 'horizontal']},
    icon: {table: {disable: true}},
    activeIcon: {table: {disable: true}},
    badge: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Label',
    disabled: false,
    variant: 'vertical',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <div style={{width: 520}}>
      <NavigationBar variant={args.variant} activeIndex={0}>
        <NavigationBarItem {...args} icon={<Icon>star</Icon>} />
        <NavigationBarItem label="Second" icon={<Icon>search</Icon>} />
        <NavigationBarItem label="Third" icon={<Icon>person</Icon>} />
      </NavigationBar>
    </div>
  ),
};
