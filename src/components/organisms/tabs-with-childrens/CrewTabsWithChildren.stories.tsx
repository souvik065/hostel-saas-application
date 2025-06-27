import type { Meta, StoryObj } from '@storybook/react';
import CrewTabsWithChildren from './CrewTabsWithChildren';
const meta = {
  title: 'Organisms/CrewTabsWithChildren',
  component: CrewTabsWithChildren,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'array' },
    onChange: { control: 'function' },
  },
} as Meta<typeof CrewTabsWithChildren>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    children: 'Tab 1',
    onChange: (index) => console.log(`Tab selected: ${index}`),
  },
};
