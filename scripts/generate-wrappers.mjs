import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(new URL('..', import.meta.url).pathname);

/** @type {Array<{group:string; component:string; tag:string; importPath:string; typeName:string; events?:Record<string,string>; hasChildren?:boolean; label?:string}>} */
const COMPONENTS = [
  // Chips
  {
    group: 'chips',
    component: 'ChipSet',
    tag: 'md-chip-set',
    importPath: '@material/web/chips/chip-set.js',
    typeName: 'MdChipSet',
    hasChildren: true,
  },
  {
    group: 'chips',
    component: 'AssistChip',
    tag: 'md-assist-chip',
    importPath: '@material/web/chips/assist-chip.js',
    typeName: 'MdAssistChip',
    hasChildren: true,
    label: 'Assist',
  },
  {
    group: 'chips',
    component: 'FilterChip',
    tag: 'md-filter-chip',
    importPath: '@material/web/chips/filter-chip.js',
    typeName: 'MdFilterChip',
    hasChildren: true,
    label: 'Filter',
  },
  {
    group: 'chips',
    component: 'InputChip',
    tag: 'md-input-chip',
    importPath: '@material/web/chips/input-chip.js',
    typeName: 'MdInputChip',
    hasChildren: true,
    label: 'Input',
  },
  {
    group: 'chips',
    component: 'SuggestionChip',
    tag: 'md-suggestion-chip',
    importPath: '@material/web/chips/suggestion-chip.js',
    typeName: 'MdSuggestionChip',
    hasChildren: true,
    label: 'Suggestion',
  },

  // Stable (from material-web/all.ts)
  {
    group: 'dialog',
    component: 'Dialog',
    tag: 'md-dialog',
    importPath: '@material/web/dialog/dialog.js',
    typeName: 'MdDialog',
    events: {
      open: 'onOpen',
      opened: 'onOpened',
      close: 'onClose',
      closed: 'onClosed',
      cancel: 'onCancel',
    },
    hasChildren: true,
    label: 'Dialog content',
  },
  {
    group: 'divider',
    component: 'Divider',
    tag: 'md-divider',
    importPath: '@material/web/divider/divider.js',
    typeName: 'MdDivider',
  },
  {
    group: 'elevation',
    component: 'Elevation',
    tag: 'md-elevation',
    importPath: '@material/web/elevation/elevation.js',
    typeName: 'MdElevation',
  },
  {
    group: 'fab',
    component: 'Fab',
    tag: 'md-fab',
    importPath: '@material/web/fab/fab.js',
    typeName: 'MdFab',
    hasChildren: true,
    label: 'Edit',
  },
  {
    group: 'fab',
    component: 'BrandedFab',
    tag: 'md-branded-fab',
    importPath: '@material/web/fab/branded-fab.js',
    typeName: 'MdBrandedFab',
    hasChildren: true,
    label: 'Edit',
  },
  {
    group: 'field',
    component: 'FilledField',
    tag: 'md-filled-field',
    importPath: '@material/web/field/filled-field.js',
    typeName: 'MdFilledField',
    hasChildren: true,
    label: 'Field',
  },
  {
    group: 'field',
    component: 'OutlinedField',
    tag: 'md-outlined-field',
    importPath: '@material/web/field/outlined-field.js',
    typeName: 'MdOutlinedField',
    hasChildren: true,
    label: 'Field',
  },
  {
    group: 'focus',
    component: 'FocusRing',
    tag: 'md-focus-ring',
    importPath: '@material/web/focus/md-focus-ring.js',
    typeName: 'MdFocusRing',
  },
  {
    group: 'icon-button',
    component: 'IconButton',
    tag: 'md-icon-button',
    importPath: '@material/web/iconbutton/icon-button.js',
    typeName: 'MdIconButton',
    hasChildren: true,
    label: 'favorite',
  },
  {
    group: 'icon-button',
    component: 'FilledIconButton',
    tag: 'md-filled-icon-button',
    importPath: '@material/web/iconbutton/filled-icon-button.js',
    typeName: 'MdFilledIconButton',
    hasChildren: true,
    label: 'favorite',
  },
  {
    group: 'icon-button',
    component: 'FilledTonalIconButton',
    tag: 'md-filled-tonal-icon-button',
    importPath: '@material/web/iconbutton/filled-tonal-icon-button.js',
    typeName: 'MdFilledTonalIconButton',
    hasChildren: true,
    label: 'favorite',
  },
  {
    group: 'icon-button',
    component: 'OutlinedIconButton',
    tag: 'md-outlined-icon-button',
    importPath: '@material/web/iconbutton/outlined-icon-button.js',
    typeName: 'MdOutlinedIconButton',
    hasChildren: true,
    label: 'favorite',
  },
  {
    group: 'list',
    component: 'List',
    tag: 'md-list',
    importPath: '@material/web/list/list.js',
    typeName: 'MdList',
    hasChildren: true,
  },
  {
    group: 'list',
    component: 'ListItem',
    tag: 'md-list-item',
    importPath: '@material/web/list/list-item.js',
    typeName: 'MdListItem',
    hasChildren: true,
    label: 'List item',
  },
  {
    group: 'menu',
    component: 'Menu',
    tag: 'md-menu',
    importPath: '@material/web/menu/menu.js',
    typeName: 'MdMenu',
    events: {
      opening: 'onOpening',
      opened: 'onOpened',
      closing: 'onClosing',
      closed: 'onClosed',
      'close-menu': 'onCloseMenu',
    },
    hasChildren: true,
  },
  {
    group: 'menu',
    component: 'MenuItem',
    tag: 'md-menu-item',
    importPath: '@material/web/menu/menu-item.js',
    typeName: 'MdMenuItem',
    events: {
      'close-menu': 'onCloseMenu',
    },
    hasChildren: true,
    label: 'Menu item',
  },
  {
    group: 'menu',
    component: 'SubMenu',
    tag: 'md-sub-menu',
    importPath: '@material/web/menu/sub-menu.js',
    typeName: 'MdSubMenu',
    events: {
      'deactivate-items': 'onDeactivateItems',
      'request-activation': 'onRequestActivation',
      'deactivate-typeahead': 'onDeactivateTypeahead',
      'activate-typeahead': 'onActivateTypeahead',
    },
    hasChildren: true,
    label: 'Submenu',
  },
  {
    group: 'progress',
    component: 'CircularProgress',
    tag: 'md-circular-progress',
    importPath: '@material/web/progress/circular-progress.js',
    typeName: 'MdCircularProgress',
  },
  {
    group: 'progress',
    component: 'LinearProgress',
    tag: 'md-linear-progress',
    importPath: '@material/web/progress/linear-progress.js',
    typeName: 'MdLinearProgress',
  },
  {
    group: 'radio',
    component: 'Radio',
    tag: 'md-radio',
    importPath: '@material/web/radio/radio.js',
    typeName: 'MdRadio',
    events: {change: 'onChange', input: 'onInput'},
  },
  {
    group: 'ripple',
    component: 'Ripple',
    tag: 'md-ripple',
    importPath: '@material/web/ripple/ripple.js',
    typeName: 'MdRipple',
  },
  {
    group: 'select',
    component: 'FilledSelect',
    tag: 'md-filled-select',
    importPath: '@material/web/select/filled-select.js',
    typeName: 'MdFilledSelect',
    events: {
      change: 'onChange',
      input: 'onInput',
      opening: 'onOpening',
      opened: 'onOpened',
      closing: 'onClosing',
      closed: 'onClosed',
    },
    hasChildren: true,
  },
  {
    group: 'select',
    component: 'OutlinedSelect',
    tag: 'md-outlined-select',
    importPath: '@material/web/select/outlined-select.js',
    typeName: 'MdOutlinedSelect',
    events: {
      change: 'onChange',
      input: 'onInput',
      opening: 'onOpening',
      opened: 'onOpened',
      closing: 'onClosing',
      closed: 'onClosed',
    },
    hasChildren: true,
  },
  {
    group: 'select',
    component: 'SelectOption',
    tag: 'md-select-option',
    importPath: '@material/web/select/select-option.js',
    typeName: 'MdSelectOption',
    events: {
      'close-menu': 'onCloseMenu',
      'request-selection': 'onRequestSelection',
      'request-deselection': 'onRequestDeselection',
    },
    hasChildren: true,
    label: 'Option',
  },
  {
    group: 'slider',
    component: 'Slider',
    tag: 'md-slider',
    importPath: '@material/web/slider/slider.js',
    typeName: 'MdSlider',
    events: {change: 'onChange', input: 'onInput'},
  },
  {
    group: 'switch',
    component: 'Switch',
    tag: 'md-switch',
    importPath: '@material/web/switch/switch.js',
    typeName: 'MdSwitch',
    events: {change: 'onChange', input: 'onInput'},
  },
  {
    group: 'tabs',
    component: 'Tabs',
    tag: 'md-tabs',
    importPath: '@material/web/tabs/tabs.js',
    typeName: 'MdTabs',
    events: {
      change: 'onChange',
    },
    hasChildren: true,
  },
  {
    group: 'tabs',
    component: 'PrimaryTab',
    tag: 'md-primary-tab',
    importPath: '@material/web/tabs/primary-tab.js',
    typeName: 'MdPrimaryTab',
    hasChildren: true,
    label: 'Tab',
  },
  {
    group: 'tabs',
    component: 'SecondaryTab',
    tag: 'md-secondary-tab',
    importPath: '@material/web/tabs/secondary-tab.js',
    typeName: 'MdSecondaryTab',
    hasChildren: true,
    label: 'Tab',
  },
  {
    group: 'textfield',
    component: 'FilledTextField',
    tag: 'md-filled-text-field',
    importPath: '@material/web/textfield/filled-text-field.js',
    typeName: 'MdFilledTextField',
    events: {change: 'onChange', input: 'onInput'},
  },
  {
    group: 'textfield',
    component: 'OutlinedTextField',
    tag: 'md-outlined-text-field',
    importPath: '@material/web/textfield/outlined-text-field.js',
    typeName: 'MdOutlinedTextField',
    events: {change: 'onChange', input: 'onInput'},
  },

  // Labs
  {
    group: 'labs',
    component: 'Badge',
    tag: 'md-badge',
    importPath: '@material/web/labs/badge/badge.js',
    typeName: 'MdBadge',
    hasChildren: true,
    label: '1',
  },
  {
    group: 'labs',
    component: 'ElevatedCard',
    tag: 'md-elevated-card',
    importPath: '@material/web/labs/card/elevated-card.js',
    typeName: 'MdElevatedCard',
    hasChildren: true,
    label: 'Card',
  },
  {
    group: 'labs',
    component: 'FilledCard',
    tag: 'md-filled-card',
    importPath: '@material/web/labs/card/filled-card.js',
    typeName: 'MdFilledCard',
    hasChildren: true,
    label: 'Card',
  },
  {
    group: 'labs',
    component: 'OutlinedCard',
    tag: 'md-outlined-card',
    importPath: '@material/web/labs/card/outlined-card.js',
    typeName: 'MdOutlinedCard',
    hasChildren: true,
    label: 'Card',
  },
  {
    group: 'labs',
    component: 'Item',
    tag: 'md-item',
    importPath: '@material/web/labs/item/item.js',
    typeName: 'MdItem',
    hasChildren: true,
    label: 'Item',
  },
  {
    group: 'labs',
    component: 'OutlinedSegmentedButton',
    tag: 'md-outlined-segmented-button',
    importPath: '@material/web/labs/segmentedbutton/outlined-segmented-button.js',
    typeName: 'MdOutlinedSegmentedButton',
    hasChildren: true,
    label: 'Option',
  },
  {
    group: 'labs',
    component: 'OutlinedSegmentedButtonSet',
    tag: 'md-outlined-segmented-button-set',
    importPath:
      '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set.js',
    typeName: 'MdOutlinedSegmentedButtonSet',
    events: {
      'segmented-button-set-selection': 'onSelection',
    },
    hasChildren: true,
  },
];

function fileHeader() {
  return `/**\n * This file is generated by scripts/generate-wrappers.mjs\n */\n`;
}

function wrapperSource({group, component, tag, importPath, typeName, events}) {
  // Hand-tuned wrapper for Menu to support `listTabIndex` alias.
  if (group === 'menu' && component === 'Menu') {
    const eventPropNames = events ? Object.values(events) : [];
    const eventProps = events
      ? `\n  ${eventPropNames.map((p) => `${p}?: (event: Event) => void;`).join('\n  ')}\n`
      : '';
    const omitKeys = [...eventPropNames.map((p) => `'${p}'`), `'tabIndex'`].join(
      ' | ',
    );
    const htmlAttributesType = `Omit<WebComponentProps<${typeName}>, ${omitKeys}>`;

    return `${fileHeader()}
import type * as React from 'react';
import {forwardRef} from 'react';

import type {${typeName}} from '${importPath}';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ${component}Props extends ${htmlAttributesType} {
  /** Alias for the menu's \`tabIndex\` used in demos/controls. */
  listTabIndex?: number;
${eventProps}}

export const ${component} = forwardRef<${typeName}, ${component}Props>(function ${component}(
  {children, listTabIndex, ${eventPropNames.join(', ')}, ...rest},
  ref,
) {
  const mergedProps = listTabIndex === undefined ? rest : {...rest, tabIndex: listTabIndex};

  const {ref: mergedRef, domProps} = useWebComponent<${typeName}>(
    {
      tagName: '${tag}',
      importer: () => import('${importPath}'),
      events: ${JSON.stringify(events)},
    },
    {${eventPropNames.join(', ')}, ...mergedProps},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <${tag} ref={mergedRef} {...domProps}>
      {children}
    </${tag}>
  );
});
`;
  }

  const eventPropNames = events ? Object.values(events) : [];
  const eventProps = events
    ? `\n  ${eventPropNames.map((p) => `${p}?: (event: Event) => void;`).join('\n  ')}\n`
    : '';

  const basePropsType = `WebComponentProps<${typeName}>`;

  // Prevent collisions with React's built-in event handler props.
  // (We re-emit them via addEventListener to work reliably with CustomElements.)
  const omitKeys = eventPropNames.length
    ? eventPropNames.map((p) => `'${p}'`).join(' | ')
    : null;

  const htmlAttributesType = omitKeys
    ? `Omit<${basePropsType}, ${omitKeys}>`
    : basePropsType;

  const destructureParts = ['children', ...eventPropNames, '...rest'];
  const destructure = destructureParts.join(', ');
  const propsObject = eventPropNames.length
    ? `{${eventPropNames.join(', ')}, ...rest}`
    : 'rest';
  const optionsEvents = events ? `events: ${JSON.stringify(events)},` : '';

  return `${fileHeader()}
import type * as React from 'react';
import {forwardRef} from 'react';

import type {${typeName}} from '${importPath}';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface ${component}Props extends ${htmlAttributesType} {${eventProps}}

export const ${component} = forwardRef<${typeName}, ${component}Props>(function ${component}(
  {${destructure}},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<${typeName}>(
    {
      tagName: '${tag}',
      importer: () => import('${importPath}'),
      ${optionsEvents}
    },
    ${propsObject},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <${tag} ref={mergedRef} {...domProps}>
      {children}
    </${tag}>
  );
});
`;
}

function storySource({group, component, hasChildren, label, events}) {
  // Hand-tuned stories for Menu components to match material-web demos.
  if (group === 'menu' && component === 'Menu') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {Menu} from './Menu';
import {MenuItem} from './MenuItem';
import {FilledButton} from '../button';

const CORNERS = ['start-start', 'start-end', 'end-start', 'end-end'] as const;
const DEFAULT_FOCUS = ['first-item', 'last-item', 'list-root', 'none'] as const;
const POSITIONING = ['absolute', 'fixed', 'document', 'popover'] as const;

const meta = {
  title: 'menu/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'anchorCorner',
        'menuCorner',
        'defaultFocus',
        'positioning',
        'open',
        'quick',
        'hasOverflow',
        'stayOpenOnOutsideClick',
        'stayOpenOnFocusout',
        'skipRestoreFocus',
        'xOffset',
        'yOffset',
        'noHorizontalFlip',
        'noVerticalFlip',
        'typeaheadDelay',
        'listTabIndex',
      ],
    },
  },
  argTypes: {
    anchorCorner: {control: {type: 'select'}, options: CORNERS},
    menuCorner: {control: {type: 'select'}, options: CORNERS},
    defaultFocus: {control: {type: 'select'}, options: DEFAULT_FOCUS},
    positioning: {control: {type: 'select'}, options: POSITIONING},
    open: {control: {type: 'boolean'}},
    quick: {control: {type: 'boolean'}},
    hasOverflow: {control: {type: 'boolean'}},
    stayOpenOnOutsideClick: {control: {type: 'boolean'}},
    stayOpenOnFocusout: {control: {type: 'boolean'}},
    skipRestoreFocus: {control: {type: 'boolean'}},
    xOffset: {control: {type: 'number'}},
    yOffset: {control: {type: 'number'}},
    noHorizontalFlip: {control: {type: 'boolean'}},
    noVerticalFlip: {control: {type: 'boolean'}},
    typeaheadDelay: {control: {type: 'number'}},
    listTabIndex: {control: {type: 'number'}},
    onOpening: {table: {disable: true}},
    onOpened: {table: {disable: true}},
    onClosing: {table: {disable: true}},
    onClosed: {table: {disable: true}},
    onCloseMenu: {table: {disable: true}},
    anchor: {table: {disable: true}},
    anchorElement: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    anchorCorner: 'end-start',
    menuCorner: 'start-start',
    defaultFocus: 'first-item',
    positioning: 'absolute',
    open: false,
    quick: false,
    hasOverflow: false,
    stayOpenOnOutsideClick: false,
    stayOpenOnFocusout: false,
    skipRestoreFocus: false,
    xOffset: 0,
    yOffset: 0,
    noHorizontalFlip: false,
    noVerticalFlip: false,
    typeaheadDelay: 200,
    listTabIndex: -1,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [open, setOpen] = React.useState(Boolean(args.open));
    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    const defaultFocusIsListRoot = args.defaultFocus === 'list-root';
    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <div style={{fontSize: 12, opacity: 0.75}}>
          Use controls for \`anchorCorner\`, \`menuCorner\`, \`defaultFocus\`, \`positioning\`, and \`open\`.
        </div>
        <div style={{position: 'relative', minHeight: 220}}>
          <FilledButton id="menu-anchor" onClick={() => setOpen((v) => !v)}>
            Toggle menu
          </FilledButton>
          <Menu
            {...args}
            anchor="menu-anchor"
            open={open}
            listTabIndex={args.listTabIndex}
            style={{
              minWidth: 220,
              ...(defaultFocusIsListRoot ? {display: 'flex'} : null),
            }}
            onCloseMenu={(ev) => {
              action('close-menu')(ev);
              setOpen(false);
            }}
            onOpening={action('opening')}
            onOpened={action('opened')}
            onClosing={action('closing')}
            onClosed={action('closed')}
          >
            <MenuItem><div slot="headline">Apple</div></MenuItem>
            <MenuItem><div slot="headline">Banana</div></MenuItem>
            <MenuItem><div slot="headline">Cucumber</div></MenuItem>
          </Menu>
        </div>
      </div>
    );
  },
};
`;
  }

  if (group === 'menu' && component === 'MenuItem') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {MenuItem} from './MenuItem';
import {Menu} from './Menu';
import {FilledButton} from '../button';
import {Icon} from '../icon';

const meta = {
  title: 'menu/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['keepOpen', 'disabled', 'href', 'linkIcon'],
    },
  },
  argTypes: {
    keepOpen: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
    href: {control: {type: 'text'}},
    linkIcon: {name: 'link icon', control: {type: 'text'}},
    onCloseMenu: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    keepOpen: true,
    disabled: true,
    href: 'https://google.com',
    linkIcon: 'open_in_new',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {linkIcon, ...itemArgs} = args;
    const [open, setOpen] = React.useState(true);
    return (
      <span style={{position: 'relative', display: 'inline-block', minHeight: 220}}>
        <FilledButton id="menu-item-anchor" onClick={() => setOpen((v) => !v)}>
          Toggle menu
        </FilledButton>
        <Menu
          anchor="menu-item-anchor"
          open={open}
          onCloseMenu={(ev) => {
            action('close-menu')(ev);
            setOpen(false);
          }}
          style={{minWidth: 260}}>
          <MenuItem
            {...itemArgs}
            target={itemArgs.href ? '_blank' : undefined}
            onCloseMenu={action('close-menu (menu-item)')}>
            <div slot="headline">Menu item</div>
            {itemArgs.href ? <Icon slot="end">{linkIcon}</Icon> : null}
          </MenuItem>
        </Menu>
      </span>
    );
  },
};
`;
  }

  if (group === 'menu' && component === 'SubMenu') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {SubMenu} from './SubMenu';
import {Menu} from './Menu';
import {MenuItem} from './MenuItem';
import {FilledButton} from '../button';
import {Icon} from '../icon';

const CORNERS = ['start-start', 'start-end', 'end-start', 'end-end'] as const;

const meta = {
  title: 'menu/SubMenu',
  component: SubMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'anchorCorner',
        'menuCorner',
        'hoverOpenDelay',
        'hoverCloseDelay',
        'submenuItemIcon',
      ],
    },
  },
  argTypes: {
    anchorCorner: {name: 'submenu.anchorCorner', control: {type: 'select'}, options: CORNERS},
    menuCorner: {name: 'submenu.menuCorner', control: {type: 'select'}, options: CORNERS},
    hoverOpenDelay: {control: {type: 'number'}},
    hoverCloseDelay: {control: {type: 'number'}},
    submenuItemIcon: {name: 'submenu item icon', control: {type: 'text'}},
    onDeactivateItems: {table: {disable: true}},
    onRequestActivation: {table: {disable: true}},
    onDeactivateTypeahead: {table: {disable: true}},
    onActivateTypeahead: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    anchorCorner: 'start-end',
    menuCorner: 'start-start',
    hoverOpenDelay: 400,
    hoverCloseDelay: 400,
    submenuItemIcon: 'navigate_next',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {anchorCorner, menuCorner, submenuItemIcon, hoverOpenDelay, hoverCloseDelay} = args;
    const [open, setOpen] = React.useState(true);
    return (
      <span style={{position: 'relative', display: 'inline-block', minHeight: 300}}>
        <FilledButton id="submenu-anchor" onClick={() => setOpen((v) => !v)}>
          Menu with submenus
        </FilledButton>
        <Menu anchor="submenu-anchor" open={open} hasOverflow onCloseMenu={() => setOpen(false)} style={{minWidth: 280}}>
          <SubMenu
            anchorCorner={anchorCorner}
            menuCorner={menuCorner}
            hoverOpenDelay={hoverOpenDelay}
            hoverCloseDelay={hoverCloseDelay}
            onDeactivateItems={action('deactivate-items')}
            onRequestActivation={action('request-activation')}
            onDeactivateTypeahead={action('deactivate-typeahead')}
            onActivateTypeahead={action('activate-typeahead')}>
            <MenuItem slot="item">
              <div slot="headline">Fruits with A</div>
              <Icon slot="end">{submenuItemIcon}</Icon>
            </MenuItem>
            <Menu slot="menu">
              <MenuItem><div slot="headline">Apricot</div></MenuItem>
              <MenuItem><div slot="headline">Avocado</div></MenuItem>
              <SubMenu menuCorner={menuCorner} anchorCorner={anchorCorner}>
                <MenuItem slot="item"><Icon slot="start">arrow_left</Icon><div slot="headline">Apples</div></MenuItem>
                <Menu slot="menu">
                  <MenuItem><div slot="headline">Fuji</div></MenuItem>
                  <MenuItem><div slot="headline" style={{whiteSpace: 'nowrap'}}>Granny Smith</div></MenuItem>
                  <MenuItem><div slot="headline" style={{whiteSpace: 'nowrap'}}>Red Delicious</div></MenuItem>
                </Menu>
              </SubMenu>
            </Menu>
          </SubMenu>
          <MenuItem><div slot="headline">Banana</div></MenuItem>
          <MenuItem><div slot="headline">Cucumber</div></MenuItem>
        </Menu>
      </span>
    );
  },
};
`;
  }

  if (group === 'select' && component === 'FilledSelect') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {FilledSelect} from './FilledSelect';
import {SelectOption} from './SelectOption';
import {Icon} from '../icon';

const MENU_ALIGN = ['start', 'end'] as const;
const MENU_POSITIONING = ['popover', 'absolute', 'fixed'] as const;

const meta = {
  title: 'select/FilledSelect',
  component: FilledSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'label',
        'typeaheadDelay',
        'quick',
        'required',
        'noAsterisk',
        'disabled',
        'errorText',
        'supportingText',
        'menuAlign',
        'menuPositioning',
        'clampMenuWidth',
        'error',
        'leadingIcon',
        'trailingIcon',
      ],
    },
  },
  argTypes: {
    label: {control: {type: 'text'}},
    typeaheadDelay: {control: {type: 'number'}},
    quick: {control: {type: 'boolean'}},
    required: {control: {type: 'boolean'}},
    noAsterisk: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
    errorText: {control: {type: 'text'}},
    supportingText: {control: {type: 'text'}},
    menuAlign: {control: {type: 'select'}, options: MENU_ALIGN},
    menuPositioning: {control: {type: 'select'}, options: MENU_POSITIONING},
    clampMenuWidth: {control: {type: 'boolean'}},
    error: {control: {type: 'boolean'}},
    leadingIcon: {name: 'slot=leading-icon', control: {type: 'text'}},
    trailingIcon: {name: 'slot=trailing-icon', control: {type: 'text'}},
    onChange: {table: {disable: true}},
    onInput: {table: {disable: true}},
    onOpening: {table: {disable: true}},
    onOpened: {table: {disable: true}},
    onClosing: {table: {disable: true}},
    onClosed: {table: {disable: true}},
    children: {table: {disable: true}},
    style: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Fruit',
    typeaheadDelay: 200,
    quick: false,
    required: false,
    noAsterisk: false,
    disabled: false,
    errorText: '',
    supportingText: '',
    menuAlign: 'start',
    menuPositioning: 'popover',
    clampMenuWidth: false,
    error: false,
    leadingIcon: '',
    trailingIcon: '',
    onChange: action('change'),
    onInput: action('input'),
    onOpening: action('opening'),
    onOpened: action('opened'),
    onClosing: action('closing'),
    onClosed: action('closed'),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {leadingIcon, trailingIcon, ...selectArgs} = args;
    return (
      <FilledSelect {...selectArgs} style={{width: 280}}>
        {leadingIcon ? <Icon slot="leading-icon">{leadingIcon}</Icon> : null}
        {trailingIcon ? <Icon slot="trailing-icon">{trailingIcon}</Icon> : null}
        <SelectOption aria-label="blank" value="" />
        <SelectOption selected value="apple"><div slot="headline">Apple</div></SelectOption>
        <SelectOption value="apricot"><div slot="headline">Apricot</div></SelectOption>
        <SelectOption value="apricots"><div slot="headline">Apricots</div></SelectOption>
        <SelectOption value="avocado"><div slot="headline">Avocado</div></SelectOption>
        <SelectOption value="green_apple"><div slot="headline">Green Apple</div></SelectOption>
        <SelectOption value="green_grapes"><div slot="headline">Green Grapes</div></SelectOption>
        <SelectOption value="olive"><div slot="headline">Olive</div></SelectOption>
        <SelectOption value="orange"><div slot="headline">Orange</div></SelectOption>
      </FilledSelect>
    );
  },
};
`;
  }

  if (group === 'select' && component === 'OutlinedSelect') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {OutlinedSelect} from './OutlinedSelect';
import {SelectOption} from './SelectOption';
import {Icon} from '../icon';

const MENU_ALIGN = ['start', 'end'] as const;
const MENU_POSITIONING = ['popover', 'absolute', 'fixed'] as const;

const meta = {
  title: 'select/OutlinedSelect',
  component: OutlinedSelect,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: [
        'label',
        'typeaheadDelay',
        'quick',
        'required',
        'noAsterisk',
        'disabled',
        'errorText',
        'supportingText',
        'menuAlign',
        'menuPositioning',
        'clampMenuWidth',
        'error',
        'leadingIcon',
        'trailingIcon',
      ],
    },
  },
  argTypes: {
    label: {control: {type: 'text'}},
    typeaheadDelay: {control: {type: 'number'}},
    quick: {control: {type: 'boolean'}},
    required: {control: {type: 'boolean'}},
    noAsterisk: {control: {type: 'boolean'}},
    disabled: {control: {type: 'boolean'}},
    errorText: {control: {type: 'text'}},
    supportingText: {control: {type: 'text'}},
    menuAlign: {control: {type: 'select'}, options: MENU_ALIGN},
    menuPositioning: {control: {type: 'select'}, options: MENU_POSITIONING},
    clampMenuWidth: {control: {type: 'boolean'}},
    error: {control: {type: 'boolean'}},
    leadingIcon: {name: 'slot=leading-icon', control: {type: 'text'}},
    trailingIcon: {name: 'slot=trailing-icon', control: {type: 'text'}},
    onChange: {table: {disable: true}},
    onInput: {table: {disable: true}},
    onOpening: {table: {disable: true}},
    onOpened: {table: {disable: true}},
    onClosing: {table: {disable: true}},
    onClosed: {table: {disable: true}},
    children: {table: {disable: true}},
    style: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    label: 'Fruit',
    typeaheadDelay: 200,
    quick: false,
    required: false,
    noAsterisk: false,
    disabled: false,
    errorText: '',
    supportingText: '',
    menuAlign: 'start',
    menuPositioning: 'popover',
    clampMenuWidth: false,
    error: false,
    leadingIcon: '',
    trailingIcon: '',
    onChange: action('change'),
    onInput: action('input'),
    onOpening: action('opening'),
    onOpened: action('opened'),
    onClosing: action('closing'),
    onClosed: action('closed'),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {leadingIcon, trailingIcon, ...selectArgs} = args;
    return (
      <OutlinedSelect {...selectArgs} style={{width: 280}}>
        {leadingIcon ? <Icon slot="leading-icon">{leadingIcon}</Icon> : null}
        {trailingIcon ? <Icon slot="trailing-icon">{trailingIcon}</Icon> : null}
        <SelectOption aria-label="blank" value="" />
        <SelectOption selected value="apple"><div slot="headline">Apple</div></SelectOption>
        <SelectOption value="apricot"><div slot="headline">Apricot</div></SelectOption>
        <SelectOption value="apricots"><div slot="headline">Apricots</div></SelectOption>
        <SelectOption value="avocado"><div slot="headline">Avocado</div></SelectOption>
        <SelectOption value="green_apple"><div slot="headline">Green Apple</div></SelectOption>
        <SelectOption value="green_grapes"><div slot="headline">Green Grapes</div></SelectOption>
        <SelectOption value="olive"><div slot="headline">Olive</div></SelectOption>
        <SelectOption value="orange"><div slot="headline">Orange</div></SelectOption>
      </OutlinedSelect>
    );
  },
};
`;
  }

  if (group === 'select' && component === 'SelectOption') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {SelectOption} from './SelectOption';
import {FilledSelect} from './FilledSelect';

const meta = {
  title: 'select/SelectOption',
  component: SelectOption,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['value', 'disabled', 'selected', 'headline'],
    },
  },
  argTypes: {
    value: {control: {type: 'text'}},
    disabled: {control: {type: 'boolean'}},
    selected: {control: {type: 'boolean'}},
    headline: {control: {type: 'text'}},
    onCloseMenu: {table: {disable: true}},
    onRequestSelection: {table: {disable: true}},
    onRequestDeselection: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    value: 'one',
    disabled: false,
    selected: false,
    headline: 'Option',
    onCloseMenu: action('close-menu'),
    onRequestSelection: action('request-selection'),
    onRequestDeselection: action('request-deselection'),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {headline, ...optionArgs} = args;
    return (
      <FilledSelect label="Options" style={{width: 280}}>
        <SelectOption aria-label="blank" value="" />
        <SelectOption {...optionArgs}>
          <div slot="headline">{headline}</div>
        </SelectOption>
        <SelectOption value="two"><div slot="headline">Second</div></SelectOption>
      </FilledSelect>
    );
  },
};
`;
  }

  if (group === 'tabs' && component === 'Tabs') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {Tabs} from './Tabs';
import {PrimaryTab} from './PrimaryTab';
import {SecondaryTab} from './SecondaryTab';
import {Icon} from '../icon';

const CONTENT = ['icon/label', 'icon', 'label'] as const;

const meta = {
  title: 'tabs/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['activeTabIndex', 'autoActivate', 'inlineIcon', 'content'],
    },
  },
  argTypes: {
    activeTabIndex: {control: {type: 'number'}},
    autoActivate: {control: {type: 'boolean'}},
    inlineIcon: {control: {type: 'boolean'}},
    content: {control: {type: 'radio'}, options: CONTENT},
    onChange: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    activeTabIndex: 0,
    autoActivate: false,
    inlineIcon: false,
    content: 'icon/label',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(
      typeof args.activeTabIndex === 'number' ? args.activeTabIndex : 0,
    );

    React.useEffect(() => {
      if (typeof args.activeTabIndex === 'number') setActiveTabIndex(args.activeTabIndex);
    }, [args.activeTabIndex]);

    const tabContent = (icon: string, label: string) => {
      const useIcon = args.content !== 'label';
      const useLabel = args.content !== 'icon';
      return (
        <>
          {useIcon ? <Icon slot="icon">{icon}</Icon> : null}
          {useLabel ? label : null}
        </>
      );
    };

    const ariaLabelIfIconOnly = (label: string) =>
      args.content === 'icon' ? {['aria-label']: label} : null;

    return (
      <div style={{display: 'grid', gap: 18, justifyItems: 'start'}}>
        <Tabs
          aria-label="Primary tabs"
          activeTabIndex={activeTabIndex}
          autoActivate={args.autoActivate}
          onChange={(ev) => {
            action('change')(ev);
            const target = ev.target as unknown as {activeTabIndex?: number};
            if (typeof target.activeTabIndex === 'number') setActiveTabIndex(target.activeTabIndex);
          }}
          style={{minWidth: 360}}>
          <PrimaryTab id="tab-one" aria-controls="panel-one" inlineIcon={args.inlineIcon} {...ariaLabelIfIconOnly('Keyboard')}>
            {tabContent('piano', 'Keyboard')}
          </PrimaryTab>
          <PrimaryTab id="tab-two" aria-controls="panel-two" inlineIcon={args.inlineIcon} {...ariaLabelIfIconOnly('Guitar')}>
            {tabContent('tune', 'Guitar')}
          </PrimaryTab>
          <PrimaryTab id="tab-three" aria-controls="panel-three" inlineIcon={args.inlineIcon} {...ariaLabelIfIconOnly('Drums')}>
            {tabContent('graphic_eq', 'Drums')}
          </PrimaryTab>
        </Tabs>

        <div id="panel-one" role="tabpanel" aria-labelledby="tab-one" hidden={activeTabIndex !== 0} style={{padding: 16}}>
          Keyboard
        </div>
        <div id="panel-two" role="tabpanel" aria-labelledby="tab-two" hidden={activeTabIndex !== 1} style={{padding: 16}}>
          Guitar
        </div>
        <div id="panel-three" role="tabpanel" aria-labelledby="tab-three" hidden={activeTabIndex !== 2} style={{padding: 16}}>
          Drums
        </div>

        <Tabs
          aria-label="Secondary tabs"
          activeTabIndex={activeTabIndex}
          autoActivate={args.autoActivate}
          onChange={(ev) => {
            action('change (secondary)')(ev);
            const target = ev.target as unknown as {activeTabIndex?: number};
            if (typeof target.activeTabIndex === 'number') setActiveTabIndex(target.activeTabIndex);
          }}
          style={{minWidth: 360}}>
          <SecondaryTab aria-controls="secondary-one" {...ariaLabelIfIconOnly('Travel')}>
            {tabContent('flight', 'Travel')}
          </SecondaryTab>
          <SecondaryTab aria-controls="secondary-two" {...ariaLabelIfIconOnly('Hotel')}>
            {tabContent('hotel', 'Hotel')}
          </SecondaryTab>
          <SecondaryTab aria-controls="secondary-three" {...ariaLabelIfIconOnly('Activities')}>
            {tabContent('hiking', 'Activities')}
          </SecondaryTab>
        </Tabs>
      </div>
    );
  },
};
`;
  }

  if (group === 'tabs' && component === 'PrimaryTab') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {PrimaryTab} from './PrimaryTab';
import {Tabs} from './Tabs';
import {Icon} from '../icon';

const CONTENT = ['icon/label', 'icon', 'label'] as const;

const meta = {
  title: 'tabs/PrimaryTab',
  component: PrimaryTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['active', 'inlineIcon', 'content'],
    },
  },
  argTypes: {
    active: {control: {type: 'boolean'}},
    inlineIcon: {control: {type: 'boolean'}},
    content: {control: {type: 'radio'}, options: CONTENT},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    active: true,
    inlineIcon: false,
    content: 'icon/label',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {content, ...tabArgs} = args;
    const tabContent = (icon: string, label: string) => {
      const useIcon = content !== 'label';
      const useLabel = content !== 'icon';
      return (
        <>
          {useIcon ? <Icon slot="icon">{icon}</Icon> : null}
          {useLabel ? label : null}
        </>
      );
    };
    const ariaLabelIfIconOnly = (label: string) =>
      content === 'icon' ? {['aria-label']: label} : null;
    return (
      <Tabs aria-label="Primary tabs" onChange={action('change')} style={{minWidth: 360}}>
        <PrimaryTab {...tabArgs} {...ariaLabelIfIconOnly('Keyboard')} aria-controls="panel-one" id="tab-one">
          {tabContent('piano', 'Keyboard')}
        </PrimaryTab>
        <PrimaryTab aria-controls="panel-two" id="tab-two" inlineIcon={tabArgs.inlineIcon}>
          {tabContent('tune', 'Guitar')}
        </PrimaryTab>
      </Tabs>
    );
  },
};
`;
  }

  if (group === 'tabs' && component === 'SecondaryTab') {
    return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {SecondaryTab} from './SecondaryTab';
import {Tabs} from './Tabs';
import {Icon} from '../icon';

const CONTENT = ['icon/label', 'icon', 'label'] as const;

const meta = {
  title: 'tabs/SecondaryTab',
  component: SecondaryTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['active', 'content'],
    },
  },
  argTypes: {
    active: {control: {type: 'boolean'}},
    content: {control: {type: 'radio'}, options: CONTENT},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    active: true,
    content: 'icon/label',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {content, ...tabArgs} = args;
    const tabContent = (icon: string, label: string) => {
      const useIcon = content !== 'label';
      const useLabel = content !== 'icon';
      return (
        <>
          {useIcon ? <Icon slot="icon">{icon}</Icon> : null}
          {useLabel ? label : null}
        </>
      );
    };
    const ariaLabelIfIconOnly = (label: string) =>
      content === 'icon' ? {['aria-label']: label} : null;
    return (
      <Tabs aria-label="Secondary tabs" onChange={action('change')} style={{minWidth: 360}}>
        <SecondaryTab {...tabArgs} {...ariaLabelIfIconOnly('Travel')}>
          {tabContent('flight', 'Travel')}
        </SecondaryTab>
        <SecondaryTab {...ariaLabelIfIconOnly('Hotel')}>
          {tabContent('hotel', 'Hotel')}
        </SecondaryTab>
      </Tabs>
    );
  },
};
`;
  }

  const argsEntries = [];
  if (events) {
    for (const [eventName, propName] of Object.entries(events)) {
      argsEntries.push(`    ${propName}: action('${eventName}'),`);
    }
  }
  if (argsEntries.length === 0) argsEntries.push(`    onClick: action('click'),`);

  const argsBlock = argsEntries.join('\n');

  // Hand-tuned stories for components that require specific structure.
  let renderBody = null;

  if (group === 'field' && component === 'FilledField') {
    renderBody = `(
    <${component} {...args} label="Label" supportingText="Supporting text" style={{width: 280}} hasStart hasEnd>
      <Icon slot="start">search</Icon>
      <input aria-label="Filled field input" />
      <Icon slot="end">event</Icon>
    </${component}>
  )`;
  } else if (group === 'field' && component === 'OutlinedField') {
    renderBody = `(
    <${component} {...args} label="Label" supportingText="Supporting text" style={{width: 280}} hasStart hasEnd>
      <div id="description" slot="aria-describedby" hidden />
      <Icon slot="start">search</Icon>
      <input aria-label="Outlined field input" aria-describedby="description" />
      <Icon slot="end">event</Icon>
    </${component}>
  )`;
  } else if (group === 'select' && (component === 'FilledSelect' || component === 'OutlinedSelect')) {
    renderBody = `(
    <${component} {...args} label="Fruit" style={{width: 280}}>
      ${component === 'FilledSelect' ? '<Icon slot="leading-icon">restaurant</Icon>' : ''}
      <SelectOption aria-label="blank" value="" />
      <SelectOption selected value="apple"><div slot="headline">Apple</div></SelectOption>
      <SelectOption value="apricot"><div slot="headline">Apricot</div></SelectOption>
      <SelectOption value="orange"><div slot="headline">Orange</div></SelectOption>
    </${component}>
  )`;
  } else if (group === 'select' && component === 'SelectOption') {
    renderBody = `(
    <FilledSelect label="Options" style={{width: 280}}>
      <SelectOption aria-label="blank" value="" />
      <SelectOption {...args} value="one"><div slot="headline">Option</div></SelectOption>
      <SelectOption value="two"><div slot="headline">Second</div></SelectOption>
    </FilledSelect>
  )`;
  } else if (group === 'tabs' && component === 'Tabs') {
    renderBody = `(
    <Tabs {...args} aria-label="Example tabs" style={{width: 360}}>
      <PrimaryTab>First</PrimaryTab>
      <PrimaryTab active>Second</PrimaryTab>
      <PrimaryTab>Third</PrimaryTab>
    </Tabs>
  )`;
  } else if (group === 'tabs' && (component === 'PrimaryTab' || component === 'SecondaryTab')) {
    renderBody = `(
    <Tabs aria-label="${component} demo" style={{width: 360}}>
      <${component} {...args} active>Tab</${component}>
      <${component}>Second</${component}>
    </Tabs>
  )`;
  } else if (group === 'dialog' && component === 'Dialog') {
    renderBody = `{
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setOpen(true)}>Open dialog</FilledButton>
        <Dialog
          {...args}
          open={open}
          onClosed={(ev) => {
            args?.onClosed?.(ev);
            setOpen(false);
          }}
          aria-label="Example dialog">
          <div slot="headline">Dialog</div>
          <form id="dialog-form" slot="content" method="dialog">
            <span>Just a simple dialog.</span>
          </form>
          <div slot="actions">
            <TextButton form="dialog-form" value="close">Close</TextButton>
            <TextButton form="dialog-form" value="ok" autofocus>OK</TextButton>
          </div>
        </Dialog>
      </div>
    );
  }`;
  } else if (group === 'menu' && component === 'Menu') {
    renderBody = `{
    const {onCloseMenu, ...menuArgs} = args;
    const [openIdRef, setOpenIdRef] = React.useState(false);
    const [openElRef, setOpenElRef] = React.useState(false);
    const [openPopover, setOpenPopover] = React.useState(false);
    const [openFixed, setOpenFixed] = React.useState(false);
    const [openDocument, setOpenDocument] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    return (
      <div style={{display: 'grid', gap: 28, justifyItems: 'start', minWidth: 520}}>
        <div style={{display: 'grid', gap: 10}}>
          <div style={{fontSize: 12, opacity: 0.75}}>
            Anchor via \`anchor\` idref (positioning="absolute", requires a position:relative parent)
          </div>
          <span style={{position: 'relative', display: 'inline-block', minHeight: 180}}>
            <FilledButton id="menu-anchor-idref" onClick={() => setOpenIdRef((v) => !v)}>
              Toggle menu
            </FilledButton>
            <Menu
              {...menuArgs}
              anchor="menu-anchor-idref"
              open={openIdRef}
              onCloseMenu={(ev) => {
                onCloseMenu?.(ev);
                setOpenIdRef(false);
              }}
              style={{minWidth: 220}}>
              <MenuItem><div slot="headline">Apple</div></MenuItem>
              <MenuItem><div slot="headline">Banana</div></MenuItem>
              <MenuItem><div slot="headline">Cucumber</div></MenuItem>
            </Menu>
          </span>
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <div style={{fontSize: 12, opacity: 0.75}}>Anchor via \`anchorElement\` (HTMLElement reference)</div>
          <span style={{position: 'relative', display: 'inline-block', minHeight: 180}}>
            <FilledButton ref={(el) => setAnchorEl(el)} onClick={() => setOpenElRef((v) => !v)}>
              Toggle menu
            </FilledButton>
            <Menu
              {...menuArgs}
              anchorElement={anchorEl ?? undefined}
              open={openElRef}
              onCloseMenu={(ev) => {
                onCloseMenu?.(ev);
                setOpenElRef(false);
              }}
              style={{minWidth: 220}}>
              <MenuItem><div slot="headline">Apple</div></MenuItem>
              <MenuItem><div slot="headline">Banana</div></MenuItem>
              <MenuItem><div slot="headline">Cucumber</div></MenuItem>
            </Menu>
          </span>
        </div>

        <div style={{display: 'grid', gap: 10}}>
          <div style={{fontSize: 12, opacity: 0.75}}>Positioning modes (no shared position:relative ancestor required)</div>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <div style={{display: 'grid', gap: 8}}>
              <FilledButton id="menu-anchor-popover" onClick={() => setOpenPopover((v) => !v)}>Popover</FilledButton>
              <Menu {...menuArgs} anchor="menu-anchor-popover" open={openPopover} positioning="popover"
                onCloseMenu={(ev) => {onCloseMenu?.(ev); setOpenPopover(false);}} style={{minWidth: 220}}>
                <MenuItem><div slot="headline">Apple</div></MenuItem>
                <MenuItem><div slot="headline">Banana</div></MenuItem>
                <MenuItem><div slot="headline">Cucumber</div></MenuItem>
              </Menu>
            </div>
            <div style={{display: 'grid', gap: 8}}>
              <FilledButton id="menu-anchor-fixed" onClick={() => setOpenFixed((v) => !v)}>Fixed</FilledButton>
              <Menu {...menuArgs} anchor="menu-anchor-fixed" open={openFixed} positioning="fixed"
                onCloseMenu={(ev) => {onCloseMenu?.(ev); setOpenFixed(false);}} style={{minWidth: 220}}>
                <MenuItem><div slot="headline">Apple</div></MenuItem>
                <MenuItem><div slot="headline">Banana</div></MenuItem>
                <MenuItem><div slot="headline">Cucumber</div></MenuItem>
              </Menu>
            </div>
            <div style={{display: 'grid', gap: 8}}>
              <FilledButton id="menu-anchor-document" onClick={() => setOpenDocument((v) => !v)}>Document</FilledButton>
              <Menu {...menuArgs} anchor="menu-anchor-document" open={openDocument} positioning="document"
                onCloseMenu={(ev) => {onCloseMenu?.(ev); setOpenDocument(false);}} style={{minWidth: 220}}>
                <MenuItem><div slot="headline">Apple</div></MenuItem>
                <MenuItem><div slot="headline">Banana</div></MenuItem>
                <MenuItem><div slot="headline">Cucumber</div></MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }`;
  } else if (group === 'menu' && component === 'MenuItem') {
    renderBody = `{
    const {onCloseMenu, ...itemArgs} = args;
    const [open, setOpen] = React.useState(false);
    return (
      <span style={{position: 'relative', display: 'inline-block', minHeight: 220}}>
        <FilledButton id="menu-item-anchor" onClick={() => setOpen((v) => !v)}>
          Toggle menu
        </FilledButton>
        <Menu
          anchor="menu-item-anchor"
          open={open}
          onCloseMenu={(ev) => {
            action('close-menu (bubbled to menu)')(ev);
            setOpen(false);
          }}
          style={{minWidth: 260}}>
          <MenuItem {...itemArgs} onCloseMenu={(ev) => onCloseMenu?.(ev)}>
            <Icon slot="start">restaurant</Icon>
            <div slot="headline">Regular item</div>
          </MenuItem>
          <MenuItem keepOpen>
            <Icon slot="start">push_pin</Icon>
            <div slot="headline">Keep open</div>
          </MenuItem>
          <MenuItem disabled><div slot="headline">Disabled</div></MenuItem>
          <MenuItem href="https://material-web.dev/components/menu/" target="_blank">
            <Icon slot="start">open_in_new</Icon>
            <div slot="headline">Link item</div>
          </MenuItem>
          <MenuItem type="option" selected aria-selected="true">
            <div slot="headline">Option (selected)</div>
          </MenuItem>
        </Menu>
      </span>
    );
  }`;
  } else if (group === 'menu' && component === 'SubMenu') {
    renderBody = `{
    const [open, setOpen] = React.useState(false);
    return (
      <span style={{position: 'relative', display: 'inline-block', minHeight: 300}}>
        <FilledButton id="submenu-anchor" onClick={() => setOpen((v) => !v)}>
          Menu with submenus
        </FilledButton>
        <Menu anchor="submenu-anchor" open={open} hasOverflow onCloseMenu={() => setOpen(false)} style={{minWidth: 280}}>
          <SubMenu {...args}>
            <MenuItem slot="item">
              <div slot="headline">Fruits with A</div>
              <Icon slot="end">arrow_right</Icon>
            </MenuItem>
            <Menu slot="menu">
              <MenuItem><div slot="headline">Apricot</div></MenuItem>
              <MenuItem><div slot="headline">Avocado</div></MenuItem>
              <SubMenu menuCorner="start-end" anchorCorner="start-start">
                <MenuItem slot="item">
                  <Icon slot="start">arrow_left</Icon>
                  <div slot="headline">Apples</div>
                </MenuItem>
                <Menu slot="menu">
                  <MenuItem><div slot="headline">Fuji</div></MenuItem>
                  <MenuItem><div slot="headline" style={{whiteSpace: 'nowrap'}}>Granny Smith</div></MenuItem>
                  <MenuItem><div slot="headline" style={{whiteSpace: 'nowrap'}}>Red Delicious</div></MenuItem>
                </Menu>
              </SubMenu>
            </Menu>
          </SubMenu>
          <MenuItem><div slot="headline">Banana</div></MenuItem>
          <MenuItem><div slot="headline">Cucumber</div></MenuItem>
        </Menu>
      </span>
    );
  }`;
  } else if (group === 'list' && component === 'List') {
    renderBody = `(
    <List
      {...args}
      aria-label="Static example"
      style={{borderRadius: 8, outline: '1px solid var(--md-sys-color-outline)', maxWidth: 360, overflow: 'hidden', width: '100%'}}>
      <ListItem>Single line item<Icon slot="start">event</Icon><Icon slot="end">star</Icon></ListItem>
      <ListItem>Two line item<div slot="supporting-text">Supporting text</div><Icon slot="start">event</Icon></ListItem>
      <ListItem>
        Three line item
        <div slot="supporting-text"><div>Second line text</div><div>Third line text</div></div>
        <div slot="trailing-supporting-text">12:34</div>
        <Icon slot="end">star</Icon>
      </ListItem>
    </List>
  )`;
  } else if (group === 'list' && component === 'ListItem') {
    renderBody = `(
    <List aria-label="List item" style={{borderRadius: 8, outline: '1px solid var(--md-sys-color-outline)', maxWidth: 360, overflow: 'hidden', width: '100%'}}>
      <ListItem {...args}>List item<div slot="supporting-text">Supporting text</div><Icon slot="start">event</Icon></ListItem>
    </List>
  )`;
  } else if (group === 'ripple' && component === 'Ripple') {
    renderBody = `(
    <div style={{display: 'flex', alignItems: 'center', gap: 32}}>
      <div style={{alignItems: 'center', borderRadius: 24, display: 'flex', height: 64, justifyContent: 'center', outline: '1px solid var(--md-sys-color-outline)', padding: 16, position: 'relative', width: 64}}>
        <Ripple {...args} />
      </div>
      <div id="touch" style={{alignItems: 'center', borderRadius: 24, display: 'flex', height: 64, justifyContent: 'center', outline: '1px dashed var(--md-sys-color-outline)', padding: 16, position: 'relative', width: 64}}>
        <div style={{background: 'var(--md-sys-color-primary-container)', border: '1px solid var(--md-sys-color-outline)', borderRadius: '50%', display: 'flex', height: 24, placeContent: 'center', placeItems: 'center', position: 'relative', width: 24}}>
          <Ripple for="touch" className="unbounded" style={{height: 64, width: 64, borderRadius: '50%', inset: 'unset'}} />
        </div>
      </div>
    </div>
  )`;
  } else if (group === 'focus' && component === 'FocusRing') {
    renderBody = `(
    <div style={{display: 'flex', gap: 16}}>
      <button type="button" style={{appearance: 'none', background: 'var(--md-sys-color-surface)', border: 'none', borderRadius: 16, height: 64, outline: 'none', position: 'relative', width: 64, ['--md-focus-ring-shape']: '16px'}}>
        <FocusRing {...args} />
      </button>
      <button type="button" style={{appearance: 'none', background: 'var(--md-sys-color-surface)', border: 'none', borderRadius: 16, height: 64, outline: 'none', position: 'relative', width: 64, ['--md-focus-ring-shape']: '16px'}}>
        <FocusRing {...args} />
      </button>
    </div>
  )`;
  } else if (group === 'fab' && (component === 'Fab' || component === 'BrandedFab')) {
    renderBody = `(
    <${component} {...args} label="Edit" aria-label="Edit">
      <Icon slot="icon">edit</Icon>
    </${component}>
  )`;
  } else if (group === 'progress' && component === 'LinearProgress') {
    renderBody = `(
    <LinearProgress {...args} aria-label="An example linear progress" value={0.4} max={1} style={{inlineSize: '50vw'}} />
  )`;
  } else if (group === 'progress' && component === 'CircularProgress') {
    renderBody = `(
    <CircularProgress {...args} aria-label="An example circular progress" value={0.7} max={1} />
  )`;
  } else if (group === 'slider' && component === 'Slider') {
    renderBody = `(
    <label style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      Tick marks
      <Slider {...args} labeled ticks step={10} aria-label="An example slider with tick marks" style={{width: 320}} />
    </label>
  )`;
  } else if (group === 'switch' && component === 'Switch') {
    renderBody = `(
    <label style={{display: 'flex', alignItems: 'center', gap: 12}}>
      Wi-Fi
      <Switch {...args} aria-label="Wi-Fi" selected icons />
    </label>
  )`;
  } else if (group === 'textfield' && component === 'FilledTextField') {
    renderBody = `(
    <FilledTextField {...args} label="Email" value="alex@example.com" style={{width: 280}} />
  )`;
  } else if (group === 'textfield' && component === 'OutlinedTextField') {
    renderBody = `(
    <OutlinedTextField {...args} label="Name" value="Alex" style={{width: 280}} />
  )`;
  } else if (group === 'chips' && component === 'ChipSet') {
    renderBody = `(
    <ChipSet {...args} aria-label="Chips">
      <AssistChip>Assist</AssistChip>
      <AssistChip><Icon slot="icon">local_laundry_service</Icon>With icon</AssistChip>
      <FilterChip removable>Filter</FilterChip>
      <InputChip>Input</InputChip>
      <SuggestionChip>Suggest</SuggestionChip>
    </ChipSet>
  )`;
  } else if (group === 'labs' && component === 'Badge') {
    renderBody = `(
    <div style={{position: 'relative', width: 48, height: 48}}>
      <div style={{width: 48, height: 48, borderRadius: 12, background: 'var(--md-sys-color-secondary-container)', outline: '1px solid var(--md-sys-color-outline)'}} />
      <Badge {...args} value="1" style={{position: 'absolute', top: 0, right: 0}} />
    </div>
  )`;
  } else if (group === 'labs' && component === 'NavigationBar') {
    renderBody = `(
    <div style={{width: 400}}>
      <NavigationBar {...args} activeIndex="1">
        <NavigationTab label="Home" showBadge badgeValue="1"><Icon slot="active-icon">home</Icon><Icon slot="inactive-icon">home</Icon></NavigationTab>
        <NavigationTab label="Search"><Icon slot="active-icon">search</Icon><Icon slot="inactive-icon">search</Icon></NavigationTab>
        <NavigationTab label="Library"><Icon slot="active-icon">library_books</Icon><Icon slot="inactive-icon">library_books</Icon></NavigationTab>
        <NavigationTab label="Profile"><Icon slot="active-icon">person</Icon><Icon slot="inactive-icon">person</Icon></NavigationTab>
      </NavigationBar>
    </div>
  )`;
  } else if (group === 'labs' && component === 'NavigationTab') {
    renderBody = `(
    <div style={{width: 400}}>
      <NavigationBar activeIndex="0">
        <NavigationTab {...args} label="Tab" showBadge badgeValue="3"><Icon slot="active-icon">star</Icon><Icon slot="inactive-icon">star</Icon></NavigationTab>
      </NavigationBar>
    </div>
  )`;
  } else if (group === 'labs' && component === 'NavigationDrawer') {
    renderBody = `{
    const [opened, setOpened] = React.useState(true);
    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setOpened((v) => !v)}>Toggle drawer</FilledButton>
        <NavigationDrawer {...args} opened={opened} pivot="start"><div style={{padding: 16}}>Drawer content</div></NavigationDrawer>
      </div>
    );
  }`;
  } else if (group === 'labs' && component === 'NavigationDrawerModal') {
    renderBody = `{
    const [opened, setOpened] = React.useState(true);
    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setOpened((v) => !v)}>Toggle modal drawer</FilledButton>
        <NavigationDrawerModal {...args} opened={opened} pivot="start"><div style={{padding: 16}}>Modal drawer content (click scrim to close)</div></NavigationDrawerModal>
      </div>
    );
  }`;
  } else if (group === 'labs' && component === 'OutlinedSegmentedButtonSet') {
    renderBody = `(
    <div style={{width: 325}}>
      <OutlinedSegmentedButtonSet {...args}>
        <OutlinedSegmentedButton label="Enabled"><Icon slot="icon">grade</Icon></OutlinedSegmentedButton>
        <OutlinedSegmentedButton selected label="Selected"><Icon slot="icon">favorite</Icon></OutlinedSegmentedButton>
        <OutlinedSegmentedButton label="Enabled"><Icon slot="icon">change_history</Icon></OutlinedSegmentedButton>
      </OutlinedSegmentedButtonSet>
    </div>
  )`;
  } else if (group === 'labs' && component === 'OutlinedSegmentedButton') {
    renderBody = `(
    <div style={{width: 325}}>
      <OutlinedSegmentedButtonSet>
        <OutlinedSegmentedButton {...args} selected label="Option" />
        <OutlinedSegmentedButton label="Second" />
      </OutlinedSegmentedButtonSet>
    </div>
  )`;
  } else if (group === 'labs' && component === 'Item') {
    renderBody = `(
    <div style={{width: 360}}>
      <Item {...args}>
        <Icon slot="start">image</Icon>
        <div slot="headline">Headline</div>
        <div slot="supporting-text">Supporting text</div>
        <div slot="trailing-supporting-text">Trailing</div>
        <Icon slot="end">chevron_right</Icon>
      </Item>
    </div>
  )`;
  }

  if (!renderBody) {
    const child = label ?? component;
    renderBody = hasChildren
      ? `(<${component} {...args}>${String(child)}</${component}>)`
      : `(<${component} {...args} />)`;
  }

  const extraImports = [];
  // The templates above rely on these helper components; import them liberally.
  if (renderBody.includes('<Icon')) extraImports.push("import {Icon} from '../icon';");
  if (renderBody.includes('<FilledButton') || renderBody.includes('<TextButton')) {
    extraImports.push("import {FilledButton, TextButton} from '../button';");
  }
  if (renderBody.includes('<Menu ') || renderBody.includes('<Menu>')) {
    extraImports.push("import {Menu} from '../menu';");
  }
  if (renderBody.includes('<MenuItem')) {
    extraImports.push("import {MenuItem} from '../menu';");
  }
  if (renderBody.includes('<SubMenu')) {
    extraImports.push("import {SubMenu} from '../menu';");
  }
  if (renderBody.includes('<ListItem')) {
    extraImports.push("import {ListItem} from '../list';");
  }
  if (renderBody.includes('<List ')) {
    extraImports.push("import {List} from '../list';");
  }
  if (renderBody.includes('<SelectOption')) {
    extraImports.push("import {SelectOption} from '../select';");
  }
  if (renderBody.includes('<FilledSelect')) {
    extraImports.push("import {FilledSelect} from '../select';");
  }
  if (renderBody.includes('<Tabs ')) {
    extraImports.push("import {Tabs} from '../tabs';");
  }
  if (renderBody.includes('<PrimaryTab')) {
    extraImports.push("import {PrimaryTab} from '../tabs';");
  }
  if (renderBody.includes('<SecondaryTab')) {
    extraImports.push("import {SecondaryTab} from '../tabs';");
  }
  if (renderBody.includes('<Slider')) {
    extraImports.push("import {Slider} from '../slider';");
  }
  if (renderBody.includes('<Switch')) {
    extraImports.push("import {Switch} from '../switch';");
  }
  if (renderBody.includes('<FilledTextField')) {
    extraImports.push("import {FilledTextField} from '../textfield';");
  }
  if (renderBody.includes('<OutlinedTextField')) {
    extraImports.push("import {OutlinedTextField} from '../textfield';");
  }
  if (renderBody.includes('<ChipSet') || renderBody.includes('<AssistChip') || renderBody.includes('<FilterChip') || renderBody.includes('<InputChip') || renderBody.includes('<SuggestionChip')) {
    extraImports.push("import {ChipSet, AssistChip, FilterChip, InputChip, SuggestionChip} from '../chips';");
  }
  if (renderBody.includes('<OutlinedSegmentedButtonSet') || renderBody.includes('<OutlinedSegmentedButton')) {
    extraImports.push("import {OutlinedSegmentedButtonSet, OutlinedSegmentedButton} from '../labs';");
  }
  if (renderBody.includes('<Badge') || renderBody.includes('<Item')) {
    extraImports.push("import {Badge, Item} from '../labs';");
  }
  if (
    renderBody.includes('<NavigationBar') ||
    renderBody.includes('<NavigationTab') ||
    renderBody.includes('<NavigationDrawer') ||
    renderBody.includes('<NavigationDrawerModal') ||
    renderBody.includes('<NavigationRail')
  ) {
    extraImports.push(
      "import {NavigationBar, NavigationDrawer, NavigationDrawerModal, NavigationRail, NavigationTab} from '../navigation';",
    );
  }
  if (renderBody.includes('<Dialog')) {
    extraImports.push("import {Dialog} from '../dialog';");
  }
  if (renderBody.includes('<LinearProgress')) {
    extraImports.push("import {LinearProgress} from '../progress';");
  }
  if (renderBody.includes('<CircularProgress')) {
    extraImports.push("import {CircularProgress} from '../progress';");
  }
  if (renderBody.includes('<Ripple')) {
    extraImports.push("import {Ripple} from '../ripple';");
  }
  if (renderBody.includes('<FocusRing')) {
    extraImports.push("import {FocusRing} from '../focus';");
  }
  if (renderBody.includes('<Fab') || renderBody.includes('<BrandedFab')) {
    extraImports.push("import {Fab, BrandedFab} from '../fab';");
  }
  if (renderBody.includes('<Elevation')) {
    extraImports.push("import {Elevation} from '../elevation';");
  }
  if (renderBody.includes('<Divider')) {
    extraImports.push("import {Divider} from '../divider';");
  }

  const importLines = Array.from(new Set(extraImports)).join('\n');

  return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {${component}} from './${component}';
${importLines ? `\n${importLines}\n` : ''}

const meta = {
  title: '${group}/${component}',
  component: ${component},
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
};

export default meta;

export const Default = {
  args: {
${argsBlock}
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args) => ${renderBody},
};
`;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, {recursive: true});
}

async function writeFileAtomic(filePath, contents) {
  const tmpPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  await fs.writeFile(tmpPath, contents, 'utf8');
  await fs.rename(tmpPath, filePath);
}

async function writeFileIfMissing(filePath, contents) {
  try {
    await fs.access(filePath);
    return false;
  } catch {
    await writeFileAtomic(filePath, contents);
    return true;
  }
}

async function writeFileIfMissingOrGenerated(filePath, contents) {
  try {
    const existing = await fs.readFile(filePath, 'utf8');
    // Only overwrite files that were previously generated.
    if (existing.startsWith(fileHeader())) {
      await writeFileAtomic(filePath, contents);
      return true;
    }
    return false;
  } catch {
    await writeFileAtomic(filePath, contents);
    return true;
  }
}

async function applyPatchesAfterGenerate() {
  // Fix a previously generated duplicate interface that may exist.
  const assistChipPath = path.join(ROOT, 'src/chips/AssistChip.tsx');
  try {
    let text = await fs.readFile(assistChipPath, 'utf8');
    text = text.replace(
      /\nexport interface AssistChipProps extends React\.HTMLAttributes<MdAssistChip> \{}\n\nexport interface AssistChipProps extends React\.HTMLAttributes<MdAssistChip> \{}\n/,
      '\nexport interface AssistChipProps extends React.HTMLAttributes<MdAssistChip> {}\n',
    );
    await fs.writeFile(assistChipPath, text, 'utf8');
  } catch {
    // ignore
  }
}

async function main() {
  const srcRoot = path.join(ROOT, 'src');

  /** @type {Map<string, string[]>} */
  const indexExports = new Map();

  for (const c of COMPONENTS) {
    const groupDir = path.join(srcRoot, c.group);
    await ensureDir(groupDir);

    const wrapperFile = path.join(groupDir, `${c.component}.tsx`);
    const storyFile = path.join(groupDir, `${c.component}.stories.tsx`);

    // Don't overwrite hand-written files; only overwrite previously generated ones.
    await writeFileIfMissingOrGenerated(wrapperFile, wrapperSource(c));
    await writeFileIfMissingOrGenerated(storyFile, storySource(c));

    const exports = indexExports.get(c.group) ?? [];
    exports.push(c.component);
    indexExports.set(c.group, exports);
  }

  // Generate group index.ts for generated groups (do not touch button/checkbox/icon).
  for (const [group, comps] of indexExports.entries()) {
    if (group === 'button' || group === 'checkbox' || group === 'icon') continue;

    const groupDir = path.join(srcRoot, group);
    const indexPath = path.join(groupDir, 'index.ts');

    // textfield exports contain overlapping helper types; avoid `export *` collisions.
    if (group === 'textfield') {
      const lines = [fileHeader()];
      lines.push(`export {FilledTextField} from './FilledTextField.js';`);
      lines.push(
        `export type {FilledTextFieldProps, TextFieldSelectionDirection, TextFieldType} from './FilledTextField.js';`,
      );
      lines.push('');
      lines.push(`export {OutlinedTextField} from './OutlinedTextField.js';`);
      lines.push(`export type {OutlinedTextFieldProps} from './OutlinedTextField.js';`);
      lines.push('');
      await writeFileAtomic(indexPath, lines.join('\n'));
      continue;
    }

    const lines = [fileHeader()];
    for (const name of comps.sort()) {
      lines.push(`export * from './${name}.js';`);
    }
    lines.push('');
    await writeFileAtomic(indexPath, lines.join('\n'));
  }

  await applyPatchesAfterGenerate();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
