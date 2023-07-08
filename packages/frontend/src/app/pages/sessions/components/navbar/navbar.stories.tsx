import { Navbar } from './navbar.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Navbar/Navbar',
  component: Navbar,
} as Meta<typeof Navbar>;

type Story = StoryObj<typeof Navbar>;

export const AdminNavbar: Story = {
  args: {
    userName: 'Username',
    role: 'ADMIN',
  },
};

export const BasicNavbar: Story = {
  args: {
    userName: 'Username',
    role: 'BASIC',
  },
};
