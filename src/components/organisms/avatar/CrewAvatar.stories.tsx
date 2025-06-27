import type { Meta, StoryObj } from '@storybook/react';
import CrewAvatar from './CrewAvatar';
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
    path: 'http://localhost:6006/setting',
  },
  {
    name: 'Need Help',
    icon: faQuestion,
    path: '/invoice',
  },
 
];

const meta = {
  title: 'Organisms/CrewAvatar',
  component: CrewAvatar,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    image: { control: 'string' },
    name: { control: 'string' },
    email: { control: 'string' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} satisfies Meta<typeof CrewAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    image: 'https://i.pravatar.cc/150?img=3',
    name: 'John Doe',
    email: 'john-doe@gmail.com',
    labelVariant: 'caption',
    menuItems: menuItems,
  },
};

export const WithoutImage: Story = {
  args: {
    image: '',
    name: 'John Doe',
    email: 'john-doe@gmail.com',
    labelVariant: 'caption',
    menuItems: menuItems,
  },
};
