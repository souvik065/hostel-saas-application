import CrewTextBox from './CrewTextBox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/CrewTextBox',
  component: CrewTextBox,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholderText: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'],
    },
  },
} as Meta<typeof CrewTextBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextBox: Story = {
  args: {
    label: 'First Name',
    rows: 4,
    labelVariant: 'subtitle2',
    error: false,
    errorMessage: 'Email is required',
    placeholderText: 'Enter you Name',
  },
};
