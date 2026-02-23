import React from 'react';

import {List} from './List';
import {ListItem} from './ListItem';
import {Icon} from '../icon';

const meta = {
  title: 'list/List',
  component: List,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    disabled: {control: 'boolean'},
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
    overline: '',
    trailingSupportingText: '',
    leadingIcon: true,
    trailingIcon: false,
  },
  render: ({disabled, overline, trailingSupportingText, leadingIcon, trailingIcon}) => {
    const card = {
      borderRadius: 12,
      outline: '1px solid var(--md-sys-color-outline)',
      maxWidth: 360,
      overflow: 'hidden',
      width: '100%',
      background: 'var(--md-sys-color-surface)',
    };
    const leading = leadingIcon ? <Icon slot="start">event</Icon> : null;
    const trailing = trailingIcon ? <Icon slot="end">link</Icon> : null;
    const overlineSlot = overline ? <div slot="overline">{overline}</div> : null;
    const trailingSupport = trailingSupportingText ? (
      <div slot="trailing-supporting-text">{trailingSupportingText}</div>
    ) : null;

    return (
      <List aria-label="List" style={card}>
        <ListItem disabled={disabled}>
          {leading}
          <div slot="headline">Single line item</div>
          {trailing}
        </ListItem>
        <ListItem disabled={disabled}>
          {leading}
          {overlineSlot}
          <div slot="headline">Two line item</div>
          <div slot="supporting-text">Supporting text</div>
          {trailingSupport}
          {trailing}
        </ListItem>
        <ListItem disabled={disabled}>
          {leading}
          {overlineSlot}
          <div slot="headline">Three line item</div>
          <div slot="supporting-text">
            <div>Second line text</div>
            <div>Third line text</div>
          </div>
          {trailingSupport}
          {trailing}
        </ListItem>
      </List>
    );
  },
};
