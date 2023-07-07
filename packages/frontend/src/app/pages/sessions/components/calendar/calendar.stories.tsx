import { Calendar } from './calendar.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Calendar/Calendar',
  component: Calendar,
} as Meta<typeof Calendar>;

type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
  args: {
    month: 1,
    year: 2023,
    reservations: {
      1: ['10:00', '14:00'],
      10: ['11:00'],
      31: ['20:00'],
    },
  },
};
