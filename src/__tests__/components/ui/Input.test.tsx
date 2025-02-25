import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  password: z.string().min(1, 'Campo obrigatório'),
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const WrapperWithErrors = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: { password: '' },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('Input Component', () => {
  it('deve renderizar corretamento com a label', () => {
    render(
      <Wrapper>
        <Input name='email' label='E-mail' />
      </Wrapper>
    );

    const input = screen.getByLabelText('E-mail');

    expect(input).toBeInTheDocument();
  });

  it('deve permitir a digitação no campo', async () => {
    render(
      <Wrapper>
        <Input name='user' label='Usuário' />
      </Wrapper>
    );

    const input = screen.getByLabelText('Usuário');
    await userEvent.type(input, 'tharsila_dev');

    expect(input).toHaveValue('tharsila_dev');
  });

  it('deve exibir mensagem de erro quando houver erro no formulário', async () => {
    render(
      <WrapperWithErrors>
        <Input name='password' label='Senha' />
      </WrapperWithErrors>
    );

    const input = screen.getByLabelText('Senha');

    await userEvent.click(input);
    await userEvent.tab();

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });
});
