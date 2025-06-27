import { Meta, StoryObj } from '@storybook/react';
import CrewHeroPanelSlider from './CrewHeroPanelSlider';
import imageslider from '../../../assets/images/imageslider.png';

const meta = {
  title: 'Molecules/CrewHeroPanelSlider',
  component: CrewHeroPanelSlider,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    header1: { control: 'text' },
    header2: { control: 'text' },
    subheader: { control: 'text' },
    button1Text: { control: 'text' },
    button2Text: { control: 'text' },
    className: { control: 'text' },
    UserImage: { control: 'array' },
  },
} as Meta<typeof CrewHeroPanelSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const UserImage = [
  `${imageslider.src}`,
  'https://www.calliaweb.co.uk/wp-content/uploads/2015/10/600x400.jpg',
  'https://images.all-free-download.com/images/graphicwebp/grand_canyon_panorama_samsung_sample_239115.webp',
  'https://images.all-free-download.com/images/graphicwebp/grand_canyon_arizona_usa_222432.webp',
];

export const Default: Story = {
  args: {
    header1: 'SaaS Tools',
    header2: 'to help you thrive',
    subheader: 'Power business with flexible SaaS plans, now befre your finger tip',
    button1Text: 'See plans',
    button2Text: 'Explore now',
    UserImage: UserImage,
  },
};
