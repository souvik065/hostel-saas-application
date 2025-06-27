import { menuItems } from './CrewSubMenuProps';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface HeaderIconWithSubMenuProps {
  icon:IconDefinition;
  link?: string;
  subMenuItems?: menuItems[];
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  className?: string;
}

