import * as React from 'react';

export interface OutlinedSegmentedButtonProps {
  value: string;
  icon?: React.ReactNode | string;
  label?: React.ReactNode | string;
  disabled?: boolean;
}

export function OutlinedSegmentedButton(_props: OutlinedSegmentedButtonProps) {
  // This is a presentational child for OutlinedSegmentedButtonSet.
  // Rendering is handled by the parent.
  return null;
}

OutlinedSegmentedButton.displayName = 'OutlinedSegmentedButton';
