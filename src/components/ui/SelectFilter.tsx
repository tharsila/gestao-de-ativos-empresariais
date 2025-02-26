'use client';

import { ChangeEvent } from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;
  outline: none;
  cursor: pointer;
  background-color: #fff;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

export const SelectFilter: React.FC<SelectProps> = ({
  name,
  onChange,
  options,
}) => {
  return (
    <StyledSelect id={name} name={name} onChange={onChange}>
      <option value=''>Selecione...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
