import { NavBar } from './navbar.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Shared/Sidebar/NavBar',
  component: NavBar,
} as Meta<typeof NavBar>;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {
  args: {
    userName: 'Username',
  },
};
