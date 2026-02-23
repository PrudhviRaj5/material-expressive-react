import type * as React from 'react';
import {forwardRef, useRef} from 'react';

import type {MdList} from '@material/web/list/list.js';

import {useEnsureDefined, useMergedRefs} from '../internal/hooks';

export interface ListProps extends React.HTMLAttributes<MdList> {
  children?: React.ReactNode;
}

export const List = forwardRef<MdList, ListProps>(function List(
  {children, ...rest},
  ref,
) {
  useEnsureDefined('md-list', () => import('@material/web/list/list.js'));

  const innerRef = useRef<MdList>(null);
  const mergedRef = useMergedRefs(ref, innerRef);

  return (
    // eslint-disable-next-line react/no-unknown-property
    <md-list ref={mergedRef} {...rest}>
      {children}
    </md-list>
  );
});
