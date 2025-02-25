import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaEdit } from 'react-icons/fa';

const columns = [
  { key: 'name', label: 'Nome', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
  { key: 'action', label: 'Ação', sortable: false },
];

const data = [
  { id: '1', name: 'João', email: 'joao@example.com', status: 'ativo' },
  { id: '2', name: 'Maria', email: 'maria@example.com', status: 'pendente' },
];
describe('Table Component', () => {
  it('deve renderizar a tabela com as colunas e dados corretos', () => {
    render(
      <Table
        columns={columns}
        data={data}
        sortBy=''
        sortOrder='asc'
        onSort={() => {}}
      />
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('joao@example.com')).toBeInTheDocument();
    expect(screen.getByText('ativo')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('maria@example.com')).toBeInTheDocument();
    expect(screen.getByText('pendente')).toBeInTheDocument();
  });

  it('deve ordenar a tabela ao clicar na coluna', async () => {
    const handleSort = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        sortBy=''
        sortOrder='asc'
        onSort={handleSort}
      />
    );

    const nameHeader = screen.getByText('Nome');

    userEvent.click(nameHeader);

    await waitFor(() => {
      expect(handleSort).toHaveBeenCalledTimes(1);
      expect(handleSort).toHaveBeenCalledWith('name');
    });
  });

  it('deve renderizar a coluna de ação corretamente', async () => {
    render(
      <Table
        columns={columns}
        data={data}
        sortBy=''
        sortOrder='asc'
        onSort={() => {}}
        renderActionColumn={(id) => (
          <Button aria-label={`Editar ${id}`}>
            <FaEdit />
          </Button>
        )}
      />
    );

    const editButton1 = await screen.findByRole('button', { name: 'Editar 1' });
    const editButton2 = await screen.findByRole('button', { name: 'Editar 2' });

    expect(editButton1).toBeInTheDocument();
    expect(editButton2).toBeInTheDocument();
  });
});
