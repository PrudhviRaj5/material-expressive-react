import React from 'react';

import {Ripple} from './Ripple';

const meta = {
  title: 'ripple/Ripple',
  component: Ripple,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    disabled: {control: 'boolean'},
  },
};

export default meta;

export const Default = {
  args: {
    disabled: false,
  },
  render: ({disabled}) => {
    const grid = {
      display: 'grid',
      gap: 18,
      width: 540,
      maxWidth: '100%',
    };

    const sectionTitle = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const row = {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      flexWrap: 'wrap',
    };

    const container = {
      position: 'relative',
      width: 220,
      height: 64,
      borderRadius: 16,
      outline: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      display: 'grid',
      placeItems: 'center',
    };

    const button = {
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      font: 'inherit',
      color: 'inherit',
      width: '100%',
      height: '100%',
      cursor: disabled ? 'not-allowed' : 'pointer',
    };

    const refContainer = {
      position: 'relative',
      width: 220,
      height: 64,
      borderRadius: 16,
      outline: '1px dashed var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
      display: 'grid',
      placeItems: 'center',
    };

    const unboundedButton = {
      borderRadius: '50%',
      height: 32,
      width: 32,
      display: 'flex',
      placeContent: 'center',
      placeItems: 'center',
      position: 'relative',
      border: '1px solid var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface)',
    };

    const unboundedRipple = {
      borderRadius: '50%',
      inset: 'unset',
      height: 64,
      width: 64,
    };

    const Imperative = () => {
      const controlRef = React.useRef<HTMLButtonElement | null>(null);
      const rippleRef = React.useRef<HTMLElement & {attach: (el: HTMLElement) => void; detach: () => void} | null>(null);

      React.useEffect(() => {
        const ripple = rippleRef.current;
        const control = controlRef.current;
        if (!ripple || !control) return;
        ripple.attach(control);
        return () => ripple.detach();
      }, []);

      return (
        <div style={container}>
          <Ripple ref={rippleRef} disabled={disabled} />
          <button ref={controlRef} type="button" style={button} disabled={disabled}>
            Imperative attach
          </button>
        </div>
      );
    };

    return (
      <div style={grid}>
        <div style={{display: 'grid', gap: 10}}>
          <p style={sectionTitle}>Attached to parent</p>
          <div style={row}>
            <div style={container}>
              <Ripple disabled={disabled} />
              <button type="button" style={button} disabled={disabled}>
                Hover / press
              </button>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <p style={sectionTitle}>Attached via for</p>
          <div style={row}>
            <div style={refContainer}>
              <Ripple for="ripple-control" disabled={disabled} />
              <input
                id="ripple-control"
                aria-label="Ripple control"
                disabled={disabled}
                style={{
                  width: 160,
                  height: 34,
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
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <p style={sectionTitle}>Imperative attach</p>
          <div style={row}>
            <Imperative />
          </div>
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <p style={sectionTitle}>Unbounded</p>
          <div style={row}>
            <button type="button" style={unboundedButton} disabled={disabled}>
              <Ripple className="unbounded" disabled={disabled} style={unboundedRipple} />
            </button>
          </div>
        </div>
      </div>
    );
  },
};
