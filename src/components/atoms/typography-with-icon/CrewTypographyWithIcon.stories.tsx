import type { Meta, StoryObj } from '@storybook/react';
import CrewTypographyWithIcon from './CrewTypographyWithIcon';
import { faEnvelope, faAmbulance } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'Atoms/CrewTypographyWithIcon',
  component: CrewTypographyWithIcon,
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
    children: { control: 'text' },
    icon: {
      control: 'object',
      defaultValue: {
        icon: faEnvelope,
      },
    },
    iconPlacementPosition: { control: 'select', options: ['left', 'right'] },
  },
} as Meta<typeof CrewTypographyWithIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LeftIcon: Story = {
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
    icon: {
      icon: faEnvelope,
    },
    iconPlacementPosition: 'left',
  },
};

export const RightIcon: Story = {
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
    icon: {
      icon: faAmbulance,
    },
    iconPlacementPosition: 'right',
  },
};
