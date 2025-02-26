import { Input, InputProps } from '@/components/ui/Input';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

const inputMeta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'text' },
  },
};

export default inputMeta;

type Story = StoryObj<typeof Input>;

const FormWrapper = (args: InputProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Input {...args} />
    </FormProvider>
  );
};

export const Text: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: 'text',
    label: 'Texto',
    placeholder: 'Digite algo',
    type: 'text',
  },
}


export const Date: Story = {
  render: (args) => <FormWrapper {...args} />,
  args: {
    name: 'date',
    label: 'Data',
    type: 'date',
  },
}