import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiInputSelectDateAndFileUpload from './CrewMultiInputSelectDateAndFileUpload';
import { CrewFile } from '../../../types/FileInputProps';
import { AssignDocumentError } from '../../../types/CrewRegistration';

const meta = {
  title: 'Organisms/CrewMultiInputSelectDateAndFileUpload',
  component: CrewMultiInputSelectDateAndFileUpload,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
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
} as Meta<typeof CrewMultiInputSelectDateAndFileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ id: '', documentName: '', documentType: '', expiryDate: new Date(), documet: [] as CrewFile[] }],
    errors: {} as AssignDocumentError,
    onChange: (formData: any) => console.log(formData),
    onSetErrors: (receivedErrors: AssignDocumentError) => {
      console.log('Received errors:', receivedErrors);
    },
    inputLabel: 'Document Name',
    selectLabel: 'Document Type',
    dateLabel: 'Expiry Date',
    fileUploadLabel: 'Documet',
    inputName: 'documentName',
    selectName: 'documentType',
    dateName: 'expiryDate',
    fileName: 'documet',
    menuItems: [
      { value: '1', label: 'Driving Licence' },
      { value: '2', label: 'Aadhaar Card' },
      { value: '3', label: 'PAN Card' },
    ],
    acceptMultiple: false,
    itemButton: true,
    onSaveOrUpdate: (item, index) => console.log(item, index),
    xl: 3,
    lg: 3,
    md: 3,
    sm: 6,
    xs: 12,
  },
};
