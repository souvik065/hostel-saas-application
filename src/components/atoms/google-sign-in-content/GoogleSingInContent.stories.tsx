import { Meta, StoryObj } from '@storybook/react';
import GoogleSingInContent from './GoogleSingInContent';

const meta = {
  title: 'Atoms/GoogleSingInContent',
  component: GoogleSingInContent,
  parameters: {
    description: 'A component for signing in with Google.',
  },
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: {
        type: 'select',
        options: [
          'caption',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'overline',
        ],
      },
    },
  },
} satisfies Meta<typeof GoogleSingInContent>;

export default meta;

type Story = StoryObj<typeof meta>;
export const WithVariantBody1: Story = {
  args: {
    labelVariant: 'body1',
  },
};

export const WithVarianth5: Story = {
  args: {
    labelVariant: 'h5',
  },
};
