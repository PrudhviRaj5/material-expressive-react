import React from 'react';
import {action} from '@storybook/addon-actions';

import {SearchViewModal} from './SearchViewModal';

const meta = {
  title: 'search/SearchViewModal',
  component: SearchViewModal,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    value: {control: 'text'},
    placeholder: {control: 'text'},
    items: {control: false},
  },
};

export default meta;

export const Default = {
  args: {
    value: 'Input text',
    placeholder: 'Input text',
    items: [
      {
        id: '1',
        headline: 'List item',
        supportText: 'Supporting line text lorem ipsum dolor sit amet',
        leadingIcon: 'person',
      },
      {
        id: '2',
        headline: 'List item',
        supportText: 'Supporting line text lorem ipsum dolor sit amet',
        leadingIcon: 'person',
      },
      {
        id: '3',
        headline: 'List item',
        supportText: 'Supporting line text lorem ipsum dolor sit amet',
        leadingIcon: 'person',
      },
    ],
    onBackClick: action('back-click'),
    onCloseClick: action('close-click'),
    onInput: action('keyboard-input'),
    onKeyDown: action('key-down'),
    onValueChange: action('value-change'),
    onItemClick: action('item-click'),
  },
  render: (args) => {
    const [value, setValue] = React.useState(String(args.value ?? ''));

    React.useEffect(() => {
      setValue(String(args.value ?? ''));
    }, [args.value]);

    const onValueChange = (next: string) => {
      args.onValueChange?.(next);
      setValue(next);
    };

    const surface = {
      padding: 28,
      borderRadius: 24,
      display: 'grid',
      gap: 18,
      justifyItems: 'center',
      width: 420,
    } as const;

    return (
      <div style={surface}>
        <SearchViewModal
          {...args}
          value={value}
          onValueChange={onValueChange}
          onInput={(ev) => {
            args.onInput?.({value: (ev.currentTarget as HTMLInputElement).value});
          }}
          onKeyDown={(ev) => {
            args.onKeyDown?.({key: ev.key, code: ev.code});
          }}
        />
      </div>
    );
  },
};
