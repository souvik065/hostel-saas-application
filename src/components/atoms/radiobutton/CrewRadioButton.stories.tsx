import type { Meta, StoryObj } from '@storybook/react';
import CrewRadioButton from './CrewRadioButton';

const meta = {
  title: 'atoms/CrewRadiobutton',
  component: CrewRadioButton,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    id: { control: 'text' },
  },
} satisfies Meta<typeof CrewRadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RememberMeRadiobutton: Story = {
  args: {
    label: 'Select Option',
    disabled: false,
    id: 'Rememeber',
  },
};
