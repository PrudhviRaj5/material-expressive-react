import React from 'react';

import {CircularProgress} from './CircularProgress';

const meta = {
  title: 'progress/CircularProgress',
  component: CircularProgress,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    value: {control: {type: 'range', min: 0, max: 1, step: 0.01}},
    max: {control: {type: 'number', min: 0.01, step: 0.01}},
    indeterminate: {control: 'boolean'},
    fourColor: {control: 'boolean'},
    'aria-label': {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    value: 0.75,
    max: 1,
    indeterminate: false,
    fourColor: false,
    'aria-label': 'Page refresh progress',
  },
  render: (args) => {
    const {indeterminate, ...rest} = args;
    const value = indeterminate ? undefined : args.value;
    return <CircularProgress {...rest} indeterminate={indeterminate} value={value} />;
  },
};
