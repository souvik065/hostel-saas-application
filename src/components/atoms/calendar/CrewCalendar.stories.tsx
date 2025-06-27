import type { Meta, StoryObj } from '@storybook/react';

import CrewCalendar from './CrewCalendar';

const meta = {
    title: 'Atoms/CrewCalendar',
    component: CrewCalendar,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        selectRange: { control: 'boolean' },
        themeName: { control: 'text'},
    },
    } satisfies Meta<typeof CrewCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DarkThemeCalendar: Story = {
    args: {
        selectRange: false,
        themeName: 'dark',
    },
};

export const LightThemeCalendar: Story = {
    args: {
        selectRange: false,
        themeName: 'light',
    },
};