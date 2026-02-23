import React from 'react';
import {action} from '@storybook/addon-actions';

import {NavigationRail} from './NavigationRail';
import {NavigationRailItem} from './NavigationRailItem';
import {Icon} from '../icon';
import {FilledButton} from '../button';

const meta = {
  title: 'Navigation/NavigationRail',
  component: NavigationRail,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['expanded', 'value'],
    },
  },
  argTypes: {
    expanded: {control: {type: 'boolean'}},
    value: {control: {type: 'radio'}, options: ['mail', 'chat', 'spaces', 'meet']},
    onExpandedChange: {table: {disable: true}},
    onValueChange: {table: {disable: true}},
    header: {table: {disable: true}},
    children: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    expanded: false,
    value: 'mail',
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const [expanded, setExpanded] = React.useState(Boolean(args.expanded));
    const [value, setValue] = React.useState<string>(args.value);

    React.useEffect(() => {
      setExpanded(Boolean(args.expanded));
    }, [args.expanded]);

    React.useEffect(() => {
      if (typeof args.value === 'string') setValue(args.value);
    }, [args.value]);

    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start'}}>
        <FilledButton onClick={() => setExpanded((v) => !v)}>
          Toggle expand
        </FilledButton>
        <NavigationRail
          expanded={expanded}
          onExpandedChange={(next) => {
            action('expanded-change')(next);
            setExpanded(next);
          }}
          value={value}
          onValueChange={(next) => {
            action('item-selected')(next);
            setValue(next);
          }}
          header={
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              style={{
                border: 0,
                background: 'transparent',
                padding: 8,
                borderRadius: 9999,
                cursor: 'pointer',
              }}
            >
              <Icon>menu</Icon>
            </button>
          }
          aria-label="XR navigation rail"
        >
          <NavigationRailItem value="mail" label="Mail" icon={<Icon>mail</Icon>} />
          <NavigationRailItem value="chat" label="Chat" icon={<Icon>chat</Icon>} />
          <NavigationRailItem value="spaces" label="Spaces" icon={<Icon>group</Icon>} />
          <NavigationRailItem value="meet" label="Meet" icon={<Icon>videocam</Icon>} />
        </NavigationRail>
      </div>
    );
  },
};
