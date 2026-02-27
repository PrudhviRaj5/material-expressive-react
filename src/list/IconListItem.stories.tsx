import React from 'react';

import {action} from '@storybook/addon-actions';

import {IconListItem} from './IconListItem';
import {List} from './List';

const meta = {
  title: 'list/IconListItem',
  component: IconListItem,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    type: {control: {type: 'select'}, options: ['text', 'button', 'link']},
    href: {control: 'text'},
    leadingIcon: {control: 'text'},
    leadingIconContainer: {
      control: {type: 'select'},
      options: ['none', 'square', 'circle'],
    },
    trailingText: {control: 'text'},
    trailingIcon: {control: 'text'},
    selectedTrailingIcon: {control: 'text'},
    headline: {control: 'text'},
    supportText: {control: 'text'},
    isSelected: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    type: 'button',
    href: '',
    leadingIcon: 'person',
    leadingIconContainer: 'none',
    trailingText: '100+',
    trailingIcon: 'star',
    selectedTrailingIcon: 'check',
    headline: 'Label text',
    supportText: 'Supporting line text, ...',
    isSelected: false,
    onClick: action('click'),
  },
  render: ({type, href, ...args}: any) => {
    const resolvedHref = type === 'link' ? href || 'https://example.com' : undefined;
    return (
      <List aria-label="Icon list" width={360} gap={6}>
        <IconListItem
          {...args}
          type={type}
          href={resolvedHref}
          onClick={(ev: any) => {
            if (type === 'link') ev?.preventDefault?.();
            args.onClick?.(ev);
          }}
        />
      </List>
    );
  },
};
