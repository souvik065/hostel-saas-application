import type { Meta, StoryObj } from '@storybook/react';
import CrewMultiInputWithDate from './CrewMultiInputWithDate';

const meta = {
  title: 'Organisms/CrewMultiInputWithDate',
  component: CrewMultiInputWithDate,
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
  },
} as Meta<typeof CrewMultiInputWithDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [{ id: '', installmentAmount: '', dueDate: new Date() }],
    errors: {},
    onChange: (formData: any) => console.log(formData),
    onSetErrors: (receivedErrors) => {
      console.log('Received errors:', receivedErrors);
    },
    inputLabel: 'Installment Amount',
    dateLabel: 'Due Date',
    inputName: 'installmentAmount',
    dateName: 'dueDate',
    xl: 3,
    lg: 3,
    md: 3,
    sm: 6,
    xs: 12,
  },
};
