import { SelectFilter } from '@/components/ui/SelectFilter';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Select Filter Component', () => {
  it('deve renderizar corretamente', () => {
    const options = [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
    ];

    render(
      <SelectFilter
        name='filter'
        options={options}
        value=''
        onChange={() => {}}
      />
    );

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    const defaultOption = screen.getByText('Selecione...');
    expect(defaultOption).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('deve responder a seleção do usuário', async () => {
    const mockOnChange = jest.fn();
    const options = [
      { value: 'option1', label: 'Opção 1' },
      { value: 'option2', label: 'Opção 2' },
      { value: 'option3', label: 'Opção 3' },
    ];

    render(
      <SelectFilter
        name='filter'
        options={options}
        value=''
        onChange={mockOnChange}
      />
    );

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option2' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  
    console.log('---------------', mockOnChange.mock.calls[0][0].target.value);

    expect(mockOnChange.mock.calls[0][0].target.value).toBe('option2');
  });
});
