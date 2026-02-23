import React from 'react';

import {action} from '@storybook/addon-actions';

import {ListItem} from './ListItem';
import {List} from './List';
import {Icon} from '../icon';
import {Divider} from '../divider';

const meta = {
  title: 'list/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    disabled: {control: 'boolean'},
    type: {control: {type: 'select'}, options: ['text', 'button', 'link']},
    href: {control: 'text'},
    target: {control: 'text'},
    overline: {control: 'text'},
    trailingSupportingText: {control: 'text'},
    leadingIcon: {control: 'boolean'},
    trailingIcon: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    disabled: false,
    type: 'button',
    href: '',
    target: '',
    overline: '',
    trailingSupportingText: '',
    leadingIcon: true,
    trailingIcon: true,
    onRequestActivation: action('request-activation'),
  },
  render: ({type, href, target, overline, trailingSupportingText, leadingIcon, trailingIcon, ...rest}) => {
    const card = {
      borderRadius: 12,
      outline: '1px solid var(--md-sys-color-outline)',
      maxWidth: 360,
      overflow: 'hidden',
      width: '100%',
      background: 'var(--md-sys-color-surface)',
    };

    const resolvedHref = type === 'link' ? (href || 'https://google.com') : undefined;
    const resolvedTarget = type === 'link' ? (target || '_blank') : undefined;

    const overlineSlot = overline ? <div slot="overline">{overline}</div> : null;
    const trailingSupport = trailingSupportingText ? (
      <div slot="trailing-supporting-text">{trailingSupportingText}</div>
    ) : null;

    const leading = leadingIcon ? <Icon slot="start">event</Icon> : null;
    const trailing = trailingIcon ? <Icon slot="end">star</Icon> : null;

    return (
      <List aria-label="List item" style={card}>
        <ListItem
          {...rest}
          type={type}
          href={resolvedHref}
          target={resolvedTarget}
        >
          {leading}
          {overlineSlot}
          <div slot="headline">Headline</div>
          <div slot="supporting-text">Supporting text</div>
          {trailingSupport}
          {trailing}
        </ListItem>
        <Divider />
        <ListItem type="text">
          <div slot="headline">Text-only item</div>
        </ListItem>
      </List>
    );
  },
};
