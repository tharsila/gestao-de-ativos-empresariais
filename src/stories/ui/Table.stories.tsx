import { Meta, StoryObj } from '@storybook/react';
import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';

const tableMeta: Meta<typeof Table> = {
  title: 'Components/UI/Table',
  component: Table,
  argTypes: {
    columns: { control: 'object', description: 'Colunas da tabela' },
    data: { control: 'object', description: 'Dados da tabela' },
    sortBy: { control: 'text', description: 'Coluna atual de ordenação' },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc', ''],
      description: 'Ordem de ordenação',
    },
    onSort: { action: 'sorted', description: 'Função chamada ao ordenar' },
  },
};

export default tableMeta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Nome', sortable: true },
      { key: 'status', label: 'Status', sortable: false },
      { key: 'action', label: 'Ações', sortable: false },
    ],
    data: [
      { id: '1', name: 'Tharsila', status: 'Ativo' },
      { id: '2', name: 'João', status: 'Inativo' },
    ],
    sortBy: '',
    sortOrder: '',
    renderActionColumn: (id: string) => <Button>Editar {id}</Button>,
  },
};
