import type { Meta, StoryObj } from '@storybook/react';
import CrewPrivacyPolicyContent from './CrewPrivacyPolicyContent';

const meta = {
  title: 'Organisms/CrewPrivacyPolicyContent',
  component: CrewPrivacyPolicyContent,
  parameters: {
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    header: { control: 'text' },
    content: { control: 'text' },
    expandableContentList: { control: 'object' },
  },
} as Meta<typeof CrewPrivacyPolicyContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSingleExpandableContent: Story = {
  args: {
    header: 'Your Data',
    content: 'You can request to download a copy of all your data we have stored right from your krewbee account. We will send you a link to download it and include a guide that helps explain what it all is. You are also able to request that we delete your data from one or many offerings. We walk you through selecting the data you want to remove and let you know how it will impact your Fachwissen tech LLP experience.',
    expandableContentList: [
      {
        header: 'manage your data',
        content: 'expandable content',
      },
    ],
  },
};

export const WithMultipleExpandableContent: Story = {
  args: {
    header: 'heading',
    content: 'content',
    expandableContentList: [
      {
        header: 'subheading1',
        content: 'expandable content1',
      },
      {
        header: 'subheading2',
        content: 'expandable content2',
      },
    ],
  },
};
