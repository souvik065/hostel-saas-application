import type { Meta, StoryObj } from '@storybook/react';

import CrewTimeSelector from './CrewTimeSelector';

const meta = {
  title: 'Atoms/CrewTimeSelector',
  component: CrewTimeSelector,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    onSelectTime: { control: '() => void' },
  },
} satisfies Meta<typeof CrewTimeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelectTime: () => {},
  },
};
