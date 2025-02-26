import { Pagination } from '@/components/pagination/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';

const page = 1;
const perPage = 10;
const totalRecords = 50;

describe('Pagination Component', () => {
  it('deve renderizar corretamente os botões e informações de paginação', () => {
    render(
      <Pagination
        page={page}
        perPage={perPage}
        totalRecords={totalRecords}
        prevPage={() => {}}
        nextPage={() => {}}
      />
    );

    expect(screen.getByText('Página 1')).toBeInTheDocument();
    expect(
      screen.getByText('Exibindo 1 a 10 de 50 registros')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
  });

  it('deve chamar a função de navegação ao clicar nos botões', () => {
    const mockNextPage = jest.fn();
    const mockPrevPage = jest.fn();

    render(
      <Pagination
        page={2}
        perPage={perPage}
        totalRecords={totalRecords}
        prevPage={mockPrevPage}
        nextPage={mockNextPage}
      />
    );

    const prevButton = screen.getByRole('button', { name: 'Anterior' });
    const nextButton = screen.getByRole('button', { name: 'Próxima' });

    fireEvent.click(prevButton);
    fireEvent.click(nextButton);

    expect(mockPrevPage).toHaveBeenCalledTimes(1);
    expect(mockNextPage).toHaveBeenCalledTimes(1);
  });

  it('desativa botão "Próxima" na última página', () => {
    const mockNextPage = jest.fn();
    const mockPrevPage = jest.fn();

    render(
      <Pagination
        page={5}
        perPage={10}
        totalRecords={50}
        prevPage={mockPrevPage}
        nextPage={mockNextPage}
      />
    );

    const button = screen.getByRole('button', { name: 'Próxima' });

    expect(button).toBeDisabled();
  });
});
