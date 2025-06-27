import type { Meta, StoryObj } from '@storybook/react';
import CrewNavbarSticky from './CrewNavbarSticky';
import { faBell, faCreditCard, faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { CrewButton } from '../../atoms';

const meta = {
  title: 'Organisms/CrewNavbarSticky',
  component: CrewNavbarSticky,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    notifications: { control: 'array' },
    onButtonClick: { action: 'clicked' },
    headerIconItems: { control: 'object' },
    labelVariant: { control: 'select', options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'] },
    menuItem: { control: 'array' },
  },
} as Meta<typeof CrewNavbarSticky>;

export default meta;

type Story = StoryObj<typeof meta>;

const notifications = [
  <div key="notification-1" className='top-navbar'>
    Limited Time <span className="discount-text">50 % OFF</span> KrewBee for 3 months{' '}
    <CrewButton className="nav-button">Grab Now</CrewButton>
  </div>,
];

const headerIconItems = [
  {
    icon: faBell,
    subMenuItems: [
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
    ],
  },
  {
    icon: faUser,
    link: '/setting',
  },
];

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

export const Default: Story = {
  args: {
    notifications,
    onButtonClick: () => {},
    headerIconItems,
    labelVariant: 'caption',
    menuItem,
  },
};
