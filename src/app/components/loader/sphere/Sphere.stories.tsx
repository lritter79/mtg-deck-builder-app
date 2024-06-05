// Select.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
import Sphere from './Sphere';

const meta: Meta<typeof Sphere> = {
  component: Sphere,
};

export default meta;
type Story = StoryObj<typeof Sphere>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 *
 */

export const AllSpheres: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Sphere color="green" />
      <Sphere color="red" />
      <Sphere color="blue" />
      <Sphere color="grey" />
      <Sphere color="black" />
      <Sphere color="white" />
    </div>
  ),
};
