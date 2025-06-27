import type { Meta, StoryObj } from '@storybook/react';
import CrewNavBottom from './CrewNavBottom';
import { faBell, faCreditCard, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { HeaderIconWithSubMenuProps } from '@/types/HeaderIconWithSubMenuProps';

const menuItem = [
  {
    name: 'Products & Features',
    path: '',
  },
  {
    name: 'Plan & Pricing',
    path: '',
  },
  {
    name: 'Learn & Support',
    path: '',
  },
];

const headerIconItems: HeaderIconWithSubMenuProps[] = [ // Updated type to HeaderIconWithSubMenuProps[]
  {
    icon: faBell,
    subMenuItems: [
      {
        name: 'Post',
        icon: faEdit,
        path: '/profile',
      },
      {
        name: 'Pages',
        icon: faCreditCard,
        path: '',
      },
    ],
  },
 
];

const meta = {
  title: 'Molecules/CrewNavBottom',
  component: CrewNavBottom,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    menuItem: { control: 'object' },
    headerIconItems: { control: 'array' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} satisfies Meta<typeof CrewNavBottom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelVariant: 'caption',
    headerIconItems: headerIconItems,
    menuItem: menuItem,
  },
};
