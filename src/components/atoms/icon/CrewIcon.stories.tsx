import type { Meta, StoryObj } from '@storybook/react';
import CrewIcon from './CrewIcon';
import { faClose, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';


const meta = {
  title: 'Atoms/CrewIcon',
  component: CrewIcon,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    hasInheritedStyles: { control: 'boolean' },
    icon: { control: 'text' },
    size: { control: 'text' },
    sx: { control: 'text' },
  },
} as Meta<typeof CrewIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Close: Story = {
  args: {
    hasInheritedStyles: false,
    icon: faClose,
    size: 'medium',
  },
};

export const Trash: Story = {
  args: {
    hasInheritedStyles: false,
    icon: faTrash,
    size: 'medium',
  },
};

export const Envolope: Story = {
  args: {
    hasInheritedStyles: false,
    icon: faEnvelope,
    size: 'medium',
  },
};

export const Brand: Story = {
  args: {
    hasInheritedStyles: false,
    icon: 'google',
    size: 'medium',
  },
};
