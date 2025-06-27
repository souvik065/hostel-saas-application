import type { Meta, StoryObj } from '@storybook/react';
import CrewRadioButton from './CrewRadioButtonGroup';
import CrewRadioButtonGroup from './CrewRadioButtonGroup';

const meta = {
  title: 'Molecules/CrewRadioButtonGroup',
  component: CrewRadioButton,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: '() => void' },
    label: { control: 'text' },
    options: { control: 'array' },
  },
} satisfies Meta<typeof CrewRadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RememberMeRadiobutton: Story = {
  args: {
    label: 'Save As Student',
    selectedValue: 'Yes',
    options: [
      {
        label: 'Yes',
        name: 'button-types',
        disabled: false,
      },
      {
        label: 'No',
        name: 'button-types',
        disabled: false,
      },
    ],
  },
};
