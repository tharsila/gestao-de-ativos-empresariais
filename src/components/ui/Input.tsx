import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: 0.2s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
`;

export const Input: React.FC<InputProps> = ({ name, label, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage =
    error && 'message' in error ? error.message?.toString() : null;

  return (
    <Wrapper>
      {label && <Label htmlFor={name}>{label}</Label>}
      <StyledInput {...register(name)} {...props} id={name} />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Wrapper>
  );
};
