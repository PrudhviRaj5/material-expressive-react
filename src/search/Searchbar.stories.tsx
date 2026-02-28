import React from 'react';
import {action} from '@storybook/addon-actions';

import {Searchbar} from './Searchbar';

const meta = {
  title: 'search/Searchbar',
  component: Searchbar,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    leadingIcon: {control: 'text'},
    hintedText: {control: 'text'},
    trailingIcon: {control: 'text'},
    isTrailingAvatar: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    leadingIcon: 'menu',
    hintedText: 'Hinted search text',
    trailingIcon: 'search',
    isTrailingAvatar: true,
    onLeadingIconClick: action('leading-icon-click'),
    onSearchbarClick: action('searchbar-click'),
    onTrailingIconClick: action('trailing-icon-click'),
    onTrailingAvatarClick: action('trailing-avatar-click'),
  },
  render: (args) => {
    const surface = {
      padding: 28,
      borderRadius: 24,
      display: 'grid',
      gap: 16,
      width: 420,
    } as const;

    return (
      <div style={surface}>
        <Searchbar {...args} isTrailingAvatar={true} />
      </div>
    );
  },
};
