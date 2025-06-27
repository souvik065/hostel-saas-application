import type { Meta, StoryObj } from '@storybook/react';
import CrewTableModal from './CrewTableModal';

const meta = {
  title: 'Molecules/CrewTableModal',
  component: CrewTableModal,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    onClose: { control: '(() => void)' },
    onActionSelect: { control: '(() => void)' },
    actions: {
      control: 'object',
    },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    anchorEl: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args : {
    open: true,
    labelVariant: 'subtitle2',
    actions: [{ id: 3, label: 'Action 1' }],
    anchorEl: document.createElement('div'),
  },
};
