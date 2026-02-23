import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdSuggestionChip} from '@material/web/chips/suggestion-chip.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface SuggestionChipProps
  extends Omit<WebComponentProps<MdSuggestionChip>, 'onUpdateFocus'> {
  onUpdateFocus?: (event: Event) => void;
}

export const SuggestionChip = forwardRef<MdSuggestionChip, SuggestionChipProps>(
  function SuggestionChip({children, onUpdateFocus, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdSuggestionChip>(
      {
        tagName: 'md-suggestion-chip',
        importer: () => import('@material/web/chips/suggestion-chip.js'),
        events: {'update-focus': 'onUpdateFocus'},
      },
      {onUpdateFocus, ...rest},
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-suggestion-chip ref={mergedRef} {...domProps}>
        {children}
      </md-suggestion-chip>
    );
  },
);
