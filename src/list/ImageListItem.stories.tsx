import React from 'react';

import {action} from '@storybook/addon-actions';

import {ImageListItem} from './ImageListItem';
import {List} from './List';

const meta = {
  title: 'list/ImageListItem',
  component: ImageListItem,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    type: {control: {type: 'select'}, options: ['text', 'button', 'link']},
    imgURL: {control: 'text'},
    href: {control: 'text'},
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
    imgURL:
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=240&q=60',
    href: '',
    trailingText: '100+',
    trailingIcon: 'star',
    selectedTrailingIcon: 'check',
    headline: 'List item 1',
    supportText: 'Overline',
    isSelected: false,
    onClick: action('click'),
  },
  render: ({type, href, ...args}: any) => {
    const resolvedHref = type === 'link' ? href || 'https://example.com' : undefined;
    return (
      <List aria-label="Image list" width={420} gap={8}>
        <ImageListItem
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
