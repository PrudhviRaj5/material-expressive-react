import React from 'react';

import {LoadingIndicator} from './LoadingIndicator';

const meta = {
  title: 'progress/LoadingIndicator',
  component: LoadingIndicator,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'variant',
        'visible',
        'showDelay',
        'minHideDelay',
        'indicatorColor',
        'containerColor',
        'indicatorSize',
        'containerWidth',
        'containerHeight',
        'aria-label',
      ],
    },
  },
  argTypes: {
    variant: {control: {type: 'radio'}, options: ['uncontained', 'contained']},
    visible: {control: 'boolean'},
    showDelay: {control: {type: 'number', min: 0, step: 50}},
    minHideDelay: {control: {type: 'number', min: 0, step: 50}},
    indicatorColor: {control: 'color'},
    containerColor: {control: 'color'},
    indicatorSize: {control: {type: 'number', min: 12, step: 1}},
    containerWidth: {control: {type: 'number', min: 12, step: 1}},
    containerHeight: {control: {type: 'number', min: 12, step: 1}},
  },
};

export default meta;

export const Default = {
  args: {
    variant: 'contained',
    visible: true,
    showDelay: 0,
    minHideDelay: 0,
    indicatorColor: '',
    containerColor: '',
    indicatorSize: 38,
    containerWidth: 48,
    containerHeight: 48,
    'aria-label': 'Loading',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [visible, setVisible] = React.useState(Boolean(args.visible));
    React.useEffect(() => {
      setVisible(Boolean(args.visible));
    }, [args.visible]);

    return (
      <div style={{display: 'grid', gap: 16, justifyItems: 'start'}}>
        <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            style={{
              border: '1px solid var(--md-sys-color-outline)',
              borderRadius: 999,
              padding: '8px 12px',
              background: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              cursor: 'pointer',
            }}
          >
            Toggle visible
          </button>
          <span style={{fontSize: 12, opacity: 0.75}}>
            showDelay={args.showDelay}ms, minHideDelay={args.minHideDelay}ms
          </span>
        </div>

        <div style={{display: 'flex', gap: 18, alignItems: 'center'}}>
          <LoadingIndicator
            {...args}
            visible={visible}
            indicatorColor={args.indicatorColor || undefined}
            containerColor={args.containerColor || undefined}
          />

          <LoadingIndicator
            {...args}
            variant="uncontained"
            visible={visible}
            indicatorColor={args.indicatorColor || undefined}
            containerColor={args.containerColor || undefined}
          />
        </div>
      </div>
    );
  },
};
