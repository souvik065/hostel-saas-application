import type { Meta, StoryObj } from '@storybook/react';
import CrewImage from './CrewImage';

const meta = {
  title: 'Atoms/CrewImage',
  component: CrewImage,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    source: { control: 'text' },
    description: { control: 'text' },
    className: { control: 'text' },
    loading: { control: 'select', options: ['lazy', 'eager'] },
  },
} as Meta<typeof CrewImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: 'https://assets-global.website-files.com/5ebb805f3b213bfa79330c75/64b9f3e8d8ac6d8c1bab2be3_B1.jpg',
    description: 'Crew Image',
  },
};
