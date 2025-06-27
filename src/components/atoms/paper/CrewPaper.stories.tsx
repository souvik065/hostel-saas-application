import type { Meta, StoryObj } from '@storybook/react';
import CrewPaper from './CrewPaper';

const meta = {
    title: 'Atoms/CrewPaper',
    component: CrewPaper,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['elevation', 'outlined'] },
        className: { control: 'text' },
    },
} as Meta<typeof CrewPaper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'elevation',
        className: '',
    },
};