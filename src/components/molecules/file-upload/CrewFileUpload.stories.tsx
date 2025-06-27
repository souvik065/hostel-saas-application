import type { Meta, StoryObj } from '@storybook/react';
import CrewFileUpload from './CrewFileUpload';

const meta = {
  title: 'Molecules/CrewFileUpload',
  component: CrewFileUpload,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    placeholder: { control: 'text' },
    onFilesChange: { action: 'onChange' },
    acceptMultiple: { control: 'boolean' },
    maxSizeInMb: { control: 'number' },
    maximumFileAllowed: { control: 'number' },
    initialFiles: { control: 'array' },
  },
} satisfies Meta<typeof CrewFileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: false,
    errorMessage: 'Select At Least 1 File',
    label: 'Document',
    labelVariant: 'body1',
    placeholder: 'Select the Document',
    onFilesChange: (files: any) => console.log('onChange', files),
    acceptMultiple: false,
    initialFiles: [],
    maxSizeInMb: 5,
    maximumFileAllowed: 1,
  },
};
