import type { Meta, StoryObj } from '@storybook/react';
import CrewHeaderWithExpandableContent from './CrewHeaderWithExpandableContent';

const meta = {
  title: 'Molecules/CrewHeaderWithExpandableContent',
  component: CrewHeaderWithExpandableContent,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    expandableContent: { control: 'object' },
  },
} as Meta<typeof CrewHeaderWithExpandableContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: 'subheading',
    content: 'expandable content',
  },
};
