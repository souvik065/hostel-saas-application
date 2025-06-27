import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiFeatureCards from './CrewMultiFeatureCards';
import { FeatureCard } from '../../../types/FeatureCard';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'Organisms/CrewMultiFeatureCards',
  component: CrewMultiFeatureCards,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    titleVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    featureCards: { control: 'object' },
  },
} as Meta<typeof CrewMultiFeatureCards>;

export default meta;

type Story = StoryObj<typeof meta>;

const featureCards: FeatureCard[] = [
  {
    cardIcon: faUserFriends,
    cardHeading: 'Heading 1',
    cardButtonText: 'Button 1',
    cardFooterText: 'Footer text 1',
    cardButtonOnClick: () => {},
  },
  {
    cardIcon: faUserFriends,
    cardHeading: 'Heading 2',
    cardButtonText: 'Button 2',
    cardFooterText: 'Footer text 2',
    cardButtonOnClick: () => {},
  },
  {
    cardIcon: faUserFriends,
    cardHeading: 'Heading 3',
    cardButtonText: 'Button 3',
    cardFooterText: 'Footer text 3',
    cardButtonOnClick: () => {},
  },
  {
    cardIcon: faUserFriends,
    cardHeading: 'Heading 4',
    cardButtonText: 'Button 4',
    cardFooterText: 'Footer text 4',
    cardButtonOnClick: () => {},
  },
];

export const Default: Story = {
  args: {
    title: 'Explore all you can do with Krewbee',
    titleVariant: 'h6',
    featureCards: featureCards,
  },
};