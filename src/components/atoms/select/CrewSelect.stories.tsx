import type { Meta, StoryObj } from '@storybook/react';
import CrewSelect from './CrewSelect';

const meta = {
  title: 'Atoms/CrewSelect',
  component: CrewSelect,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    error: { control: 'boolean' },
    value: { control: 'text' },
    onChange: { control: '() => void' },
    errorMessage: { control: 'text' },
    menuItems: { control: 'object' },
  },
} satisfies Meta<typeof CrewSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Hostel: Story = {
  args: {
    label: 'Hostel name',
    placeholder: 'Type Hostel Name',
    labelVariant: 'subtitle2',
    error: false,
    errorMessage: 'Hostel name is required',
    menuItems: [
      { value: '1', label: 'Hostel 1' },
      { value: '2', label: 'Hostel 2' },
      { value: '3', label: 'Hostel 3' },
    ],
  },
};
