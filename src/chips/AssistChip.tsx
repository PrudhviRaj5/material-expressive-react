import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdAssistChip} from '@material/web/chips/assist-chip.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface AssistChipProps
  extends Omit<WebComponentProps<MdAssistChip>, 'onUpdateFocus'> {
  onUpdateFocus?: (event: Event) => void;
}

export const AssistChip = forwardRef<MdAssistChip, AssistChipProps>(function AssistChip(
  {children, onUpdateFocus, ...rest},
  ref,
) {
  const {ref: mergedRef, domProps} = useWebComponent<MdAssistChip>(
    {
      tagName: 'md-assist-chip',
      importer: () => import('@material/web/chips/assist-chip.js'),
      events: {'update-focus': 'onUpdateFocus'},
    },
    {onUpdateFocus, ...rest},
    ref,
  );

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-assist-chip ref={mergedRef} {...domProps}>
      {children}
    </md-assist-chip>
  );
});
