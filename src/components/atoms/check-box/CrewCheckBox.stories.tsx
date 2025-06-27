import type { Meta, StoryObj } from '@storybook/react';
import CrewCheckBox from './CrewCheckBox';

const meta = {
  title: 'Atoms/CrewCheckBox',
  component: CrewCheckBox,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    labelName: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { control: '() => void' },
    name: { control: 'text' },
  },
} satisfies Meta<typeof CrewCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RememberMeCheckbox: Story = {
  args: {
    labelName: 'Remember Me',
    checked: false,
    disabled: false,
    id: 'Rememeber',
  },
};

export const UncheckedCheckbox: Story = {
  args: {
    labelName: 'Unchecked',
    checked: false,
    disabled: false,
    id: 'Unchecked',
  },
};

export const CheckedCheckbox: Story = {
  args: {
    labelName: 'Checked',
    checked: true,
    disabled: false,
    id: 'Checked',
  },
};

export const DisabledCheckbox: Story = {
  args: {
    labelName: 'Disabled',
    checked: false,
    disabled: true,
    id: 'Disabled',
  },
};
