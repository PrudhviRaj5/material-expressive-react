import * as React from 'react';

export type ListSize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type ListVariant = 'standard' | 'vibrant';
export type ListSelectType = 'single' | 'multi';

export interface ListContextValue {
  size: ListSize;
  variant: ListVariant;
  selectType: ListSelectType;
}

const ListContext = React.createContext<ListContextValue | null>(null);

export function useListContext(): ListContextValue | null {
  return React.useContext(ListContext);
}

export const ListContextProvider = ListContext.Provider;
