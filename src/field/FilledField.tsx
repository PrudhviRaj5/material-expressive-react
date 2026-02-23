import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdFilledField} from '@material/web/field/filled-field.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface FilledFieldProps extends WebComponentProps<MdFilledField> {}

export const FilledField = forwardRef<MdFilledField, FilledFieldProps>(
  function FilledField({children, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdFilledField>(
      {
        tagName: 'md-filled-field',
        importer: () => import('@material/web/field/filled-field.js'),
      },
      rest,
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-filled-field ref={mergedRef} {...domProps}>
        {children}
      </md-filled-field>
    );
  },
);
