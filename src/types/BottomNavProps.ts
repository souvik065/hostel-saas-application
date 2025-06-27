import { HeaderIconWithSubMenuProps } from './HeaderIconWithSubMenuProps';
export type menuItem = {
  name: string;
  path: string;
};

export interface BottomNavProps {
  menuItem: menuItem[];
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
  headerIconItems: HeaderIconWithSubMenuProps[];
}
