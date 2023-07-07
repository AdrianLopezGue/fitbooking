import { CancelSeatButton } from './cancel-seat-button.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Sessions/Components/Buttons/CancelSeatButton',
  component: CancelSeatButton,
  argTypes: { onClick: { action: 'clicked' } },
} as Meta<typeof CancelSeatButton>;

type Story = StoryObj<typeof CancelSeatButton>;

export const Primary: Story = {};
