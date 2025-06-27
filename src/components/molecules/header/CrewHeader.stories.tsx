import type { Meta, StoryObj } from '@storybook/react';
import CrewHeader from './CrewHeader';

const meta = {
  title: 'Molecules/CrewHeader',
  component: CrewHeader,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    pageTitle: { control: 'text' },
    name: { control: 'text' },
    image: { control: 'text' },
    onNavOpen: { action: 'clicked' },
  },
} as Meta<typeof CrewHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageTitle: 'Hostel',
    name: 'Ram',
    image: '',
    onNavOpen: () => {},
  },
};
