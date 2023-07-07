import { CoachImage } from './coach-image.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Session/CoachImage',
  component: CoachImage,
} as Meta<typeof CoachImage>;

type Story = StoryObj<typeof CoachImage>;

export const Primary: Story = {
  args: {
    imageUrl: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  },
};
