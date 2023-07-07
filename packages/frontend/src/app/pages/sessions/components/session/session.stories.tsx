import { Session } from './session.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/Sessions/Session/Session',
  component: Session,
  decorators: [
    Story => (
      <div style={{ padding: '1rem', maxWidth: '530px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Session>;

type Story = StoryObj<typeof Session>;

export const Primary: Story = {
  args: {
    id: '1',
    name: 'Crossfit',
    maxCapacity: 11,
    assistants: ['1', '2', '3'],
    date: new Date().toISOString(),
  },
};
