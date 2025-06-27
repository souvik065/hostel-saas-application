import type { Meta, StoryObj } from '@storybook/react';
import CrewPageHead from './CrewPageHead';

const meta = {
  title: 'Atoms/CrewPageHead',
  component: CrewPageHead,
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
  },
} as Meta<typeof CrewPageHead>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Tab 1',
    variant: 'subtitle1',
  },
};
