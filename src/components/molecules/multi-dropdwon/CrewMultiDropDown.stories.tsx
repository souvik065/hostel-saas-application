import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiDropDown from './CrewMultiDropDown';

const meta = {
  title: 'Molecules/CrewMultiDropDown',
  component: CrewMultiDropDown,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'array' },
    onChange: { action: 'onChange' },
    onSetErrors: { action: 'onSetErrors' },
    onSaveOrUpdate: { action: 'onSaveOrUpdate' },
    errors: { control: 'object' },
    label: { control: 'text' },
    namePrefix: { control: 'text' },
    itemName: { control: 'text' },
    labelVariant: { control: 'select', options: ['caption', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'] },
    itemButton: { control: 'boolean' },
  },
} as Meta<typeof CrewMultiDropDown>;

export default meta;

type Story = StoryObj<typeof meta>;

const formData = [{ id: '1', name: 'Fees' }];

export const MultiInputStory1: Story = {
  name: 'Multi Select Story',
  args: {
    label: 'Crew Multiple Select',
    namePrefix: 'crew',
    itemName: 'name',
    errors: {},
    menuItems: [
      { value: '1', label: 'Fees' },
      { value: '2', label: 'Aadhaar Card' },
      { value: '3', label: 'PAN Card' },
    ],
    onChange: (formData: any) => console.log(formData),
    onSetErrors: (errors: any) => console.log(errors),
    items: formData,
    labelVariant: 'body1',
    itemButton: true,
    onSaveOrUpdate: (item, index) => console.log(item, index),
  },
};
