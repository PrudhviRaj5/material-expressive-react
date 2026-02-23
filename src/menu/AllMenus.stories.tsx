import React from 'react';
import {action} from '@storybook/addon-actions';

import {FilledButton} from '../button';
import {Icon} from '../icon';
import {IconButton} from '../icon-button';
import {OutlinedTextField} from '../textfield';

import {Menu} from './Menu';
import {MenuItem} from './MenuItem';
import {SubMenu} from './SubMenu';

const meta = {
  title: 'menu/AllMenus',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
};

export default meta;

function MenuSurface({
  width,
  maxHeight = 220,
  theme,
  children,
}: {
  width: number;
  maxHeight?: number;
  theme?: 'neutral' | 'pink';
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const vars: React.CSSProperties =
    theme === 'pink'
      ? {
          // Local theme override to match the Figma pink surfaces.
          ['--md-menu-container-color' as any]: '#ffe1ea',
          ['--md-menu-container-shape' as any]: '16px',
          ['--md-menu-container-elevation' as any]: 2,
        }
      : {
          ['--md-menu-container-color' as any]: 'var(--md-sys-color-surface-container)',
          ['--md-menu-container-shape' as any]: '16px',
          ['--md-menu-container-elevation' as any]: 2,
        };

  return (
    <div style={{position: 'relative', width, height: maxHeight}}>
      <div ref={setAnchorEl} style={{position: 'absolute', inset: 0}} />
      <Menu
        open
        quick
        anchorElement={anchorEl}
        anchorCorner="start-start"
        menuCorner="start-start"
        positioning="absolute"
        stayOpenOnOutsideClick
        stayOpenOnFocusout
        skipRestoreFocus
        style={{
          ...vars,
          width,
          maxHeight,
          height: maxHeight,
          overflow: 'hidden',
        }}
        onCloseMenu={action('close-menu')}
      >
        {children}
      </Menu>
    </div>
  );
}

function Item({
  label,
  selected,
  leadingIcon,
  trailingIcon,
  keepOpen = true,
  selectedIcon = 'start',
}: {
  label: string;
  selected?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  keepOpen?: boolean;
  selectedIcon?: 'start' | 'end' | 'none';
}) {
  const startIcon =
    selected && selectedIcon === 'start' ? 'check' : leadingIcon;
  const endIcon =
    selected && selectedIcon === 'end' ? 'check' : trailingIcon;

  return (
    <MenuItem selected={selected} keepOpen={keepOpen}>
      {startIcon ? <Icon slot="start">{startIcon}</Icon> : null}
      <div slot="headline">{label}</div>
      {endIcon ? <Icon slot="end">{endIcon}</Icon> : null}
    </MenuItem>
  );
}

export const Default = {
  render: () => {
    const page = {
      padding: 28,
      boxSizing: 'border-box',
      display: 'grid',
      gap: 26,
      alignContent: 'start',
    };

    const heading = {
      margin: 0,
      fontSize: 14,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const h2 = {
      margin: 0,
      fontSize: 18,
      lineHeight: '24px',
      fontWeight: 650,
      color: 'var(--md-sys-color-on-surface)',
      textAlign: 'center' as const,
    };

    const topGrid = {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 26,
      alignItems: 'start',
    };

    const configRow = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))',
      gap: 24,
    };

    const configCard = {
      position: 'relative' as const,
      borderRadius: 18,
      padding: 14,
      background: 'var(--md-sys-color-surface)',
      outline: '1px solid var(--md-sys-color-outline-variant)',
      boxShadow: '0 10px 26px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.08)',
      display: 'grid',
      gap: 10,
      minHeight: 320,
    };

    const exampleGrid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))',
      gap: 24,
      justifyItems: 'center',
    };

    const chip = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 28,
      paddingInline: 12,
      borderRadius: 999,
      background: 'rgba(103, 80, 164, 0.15)',
      color: 'var(--md-sys-color-on-surface-variant)',
      fontWeight: 600,
      fontSize: 12,
      width: 'fit-content',
    };

    const basicTitleWrap = {
      display: 'grid',
      placeItems: 'center',
      marginTop: 6,
    };

    const dashed = {
      borderRadius: 18,
      border: '2px dashed rgba(103, 80, 164, 0.35)',
      padding: 20,
      display: 'grid',
      gap: 18,
      background: 'linear-gradient(180deg, rgba(103, 80, 164, 0.04), rgba(103, 80, 164, 0.00))',
    };

    const sectionLabel = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      color: 'var(--md-sys-color-primary)',
      fontWeight: 650,
      width: 'fit-content',
    };

    const diamond = {
      width: 10,
      height: 10,
      transform: 'rotate(45deg)',
      background: 'var(--md-sys-color-primary)',
      borderRadius: 2,
      flex: 'none',
    };

    const variantsGrid = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: 22,
      alignItems: 'start',
    };

    const panelTitle = {
      margin: 0,
      fontSize: 12,
      letterSpacing: '0.4px',
      fontWeight: 650,
      textTransform: 'uppercase',
      color: 'var(--md-sys-color-on-surface-variant)',
    };

    const clearButton = (
      <IconButton slot="trailing-icon" aria-label="Clear">
        <Icon>close</Icon>
      </IconButton>
    );

    return (
      <div style={page}>
        <div style={topGrid}>
          <div style={{display: 'grid', gap: 16}}>
            <div style={heading}>Configurations</div>

            <div style={configRow}>
              <div style={configCard}>
                <OutlinedTextField
                  label="Label"
                  value="Input"
                  hasTrailingIcon
                  aria-label="Menu input"
                  style={{width: '100%'}}
                >
                  {clearButton}
                </OutlinedTextField>

                <MenuSurface width={260} maxHeight={220}>
                  <Item label="Label" />
                  <Item label="Label" />
                  <Item label="Label" selected />
                  <Item label="Label" />
                  <Item label="Label" />
                  <Item label="Label" />
                </MenuSurface>
              </div>

              <div style={configCard}>
                <OutlinedTextField
                  label="Label"
                  value="Input"
                  hasLeadingIcon
                  hasTrailingIcon
                  aria-label="Search menu input"
                  style={{width: '100%'}}
                >
                  <Icon slot="leading-icon">search</Icon>
                  {clearButton}
                </OutlinedTextField>

                <MenuSurface width={260} maxHeight={220}>
                  <Item label="Label" leadingIcon="add_circle" />
                  <Item label="Label" leadingIcon="add_circle" />
                  <Item label="Label" selected />
                  <Item label="Label" leadingIcon="add_circle" />
                </MenuSurface>
              </div>
            </div>
          </div>

          <div style={{display: 'grid', gap: 16}}>
            <div style={h2}>Examples &amp; Usage</div>

            <div style={exampleGrid}>
              <div style={{display: 'grid', gap: 10, justifyItems: 'start'}}>
                <div style={chip}>
                  <Icon style={{fontSize: 16}} aria-hidden>
                    star
                  </Icon>
                  Label
                </div>

                <MenuSurface width={220} maxHeight={196}>
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>
              </div>

              <div style={{display: 'grid', gap: 10, justifyItems: 'end'}}>
                <FilledButton
                  id="example-menu-anchor"
                  onClick={action('anchor-click')}
                  style={{borderRadius: 14}}
                >
                  <Icon slot="icon">star</Icon>
                </FilledButton>

                <Menu
                  open
                  quick
                  anchor="example-menu-anchor"
                  anchorCorner="end-start"
                  menuCorner="start-start"
                  positioning="absolute"
                  stayOpenOnOutsideClick
                  stayOpenOnFocusout
                  skipRestoreFocus
                  style={{
                    ['--md-menu-container-color' as any]: '#ffe1ea',
                    ['--md-menu-container-shape' as any]: '16px',
                    minWidth: 220,
                  }}
                >
                  <MenuItem keepOpen>
                    <div slot="headline">Label</div>
                    <Icon slot="end">chevron_right</Icon>
                  </MenuItem>
                  <MenuItem keepOpen selected>
                    <div slot="headline">Label</div>
                    <Icon slot="end">check</Icon>
                  </MenuItem>
                  <MenuItem keepOpen>
                    <div slot="headline">Label</div>
                    <Icon slot="end">chevron_right</Icon>
                  </MenuItem>
                </Menu>
              </div>

              <div style={{display: 'grid', gap: 10}}>
                <MenuSurface width={220} maxHeight={196}>
                  <SubMenu hoverOpenDelay={250} hoverCloseDelay={250}>
                    <MenuItem slot="item" keepOpen>
                      <Icon slot="start">add_circle</Icon>
                      <div slot="headline">Label</div>
                      <Icon slot="end">chevron_right</Icon>
                    </MenuItem>
                    <Menu slot="menu" quick>
                      <MenuItem keepOpen>
                        <div slot="headline">Label</div>
                      </MenuItem>
                      <MenuItem keepOpen>
                        <div slot="headline">Label</div>
                      </MenuItem>
                    </Menu>
                  </SubMenu>

                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>
              </div>

              <div style={{display: 'grid', gap: 10}}>
                <MenuSurface width={220} maxHeight={196} theme="pink">
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" selected selectedIcon="end" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>
              </div>
            </div>
          </div>
        </div>

        <div style={basicTitleWrap}>
          <div style={h2}>Basic Variants</div>
        </div>

        <div style={dashed}>
          <div style={sectionLabel}>
            <span style={diamond} />
            Menu
          </div>

          <div style={variantsGrid}>
            <div style={{display: 'grid', gap: 12}}>
              <p style={panelTitle}>Neutral</p>
              <div style={variantsGrid}>
                <MenuSurface width={220} maxHeight={320}>
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={220}>
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={220}>
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={260}>
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>
              </div>
            </div>

            <div style={{display: 'grid', gap: 12}}>
              <p style={panelTitle}>Pink</p>
              <div style={variantsGrid}>
                <MenuSurface width={220} maxHeight={320} theme="pink">
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={220} theme="pink">
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={220} theme="pink">
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" selected selectedIcon="end" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>

                <MenuSurface width={220} maxHeight={260} theme="pink">
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                  <Item label="Label" leadingIcon="add_circle" trailingIcon="chevron_right" />
                </MenuSurface>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
