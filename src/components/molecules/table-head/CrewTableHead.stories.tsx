import type { Meta, StoryObj } from '@storybook/react';
import CrewTableHead from './CrewTableHead';

const meta = {
  title: 'Molecules/CrewTableHead',
  component: CrewTableHead,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    order: { control: { type: 'select', options: ['asc', 'desc'] } },
    orderBy: { control: 'String' },
    rowCount: { control: 'number' },
    headLabel: { control: ' object' },
    numSelected: { control: ' number' }, 
    onSelectAllClick: { control: '(() => void)' },
    showCheckbox: { control: 'boolean' },
    showEditHeader: { control: 'boolean' },
    labelVariant: {
        control: 'select',
        options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
      },
    lableFontWeight: { control: { type: 'select', options : ['bold' ,'normal'] } },
  },
} as Meta<typeof CrewTableHead>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
    order : 'asc',
    orderBy: 'name',
    rowCount: 10,
    headLabel: [
      { id: 'name', label: 'Name', alignRight: false },
      { id: 'age', label: 'Age', alignRight: true },
    ],
    numSelected: 0,
    showCheckbox: true,
    showEditHeader: true,
    labelVariant: 'h1',
    lableFontWeight: 'bold',
  }, 
};