import type { Meta, StoryObj } from '@storybook/react';
import CrewPricingCard from './CrewPricingCard';

const meta = {
  title: 'Molecules/CrewPricingCard',
  component: CrewPricingCard,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    cardButtonText: { control: 'text' },
    cardType: { control: 'text' },
    cardAmount: { control: 'text' },
    cardFrequency: { control: 'text' },
    cardCurrency: { control: 'text' },
    cardButtonOnClick: { control: '() => void' },
  },
} as Meta<typeof CrewPricingCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cardButtonText: 'Button 1',
    cardType: 'Basic',
    cardAmount: '9',
    cardFrequency: 'monthly',
    cardCurrency: '$',
  },
};
