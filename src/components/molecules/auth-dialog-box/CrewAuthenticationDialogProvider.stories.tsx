import type { Meta, StoryObj } from '@storybook/react';

import CrewAuthenticationDialogProvider from './CrewAuthenticationDialogProvider';

const meta = {
  title: 'Molecules/CrewAuthenticationDialogProvider',
  component: CrewAuthenticationDialogProvider,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    msg: { control: 'text' },
  },
} satisfies Meta<typeof CrewAuthenticationDialogProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const authDialog: Story = {
  args: {
    open: true,
    msg: 'Session as Ended, Login again',
  },
};
