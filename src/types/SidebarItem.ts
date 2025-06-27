import { SubmenuItem } from '@/config/NavMenuConfig';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SidebarItem {
  title: string;
  path: string;
  icon: IconProp;
  subitems?: SubmenuItem[];
}
