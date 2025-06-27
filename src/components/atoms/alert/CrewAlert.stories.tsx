import type { Meta, StoryObj } from '@storybook/react';

import CrewAlert from "./CrewAlert";

const meta = {
  title: "Atoms/CrewAlert",
  component: CrewAlert,
  parameters: {
    controls: { expanded: true },
    
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    open: { control: 'boolean' },
    vertical: { control: 'select',
    options: ["top","bottom"] },
    horizontal: { control: 'select',
    options: ["center", "left", "right"] },
    severity: { control: 'text' },
    autoHideDuration: { control: 'number' },
  },
} satisfies Meta<typeof CrewAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TopCenter: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'top',
    horizontal: 'center',
    severity: 'success',
    autoHideDuration: 5000,
  },
};

export const TopLeft: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'top',
    horizontal: 'left',
    severity: 'success',
    autoHideDuration: 5000,
  },
};

export const TopRight: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'top',
    horizontal: 'right',
    severity: 'success',
    autoHideDuration: 5000,
  },
};

export const BottomCenter: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'bottom',
    horizontal: 'center',
    severity: 'success',
    autoHideDuration: 5000,
  },
};

export const BottomLeft: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'bottom',
    horizontal: 'left',
    severity: 'success',
    autoHideDuration: 5000,
  },
};

export const BottomRight: Story = {
  args: {
    message: 'Alert message!! ',
    title: 'Alert Title',
    open: true,
    vertical: 'bottom',
    horizontal: 'right',
    severity: 'success',
    autoHideDuration: 5000,
  },
};