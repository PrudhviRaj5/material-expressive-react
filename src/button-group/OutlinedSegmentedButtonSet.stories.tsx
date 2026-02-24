import React from 'react';

import {action} from '@storybook/addon-actions';

import {Icon} from '../icon';
import {OutlinedSegmentedButtonSet} from './OutlinedSegmentedButtonSet';
import {OutlinedSegmentedButton} from './OutlinedSegmentedButton';

const meta = {
  title: 'button-group/OutlinedSegmentedButtonSet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
        code: '<OutlinedSegmentedButtonSet />',
      },
    },
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    selectType: {control: {type: 'select'}, options: ['single', 'multi']},
    selectedIcon: {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    size: 'medium',
    selectType: 'single',
    selectedIcon: 'check',
  },
  render: ({size, selectType, selectedIcon}) => {
    const log = action('click');

    const page = {
      display: 'grid',
      gap: 22,
      justifyItems: 'start',
    };

    const h = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const section = {
      display: 'grid',
      gap: 14,
    };

    const row = {
      display: 'grid',
      gap: 12,
    };

    const makeDefaults = (count) => {
      if (selectType === 'multi') return ['0'];
      return '0';
    };

    const OnlyIcons = () => {
      const values = ['0', '1', '2', '3'];
      const icons = ['star', 'alarm', 'bluetooth', 'flashlight_on'];
      const [v, setV] = React.useState(makeDefaults(4));

      return (
        <OutlinedSegmentedButtonSet
          size={size}
          selectType={selectType}
          selectedIcon={selectedIcon}
          value={v}
          onChange={setV}
          onClick={(val, nextSelected) => log({val, nextSelected})}
        >
          {values.map((val, i) => (
            <OutlinedSegmentedButton key={val} value={val} icon={icons[i] ?? 'star'} />
          ))}
        </OutlinedSegmentedButtonSet>
      );
    };

    const OnlyLabels = () => {
      const values = ['0', '1', '2', '3'];
      const [v, setV] = React.useState(makeDefaults(4));

      return (
        <OutlinedSegmentedButtonSet
          size={size}
          selectType={selectType}
          selectedIcon={selectedIcon}
          value={v}
          onChange={setV}
          onClick={(val, nextSelected) => log({val, nextSelected})}
        >
          {values.map((val) => (
            <OutlinedSegmentedButton key={val} value={val} label="Label" />
          ))}
        </OutlinedSegmentedButtonSet>
      );
    };

    const Both = () => {
      const values = ['0', '1', '2', '3'];
      const icons = ['star', 'alarm', 'bluetooth', 'flashlight_on'];
      const [v, setV] = React.useState(makeDefaults(4));

      return (
        <OutlinedSegmentedButtonSet
          size={size}
          selectType={selectType}
          selectedIcon={selectedIcon}
          value={v}
          onChange={setV}
          onClick={(val, nextSelected) => log({val, nextSelected})}
        >
          {values.map((val, i) => (
            <OutlinedSegmentedButton
              key={val}
              value={val}
              icon={icons[i] ?? 'star'}
              label="Label"
            />
          ))}
        </OutlinedSegmentedButtonSet>
      );
    };

    return (
      <div style={page}>
        <div style={section}>
          <p style={h}>Only Icons</p>
          <div style={row}>
            <OnlyIcons />
          </div>
        </div>

        <div style={section}>
          <p style={h}>Only Labels</p>
          <div style={row}>
            <OnlyLabels />
          </div>
        </div>

        <div style={section}>
          <p style={h}>Both</p>
          <div style={row}>
            <Both />
          </div>
        </div>
      </div>
    );
  },
};
