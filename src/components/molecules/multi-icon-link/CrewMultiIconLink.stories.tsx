import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiIconLink from './CrewMultiIconLink';

const meta = {
  title: 'Molecules/CrewMultiIconLink',
  component: CrewMultiIconLink,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    titleVariant: { control: 'select', options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'] },
    links: { control: 'object' },
    fontWeight: { control: 'select', options: ['bold', 'normal'] },
  },
} as Meta<typeof CrewMultiIconLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'My Links',
    labelVariant: 'h6',
    fontWeight: 'bold',
    links: [
      {
        name: 'facebook',
        url: 'https://www.facebook.com/',
        target: '_blank',
      },
      {
        name: 'twitter',
        url: 'https://twitter.com/',
        target: '_blank',
      },
      {
        name: 'instagram',
        url: 'https://www.instagram.com/',
        target: '_blank',
      },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/',
        target: '_blank',
      },
    ],
  },
};