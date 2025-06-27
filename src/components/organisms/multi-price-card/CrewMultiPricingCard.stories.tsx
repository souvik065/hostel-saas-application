import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiPricingCard from './CrewMultiPricingCard';
import { CrewPricingCardProps, MultiPriceCard } from '../../../types/CrewPricingCardProps';

const meta = {
  title: 'Organisms/CrewMultiPricingCard',
  component: CrewMultiPricingCard,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    titleVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    titleButtonText: { control: 'text' },
    titleButtonLink: { control: 'text' },
    titleButtonTarget: { control: 'text' },
    priceCards: { control: 'object' },
  },
} as Meta<typeof CrewMultiPricingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const priceCards: CrewPricingCardProps[] = [
  {
    cardButtonText: 'Button 1',
    cardType: 'Basic',
    cardAmount: '9',
    cardFrequency: 'monthly',
    cardCurrency: '$',
    cardButtonOnClick: () => {},
  },
  {
    cardButtonText: 'Button 2',
    cardType: 'Standard',
    cardAmount: '29',
    cardFrequency: 'monthly',
    cardCurrency: '$',
    cardButtonOnClick: () => {},
  },
  {
    cardButtonText: 'Button 3',
    cardType: 'Premium',
    cardAmount: '99',
    cardFrequency: 'monthly',
    cardCurrency: '$',
    cardButtonOnClick: () => {},
  },
];

export const Default: Story = {
  args: {
    title: 'Find a plan that’s  right for you',
    titleVariant: 'h6',
    titleButtonText: 'Button',
    titleButtonLink: 'https://www.google.co.in/',
    titleButtonTarget: '_blank',
    priceCards: priceCards,
  },
};
