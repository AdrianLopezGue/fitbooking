import { Sidebar } from './navbar.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Navbar/Sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

export const Primary: Story = {
  args: {
    userName: 'Username',
    role: 'Admin',
  },
};
