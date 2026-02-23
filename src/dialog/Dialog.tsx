import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdDialog} from '@material/web/dialog/dialog.js';

import {useWebComponent} from '../internal/useWebComponent';

export interface DialogProps
  extends Omit<React.HTMLAttributes<MdDialog>, 'onOpen' | 'onClose' | 'onCancel'> {
  quick?: boolean;
  returnValue?: string;
  type?: string;
  noFocusTrap?: boolean;
  open?: boolean;
  getOpenAnimation?: () => unknown;
  getCloseAnimation?: () => unknown;

  onOpen?: (event: Event) => void;
  onOpened?: (event: Event) => void;
  onClose?: (event: Event) => void;
  onClosed?: (event: Event) => void;
  onCancel?: (event: Event) => void;
}

export const Dialog = forwardRef<MdDialog, DialogProps>(function Dialog(
  {children, onOpen, onOpened, onClose, onClosed, onCancel, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdDialog>(
    {
      tagName: 'md-dialog',
      importer: () => import('@material/web/dialog/dialog.js'),
      events: {
        open: 'onOpen',
        opened: 'onOpened',
        close: 'onClose',
        closed: 'onClosed',
        cancel: 'onCancel',
      },
    },
    {onOpen, onOpened, onClose, onClosed, onCancel, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-dialog ref={mergedRef} {...domProps}>
      {children}
    </md-dialog>
  );
});
