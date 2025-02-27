import { Toast } from '@/components/ui/Toast';
import type { Meta, StoryObj } from '@storybook/react';


const meta: Meta<typeof Toast> = {
  title: 'Components/UI/Toast',
  component: Toast,
  args: {
    messages: [],
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    messages: [{ id: 1, type: 'success', message: 'Operação realizada com sucesso!' }],
  },
};

export const Error: Story = {
  args: {
    messages: [{ id: 2, type: 'error', message: 'Algo deu errado!' }],
  },
};

export const Warning: Story = {
  args: {
    messages: [{ id: 3, type: 'warning', message: 'Atenção! Verifique os dados.' }],
  },
};

export const MultipleToasts: Story = {
  args: {
    messages: [
      { id: 1, type: 'success', message: 'Sucesso!' },
      { id: 2, type: 'error', message: 'Erro encontrado!' },
      { id: 3, type: 'warning', message: 'Aviso importante!' },
    ],
  },
};
