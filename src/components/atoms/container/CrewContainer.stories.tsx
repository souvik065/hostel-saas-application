import type { Meta, StoryObj } from '@storybook/react';
import CrewContainer from './CrewContainer'

const meta = {
    title: 'Atoms/CrewContainer',
    component: CrewContainer,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
        maxWidth: { control: 'text' },
        className: { control: 'text' },
        title: { control: 'text' },
        suppressContentEditableWarning: { control: 'boolean' },
        contentEditable: { control: 'boolean' },
        disableGutters: { control: 'boolean' },

    },
    } satisfies Meta<typeof CrewContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Crew Container',
        maxWidth: 'lg',
        className: '',
        title: 'Crew Container',
        suppressContentEditableWarning: false,
        contentEditable: false,
        disableGutters: false,
    },
};