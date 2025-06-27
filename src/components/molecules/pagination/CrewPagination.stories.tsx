import type { Meta, StoryObj } from '@storybook/react';
import CrewPagination from './CrewPagination';

const meta = {
  title: 'Molecules/CrewPagination',
  component: CrewPagination,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    totalCount: { control: 'number' },
    siblingCount: { control: 'number' },
    currentPage: { control: 'number' },
    pageSize: { control: 'number' },
    className: { control: 'text' },
    labelVariant: { control: 'select', options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'] },
    onPageChange: { control: '() => void' },
  },
} as Meta<typeof CrewPagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalCount: 100,
    siblingCount: 1,
    currentPage: 1,
    pageSize: 10,
    labelVariant: 'subtitle2',
  },
};
