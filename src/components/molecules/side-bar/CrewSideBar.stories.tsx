import type { Meta, StoryObj } from '@storybook/react';
import CrewSideBar from './CrewSideBar';
import { boolean, object } from 'yup';

const meta = {
  title: 'Molecules/CrewSideBar',
  component: CrewSideBar,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: boolean },
    onClose: { control: 'text' },
    user: { control: object },
    userRole: { control: 'text' },
  },
} as Meta<typeof CrewSideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    user: { image: '', name: 'test user', email: 'test@gmail.com' },
  },
};
