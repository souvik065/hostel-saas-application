import type { Meta, StoryObj } from '@storybook/react';
import CrewMobileNumber from './CrewMobileNumber';

const meta = {
  title: 'Molecules/CrewMobileNumber',
  component: CrewMobileNumber,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    countryCodeValue: {
      control: 'text',
    },
    phoneNumberValue: {
      control: 'text',
    },
    label: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof CrewMobileNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Contact Number',
    labelVariant: 'body1',
    countryCodeValue: '+61',
    phoneNumberValue: '0425494473',
    error: false,
    errorMessage: 'Mobile number is required',
  },
};
