import React from 'react';
import {action} from '@storybook/addon-actions';

import {Dialog} from './Dialog';
import {FilledButton, TextButton} from '../button';

const meta = {
  title: 'dialog/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
  argTypes: {
    quick: {control: 'boolean'},
    noFocusTrap: {control: 'boolean'},
    type: {control: {type: 'select'}, options: [undefined, 'alert']},
    open: {control: 'boolean'},
    returnValue: {control: 'text'},
    getOpenAnimation: {control: false},
    getCloseAnimation: {control: false},
  },
};

export default meta;

export const Default = {
  args: {
    quick: false,
    noFocusTrap: false,
    type: undefined,
    open: false,
    returnValue: '',
    onOpen: action('open'),
    onOpened: action('opened'),
    onClose: action('close'),
    onClosed: action('closed'),
    onCancel: action('cancel'),
  },
  render: (args) => {
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    const onClosed = (ev) => {
      args?.onClosed?.(ev);
      setOpen(false);
    };

    return (
      <div style={{display: 'grid', gap: 12, justifyItems: 'start', minWidth: 360}}>
        <FilledButton onClick={() => setOpen(true)} disabled={open}>
          Open dialog
        </FilledButton>

        <Dialog {...args} open={open} onClosed={onClosed} aria-label="Example dialog">
          <div slot="headline">Dialog</div>
          <form id="dialog-form" slot="content" method="dialog">
            <span>Just a simple dialog.</span>
          </form>
          <div slot="actions">
            <TextButton form="dialog-form" value="cancel">
              Cancel
            </TextButton>
            <TextButton form="dialog-form" value="ok" autofocus>
              OK
            </TextButton>
          </div>
        </Dialog>
      </div>
    );
  },
};
