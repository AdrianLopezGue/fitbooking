import { BoxCard } from './box-card.component';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Components/BoxesList/BoxCard/BoxCard',
  component: BoxCard,
  argTypes: { onClick: { action: 'click' } },
} as Meta<typeof BoxCard>;

type Story = StoryObj<typeof BoxCard>;

export const Primary: Story = {
  args: {
    handleClick: () => console.log('clicked'),
    name: 'Grip Crossfit',
    id: '1',
    location: 'Córdoba',
    imageUrl:
      'https://gripcrossfit.com/wp-content/uploads/2021/08/123268008_141401847673085_3971044477539622376_n.jpg',
  },
};
