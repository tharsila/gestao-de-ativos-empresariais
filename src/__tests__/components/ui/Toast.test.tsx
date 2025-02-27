import { Button } from '@/components/ui/Button';
import { ToastProvider } from '@/contexts/ToastContext';
import { useToast } from '@/hooks/useToast';
import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { show } = useToast();
  return (
    <div>
      <Button onClick={() => show('Sucesso!', 'success')}>Mostrar Toast</Button>
      <Button onClick={() => show('Erro!', 'error')}>Mostrar Erro</Button>
    </div>
  );
};

describe('Toast Component', () => {
  it('exibe uma mensagem de sucesso e desaparece', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Mostrar Toast');
    userEvent.click(button);


    await waitFor(
      () => {
        expect(screen.queryByText('Sucesso!')).not.toBeInTheDocument();
      },
      { timeout: 3500 }
    );
  });

  it('exibe uma mensagem de erro e desaparece', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Mostrar Erro');
    userEvent.click(button);

    await waitFor(
      () => {
        expect(screen.queryByText('Erro!')).not.toBeInTheDocument();
      },
      { timeout: 3500 }
    );
  });
});
