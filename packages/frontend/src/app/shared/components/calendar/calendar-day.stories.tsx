import { CalendarDay } from './calendar-day.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Shared/Calendar/CalendarDay',
  component: CalendarDay,
} as Meta<typeof CalendarDay>;

type Story = StoryObj<typeof CalendarDay>;

export const Primary: Story = {
  args: {
    index: 1,
    reservations: ['12:00', '16:00'],
  },
};
