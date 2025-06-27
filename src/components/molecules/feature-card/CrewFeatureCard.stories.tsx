import type { Meta, StoryObj } from '@storybook/react';
import CrewFeatureCard from './CrewFeatureCard';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'Molecules/FeatureCard',
  component: CrewFeatureCard,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    cardIcon: { control: 'text' },
    cardHeading: { control: 'text' },
    cardButtonText: { control: 'text' },
    cardFooterText: { control: 'text' },
    className: { control: 'text' },
    cardButtonOnClick: { action: 'clicked' },
  },
} as Meta<typeof CrewFeatureCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardIcon: faEnvelope,
    cardHeading: 'See profile at a glance',
    cardButtonText: 'See Plans',
    cardFooterText: 'Explore time tracking',
    className: '',
    cardButtonOnClick: () => {},
  },
};
