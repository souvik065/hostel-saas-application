import type { Meta, StoryObj } from '@storybook/react';
import CrewTableInfo from './CrewTableInfo';

const meta = {
  title: 'Atoms/CrewTableInfo',
  component: CrewTableInfo,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'text' },
    itemsPerPage: { control: 'text' },
    totalItems: { control: 'text' },
    variant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} as Meta<typeof CrewTableInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 20,
    variant: 'caption'
  },
};
