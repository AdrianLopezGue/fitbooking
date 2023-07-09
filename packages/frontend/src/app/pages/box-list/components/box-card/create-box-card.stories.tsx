import { CreateBoxCard } from './create-box-card.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/BoxesList/BoxCard/CreateBoxCard',
  component: CreateBoxCard,
  argTypes: { onClick: { action: 'click' } },
} as Meta<typeof CreateBoxCard>;

type Story = StoryObj<typeof CreateBoxCard>;

export const Primary: Story = {
  args: {
    handleClick: () => console.log('clicked'),
  },
};
