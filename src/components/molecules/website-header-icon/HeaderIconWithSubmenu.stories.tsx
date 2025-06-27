import type { Meta, StoryObj } from '@storybook/react';
import HeaderIconWithSubmenu from './HeaderIconWithSubmenu';
import { faCog, faCreditCard, faEdit, faQuestion } from '@fortawesome/free-solid-svg-icons';
const menuItems = [
  {
    name: 'Post',
    icon: faEdit,
    path: 'http://localhost:6006/setting',
  },
  {
    name: 'Pages',
    icon: faCreditCard,
    path: 'http://localhost:6006/setting',
  },
  {
    name: 'Tag',
    icon: faQuestion,
    path: 'http://localhost:6006/setting',
  },
  {
    name: 'Comments',
    icon: faCog,
    path: 'http://localhost:6006/setting',
  },
];

const meta = {
  title: 'Molecules/HeaderIconWithSubmenu',
  component: HeaderIconWithSubmenu,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    icon: { control: 'string' },
    link: { control: 'string' },
    subMenuItems: { control: 'array' },
  },
} satisfies Meta<typeof HeaderIconWithSubmenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelVariant: 'caption',
    subMenuItems: menuItems,
    link: 'http://localhost:6006/setting',
    icon: faCog,
  },
};

export const WithIcon: Story = {
  args: {
    link: 'http://localhost:6006/setting',
    icon: faCog,
  },
};

export const WithIconAndSubMenu: Story = {
  args: {
    link: 'http://localhost:6006/hostel',
    icon: faCog,
    subMenuItems: menuItems,
  },
};
