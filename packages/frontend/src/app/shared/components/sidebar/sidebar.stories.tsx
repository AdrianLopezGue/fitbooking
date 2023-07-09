import { SidebarWithHeader } from './sidebar.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Shared/Sidebar/SidebarWithHeader',
  component: SidebarWithHeader,
} as Meta<typeof SidebarWithHeader>;

type Story = StoryObj<typeof SidebarWithHeader>;

export const AdminSidebar: Story = {
  args: {
    boxId: '1',
    boxName: 'Crossfit name',
    userName: 'Username',
    role: 'ADMIN',
  },
};

export const BasicSidebar: Story = {
  args: {
    boxId: '1',
    boxName: 'Crossfit name',
    userName: 'Username',
    role: 'BASIC',
  },
};
