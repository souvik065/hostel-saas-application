import type { Meta, StoryObj } from '@storybook/react';
import CrewTimePicker from './CrewTimePicker';

const meta = {
  title: 'Molecules/CrewTimePicker',
  component: CrewTimePicker,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    onTimeChange: { control: '() => void' },
    name: { control: 'text' },
    id: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof CrewTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onTimeChange: () => {},
    name: 'date',
    id: 'date',
    error: false,
    errorMessage: 'Time field is required',
    label: 'Time',
    labelVariant: 'body1',
    placeholder: 'Enter the time',
  },
};
