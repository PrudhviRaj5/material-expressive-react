import * as React from 'react';

import type {MenuVariant} from './MenuSurface';

export type MenuSelectType = 'single' | 'multi';

export interface MenuContextValue {
  variant: MenuVariant;
  selectType: MenuSelectType;
  selected: Set<string>;
  toggleValue: (value: string) => void;
}

export const MenuContext = React.createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  return React.useContext(MenuContext);
}
