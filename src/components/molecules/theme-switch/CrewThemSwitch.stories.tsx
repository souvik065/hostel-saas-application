import type { Meta, StoryObj } from '@storybook/react';
import CrewThemeSwitch from './CrewThemeSwitch';

const meta = {
  title: 'Molecules/CrewThemSwitch',
  component: CrewThemeSwitch,
  argsType: {
    lableVariant: {
      control: 'select',
      option: ['caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'overline'],
    },
  },
} as Meta<typeof CrewThemeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Theme Switch',
  args: {
    lableVariant: 'caption',
  },
};
