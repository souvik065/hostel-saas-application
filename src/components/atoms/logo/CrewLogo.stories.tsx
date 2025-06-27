import type { Meta, StoryObj } from '@storybook/react';

import CrewLogo from './CrewLogo';
import Light from '../../../assets/images/logos/light.png';

const meta = {
  title: 'Atoms/CrewLogo',
  component: CrewLogo,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    alt: { control: 'text' },
    height: { control: 'text' },
    src: { control: 'text' },
    theme: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof CrewLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    alt: 'Crew Logo',
    height: 100,
    src: Light,
    theme: 'light',
    width: 200,
  },
};
