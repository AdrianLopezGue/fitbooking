import { BookSeatButton } from './book-seat-button.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Buttons/BookSeatButton',
  component: BookSeatButton,
  argTypes: { onClick: { action: 'book' } },
} as Meta<typeof BookSeatButton>;

type Story = StoryObj<typeof BookSeatButton>;

export const Primary: Story = {};
