import React from 'react';
import {action} from '@storybook/addon-actions';

import {Icon} from '../icon';

import {Menu, MenuDivider, MenuGroupGap} from './Menu';
import {MenuItem} from './MenuItem';
import {MenuSurface} from './MenuSurface';
import {SubMenu} from './SubMenu';

const meta = {
  title: 'Menu/Menu',
  component: Menu,
  // Disabled to avoid Storybook trying to serialize complex React nodes.
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {disable: false},
    controls: {
      include: ['variant', 'selectType', 'gap'],
    },
  },
  argTypes: {
    variant: {control: {type: 'radio'}, options: ['standard', 'vibrant']},
    selectType: {control: {type: 'radio'}, options: ['single', 'multi']},
    gap: {control: {type: 'number', min: 0, step: 1}},
    value: {table: {disable: true}},
    defaultValue: {table: {disable: true}},
    onValueChange: {table: {disable: true}},
    // `onClick` is used by these stories to log item clicks.
    onClick: {control: false, table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

type MenuVariant = 'standard' | 'vibrant';
type SelectType = 'single' | 'multi';

type StoryOnClick = (payload: {clickedValue: string; selected: string[]}) => void;

function asArray(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : value ? [value] : [];
}

function computeNextSelected(
  selectType: SelectType,
  currentValue: string | string[] | undefined,
  clickedValue: string,
): string[] {
  const current = asArray(currentValue);
  if (selectType === 'multi') {
    const next = new Set(current);
    if (next.has(clickedValue)) next.delete(clickedValue);
    else next.add(clickedValue);
    return Array.from(next);
  }
  return [clickedValue];
}

type ContextMenuStoryArgs = {
  variant: MenuVariant;
  selectType: SelectType;
  size: 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
  width?: number;
  height?: number;
  gap?: number;
  onClick?: StoryOnClick;
};

type VerticalMenuStoryArgs = {
  variant: MenuVariant;
  selectType: SelectType;
  size: 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
  width?: number;
  height?: number;
  gap?: number;
  groupGap?: number;
  onClick?: StoryOnClick;
};

type GroupMenuStoryArgs = {
  variant: MenuVariant;
  selectType: SelectType;
  size: 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
  width?: number;
  height?: number;
  gap?: number;
  groupGap?: number;
  onClick?: StoryOnClick;
};

export const ContextMenu = {
  args: {
    variant: 'standard',
    selectType: 'single',
    size: 'Medium',
    width: 250,
    height: 300,
    onClick: action('item-click'),
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    width: {control: {type: 'number', min: 120, step: 10}},
    height: {control: {type: 'number', min: 120, step: 10}},
    gap: {control: {type: 'number', min: 0, step: 1}},
  },
  render: (args: ContextMenuStoryArgs) => {
    const [value, setValue] = React.useState<string | string[]>(() =>
      args.selectType === 'multi' ? [] : '',
    );

    React.useEffect(() => {
      setValue((prev) => {
        if (args.selectType === 'multi') {
          if (Array.isArray(prev)) return prev;
          return prev ? [prev] : [];
        }

        if (Array.isArray(prev)) return prev[0] ?? '';
        return prev;
      });
    }, [args.selectType]);

    const defaultsBySize = {
      XSmall: {
        width: 200,
        height: 240,
      },
      Small: {
        width: 230,
        height: 270,
      },
      Medium: {
        width: 250,
        height: 300,
      },
      Large: {
        width: 300,
        height: 360,
      },
      XLarge: {
        width: 340,
        height: 420,
      },
    };

    const sizeKey = defaultsBySize[args.size] ? args.size : 'Medium';
    const defaults = defaultsBySize[sizeKey];
    const width = typeof args.width === 'number' && args.width > 0 ? args.width : defaults.width;
    const height = typeof args.height === 'number' && args.height > 0 ? args.height : defaults.height;

    const sizeProp =
      sizeKey === 'XSmall'
        ? 'xsmall'
        : sizeKey === 'Small'
          ? 'small'
          : sizeKey === 'Large'
            ? 'large'
            : sizeKey === 'XLarge'
              ? 'xlarge'
              : 'medium';

    const logItemClick = (clickedValue: string) => {
      const selected = computeNextSelected(args.selectType, value, clickedValue);
      args.onClick?.({clickedValue, selected});
      // Also log to the browser console for quick inspection.
      // eslint-disable-next-line no-console
      console.log('[Menu] selected', selected);
    };

    return (
      <Menu
        variant={args.variant}
        selectType={args.selectType}
        value={value}
        onValueChange={(next) => {
          action('value-change')(next);
          setValue(next);
        }}
        gap={args.gap}
        context
        size={sizeProp}
        width={width}
        height={height}
      >
        <MenuItem
          value="one"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('one')}
        />
        <MenuItem
          value="two"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('two')}
        />
        <MenuDivider />
        <MenuItem
          value="three"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('three')}
        />
        <MenuItem
          value="four"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('four')}
        />
      </Menu>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Expressive context menu with sizing, gaps, and a divider example.',
      },
    },
    controls: {
      include: ['variant', 'selectType', 'gap', 'size', 'width', 'height'],
    },
  },
};

export const VerticalMenu = {
  args: {
    variant: 'standard',
    selectType: 'multi',
    size: 'Medium',
    width: 250,
    height: 300,
    onClick: action('item-click'),
  },
  argTypes: {
    size: {
      control: {type: 'select'},
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    width: {control: {type: 'number', min: 240, step: 10}},
    height: {control: {type: 'number', min: 200, step: 10}},
  },
  parameters: {
    docs: {
      source: {type: 'code', code: ''},
      description: {
        story:
          'Vertical menus can include vibrant colors, gaps, dividers, and submenus to organize a list of choices.',
      },
    },
    controls: {
      include: ['variant', 'selectType', 'size', 'width', 'height', 'gap', 'groupGap'],
    },
  },
  render: (args: VerticalMenuStoryArgs) => {
    const [value, setValue] = React.useState(['inbox']);
    
    const defaultsBySize = {
      XSmall: {
        width: 200,
        height: 240,
      },
      Small: {
        width: 230,
        height: 270,
      },
      Medium: {
        width: 250,
        height: 300,
      },
      Large: {
        width: 300,
        height: 360,
      },
      XLarge: {
        width: 340,
        height: 420,
      },
    };

    const sizeKey = defaultsBySize[args.size] ? args.size : 'Medium';
    const defaults = defaultsBySize[sizeKey];
    const width = typeof args.width === 'number' && args.width > 0 ? args.width : defaults.width;
    const height = typeof args.height === 'number' && args.height > 0 ? args.height : defaults.height;

    const sizeProp =
      sizeKey === 'XSmall'
        ? 'xsmall'
        : sizeKey === 'Small'
          ? 'small'
          : sizeKey === 'Large'
            ? 'large'
            : sizeKey === 'XLarge'
              ? 'xlarge'
              : 'medium';

    const currentValue = args.selectType === 'multi' ? value : value[0] ?? '';

    const logItemClick = (clickedValue: string) => {
      const selected = computeNextSelected(args.selectType, currentValue, clickedValue);
      args.onClick?.({clickedValue, selected});
      // eslint-disable-next-line no-console
      console.log('[Menu] selected', selected);
    };

    return (
      <Menu
        variant={args.variant}
        selectType={args.selectType}
        value={args.selectType === 'multi' ? value : value[0] ?? ''}
        onValueChange={(next) => {
          action('value-change')(next);
          setValue(Array.isArray(next) ? next : [next]);
        }}
        gap={args.gap}
        groupGap={args.groupGap}
        size={sizeProp}
        width={width}
        height={height}
      >
        <MenuItem
          value="outbox"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('outbox')}
        />
        <SubMenu
          item={{
            value: 'nested',
            label: 'Nested Label',
            leadingIcon: <Icon>star</Icon>,
            onClick: () => {
              // Clicking the submenu trigger opens the popover and doesn't toggle selection.
              args.onClick?.({clickedValue: 'nested', selected: asArray(currentValue)});
              // eslint-disable-next-line no-console
              console.log('[Menu] selected', asArray(currentValue));
            },
          }}
          menu={
            <MenuSurface
              variant={args.variant}
              size={sizeProp}
              width={width}
              maxHeight={height}
            >
              <MenuItem
                value="nested-1"
                label="Label"
                leadingIcon={<Icon>star</Icon>}
                onClick={() => {
                  args.onClick?.({clickedValue: 'nested-1', selected: asArray(currentValue)});
                  // eslint-disable-next-line no-console
                  console.log('[Menu] selected', asArray(currentValue));
                }}
              />
              <MenuItem
                value="nested-2"
                label="Label"
                leadingIcon={<Icon>star</Icon>}
                trailingIcon={<Icon>chevron_right</Icon>}
                onClick={() => {
                  args.onClick?.({clickedValue: 'nested-2', selected: asArray(currentValue)});
                  // eslint-disable-next-line no-console
                  console.log('[Menu] selected', asArray(currentValue));
                }}
              />
              <MenuItem
                value="nested-3"
                label="Label"
                leadingIcon={<Icon>star</Icon>}
                onClick={() => {
                  args.onClick?.({clickedValue: 'nested-3', selected: asArray(currentValue)});
                  // eslint-disable-next-line no-console
                  console.log('[Menu] selected', asArray(currentValue));
                }}
              />
            </MenuSurface>
          }
        />
        <MenuDivider />
        <MenuItem
          value="cmd"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          onClick={() => logItemClick('cmd')}
        />
        <MenuItem value="new" label="Label" leadingIcon={<Icon>star</Icon>} onClick={() => logItemClick('new')} />
        <MenuDivider />
        <MenuItem
          value="disabled"
          label="Label"
          leadingIcon={<Icon>star</Icon>}
          trailingIcon={<Icon>chevron_right</Icon>}
          disabled
          onClick={() => logItemClick('disabled')}
        />
      </Menu>
    );
  },
};

export const GroupMenu = {
  args: {
    variant: 'standard',
    selectType: 'multi',
    size: 'Medium',
    width: 360,
    height: 240,
    onClick: action('item-click'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Grouped `MenuSurface` examples (stacked surfaces with consistent sizing).',
      },
    },
    controls: {
      include: ['variant', 'selectType', 'size', 'width', 'height', 'gap', 'groupGap'],
    },
  },
  argTypes: {
    selectType: {control: {type: 'radio'}, options: ['single', 'multi']},
    size: {
      control: {type: 'select'},
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    width: {control: {type: 'number', min: 200, step: 10}},
    height: {control: {type: 'number', min: 160, step: 10}},
    gap: {control: {type: 'number', min: 0, step: 1}},
    groupGap: {control: {type: 'number', min: 0, step: 1}},
  },
  render: (args: GroupMenuStoryArgs) => {
    const [value, setValue] = React.useState<string | string[]>(() =>
      args.selectType === 'multi' ? [] : '',
    );

    React.useEffect(() => {
      setValue((prev) => {
        if (args.selectType === 'multi') {
          if (Array.isArray(prev)) return prev;
          return prev ? [prev] : [];
        }

        if (Array.isArray(prev)) return prev[0] ?? '';
        return prev;
      });
    }, [args.selectType]);

    const sizeKey = ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'].includes(args.size)
      ? args.size
      : 'Medium';

    const sizeProp =
      sizeKey === 'XSmall'
        ? 'xsmall'
        : sizeKey === 'Small'
          ? 'small'
          : sizeKey === 'Large'
            ? 'large'
            : sizeKey === 'XLarge'
              ? 'xlarge'
              : 'medium';

    const width = typeof args.width === 'number' && args.width > 0 ? args.width : 360;
    const height = typeof args.height === 'number' && args.height > 0 ? args.height : 240;

    const currentValue = value;

    const logItemClick = (clickedValue: string) => {
      const selected = computeNextSelected(args.selectType, currentValue, clickedValue);
      args.onClick?.({clickedValue, selected});
      // eslint-disable-next-line no-console
      console.log('[Menu] selected', selected);
    };

    return (
      <div style={{display: 'grid'}}>
        <Menu
          variant={args.variant}
          selectType={args.selectType}
          size={sizeProp}
          width={width}
          gap={args.gap}
          value={value}
          onValueChange={(next) => {
            action('value-change')(next);
            setValue(next);
          }}
        >
          <MenuItem
            value="bb-1"
            label="Label"
            leadingIcon={<Icon>star</Icon>}
            trailingIcon={<Icon>chevron_right</Icon>}
            onClick={() => logItemClick('bb-1')}
          />
          <MenuItem
            value="bb-2"
            label="Label"
            leadingIcon={<Icon>star</Icon>}
            trailingIcon={<Icon>chevron_right</Icon>}
            onClick={() => logItemClick('bb-2')}
          />
          <MenuItem value="bb-3" label="Label" leadingIcon={<Icon>star</Icon>} onClick={() => logItemClick('bb-3')} />
          <MenuDivider />
          <MenuItem
            value="bb-4"
            label="Label"
            leadingIcon={<Icon>star</Icon>}
            trailingIcon={<Icon>chevron_right</Icon>}
            onClick={() => logItemClick('bb-4')}
          />
        </Menu>
        {/* <div aria-hidden style={{height: typeof args.groupGap === 'number' ? args.groupGap : 12}} /> */}
        <MenuGroupGap groupGap={typeof args.groupGap === 'number' ? args.groupGap : 12} />
        <Menu
          variant={args.variant}
          selectType={args.selectType}
          size={sizeProp}
          width={width}
          gap={args.gap}
          value={value}
          onValueChange={(next) => {
            action('value-change')(next);
            setValue(next);
          }}
        >
          <MenuItem
            value="bb-5"
            label="Label"
            leadingIcon={<Icon>star</Icon>}
            trailingIcon={<Icon>chevron_right</Icon>}
            onClick={() => logItemClick('bb-5')}
          />
          <MenuItem
            value="bb-6"
            label="Label"
            leadingIcon={<Icon>star</Icon>}
            trailingIcon={<Icon>chevron_right</Icon>}
            onClick={() => logItemClick('bb-6')}
          />
          <MenuItem value="bb-7" label="Label" leadingIcon={<Icon>star</Icon>} onClick={() => logItemClick('bb-7')} />
        </Menu>
      </div>
    );
  },
};
