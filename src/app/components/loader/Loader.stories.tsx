// Select.stories.ts|tsx
import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';
const meta: Meta<typeof Loader> = {
  component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 *
 */

export const LoaderExample: Story = {
  render: () => (
    <div style={{ backgroundColor: 'beige' }}>
      <Loader />,
    </div>
  ),
};
