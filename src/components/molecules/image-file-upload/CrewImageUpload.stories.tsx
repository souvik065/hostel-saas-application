import type { Meta, StoryObj } from '@storybook/react';
import CrewImageUpload from './CrewImageUpload';

const meta = {
  title: 'Molecules/CrewImageUpload',
  component: CrewImageUpload,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'string' },
    onImagesChange: { action: 'onChange' },
    acceptMultiple: { control: 'boolean' },
    maxSizeInMb: { control: 'number' },
    maximumFileAllowed: { control: 'number' },
    initialImages: { control: 'array' },
  },
} as Meta<typeof CrewImageUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialImageUrls = [
  {
    id: '2299bd78-0c0d-4105-8a56-1a3326b45303',
    imageUrl:
      'https://stkbtestinsoriginalcrew.blob.core.windows.net/publicimages/Hostels/Rooms/8263ea49-1ead-4229-ae31-59817e73d380/8263ea49-1ead-4229-ae31-59817e73d380_150124123507.jpeg',
    filename: '8263ea49-1ead-4229-ae31-59817e73d380_150124123507.jpeg',
    isActive: true,
  },
  {
    id: '6858e034-f6da-4bc6-ae09-168750c274ff',
    imageUrl:
      'https://stkbtestinsoriginalcrew.blob.core.windows.net/publicimages/Hostels/Rooms/8263ea49-1ead-4229-ae31-59817e73d380/8263ea49-1ead-4229-ae31-59817e73d380_150124123509.png',
    filename: '8263ea49-1ead-4229-ae31-59817e73d380_150124123509.png',
    isActive: true,
  },
];

export const ImageUploadStory: Story = {
  name: 'Image Upload Story',
  args: {
    name: 'Image',
    onImagesChange: (files: any) => console.log('onChange', files),
    acceptMultiple: true,
    initialImages: initialImageUrls,
    maxSizeInMb: 5,
    maximumFileAllowed: 4,
  },
};
