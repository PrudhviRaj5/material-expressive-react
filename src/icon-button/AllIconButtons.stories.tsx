import React from 'react';

import {IconButton} from './IconButton';
import {Icon} from '../icon';

const meta = {
  title: 'icon-button/All IconButtons',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    icon: {control: 'text'},
    selectedIcon: {control: 'text'},
    disabled: {control: 'boolean'},
    softDisabled: {control: 'boolean'},
    type: {control: {type: 'select'}, options: ['round', 'square']},
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    width: {control: {type: 'select'}, options: ['narrow', 'default', 'wide']},
  },
};

export default meta;

export const Default = {
  args: {
    icon: '',
    selectedIcon: '',
    disabled: false,
    softDisabled: false,
    type: 'round',
    size: 'medium',
    width: 'default',
  },
  render: ({icon, selectedIcon, disabled, softDisabled, type, size, width}) => {
    const styles = {
      padding: 24,
      maxWidth: 1100,
      margin: '0 auto',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 24,
    };

    const row = {
      display: 'flex',
      gap: 32,
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    };

    const column = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      minWidth: 120,
    };

    const h2 = {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      margin: 0,
    };

    const label = {
      margin: 0,
      color: 'var(--md-sys-color-on-surface)',
    };

    const iconName = icon || 'settings';
    const selectedIconName = selectedIcon || 'check';

    const common = {disabled, softDisabled, type, size, width};
    const commonToggle = {
      ...common,
      toggle: true,
      selected: false,
    };

    const linkProps = {
      href: 'https://google.com',
      target: '_blank',
      disabled: false,
      softDisabled: false,
    };

    return (
      <div style={styles}>
        <div style={{display: 'grid', gap: 12}}>
          <p style={h2}>Icon button variants</p>
          <div style={row} className="md-typescale-body-medium">
            <div style={column}>
              <p style={label}>Standard</p>
              <IconButton aria-label="Open settings" variant="standard" {...common}>
                <Icon>{iconName}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <IconButton aria-label="Search" variant="outline" {...common}>
                <Icon>{icon || 'search'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <IconButton aria-label="Complete" variant="filled" {...common}>
                <Icon>{icon || 'done'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <IconButton aria-label="Add new" variant="tonal" {...common}>
                <Icon>{icon || 'add'}</Icon>
              </IconButton>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gap: 12}}>
          <p style={h2}>Toggle icon buttons</p>
          <div style={row}>
            <div style={column}>
              <p style={label}>Standard</p>
              <IconButton
                aria-label="Show password"
                ariaLabelSelected="Hide password"
                variant="standard"
                {...commonToggle}
              >
                <Icon>{icon || 'visibility'}</Icon>
                <Icon slot="selected">{selectedIcon || 'visibility_off'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <IconButton
                aria-label="Play"
                ariaLabelSelected="Pause"
                variant="outline"
                {...commonToggle}
              >
                <Icon>{icon || 'play_arrow'}</Icon>
                <Icon slot="selected">{selectedIcon || 'pause'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <IconButton
                aria-label="Show more"
                ariaLabelSelected="Show less"
                variant="filled"
                {...commonToggle}
              >
                <Icon>{icon || 'expand_more'}</Icon>
                <Icon slot="selected">{selectedIcon || 'expand_less'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <IconButton
                aria-label="Open menu"
                ariaLabelSelected="Close menu"
                variant="tonal"
                {...commonToggle}
              >
                <Icon>{icon || 'menu'}</Icon>
                <Icon slot="selected">{selectedIcon || 'close'}</Icon>
              </IconButton>
            </div>
          </div>

          <div style={row}>
            <div style={column}>
              <p style={label}>
                Selected
              </p>
              <IconButton variant="standard" toggle selected aria-label="Unselected" ariaLabelSelected="Selected" {...common}>
                <Icon>close</Icon>
                <Icon slot="selected">check</Icon>
              </IconButton>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gap: 12}}>
          <p style={h2}>Links</p>
          <div style={row}>
            <div style={column}>
              <p style={label}>Standard</p>
              <IconButton aria-label="Go home" variant="standard" {...linkProps}>
                <Icon>{icon || 'home'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <IconButton aria-label="Open new tab" variant="outline" {...linkProps}>
                <Icon>{icon || 'open_in_new'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <IconButton aria-label="Download Google" variant="filled" {...linkProps}>
                <Icon>{icon || 'download'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <IconButton aria-label="Logout" variant="tonal" {...linkProps}>
                <Icon>{icon || 'logout'}</Icon>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
