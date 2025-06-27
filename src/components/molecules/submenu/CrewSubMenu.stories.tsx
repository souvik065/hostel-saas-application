import type { Meta, StoryObj } from '@storybook/react';
import CrewSubMenu from './CrewSubMenu';
import { faCog, faCreditCard, faEdit, faQuestion } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  {
    name: 'Edit Profile',
    icon: faEdit,
    path: '/profile',
  },
  {
    name: 'Payments',
    icon: faCreditCard,
    path: '',
  },
  {
    name: 'Need Help',
    icon: faQuestion,
    path: '',
  },
 
];

const meta = {
  title: 'Molecules/CrewSubMenu',
  component: CrewSubMenu,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    menuItems: { control: 'object' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    isLogoutButton: {control: 'boolean'},
  },
} satisfies Meta<typeof CrewSubMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    labelVariant: 'caption',
    menuItems: menuItems,
    isLogoutButton: false
  },
};
