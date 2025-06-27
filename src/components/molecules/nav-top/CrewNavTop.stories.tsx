import type { Meta, StoryObj } from '@storybook/react';
import CrewNavTop from './CrewNavTop';
import { CrewButton } from '../../atoms';
import './CrewNavTop.scss';
import { Stack } from '@mui/material';

const meta = {
  title: 'Molecules/NavTop',
  component: CrewNavTop,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    singleColor: {
      control: 'boolean',
    },
    notifications: {
      control: 'array',
    },
    hasSubnav: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof CrewNavTop>;

export default meta;

type Story = StoryObj<typeof meta>;

const Notification = () => {
  return (
    <div>
      Limited Time <span className='discount-text'>50 % OFF</span> KrewBee for 3 months <CrewButton className='nav-button'>Grab Now</CrewButton>
    </div>
  );
};

export const Default: Story = {
  args: {
    singleColor: false,
    notifications: [Notification()],
    hasSubnav: false,
  },
};
