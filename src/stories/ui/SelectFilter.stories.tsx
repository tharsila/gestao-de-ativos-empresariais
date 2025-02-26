import { SelectFilter, SelectProps } from '@/components/ui/SelectFilter';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

const selectFilterMeta: Meta<typeof SelectFilter> = {
  title: 'Components/UI/SelectFilter',
  component: SelectFilter,
  argTypes: {
    options: {
      control: 'object',
      description: 'Lista de opções do select',
    },
    name: {
      control: 'text',
      description: 'Nome do campo para o formulário',
    },
  },
};

export default selectFilterMeta;

type Story = StoryObj<typeof SelectFilter>;

export const Default: Story = {
  args: {
    name: 'select',
    options: [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
    ],
  },
};
