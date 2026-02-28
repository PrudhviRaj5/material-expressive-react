import React from 'react';

import {BrandedFab} from './BrandedFab';
import {Fab} from './Fab';
import {Icon} from '../icon';

const SlotSvg = (props: React.SVGProps<SVGSVGElement> & {slot?: string}) => {
  return <svg {...props} />;
};

const meta = {
  title: 'fab/AllFabs',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
};

export default meta;

const GOOGLE_PLUS = (
  <SlotSvg
    slot="icon"
    viewBox="0 0 36 36"
    aria-hidden="true"
    width="36"
    height="36"
  >
    <path fill="var(--md-sys-color-secondary)" d="M16 16v14h4V20z" />
    <path fill="var(--md-sys-color-primary)" d="M30 16H20l-4 4h14z" />
    <path fill="var(--md-sys-color-tertiary)" d="M6 16v4h10l4-4z" />
    <path
      fill="color-mix(in srgb, var(--md-sys-color-primary) 55%, var(--md-sys-color-tertiary))"
      d="M20 16V6h-4v14z"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </SlotSvg>
);

export const Default = {
  render: () => {
    const pageStyle: React.CSSProperties = {
      padding: 24,
      maxWidth: 1100,
      margin: '0 auto',
      boxSizing: 'border-box',
      display: 'grid',
      gap: 28,
    };

    const sectionStyle: React.CSSProperties = {
      display: 'grid',
      gap: 12,
    };

    const h2Style: React.CSSProperties = {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      margin: 0,
    };

    const h3Style: React.CSSProperties = {
      fontSize: 16,
      lineHeight: '20px',
      fontWeight: 600,
      margin: 0,
    };

    const rowStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center',
    };

    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <p style={h2Style}>FAB</p>
          <div style={rowStyle}>
            <Fab aria-label="Edit">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab lowered aria-label="Edit">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab label="Edit" aria-label="Edit Comment">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab label="Reroute" aria-label="Reroute" />
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={h3Style}>Colors</p>
          <div style={rowStyle}>
            <Fab variant="surface" aria-label="Surface">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab variant="primary" aria-label="Primary">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab variant="secondary" aria-label="Secondary">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab variant="tertiary" aria-label="Tertiary">
              <Icon slot="icon">edit</Icon>
            </Fab>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={h3Style}>Sizes</p>
          <div style={rowStyle}>
            <Fab size="small" touchTarget="none" aria-label="Small (no touch target)">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab size="small" aria-label="Small">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab aria-label="Medium">
              <Icon slot="icon">edit</Icon>
            </Fab>
            <Fab size="large" aria-label="Large">
              <Icon slot="icon">edit</Icon>
            </Fab>
          </div>
        </div>

        <div style={sectionStyle}>
          <p style={h2Style}>Branded FAB</p>
          <div style={rowStyle}>
            <BrandedFab aria-label="Add">{GOOGLE_PLUS}</BrandedFab>
            <BrandedFab label="Add" aria-label="Add">{GOOGLE_PLUS}</BrandedFab>
            <BrandedFab size="large" aria-label="Add">{GOOGLE_PLUS}</BrandedFab>
            <BrandedFab size="large" label="Add" aria-label="Add">{GOOGLE_PLUS}</BrandedFab>
          </div>
        </div>
      </div>
    );
  },
};
