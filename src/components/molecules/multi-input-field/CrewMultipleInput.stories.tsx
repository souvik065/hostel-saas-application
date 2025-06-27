import type { Meta, StoryObj } from '@storybook/react';
import CrewMultipleInput from './CrewMultipleInput';

const meta = {
  title: 'Molecules/CrewMultipleInput',
  component: CrewMultipleInput,
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
} as Meta<typeof CrewMultipleInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const formData = [
  { id: '1', name: 'Item 1', description: 'Description 1' },
  { id: '2', name: 'Item 2', description: 'Description 2' },
  { id: '3', name: 'Item 3', description: 'Description 3' },
];

export const MultiInputStory1: Story = {
  name: 'Multi Input Story',
  args: {
    label: 'Crew Multiple Input',
    namePrefix: 'crew',
    itemName: 'name',
    errors: {},
    onChange: (formData: any) => console.log(formData),
    onSetErrors: (errors: any) => console.log(errors),
    items: formData,
    labelVariant: 'body1',
    itemButton: true,
    onSaveOrUpdate: (item, index) => console.log(item, index),
  },
};
