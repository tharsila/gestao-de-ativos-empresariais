'use client'

import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  $marginTop?: string;
  $marginBottom?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: 0.2s ease-in-out;
  margin-top: ${(props) => props.$marginTop || '0'};
  margin-bottom: ${(props) => props.$marginBottom || '0'};

  background-color: ${({ variant }) =>
    variant === 'primary'
      ? '#007bff'
      : variant === 'secondary'
      ? '#6c757d'
      : variant === 'success'
      ? 'green'
      : '#dc3545'};

  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
