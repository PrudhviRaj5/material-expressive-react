import React from 'react';

import {LinearProgress} from './LinearProgress';

const meta = {
  title: 'progress/LinearProgress',
  component: LinearProgress,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    value: {control: {type: 'range', min: 0, max: 1, step: 0.01}},
    buffer: {control: {type: 'range', min: 0, max: 1, step: 0.01}},
    max: {control: {type: 'number', min: 0.01, step: 0.01}},
    indeterminate: {control: 'boolean'},
    fourColor: {control: 'boolean'},
    'aria-label': {control: 'text'},
  },
};

export default meta;

export const Default = {
  args: {
    value: 0.5,
    buffer: 0,
    max: 1,
    indeterminate: false,
    fourColor: false,
    'aria-label': 'Download progress',
    style: {inlineSize: 320},
  },
  render: (args) => {
    const {indeterminate, ...rest} = args;
    const value = indeterminate ? undefined : args.value;
    const buffer = indeterminate ? undefined : args.buffer;
    return <LinearProgress {...rest} indeterminate={indeterminate} value={value} buffer={buffer} />;
  },
};
