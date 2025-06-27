import type { Meta, StoryObj } from '@storybook/react';
import CrewFooterSection from './CrewFooterSection';

const meta = {
  title: 'Organisms/CrewFooterSection',
  component: CrewFooterSection,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    footerMetaData: { control: 'object' },
  },
} as Meta<typeof CrewFooterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    footerMetaData: [
      {
        title: 'Company',
        links: [
          {
            name: 'About Us',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Careers',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          
        ],
        type: 'link',
      },
     
      {
        title: 'Get Help',
        links: [
          {
            name: 'Payment Option',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Intergrations',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Customer Stories',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Blog',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },

        ],
        type: 'link',
      },
      {
        title: 'Products',
        links: [
          {
            name: 'Advanced Buliding',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Expense Amorpization',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'Customer Stories',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
          {
            name: 'API Documentation',
            url: 'https://www.google.co.in/',
            target: '_blank',
          },
        ],
        type: 'link',
      },
      {
        title: 'Followers',
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
        type: 'iconLink',
      },
    ],
  },
};