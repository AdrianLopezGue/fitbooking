import { Badge } from './badge.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Calendar/Badge',
  component: Badge,
} as Meta<typeof Badge>;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    hour: '14:00',
  },
};
