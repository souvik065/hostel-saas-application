import type { Meta, StoryObj } from '@storybook/react';
import CrewTypography from './CrewTypography';

const meta = {
  title: 'Atoms/CrewTypography',
  component: CrewTypography,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['inherit', 'left', 'center', 'right', 'justify'] },
    variant: {
      control: 'select',
      options: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
    fontWeight: { control: 'select', options: ['normal', 'bold'] },
    textAlign: { control: 'select', options: ['left', 'right', 'center'] },
    color: { control: 'select', options: ['textPrimary', 'textSecondary', 'primary', 'secondary'] },
    gutterBottom: { control: 'boolean' },
    noWrap: { control: 'boolean' },
    paragraph: { control: 'boolean' },
    variantMapping: { control: 'object' },
    hasInherited: { control: 'boolean' },
  },
} as Meta<typeof CrewTypography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    align: 'inherit',
    variant: 'body1',
    fontWeight: 'normal',
    textAlign: 'left',
    color: 'textPrimary',
    gutterBottom: false,
    noWrap: false,
    paragraph: false,
    hasInherited: false,
    children: 'Crew',
  },
};