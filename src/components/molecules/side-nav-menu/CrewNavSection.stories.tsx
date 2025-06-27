import type { Meta, StoryObj } from '@storybook/react';
import CrewNavSection from './CrewNavSection';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

const meta = {
  title: 'Molecules/CrewNavSection',
  component: CrewNavSection,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: ['text'] },
  },
} as Meta<typeof CrewNavSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Warden',
        path: '/warden',
        icon: faUserShield,
        allowedRoles: ['Admin'],
      },
      {
        title: 'Enquiry',
        path: '/enquiry',
        icon: faUserShield,
        allowedRoles: ['Warden'],
      },
    ],
  },
};
