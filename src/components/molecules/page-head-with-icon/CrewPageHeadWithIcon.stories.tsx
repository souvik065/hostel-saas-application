import type { Meta, StoryObj } from '@storybook/react';
import CrewPageHeadWithIcon from './CrewPageHeadWithIcon';
import { faClose, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
const meta = {
  title: 'Molecules/CrewPageHeadWithIcon',
  component: CrewPageHeadWithIcon,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'string', defaultValue: 'Tab 1' },
    variant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    icon: {
      control: 'object',
      defaultValue: {
        icon: faEnvelope,
      },
    },
    iconPlacementPosition: { control: 'select', options: ['left', 'right'] },
  },
} as Meta<typeof CrewPageHeadWithIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Tab 1',
    variant: 'subtitle1',
    icon: {
      icon: faEnvelope,
    },
    iconPlacementPosition: 'right',
  },
};
