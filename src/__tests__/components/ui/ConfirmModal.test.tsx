import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { render, screen, fireEvent } from '@testing-library/react';

describe('ConfirmModal', () => {
  it('deve renderizar corretamente quando aberto', () => {
    render(
      <ConfirmModal
        isOpen={true}
        message='Tem certeza?'
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByText('Tem certeza?')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('deve chamar `onCancel` ao clicar no botão cancelar', () => {
    const onCancelMock = jest.fn();
    render(
      <ConfirmModal
        isOpen={true}
        message='Tem certeza?'
        onConfirm={jest.fn()}
        onCancel={onCancelMock}
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('deve chamar `onConfirm` ao clicar no botão confirmar', () => {
    const onConfirmMock = jest.fn();
    render(
      <ConfirmModal
        isOpen={true}
        message='Tem certeza?'
        onConfirm={onConfirmMock}
        onCancel={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Confirmar'));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('não deve renderizar se `isOpen` for falso', () => {
    render(
      <ConfirmModal
        isOpen={false}
        message='Tem certeza?'
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.queryByText('Tem certeza?')).not.toBeInTheDocument();
  });
});
