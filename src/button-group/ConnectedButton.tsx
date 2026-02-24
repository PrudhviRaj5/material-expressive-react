import * as React from 'react';

export interface ConnectedButtonProps {
  value: string;
  icon?: React.ReactNode | string;
  label?: React.ReactNode | string;
  disabled?: boolean;
}

export function ConnectedButton(_props: ConnectedButtonProps) {
  // Marker child used by ConnectedButtonGroup.
  return null;
}

ConnectedButton.displayName = 'ConnectedButton';
