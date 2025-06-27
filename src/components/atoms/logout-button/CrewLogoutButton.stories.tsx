import type { Meta, StoryObj } from '@storybook/react';
import CrewLogoutButton from './CrewLogoutButton';

const meta = {
  title: 'Atoms/CrewLogoutButton',
  component: CrewLogoutButton,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    buttonVariant: { control: 'text' },
    handleLogoutClick: { control: '() => void' },
  },
} satisfies Meta<typeof CrewLogoutButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    buttonVariant: 'logoutContained',
  },
};
