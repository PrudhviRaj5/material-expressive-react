import React from 'react';
import {action} from '@storybook/addon-actions';

import {Ripple} from './Ripple';

const meta = {
  title: 'ripple/Ripple',
  component: Ripple,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['disabled'],
    },
  },
  argTypes: {
    disabled: {control: 'boolean'},
  },
};

export default meta;

// Keep a `Default` story export for stable story ids (HMR/back button).
export const Default = {
  args: {
    disabled: false,
  },
  render: ({disabled}: {disabled: boolean}) => (
    <div style={grid}>
      <div style={container}>
        <Ripple disabled={disabled} onClick={onRippleClick} />
        <button type="button" style={button} disabled={disabled}>
          Hover / press
        </button>
      </div>
    </div>
  ),
};

const onRippleClick = action('ripple click');

const grid: React.CSSProperties = {
  display: 'grid',
  gap: 18,
  width: 540,
  maxWidth: '100%',
};

const container: React.CSSProperties = {
  position: 'relative',
  width: 260,
  height: 72,
  borderRadius: 18,
  outline: '1px solid var(--md-sys-color-outline)',
  background: 'var(--md-sys-color-surface)',
  display: 'grid',
  placeItems: 'center',
};

const dashedContainer: React.CSSProperties = {
  ...container,
  outline: '1px dashed var(--md-sys-color-outline)',
};

const button: React.CSSProperties = {
  appearance: 'none',
  border: 'none',
  background: 'transparent',
  font: 'inherit',
  color: 'inherit',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
};

export const InputAttach = {
  name: 'InputAttach',
  args: {
    disabled: false,
  },
  render: ({disabled}: {disabled: boolean}) => (
    <div style={grid}>
      <div style={dashedContainer}>
        <Ripple for="ripple-control" disabled={disabled} />
        <input
          id="ripple-control"
          aria-label="Ripple control"
          disabled={disabled}
          style={{
            width: 180,
            height: 38,
            borderRadius: 999,
            border: '1px solid var(--md-sys-color-outline)',
            padding: '0 12px',
            background: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
          }}
          defaultValue="Focus me"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ripple attaches to a control via `for`/`htmlFor`.',
      },
    },
  },
};

export const ImperativeAttach = {
  name: 'ImperativeAttach',
  args: {
    disabled: false,
  },
  render: ({disabled}: {disabled: boolean}) => {
    const controlRef = React.useRef<HTMLButtonElement | null>(null);
    const rippleRef = React.useRef<
      (HTMLElement & {attach: (el: HTMLElement) => void; detach: () => void}) | null
    >(null);

    React.useEffect(() => {
      const ripple = rippleRef.current;
      const control = controlRef.current;
      if (!ripple || !control) return;
      ripple.attach(control);
      return () => ripple.detach();
    }, []);

    return (
      <div style={grid}>
        <div style={container}>
          <Ripple ref={rippleRef as any} disabled={disabled} />
          <button
            ref={controlRef}
            type="button"
            style={button}
            disabled={disabled}
          >
            Imperative attach
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Attach/detach imperatively using the underlying ripple methods.',
      },
    },
  },
};

export const Unbound = {
  name: 'Unbound',
  args: {
    disabled: false,
  },
  render: ({disabled}: {disabled: boolean}) => (
    <div style={grid}>
      <button
        type="button"
        disabled={disabled}
        style={{
          borderRadius: '50%',
          height: 36,
          width: 36,
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
          position: 'relative',
          border: '1px solid var(--md-sys-color-outline)',
          background: 'var(--md-sys-color-surface)',
        }}
      >
        <Ripple
          className="unbounded"
          disabled={disabled}
          style={{
            borderRadius: '50%',
            inset: 'unset',
            height: 72,
            width: 72,
          }}
        />
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An unbounded ripple (larger than its control) with custom `style` for shape/size.',
      },
    },
  },
};
