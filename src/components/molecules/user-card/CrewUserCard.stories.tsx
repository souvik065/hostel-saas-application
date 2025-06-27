import type { Meta, StoryObj } from '@storybook/react';
import CrewUserCard from './CrewUserCard';

const meta = {
  title: 'Molecules/CrewUserCard',
  component: CrewUserCard,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    email: { control: 'array' },
    image: { control: 'file' },
    name: { control: 'text' },
    displayEmail: { control: 'boolean' },
    loading: { control: 'boolean' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} as Meta<typeof CrewUserCard>;

export default meta;

type Story = StoryObj<typeof meta>;
export const WithImage: Story = {
  name: 'With Image',
  args: {
    email: 'example@gmail.com',
    image: 'https://i.pravatar.cc/150?img=3',
    name: 'User Name',
    displayEmail: true,
    loading: false,
    labelVariant: 'body1',
  },
};

export const WithoutImage: Story = {
  name: 'Without Image',
  args: {
    email: 'example@gmail.com',
    image: '',
    name: 'User Name',
    displayEmail: true,
    loading: false,
    labelVariant: 'body1',
  },
};
