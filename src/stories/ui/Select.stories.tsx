import { Select, SelectProps } from '@/components/ui/Select';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

const selectMeta: Meta<typeof Select> = {
  title: 'Components/UI/Select',
  component: Select,
  argTypes: {
    options: {
      control: 'object',
      description: 'Lista de opções do select',
    },
    name: {
      control: 'text',
      description: 'Nome do campo para o formulário',
    },
    label: {
      control: 'text',
      description: 'Texto do rótulo',
    },
  },
};

export default selectMeta;

type Story = StoryObj<typeof Select>;

const FormWrapper = (args: SelectProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Select {...args} />
    </FormProvider>
  );
};

export const Default: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: 'select',
    label: 'Escolha uma opção',
    options: [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
    ],
  },
};
