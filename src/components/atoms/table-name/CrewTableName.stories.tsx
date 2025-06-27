import type { Meta, StoryObj } from '@storybook/react';
import CrewTableName from './CrewTableName';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'Atoms/CrewTableName',
  component: CrewTableName,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    tableName: { control: 'text' },
    fontWeight: { control: 'select', options: ['normal', 'bold'] },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    icon: { control: 'object' },
    iconPlacementPosition: { control: 'select', options: ['left', 'right'] },
  },
} as Meta<typeof CrewTableName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutIcon: Story = {
  args: {
    tableName: 'Crew',
    labelVariant: 'h6',
  },
};

export const WithIcon: Story = {
  args: {
    tableName: 'Crew',
    labelVariant: 'h6',
    icon: {
      icon: faEnvelope,
    },
    iconPlacementPosition: 'right',
  },
};
