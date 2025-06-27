import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type menuItems ={
    name:string;
    icon:IconProp;
    path:string;
}

export interface TopNavProps {
    onNavOpen: () => void;
    image: string;
    name: string;
    email: string;
    pageTitle?: string;
    menuItems:menuItems[];
  }
  