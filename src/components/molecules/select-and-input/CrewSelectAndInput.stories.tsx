import type { Meta, StoryObj } from '@storybook/react';
import CrewSelectAndInput from './CrewSelectAndInput';

const meta = {
    title: 'Molecules/CrewSelectAndInput',
    component: CrewSelectAndInput,
    parameters: {
        controls: { expanded: true },
    },
    tags: ['autodocs'],
    argTypes: {
        selectLabel: { control: 'string', defaultValue: 'Select' },
        inputLabel: { control: 'string', defaultValue: 'Input' },
        labelVariant: {
        control: 'select',
        options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
        },
        menuItems: { control: 'array' },
        selectError: { control: 'string', defaultValue: '' },
        inputError: { control: 'string', defaultValue: '' },
        inputFieldValue: { control: 'string', defaultValue: '' },
        selectFieldValue: { control: 'string', defaultValue: '' },
        onInputFieldValueChange: { action: 'onInputFieldValueChange' },
        onSelectFieldValueChange: { action: 'onSelectFieldValueChange'}
    },
    } as Meta<typeof CrewSelectAndInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        selectLabel: 'Select',
        inputLabel: 'Input',
        labelVariant: 'subtitle1',
        menuItems: [],
        selectError: '',
        inputError: '',
        inputFieldValue: '',
        selectFieldValue: '',
    },
};