import type { Meta, StoryObj } from '@storybook/react';
import CrewPageHeaderPanel from './CrewPageHeaderPanel';

const meta = {
  title: 'Organisms/CrewPageHeaderPanel',
  component: CrewPageHeaderPanel,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    headerPanelTitle: { control: 'text' },
    headerPanelText: { control: 'text' },
    imageUrl: { control: 'text' }, 
    className: { control: 'text' },
  },
} as Meta<typeof CrewPageHeaderPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headerPanelTitle: 'We Promise To Protect Your Privacy!',
    headerPanelText: 'As technology advances, so do our privacy practices. We keep our customers at the center of our innovation as we create new ways to keep you and your data safe. ',
    imageUrl: 'UserImage.src', 
    className: 'custom-class',
  },
};

