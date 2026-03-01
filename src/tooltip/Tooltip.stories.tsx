import React from 'react';

import {PlainTooltip} from './PlainTooltip';
import {RichTooltip} from './RichTooltip';

const meta = {
  title: 'misc/Tooltip',
  component: PlainTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    width: {control: {type: 'number'}},
  },
};

export default meta;

function SectionLabel({children}: {children: React.ReactNode}) {
  return (
    <div
      style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--md-sys-color-primary)',
          fontSize: 18,
          fontWeight: 560,
          letterSpacing: '0.2px',
        }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 12,
          height: 12,
          background: 'var(--md-sys-color-primary)',
          transform: 'rotate(45deg)',
          borderRadius: 3,
          display: 'inline-block',
        }}
      />
      <span>{children}</span>
    </div>
  );
}

export const Variants = {
  parameters: {
    controls: {disable: true},
  },
  render: () => {
    function HoverTooltip({
      text,
      tooltip,
      pinOnClick = false,
    }: {
      text: string;
      tooltip: React.ReactNode;
      pinOnClick?: boolean;
    }) {
      const reactId = React.useId();
      const tooltipId = `tooltip-${String(reactId).replace(/[:]/g, '')}`;
      const [open, setOpen] = React.useState(false);
      const [pinned, setPinned] = React.useState(false);
      const rootRef = React.useRef<HTMLDivElement | null>(null);

      const isOpen = open || pinned;

      React.useEffect(() => {
        if (!pinned) return;

        const onDocPointerDown = (ev: PointerEvent) => {
          const root = rootRef.current;
          const t = ev.target as Node | null;
          if (!root || !t) return;
          if (!root.contains(t)) {
            setPinned(false);
            setOpen(false);
          }
        };

        document.addEventListener('pointerdown', onDocPointerDown);
        return () => document.removeEventListener('pointerdown', onDocPointerDown);
      }, [pinned]);

      const trigger: React.CSSProperties = {
        color: 'var(--md-sys-color-on-background)',
        fontSize: 16,
        letterSpacing: '0.2px',
        lineHeight: '22px',
        borderBottom:
          '2px dotted color-mix(in srgb, var(--md-sys-color-on-background) 45%, transparent)',
        paddingBottom: 2,
        cursor: 'default',
        outline: 'none',
      };

      const layer: React.CSSProperties = {
        position: 'absolute',
        zIndex: 5,
        top: 'calc(100% + 14px)',
        left: '50%',
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transform: isOpen ? 'translate(-50%, 0)' : 'translate(-50%, -4px)',
        transition: 'opacity 140ms ease, transform 140ms ease',
      };

      return (
        <div
          ref={rootRef}
          style={{position: 'relative', display: 'inline-grid', justifyItems: 'center'}}
        >
          <span
            tabIndex={0}
            aria-describedby={tooltipId}
            style={trigger}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
              if (!pinned) setOpen(false);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              if (!pinned) setOpen(false);
            }}
            onClick={() => {
              if (!pinOnClick) return;
              setPinned(true);
              setOpen(true);
            }}
            onKeyDown={(ev) => {
              if (ev.key === 'Escape') {
                setPinned(false);
                setOpen(false);
              }
            }}
          >
            {text}
          </span>
          <div id={tooltipId} style={layer}>
            {tooltip}
          </div>
        </div>
      );
    }

    const frame: React.CSSProperties = {
      width: '100vw',
      minHeight: '100vh',
      padding: '56px 20px 80px',
      boxSizing: 'border-box',
      display: 'grid',
      justifyItems: 'center',
      alignContent: 'start',
      gap: 80,
      background: 'var(--md-sys-color-background)',
    };

    const heading: React.CSSProperties = {
      margin: 0,
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: '0.2px',
      color: 'var(--md-sys-color-on-background)',
      textAlign: 'center',
    };

    const stack: React.CSSProperties = {
      display: 'grid',
      justifyItems: 'center',
      gap: 22,
    };

    return (
      <div style={frame}>
        <div style={stack}>
          <h2 style={heading}>Rich tooltip</h2>
          <SectionLabel>Rich Tooltip</SectionLabel>

          <div style={{display: 'grid', gap: 26}}>
            <HoverTooltip
              text="Hover for Rich Tooltip (with actions)"
              pinOnClick
              tooltip={
                <RichTooltip width={420}>
                  <div className="mer-rich-tooltip__title">Title</div>
                  <div className="mer-rich-tooltip__supporting-text">
                    Supporting line text lorem ipsum dolor sit amet, consectetur
                  </div>
                  <div className="mer-rich-tooltip__actions">
                    <button
                      type="button"
                      className="mer-rich-tooltip__action-btn"
                      onClick={() => undefined}
                    >
                      Action
                    </button>
                    <button
                      type="button"
                      className="mer-rich-tooltip__action-btn"
                      onClick={() => undefined}
                    >
                      Action
                    </button>
                  </div>
                </RichTooltip>
              }
            />

            <HoverTooltip
              text="Hover for Rich Tooltip (no actions)"
              pinOnClick
              tooltip={
                <RichTooltip width={420}>
                  <div className="mer-rich-tooltip__title">Title</div>
                  <div className="mer-rich-tooltip__supporting-text">
                    Supporting line text lorem ipsum dolor sit amet, consectetur
                  </div>
                </RichTooltip>
              }
            />
          </div>
        </div>

        <div style={stack}>
          <h2 style={heading}>Plain tooltip</h2>
          <SectionLabel>Plain Tooltip</SectionLabel>

          <div style={{display: 'grid', gap: 26, justifyItems: 'center'}}>
            <HoverTooltip
              text="Hover for Plain Tooltip (short)"
              tooltip={<PlainTooltip width={180}>Supporting text</PlainTooltip>}
            />
            <HoverTooltip
              text="Hover for Plain Tooltip (long)"
              tooltip={
                <PlainTooltip width={420}>
                  Supporting text Body text string goes here psum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </PlainTooltip>
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Default = {
  args: {
    width: 420,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--md-sys-color-background)',
      }}
    >
      <PlainTooltip width={args.width}>
        Supporting text Body text string goes here psum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt
      </PlainTooltip>
    </div>
  ),
};

export const RichTooltipWithActions = {
  args: {
    width: 420,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--md-sys-color-background)',
      }}
    >
      <RichTooltip width={args.width}>
        <div className="mer-rich-tooltip__title">Title</div>
        <div className="mer-rich-tooltip__supporting-text">
          Supporting line text lorem ipsum dolor sit amet, consectetur
        </div>
        <div className="mer-rich-tooltip__actions">
          <button type="button" className="mer-rich-tooltip__action-btn" onClick={() => undefined}>
            Action
          </button>
          <button type="button" className="mer-rich-tooltip__action-btn" onClick={() => undefined}>
            Action
          </button>
        </div>
      </RichTooltip>
    </div>
  ),
};
