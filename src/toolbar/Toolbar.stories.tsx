import React from 'react';
import {action} from '@storybook/addon-actions';

import {Toolbar} from './Toolbar';
import {IconButton} from '../icon-button';
import {Icon} from '../icon';

type IconBtnSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

function iconButtonSize(size: string): IconBtnSize {
  switch (size) {
    case 'XSmall':
      return 'xsmall';
    case 'Small':
      return 'small';
    case 'Large':
      return 'large';
    case 'XLarge':
      return 'xlarge';
    case 'Medium':
    default:
      return 'medium';
  }
}

const meta = {
  title: 'Toolbar/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    layout: {control: {type: 'radio'}, options: ['Horizontal', 'Vertical']},
    color: {control: {type: 'radio'}, options: ['Standard', 'Vibrant']},
    size: {
      control: {type: 'select'},
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    variant: {control: {type: 'radio'}, options: ['Floating', 'Docked']},
    dockPosition: {
      control: {type: 'select'},
      options: ['Left', 'Right', 'Top', 'Bottom'],
    },
  },
};

export default meta;

export const Default = {
  args: {
    layout: 'Horizontal',
    color: 'Standard',
    size: 'Medium',
    variant: 'Floating',
    dockPosition: 'Bottom',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const isDocked = args.variant === 'Docked';
    const isHorizontal = args.layout === 'Horizontal';
    const dockIsHorizontal = args.dockPosition === 'Top' || args.dockPosition === 'Bottom';

    const frameStyle: React.CSSProperties = {
      width: '100vw',
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
      background: 'var(--md-sys-color-background, #fffbfe)',
    };

    const dockWrapStyle: React.CSSProperties = isDocked
      ? {
          width: dockIsHorizontal ? 760 : 260,
          height: dockIsHorizontal ? 180 : 520,
          display: 'grid',
          placeItems: 'center',
        }
      : {};

    const toolbarStyle: React.CSSProperties | undefined = isDocked
      ? {
          width: dockIsHorizontal ? '100%' : undefined,
          height: !dockIsHorizontal ? '100%' : undefined,
          justifyContent: isHorizontal ? 'space-between' : 'center',
        }
      : undefined;

    const btnSize = iconButtonSize(args.size);

    return (
      <div style={frameStyle}>
        <div style={dockWrapStyle}>
          <Toolbar {...args} style={toolbarStyle}>
            <IconButton
              aria-label="Share"
              variant="standard"
              size={btnSize}
              onClick={action('share')}
            >
              <Icon>share</Icon>
            </IconButton>
            <IconButton
              aria-label="Comment"
              variant="standard"
              size={btnSize}
              onClick={action('comment')}
            >
              <Icon>comment</Icon>
            </IconButton>
            <IconButton
              aria-label="Download"
              variant="standard"
              size={btnSize}
              onClick={action('download')}
            >
              <Icon>download</Icon>
            </IconButton>
          </Toolbar>
        </div>
      </div>
    );
  },
};

export const Variants = {
  parameters: {
    controls: {disable: true},
  },
  render: () => {
    const frame: React.CSSProperties = {
      width: '100vw',
      minHeight: '100vh',
      padding: 32,
      boxSizing: 'border-box',
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'start',
      gap: 24,
      background: 'var(--md-sys-color-background, #fffbfe)',
    };

    const title: React.CSSProperties = {
      margin: 0,
      fontSize: 28,
      fontWeight: 560,
      letterSpacing: '0.1px',
      color: 'var(--md-sys-color-on-background, #1c1b1f)',
    };

    const grid: React.CSSProperties = {
      width: 'min(1100px, 100%)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28,
    };

    const colTitle: React.CSSProperties = {
      margin: 0,
      fontSize: 18,
      fontWeight: 560,
      letterSpacing: '0.2px',
      color: 'var(--md-sys-color-on-background, #1c1b1f)',
      textAlign: 'center',
    };

    const sectionLabel: React.CSSProperties = {
      margin: '0 0 12px',
      fontSize: 14,
      letterSpacing: '0.2px',
      color: 'var(--md-sys-color-on-surface-variant, #49454f)',
      textAlign: 'center',
    };

    const card: React.CSSProperties = {
      border: '2px dashed rgba(103, 80, 164, 0.35)',
      borderRadius: 18,
      padding: 28,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 28,
      justifyItems: 'center',
      alignContent: 'start',
      minHeight: 560,
    };

    const dockWrap: React.CSSProperties = {
      width: '100%',
      maxWidth: 520,
    };

    const btnSize = 'medium' as const;

    const Buttons = (
      <>
        <IconButton aria-label="Share" variant="standard" size={btnSize}>
          <Icon>share</Icon>
        </IconButton>
        <IconButton aria-label="Comment" variant="standard" size={btnSize}>
          <Icon>comment</Icon>
        </IconButton>
        <IconButton aria-label="Download" variant="standard" size={btnSize}>
          <Icon>download</Icon>
        </IconButton>
      </>
    );

    return (
      <div style={frame}>
        <h1 style={title}>Toolbar</h1>

        <div style={grid}>
          <div style={{display: 'grid', gap: 12}}>
            <p style={colTitle}>Standard</p>
            <div style={card}>
              <div style={{display: 'grid', justifyItems: 'center'}}>
                <p style={sectionLabel}>Floating</p>
                <Toolbar layout="Horizontal" color="Standard" size="Medium" variant="Floating">
                  {Buttons}
                </Toolbar>
              </div>

              <div style={{display: 'grid', justifyItems: 'center', width: '100%'}}>
                <p style={sectionLabel}>Docked</p>
                <div style={dockWrap}>
                  <Toolbar
                    layout="Horizontal"
                    color="Standard"
                    size="Medium"
                    variant="Docked"
                    dockPosition="Bottom"
                    style={{width: '100%', justifyContent: 'space-between'}}
                  >
                    {Buttons}
                  </Toolbar>
                </div>
              </div>

              <div style={{display: 'grid', justifyItems: 'center'}}>
                <p style={sectionLabel}>Floating - Vertical</p>
                <Toolbar layout="Vertical" color="Standard" size="Medium" variant="Floating">
                  {Buttons}
                </Toolbar>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gap: 12}}>
            <p style={colTitle}>Vibrant</p>
            <div style={card}>
              <div style={{display: 'grid', justifyItems: 'center'}}>
                <p style={sectionLabel}>Floating</p>
                <Toolbar layout="Horizontal" color="Vibrant" size="Medium" variant="Floating">
                  {Buttons}
                </Toolbar>
              </div>

              <div style={{display: 'grid', justifyItems: 'center', width: '100%'}}>
                <p style={sectionLabel}>Docked</p>
                <div style={dockWrap}>
                  <Toolbar
                    layout="Horizontal"
                    color="Vibrant"
                    size="Medium"
                    variant="Docked"
                    dockPosition="Bottom"
                    style={{width: '100%', justifyContent: 'space-between'}}
                  >
                    {Buttons}
                  </Toolbar>
                </div>
              </div>

              <div style={{display: 'grid', justifyItems: 'center'}}>
                <p style={sectionLabel}>Floating - Vertical</p>
                <Toolbar layout="Vertical" color="Vibrant" size="Medium" variant="Floating">
                  {Buttons}
                </Toolbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
