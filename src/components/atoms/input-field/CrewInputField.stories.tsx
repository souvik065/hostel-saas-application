import type { Meta, StoryObj } from '@storybook/react';

import CrewInputField from "./CrewInputField";
import { object } from 'yup';

const meta = {
  title: "Atoms/CrewInputField",
  component: CrewInputField,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    startIcon: { control: object },
    endIcon: { control: 'text' },
    onEndIconClick: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    labelVariant: { control: 'select',
    options: ["caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "overline"], },
    value: { control: 'text' },
    increasedHeight:{control: 'boolean'}
  },
} satisfies Meta<typeof CrewInputField>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Hostel: Story = {
  args: {
    label: 'Hostel name',
    placeholder: 'Hostel name',
    error: false,
    errorMessage: 'Hostel name is required',
    id: 'id',
    labelVariant: 'subtitle2',
  },
};

export const Floor: Story = {
  args: {
    label: 'Floor name',
    placeholder: 'Floor name',
    error: false,
    errorMessage: 'Floor name is required',
    id: 'id',
    labelVariant: 'subtitle2',
  },
};

export const LoginEmail: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your Email',
    error: false,
    errorMessage: 'Email is required',
    id: 'id',
    labelVariant: 'subtitle2',
    increasedHeight: true
  },
};