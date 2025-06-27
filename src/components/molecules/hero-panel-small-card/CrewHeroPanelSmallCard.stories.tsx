import type { Meta, StoryObj } from '@storybook/react';
import CrewHeroPanelSmallCard from './CrewHeroPanelSmallCard';

const meta = {
  title: 'Molecules/HeroPanelSmallCard',
  component: CrewHeroPanelSmallCard,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    titleText: { control: 'text' },
    buttonText: { control: 'text' },
    buttonAction: { action: 'clicked' },
  },
} as Meta<typeof CrewHeroPanelSmallCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
    titleText: 'Banking , payments, invoicing, meet the subscription-free solution to simplify your money',
    buttonText: 'Find out more',
    buttonAction: () => {},
  },
};