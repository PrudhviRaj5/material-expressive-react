import type * as React from 'react';
import {forwardRef} from 'react';

import type {MdOutlinedField} from '@material/web/field/outlined-field.js';

import type {WebComponentProps} from '../internal/createComponent';
import {useWebComponent} from '../internal/useWebComponent';

export interface OutlinedFieldProps extends WebComponentProps<MdOutlinedField> {}

export const OutlinedField = forwardRef<MdOutlinedField, OutlinedFieldProps>(
  function OutlinedField({children, ...rest}, ref) {
    const {ref: mergedRef, domProps} = useWebComponent<MdOutlinedField>(
      {
        tagName: 'md-outlined-field',
        importer: () => import('@material/web/field/outlined-field.js'),
      },
      rest,
      ref,
    );

    return (
      // eslint-disable-next-line react/no-unknown-property
      <md-outlined-field ref={mergedRef} {...domProps}>
        {children}
      </md-outlined-field>
    );
  },
);
