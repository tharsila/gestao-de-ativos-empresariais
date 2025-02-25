import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '@/components/ui/Select';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  category: z.string().min(1, 'Campo obrigatório'),
});

const WrapperWithErrors = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { category: '' },
    mode: 'onBlur',
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

const options = [
  { value: 'opcao1', label: 'Opção 1' },
  { value: 'opcao2', label: 'Opção 2' },
];

describe('Select Component', () => {
  it('deve renderizar corretamente com a label', () => {
    render(
      <WrapperWithErrors>
        <Select name='category' label='Categoria' options={options} />
      </WrapperWithErrors>
    );

    const label = screen.getByLabelText('Categoria');
    expect(label).toBeInTheDocument();
  });

  it('deve permitir selecionar uma opção', async () => {
    render(
      <WrapperWithErrors>
        <Select name='category' label='Categoria' options={options} />
      </WrapperWithErrors>
    );

    const select = screen.getByLabelText('Categoria');
    await userEvent.selectOptions(select, 'opcao1');

    expect(select).toHaveValue('opcao1');
  });

  it('deve exibir mensagem de erro ao não selecionar uma opção obrigatória', async () => {
    render(
      <WrapperWithErrors>
        <Select name='category' label='Categoria' options={options} />
      </WrapperWithErrors>
    );

    const select = screen.getByLabelText('Categoria');

    fireEvent.blur(select);
    
    await waitFor(() => {
      expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    });
  });
});
