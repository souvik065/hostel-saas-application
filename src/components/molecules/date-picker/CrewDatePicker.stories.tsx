import type { Meta, StoryObj } from '@storybook/react';
import CrewDatePicker from './CrewDatePicker';

const meta = {
  title: 'Molecules/CrewDatePicker',
  component: CrewDatePicker,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    initialDate: { control: 'Date' },
    onDateChange: { control: '() => void' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    placeholder: { control: 'text' },
    locale: {
      control: 'select',
      options: ['', 'en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW'],
    },
  },
} satisfies Meta<typeof CrewDatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialDate: new Date(),
    onDateChange: () => {},
    error: false,
    errorMessage: 'Date field is required',
    label: 'Date',
    labelVariant: 'body1',
    placeholder: 'Enter the date',
    locale: '',
  },
};
