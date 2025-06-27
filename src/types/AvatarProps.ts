import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type menuItems = {
  name: string;
  icon: IconProp;
  path: string;
};

export interface AvatarProps {
  image: string;
  name: string;
  email: string;
  emailLength?: number;
  menuItems: menuItems[];
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}
