import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/UI/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    message: { control: 'text' },
    onConfirm: { action: 'confirmed' },
    onCancel: { action: 'canceled' },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Confirmar ação',
    message: 'Tem certeza de que deseja excluir este item?',
  },
};
