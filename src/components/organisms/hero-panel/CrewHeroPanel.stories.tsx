import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CrewHeroPanel from './CrewHeroPanel';

const meta = {
  title: 'Organisms/CrewHeroPanel',
  component: CrewHeroPanel,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    sliderProps: { control: 'object' },
    smallCardProps: { action: 'object' },
   
  },
} as Meta<typeof CrewHeroPanel>;

export default meta;

type Story = StoryObj<typeof meta>;
 
const UserImage = [
  'static/media/src/assets/images/imageslider.png',
  'https://www.calliaweb.co.uk/wp-content/uploads/2015/10/600x400.jpg',
  'https://images.all-free-download.com/images/graphicwebp/grand_canyon_panorama_samsung_sample_239115.webp',
  'https://images.all-free-download.com/images/graphicwebp/grand_canyon_arizona_usa_222432.webp',
];

export const Default: Story = {
  args: {
    sliderProps:{UserImage:UserImage,
    button1Text: 'See plans',
    button2Text: 'Explore now',
    header1: 'SaaS Tools',
    header2: 'to help you thrive',
    subheader: 'Power business with flexible SaaS plans, now before your fingertips'},

    smallCardProps:{
      buttonAction: () => {},
      titleText: 'Explore all you can do with Krewbee',
      buttonText: 'Explore'
    } 
  },
};



