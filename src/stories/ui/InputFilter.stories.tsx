import { InputFilter } from '@/components/ui/InputFilter';
import { Meta, StoryObj } from '@storybook/react';

const inputFilterMeta: Meta<typeof InputFilter> = {
  title: 'Components/UI/InputFilter',
  component: InputFilter,
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
  },
};

export default inputFilterMeta;

type Story = StoryObj<typeof InputFilter>;

export const Text: Story = {
  args: {
    name: 'text',
    placeholder: 'Digite algo',
    type: 'text',
  },
};
