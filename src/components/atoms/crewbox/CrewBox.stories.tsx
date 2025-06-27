import type { Meta, StoryObj } from '@storybook/react';

import CrewBox from './CrewBox';

const meta = {
    title: 'Atoms/CrewBox',
    component: CrewBox,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
        bgcolor: { control: 'color' },
        color: { control: 'color' },
        border: { control: 'text' },
        borderRadius: { control: 'text' },
        borderColor: { control: 'color' },
        boxShadow: { control: 'text' },
        width: { control: 'text' },
        height: { control: 'text' },
        padding: { control: 'text' },
        margin: { control: 'text' },
        display: { control: 'text' },
        flexDirection: { control: 'text' },
        justifyContent: { control: 'text' },
        alignItems: { control: 'text' },
        flexWrap: { control: 'text' },
        flex: { control: 'text' },
        position: { control: 'text' },
        top: { control: 'text' },
        bottom: { control: 'text' },
        left: { control: 'text' },
        right: { control: 'text' },
    },
} satisfies Meta<typeof CrewBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DarkMode: Story = {
    args: {
        children: 'Crew Box',
        bgcolor: '#fff',
        color: '#000',
        border: '1px solid #000',
        borderRadius: '5px',
        borderColor: '#000',
        boxShadow: '0 0 10px #000',
        width: '100px',
        height: '100px',
        padding: '10px',
        margin: '10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        flex: '1',
        position: 'relative',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
    },
};