import * as React from 'react';

export interface SlottedProps {
  slot: string;
  children: React.ReactNode;
}

/**
 * Utility for applying a named slot to children.
 *
 * This is primarily helpful when you want to slot a React component that
 * doesn't expose `slot` in its props.
 */
export function Slotted({slot, children}: SlottedProps) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {slot} as {slot: string});
      })}
    </>
  );
}

