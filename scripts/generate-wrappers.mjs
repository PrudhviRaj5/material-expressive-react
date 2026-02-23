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
    hasChildren: true,
  },
  {
    group: 'menu',
    component: 'MenuItem',
    tag: 'md-menu-item',
    importPath: '@material/web/menu/menu-item.js',
    typeName: 'MdMenuItem',
    hasChildren: true,
    label: 'Menu item',
  },
  {
    group: 'menu',
    component: 'SubMenu',
    tag: 'md-sub-menu',
    importPath: '@material/web/menu/sub-menu.js',
    typeName: 'MdSubMenu',
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
    events: {change: 'onChange', input: 'onInput'},
    hasChildren: true,
  },
  {
    group: 'select',
    component: 'OutlinedSelect',
    tag: 'md-outlined-select',
    importPath: '@material/web/select/outlined-select.js',
    typeName: 'MdOutlinedSelect',
    events: {change: 'onChange', input: 'onInput'},
    hasChildren: true,
  },
  {
    group: 'select',
    component: 'SelectOption',
    tag: 'md-select-option',
    importPath: '@material/web/select/select-option.js',
    typeName: 'MdSelectOption',
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
    component: 'NavigationBar',
    tag: 'md-navigation-bar',
    importPath: '@material/web/labs/navigationbar/navigation-bar.js',
    typeName: 'MdNavigationBar',
    events: {
      'navigation-bar-activated': 'onActivated',
    },
    hasChildren: true,
  },
  {
    group: 'labs',
    component: 'NavigationDrawer',
    tag: 'md-navigation-drawer',
    importPath: '@material/web/labs/navigationdrawer/navigation-drawer.js',
    typeName: 'MdNavigationDrawer',
    events: {
      'navigation-drawer-changed': 'onChanged',
    },
    hasChildren: true,
  },
  {
    group: 'labs',
    component: 'NavigationDrawerModal',
    tag: 'md-navigation-drawer-modal',
    importPath: '@material/web/labs/navigationdrawer/navigation-drawer-modal.js',
    typeName: 'MdNavigationDrawerModal',
    events: {
      'navigation-drawer-changed': 'onChanged',
    },
    hasChildren: true,
  },
  {
    group: 'labs',
    component: 'NavigationTab',
    tag: 'md-navigation-tab',
    importPath: '@material/web/labs/navigationtab/navigation-tab.js',
    typeName: 'MdNavigationTab',
    events: {
      'navigation-tab-interaction': 'onInteraction',
    },
    hasChildren: true,
    label: 'Tab',
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

function wrapperSource({component, tag, importPath, typeName, events}) {
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

  return `${fileHeader()}
import type {${typeName}} from '${importPath}';

import {createComponentTyped, type WebComponentProps} from '../internal/createComponent';

export interface ${component}Props extends ${htmlAttributesType} {${eventProps}}

export const ${component} = createComponentTyped<${typeName}, ${component}Props>({
  displayName: '${component}',
  tagName: '${tag}',
  importPath: '${importPath}',
  importer: () => import('${importPath}'),
  ${events ? `events: ${JSON.stringify(events, null, 2)},` : ''}
});
`;
}

function storySource({group, component, hasChildren, label, events}) {
  const defaultChild = label ?? component;

  const argsEntries = [];
  if (events) {
    for (const [eventName, propName] of Object.entries(events)) {
      argsEntries.push(`    ${propName}: action('${eventName}'),`);
    }
  }

  if (argsEntries.length === 0) {
    argsEntries.push(`    onClick: action('click'),`);
  }

  const renderExpr = hasChildren
    ? `React.createElement(${component}, args, ${JSON.stringify(String(defaultChild))})`
    : `React.createElement(${component}, args)`;

  return `${fileHeader()}
import React from 'react';
import {action} from '@storybook/addon-actions';

import {${component}} from './${component}';

const meta = {
  title: '${group}/${component}',
  component: ${component},
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
};

export default meta;

export const Default = {
  args: {
${argsEntries.join('\n')}
  },
  render: (args) => ${renderExpr},
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
