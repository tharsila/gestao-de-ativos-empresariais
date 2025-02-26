import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  options: Option[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 0.5rem;
  color: #333;
`;

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 0.25rem;
`;

export const Select: React.FC<SelectProps> = ({ name, label, options, onChange }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const errorMessage =
    error && 'message' in error ? error.message?.toString() : null;

  return (
    <SelectWrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledSelect id={name} {...register(name)} onChange={onChange}>
        <option value=''>Selecione...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SelectWrapper>
  );
};
