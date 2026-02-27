import React from 'react';

import {action} from '@storybook/addon-actions';

import {List} from './List';
import {IconListItem} from './IconListItem';
import {ImageListItem} from './ImageListItem';

const meta = {
  title: 'list/List',
  component: List,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    width: {control: {type: 'number', min: 200, max: 640, step: 10}},
    gap: {control: {type: 'number', min: 0, max: 24, step: 1}},
    size: {control: {type: 'select'}, options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge']},
    variant: {control: {type: 'select'}, options: ['standard', 'vibrant']},
    selectType: {control: {type: 'select'}, options: ['single', 'multi']},
  },
};

export default meta;

export const Default = {
  args: {
    width: 300,
    gap: 5,
    size: 'Medium',
    variant: 'standard',
    selectType: 'single',
  },
  render: ({selectType, ...args}) => {
    const onItemClick = action('item-click');

    const [selected, setSelected] = React.useState<string[]>(['2']);
    const toggle = (id: string) => {
      setSelected((prev) => {
        if (selectType === 'single') return [id];
        return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      });
    };

    const surface = {
      padding: 28,
      borderRadius: 24,
      display: 'flex',
      gap: 36,
      alignItems: 'flex-start',
    } as const;

    return (
      <div style={surface}>
        <List {...args} selectType={selectType} aria-label="Icon list">
          {[
            {id: '1', headline: 'Label text', supportText: undefined},
            {id: '2', headline: 'Label text', supportText: undefined},
            {id: '3', headline: 'Label text', supportText: undefined},
            {id: '4', headline: 'Label text', supportText: undefined},
            {id: '5', headline: 'Label text', supportText: undefined},
            {id: '6', headline: 'Label text', supportText: undefined},
          ].map((item, idx) => (
            <IconListItem
              key={item.id}
              headline={item.headline}
              supportText={item.supportText}
              leadingIcon={idx % 2 === 0 ? 'star' : 'person'}
              leadingIconContainer={idx % 3 === 0 ? 'circle' : 'none'}
              trailingText={idx === 0 ? '100+' : '100+'}
              trailingIcon="chevron_right"
              isSelected={selected.includes(item.id)}
              onClick={() => {
                onItemClick(item.id);
                toggle(item.id);
              }}
            />
          ))}
        </List>

        <List {...args} selectType={selectType} aria-label="Image list">
          {[
            {id: 'a', headline: 'List item 1', supportText: 'Overline'},
            {id: 'b', headline: 'List item 2', supportText: 'Overline'},
            {id: 'c', headline: 'List item 3', supportText: 'Overline'},
          ].map((item) => (
            <ImageListItem
              key={item.id}
              imgURL="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=240&q=60"
              headline={item.headline}
              supportText={item.supportText}
              trailingText="100+"
              trailingIcon="star"
              isSelected={selected.includes(item.id)}
              onClick={() => {
                onItemClick(item.id);
                toggle(item.id);
              }}
            />
          ))}
        </List>
      </div>
    );
  },
};
