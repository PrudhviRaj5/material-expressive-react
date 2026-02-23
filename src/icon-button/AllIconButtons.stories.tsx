import React from 'react';

import {FilledIconButton} from './FilledIconButton';
import {FilledTonalIconButton} from './FilledTonalIconButton';
import {IconButton} from './IconButton';
import {OutlinedIconButton} from './OutlinedIconButton';
import {Icon} from '../icon';

const meta = {
  title: 'icon-button/AllIconButtons',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    icon: {control: 'text'},
    selectedIcon: {control: 'text'},
    disabled: {control: 'boolean'},
    softDisabled: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    icon: '',
    selectedIcon: '',
    disabled: false,
    softDisabled: false,
  },
  render: ({icon, selectedIcon, disabled, softDisabled}) => {
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

    const common = {disabled, softDisabled};
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
              <IconButton aria-label="Open settings" {...common}>
                <Icon>{iconName}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <OutlinedIconButton aria-label="Search" {...common}>
                <Icon>{icon || 'search'}</Icon>
              </OutlinedIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <FilledIconButton aria-label="Complete" {...common}>
                <Icon>{icon || 'done'}</Icon>
              </FilledIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <FilledTonalIconButton aria-label="Add new" {...common}>
                <Icon>{icon || 'add'}</Icon>
              </FilledTonalIconButton>
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
                {...commonToggle}
              >
                <Icon>{icon || 'visibility'}</Icon>
                <Icon slot="selected">{selectedIcon || 'visibility_off'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <OutlinedIconButton
                aria-label="Play"
                ariaLabelSelected="Pause"
                {...commonToggle}
              >
                <Icon>{icon || 'play_arrow'}</Icon>
                <Icon slot="selected">{selectedIcon || 'pause'}</Icon>
              </OutlinedIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <FilledIconButton
                aria-label="Show more"
                ariaLabelSelected="Show less"
                {...commonToggle}
              >
                <Icon>{icon || 'expand_more'}</Icon>
                <Icon slot="selected">{selectedIcon || 'expand_less'}</Icon>
              </FilledIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <FilledTonalIconButton
                aria-label="Open menu"
                ariaLabelSelected="Close menu"
                {...commonToggle}
              >
                <Icon>{icon || 'menu'}</Icon>
                <Icon slot="selected">{selectedIcon || 'close'}</Icon>
              </FilledTonalIconButton>
            </div>
          </div>

          <div style={row}>
            <div style={column}>
              <p style={label}>
                Selected
              </p>
              <IconButton toggle selected aria-label="Unselected" ariaLabelSelected="Selected" {...common}>
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
              <IconButton aria-label="Go home" {...linkProps}>
                <Icon>{icon || 'home'}</Icon>
              </IconButton>
            </div>

            <div style={column}>
              <p style={label}>Outlined</p>
              <OutlinedIconButton aria-label="Open new tab" {...linkProps}>
                <Icon>{icon || 'open_in_new'}</Icon>
              </OutlinedIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled</p>
              <FilledIconButton aria-label="Download Google" {...linkProps}>
                <Icon>{icon || 'download'}</Icon>
              </FilledIconButton>
            </div>

            <div style={column}>
              <p style={label}>Filled tonal</p>
              <FilledTonalIconButton aria-label="Logout" {...linkProps}>
                <Icon>{icon || 'logout'}</Icon>
              </FilledTonalIconButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
