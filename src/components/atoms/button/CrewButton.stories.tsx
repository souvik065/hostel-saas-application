import type { Meta, StoryObj } from '@storybook/react';
import CrewButton from './CrewButton';
import {CrewIcon} from '../../atoms';

const meta = {
  title: 'Atoms/CrewButton',
  component: CrewButton,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],

  argTypes: {
    color: { control: 'color' },
    variant: {
      control: 'select',
      options: ['text', 'contained', 'outlined', 'primary', 'transparent'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    children: { control: 'select', options: ['Login', 'Google Account', 'Click me', 'Button'] },
    startIcon: { control: 'object' },
    endIcon: { control: 'object' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: { control: 'text' },
    onClick: { control: '() => void' },
    stylebutton: { control: 'boolean' },
  },
} satisfies Meta<typeof CrewButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    variant: 'contained',
    size: 'medium',
    startIcon: '',
    endIcon: '',
    disabled: false,
    fullWidth: false,
    children: 'Button',
    stylebutton: false,
  },
};

export const StyledButton: Story = {
  args: {
    color: 'secondary',
    variant: 'contained',
    size: 'small',
    startIcon: '',
    endIcon: '',
    disabled: false,
    fullWidth: false,
    children: 'Button',
    stylebutton: true,
  },
};

export const PrimaryButton: Story = {
  args: {
    color: 'customBlack',
    children: 'Login',
    variant: 'primary',
    size: 'small',
    startIcon: '',
    endIcon: '',
    disabled: false,
    fullWidth: false,

    stylebutton: false,
  },
};

export const TransparentButton: Story = {
  args: {
    color: 'customBlack',
    children: 'Google Account',
    variant: 'transparent',
    size: 'small',
    startIcon: <CrewIcon icon={`google`} />,
    endIcon: '',
    disabled: false,
    fullWidth: false,
    stylebutton: false,
  },
};
