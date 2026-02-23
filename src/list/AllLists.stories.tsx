import React from 'react';

import {Icon} from '../icon';
import {List} from './List';
import {ListItem} from './ListItem';

const meta = {
  title: 'list/AllLists',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
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
    const page = {
      padding: 24,
      display: 'grid',
      gap: 20,
      boxSizing: 'border-box',
    };

    const title = {
      fontSize: 22,
      lineHeight: '28px',
      fontWeight: 600,
      margin: 0,
    };

    const sectionTitle = {
      fontSize: 18,
      lineHeight: '22px',
      fontWeight: 600,
      margin: '12px 0 0 0',
    };

    const listCard = {
      borderRadius: 12,
      outline: '1px solid var(--md-sys-color-outline)',
      overflow: 'hidden',
      width: 280,
      background: 'var(--md-sys-color-surface)',
    };

    const header = {
      display: 'grid',
      gap: 12,
      maxWidth: 900,
    };

    const leading = leadingIcon ? <Icon slot="start">event</Icon> : null;
    const trailing = trailingIcon ? <Icon slot="end">link</Icon> : null;
    const overlineSlot = overline ? <div slot="overline">{overline}</div> : null;
    const trailingSupport = trailingSupportingText ? (
      <div slot="trailing-supporting-text">{trailingSupportingText}</div>
    ) : null;

    return (
      <div style={page}>
        <div style={header}>
          <p style={title}>List</p>

          <div style={listCard}>
            <List aria-label="List">
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
          </div>

          <p style={sectionTitle}>Interactive list</p>
          <div style={listCard}>
            <List aria-label="Interactive list">
              <ListItem
                disabled={disabled}
                type="link"
                href="https://google.com"
                target="_blank"
              >
                {leading}
                <div slot="headline">Link item</div>
                <Icon slot="end">link</Icon>
              </ListItem>

              <ListItem disabled={disabled} type="button">
                {leading}
                <div slot="headline">Button item</div>
              </ListItem>

              <ListItem disabled={disabled} type="text">
                {leading}
                <div slot="headline">Non-interactive item</div>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    );
  },
};
