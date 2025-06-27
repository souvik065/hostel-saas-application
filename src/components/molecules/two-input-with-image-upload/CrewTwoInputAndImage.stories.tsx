import type { Meta, StoryObj } from '@storybook/react';
import CrewTwoInputAndImage from './CrewTwoInputAndImage';
import { Image } from '../../../types/FileInputProps';

const meta: Meta<typeof CrewTwoInputAndImage> = {
  title: 'Molecules/CrewTwoInputAndImage',
  component: CrewTwoInputAndImage,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    inputLabel1: { control: 'string', defaultValue: 'Input 1' },
    inputLabel2: { control: 'string', defaultValue: 'Input 2' },
    imageUploadLabel: { control: 'string', defaultValue: 'Image' },
    inputError1: { control: 'string', defaultValue: '' },
    inputError2: { control: 'string', defaultValue: '' },
    imageUploadError: { control: 'string', defaultValue: '' },
    inputFieldValue1: { control: 'string', defaultValue: '' },
    inputFieldValue2: { control: 'string', defaultValue: '' },
    imageUploadFieldValue: { control: 'array', defaultValue: [] },
    onInputFieldValueChange1: { action: 'onInputFieldValueChange' },
    onInputFieldValueChange2: { action: 'onInputFieldValueChange' },
    onImageUploadFieldValueChange: { action: 'onImageUploadFieldValueChange' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputLabel1: 'Input Label 1',
    inputLabel2: 'Input Label 2',
    imageUploadLabel: 'Image Label',
    inputFieldValue1: '',
    inputFieldValue2: '',
    imageUploadFieldValue: [] as Image[],
    acceptMultiple: true,
  },
};
