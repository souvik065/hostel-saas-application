import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type menuItems = {
  name: string;
  icon?: IconProp;
  path?: string;
};

export interface CrewSubMenuProps {
  menuItems?: menuItems[];
  open?: boolean;
  isLogoutButton?: boolean;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}
