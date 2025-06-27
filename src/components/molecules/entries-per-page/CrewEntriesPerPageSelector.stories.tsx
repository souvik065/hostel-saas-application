import type { Meta, StoryObj } from '@storybook/react';
import CrewEntriesPerPageSelector from './CrewEntriesPerPageSelector';

const meta = {
  title: 'Molecules/CrewEntriesPerPageSelector',
  component: CrewEntriesPerPageSelector,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    pageSize: { control: 'number' },
    onChange: { control: '() => void' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    spacing: { control: 'number' },
    direction: { control: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'] },
  },
} satisfies Meta<typeof CrewEntriesPerPageSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageSize: 10,
    labelVariant: 'subtitle2',
    spacing: 1,
    direction: 'row',
  },
};
