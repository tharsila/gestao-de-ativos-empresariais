import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('deve aplicar o estilo de variante "primary" corretamente', () => {
    render(<Button $variant='primary'>Primary Button</Button>);

    const button = screen.getByText('Primary Button');

    expect(button).toHaveStyle('background-color: #007bff');
  });

  it('deve aplicar o estilo de variante "secondary" corretamente', () => {
    render(<Button $variant='secondary'>Secondary Button</Button>);

    const button = screen.getByText('Secondary Button');

    expect(button).toHaveStyle('background-color: #6c757d');
  });

  it('deve aplicar o estilo de variante "success" corretamente', () => {
    render(<Button $variant='success'>Success Button</Button>);

    const button = screen.getByText('Success Button');

    expect(button).toHaveStyle('background-color: green');
  });

  it('deve aplicar o estilo de variante "danger" corretamente', () => {
    render(<Button $variant='danger'>Danger Button</Button>);

    const button = screen.getByText('Danger Button');

    expect(button).toHaveStyle('background-color: #dc3545');
  });

  it('deve chamar a função de clique quando o botão for clicado', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar o marginTop e marginBottom corretamente', () => {
    render(
      <Button $marginTop='20px' $marginBottom='10px'>
        Button with margins
      </Button>
    );

    const button = screen.getByText(/Button with margins/i);
    expect(button).toHaveStyle('margin-top: 20px');
    expect(button).toHaveStyle('margin-bottom: 10px');
  });
});
