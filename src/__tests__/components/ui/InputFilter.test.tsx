import { InputFilter } from '@/components/ui/InputFilter';
import { render, screen } from '@testing-library/react';

describe('InputFilter', () => {
  it('deve renderizar corretamente', async () => {
    const mockOnChange = jest.fn();
    render(
      <InputFilter
        placeholder='Buscar por nome'
        name='filter'
        value=''
        onChange={mockOnChange}
      />
    );

    const inputElement = await screen.findByPlaceholderText('Buscar por nome');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  it('deve exibir o valor passado na prop value', async () => {
    const mockOnChange = jest.fn();
    render(
      <InputFilter
        placeholder='Buscar por nome'
        name='filter'
        value='valor inicial'
        onChange={mockOnChange}
      />
    );

    const inputElement = await screen.findByPlaceholderText('Buscar por nome');
    expect(inputElement).toHaveValue('valor inicial');
  });
});
