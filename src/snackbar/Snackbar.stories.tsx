import React from 'react';
import {action} from '@storybook/addon-actions';

import {Snackbar, SnackbarDuration} from './Snackbar';

type SnackbarLocation =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'center-start'
  | 'center'
  | 'center-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

const locationStyles: Record<SnackbarLocation, React.CSSProperties> = {
  'top-start': {top: 16, left: 16},
  'top-center': {top: 16, left: '50%', transform: 'translateX(-50%)'},
  'top-end': {top: 16, right: 16},
  'center-start': {top: '50%', left: 16, transform: 'translateY(-50%)'},
  center: {top: '50%', left: '50%', transform: 'translate(-50%, -50%)'},
  'center-end': {top: '50%', right: 16, transform: 'translateY(-50%)'},
  'bottom-start': {bottom: 16, left: 16},
  'bottom-center': {bottom: 16, left: '50%', transform: 'translateX(-50%)'},
  'bottom-end': {bottom: 16, right: 16},
};

const modeTokens = {
  light: {
    '--md-sys-color-inverse-surface': '#322f35',
    '--md-sys-color-inverse-on-surface': '#f5eff7',
    '--md-sys-color-inverse-primary': '#d0bcff',
  } as React.CSSProperties,
  dark: {
    '--md-sys-color-inverse-surface': '#e6e0e9',
    '--md-sys-color-inverse-on-surface': '#322f35',
    '--md-sys-color-inverse-primary': '#6750a4',
  } as React.CSSProperties,
};

const meta = {
  title: 'Misc/Snackbar',
  component: Snackbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    supportingText: {control: 'text'},
    action: {control: 'text'},
    closeButton: {control: 'boolean'},
    multiLine: {control: 'boolean'},
    duration: {
      control: {type: 'select'},
      options: ['Short (4s)', 'Long (10s)', 'Indefinite'],
      mapping: {
        'Short (4s)': SnackbarDuration.SHORT,
        'Long (10s)': SnackbarDuration.LONG,
        Indefinite: SnackbarDuration.INDEFINITE,
      },
    },
    open: {control: 'boolean'},
    mode: {
      control: {type: 'radio'},
      options: ['light', 'dark'],
      description: 'Color mode for the snackbar',
    },
    location: {
      control: {type: 'select'},
      options: [
        'top-start',
        'top-center',
        'top-end',
        'center-start',
        'center',
        'center-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ],
      description: 'Where the snackbar appears on screen',
    },
    onAction: {table: {disable: true}},
    onClose: {table: {disable: true}},
    onDismiss: {table: {disable: true}},
  },
};

export default meta;

export const Default = {
  args: {
    supportingText: 'Photo has been saved',
    open: true,
    duration: SnackbarDuration.INDEFINITE,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

export const WithAction = {
  args: {
    supportingText: 'Changes could not be saved',
    action: 'Retry',
    open: true,
    duration: SnackbarDuration.INDEFINITE,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

export const WithCloseButton = {
  args: {
    supportingText: 'Photo has been saved',
    closeButton: true,
    open: true,
    duration: SnackbarDuration.INDEFINITE,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

export const WithActionAndCloseButton = {
  args: {
    supportingText: 'Connection timed out. Showing limited messages.',
    action: 'Retry',
    closeButton: true,
    open: true,
    duration: SnackbarDuration.INDEFINITE,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

export const MultiLine = {
  args: {
    supportingText:
      'This is a longer message that wraps to multiple lines in the snackbar component to demonstrate the multi-line layout.',
    action: 'Action',
    closeButton: true,
    multiLine: true,
    open: true,
    duration: SnackbarDuration.INDEFINITE,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};

export const AutoDismiss = {
  args: {
    supportingText: 'Message sent',
    open: true,
    duration: SnackbarDuration.SHORT,
    mode: 'light',
    location: 'bottom-center' as SnackbarLocation,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const {onAction: _a, onClose: _c, onDismiss: _d, mode, location, ...snackbarArgs} = args;
    const [open, setOpen] = React.useState(Boolean(args.open));

    React.useEffect(() => {
      setOpen(Boolean(args.open));
    }, [args.open]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: mode === 'dark' ? '#1c1b1f' : '#fffbfe',
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Show Snackbar
        </button>
        <div style={{position: 'fixed', zIndex: 1000, ...locationStyles[location as SnackbarLocation]}}>
          <Snackbar
            {...snackbarArgs}
            open={open}
            style={modeTokens[mode as 'light' | 'dark']}
            onAction={() => {
              action('action')();
              setOpen(false);
            }}
            onClose={() => {
              action('close')();
              setOpen(false);
            }}
            onDismiss={() => {
              action('dismiss')();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
  },
};
