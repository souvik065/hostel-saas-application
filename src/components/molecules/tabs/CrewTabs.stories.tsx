import type { Meta, StoryObj } from '@storybook/react';
import CrewTabs from './CrewTabs';
const meta = {
  title: 'Molecules/CrewTabs',
  component: CrewTabs,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'array' },
    value: { control: 'number' },
    onChange: { control: 'function' },
  },
} as Meta<typeof CrewTabs>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    tabs: [{ label: 'Tab 1' }, { label: 'Tab 2' }, { label: 'Tab 3' }],
    value: 0,
    onChange: (index) => console.log(`Tab selected: ${index}`),
  },
};
