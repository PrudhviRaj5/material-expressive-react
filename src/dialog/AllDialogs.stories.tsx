import React from 'react';
import {action} from '@storybook/addon-actions';

import {Dialog} from './Dialog';
import {FilledButton, FilledTonalButton, TextButton} from '../button';
import {Icon} from '../icon';
import {Radio} from '../radio';
import {Textfield} from '../textfield';

const meta = {
  title: 'dialog/AllDialogs',
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  argTypes: {
    quick: {control: 'boolean'},
    noFocusTrap: {control: 'boolean'},
    icon: {control: 'text'},
    headline: {control: 'text'},
    supportingText: {control: 'text'},
  },
};

export default meta;

function OpenButton({children, onClick}) {
  return (
    <FilledButton onClick={onClick} style={{minWidth: 120}}>
      {children}
    </FilledButton>
  );
}

function useOpenState() {
  const [open, setOpen] = React.useState(false);
  const show = React.useCallback(() => setOpen(true), []);
  const hide = React.useCallback(() => setOpen(false), []);
  return {open, show, hide};
}

export const Default = {
  args: {
    quick: false,
    noFocusTrap: false,
    icon: '',
    headline: 'Dialog',
    supportingText: 'Just a simple dialog',
    onOpen: action('open'),
    onOpened: action('opened'),
    onClose: action('close'),
    onClosed: action('closed'),
    onCancel: action('cancel'),
  },
  render: (args) => {
    const standard = useOpenState();
    const alert = useOpenState();
    const confirm = useOpenState();
    const choose = useOpenState();
    const form = useOpenState();
    const sheet = useOpenState();

    const pageStyle = {
      padding: 24,
      maxWidth: 1100,
      margin: '0 auto',
      boxSizing: 'border-box',
    };

    const sectionStyle = {
      display: 'grid',
      gap: 12,
      marginBottom: 20,
    };

    const titleStyle = {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      margin: 0,
    };

    const rowStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12,
      alignItems: 'center',
    };

    const baseDialogProps = {
      quick: args.quick,
      // Material Web uses `no-focus-trap` attribute; prop name is `noFocusTrap`.
      noFocusTrap: args.noFocusTrap,
      onOpen: args.onOpen,
      onOpened: args.onOpened,
      onClose: args.onClose,
      onClosed: args.onClosed,
      onCancel: args.onCancel,
    };

    const iconSlot = args.icon ? <Icon slot="icon">{args.icon}</Icon> : null;
    const headlineText = args.headline || '';
    const supportingText = args.supportingText || '';

    return (
      <div style={pageStyle}>
        <div style={sectionStyle}>
          <p style={titleStyle}>Dialog</p>
          <div style={rowStyle}>
            <OpenButton onClick={standard.show}>Open</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            open={standard.open}
            aria-label={headlineText ? undefined : 'A simple dialog'}
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              standard.hide();
            }}
          >
            {iconSlot}
            <div slot="headline">{headlineText}</div>
            <form id="dialog-standard" slot="content" method="dialog">
              <span>{supportingText}</span>
            </form>
            <div slot="actions">
              <TextButton form="dialog-standard" value="close">
                Close
              </TextButton>
              <TextButton form="dialog-standard" value="ok" autofocus>
                OK
              </TextButton>
            </div>
          </Dialog>
        </div>

        <div style={sectionStyle}>
          <p style={titleStyle}>Alert</p>
          <div style={rowStyle}>
            <OpenButton onClick={alert.show}>Alert</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            type="alert"
            open={alert.open}
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              alert.hide();
            }}
          >
            <div slot="headline">Alert dialog</div>
            <form id="dialog-alert" slot="content" method="dialog">
              This is a standard alert dialog.
            </form>
            <div slot="actions">
              <TextButton form="dialog-alert" value="ok" autofocus>
                OK
              </TextButton>
            </div>
          </Dialog>
        </div>

        <div style={sectionStyle}>
          <p style={titleStyle}>Confirm</p>
          <div style={rowStyle}>
            <OpenButton onClick={confirm.show}>Confirm</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            open={confirm.open}
            style={{maxWidth: 320}}
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              confirm.hide();
            }}
          >
            <div slot="headline">Permanently delete?</div>
            <Icon slot="icon">delete_outline</Icon>
            <form id="dialog-confirm" slot="content" method="dialog">
              Deleting the selected photos will also remove them from all synced devices.
            </form>
            <div slot="actions">
              <TextButton form="dialog-confirm" value="delete">
                Delete
              </TextButton>
              <FilledTonalButton form="dialog-confirm" value="cancel" autofocus>
                Cancel
              </FilledTonalButton>
            </div>
          </Dialog>
        </div>

        <div style={sectionStyle}>
          <p style={titleStyle}>Choose</p>
          <div style={rowStyle}>
            <OpenButton onClick={choose.show}>Choice</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            open={choose.open}
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              choose.hide();
            }}
          >
            <div slot="headline">Choose your favorite pet</div>
            <form id="dialog-choose" slot="content" method="dialog" style={{display: 'grid', gap: 8}}>
              <label style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Radio name="pet" value="cats" aria-label="Cats" checked touchTarget="wrapper" />
                <span aria-hidden="true">Cats</span>
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Radio name="pet" value="dogs" aria-label="Dogs" touchTarget="wrapper" />
                <span aria-hidden="true">Dogs</span>
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Radio name="pet" value="birds" aria-label="Birds" touchTarget="wrapper" />
                <span aria-hidden="true">Birds</span>
              </label>
            </form>
            <div slot="actions">
              <TextButton form="dialog-choose" value="cancel">
                Cancel
              </TextButton>
              <TextButton form="dialog-choose" value="ok" autofocus>
                OK
              </TextButton>
            </div>
          </Dialog>
        </div>

        <div style={sectionStyle}>
          <p style={titleStyle}>Form</p>
          <div style={rowStyle}>
            <OpenButton onClick={form.show}>Form</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            open={form.open}
            className="contacts"
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              form.hide();
            }}
          >
            <span slot="headline" style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{flex: 1}}>Create new contact</span>
            </span>
            <form id="dialog-form" slot="content" method="dialog" style={{display: 'grid', gap: 8}}>
              <div style={{display: 'flex', gap: 8}}>
                <Textfield autofocus label="First Name" style={{flex: 1}} />
                <Textfield label="Last Name" style={{flex: 1}} />
              </div>
              <div style={{display: 'flex', gap: 8}}>
                <Textfield label="Company" style={{flex: 1}} />
                <Textfield label="Job Title" style={{flex: 1}} />
              </div>
              <Textfield label="Email" />
              <Textfield label="Phone" />
            </form>
            <div slot="actions" style={{display: 'flex', gap: 8, alignItems: 'center'}}>
              <TextButton form="dialog-form" value="reset" type="reset">
                Reset
              </TextButton>
              <div style={{flex: 1}} />
              <TextButton form="dialog-form" value="cancel">
                Cancel
              </TextButton>
              <TextButton form="dialog-form" value="save">
                Save
              </TextButton>
            </div>
          </Dialog>
        </div>

        <div style={{...sectionStyle, marginBottom: 0}}>
          <p style={titleStyle}>Floating sheet</p>
          <div style={rowStyle}>
            <OpenButton onClick={sheet.show}>Floating sheet</OpenButton>
          </div>
          <Dialog
            {...baseDialogProps}
            open={sheet.open}
            onClosed={(ev) => {
              args?.onClosed?.({type: ev?.type, detail: ev?.detail});
              sheet.hide();
            }}
          >
            <span slot="headline" style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{flex: 1}}>Floating Sheet</span>
            </span>
            <form id="dialog-sheet" slot="content" method="dialog">
              This is a floating sheet with title. It accepts any HTML content.
            </form>
          </Dialog>
        </div>
      </div>
    );
  },
};
