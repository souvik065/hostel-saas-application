import type { Meta, StoryObj } from '@storybook/react';

import CrewCurrentDate from './CrewCurrentDate';

const meta = {
    title: 'Atoms/CrewCurrentDate',
    component: CrewCurrentDate,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        className: { control: 'text' },
        title: { control: 'text' },
    },
} satisfies Meta<typeof CrewCurrentDate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        className: '',
        title: 'Crew Current Date',
    },
};