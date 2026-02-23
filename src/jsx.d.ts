import type * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Allow custom element tags without maintaining a huge tag map here.
      // Wrapper components provide the public typed API.
      [elemName: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

