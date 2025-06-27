import type { Meta, StoryObj } from '@storybook/react';
import CrewLink from './CrewLink';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CrewIcon } from '..';

const meta = {
  title: 'Atoms/CrewLink',
  component: CrewLink,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    target: { control: 'text' },
  },
} as Meta<typeof CrewLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkOpenInATab: Story = {
  args: {
    href: 'https://www.google.co.in/',
    target: '_blank',
    children: 'Open Google India in a new tab',
  },
};

export const LinkWithAnIconLeft: Story = {
  args: {
    href: 'https://www.google.co.in/',
    children: 'Open Google India',
    prefixSuffixIcon: {
      icon: faEnvelope,
    },
    iconPlacementPosition: 'left',
  },
};

export const LinkWithIconAsText: Story = {
  args: {
    href: 'https://www.google.co.in/',
    children: <CrewIcon icon={faEnvelope} />,

  },
};