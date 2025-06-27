import type { Meta, StoryObj } from '@storybook/react';
import CrewTableSearch from './CrewTableSearch';

const meta = {
  title: 'Molecules/CrewTableSearch',
  component: CrewTableSearch,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {},
    borderRadius: {
      control: 'number',
    },
    labelVariant: {
      control: 'select',
      option: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} as Meta<typeof CrewTableSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search',
    labelVariant: 'subtitle1',
    borderRadius: 5,
  },
};
