import styled from 'styled-components';
import { ChangeEvent } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  transition: 0.2s;
  width: 200px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const InputFilter: React.FC<InputProps> = ({ name, value, onChange, ...rest }) => {
  return (
    <StyledInput id={name} name={name} value={value} onChange={onChange} {...rest}/>
  );
};
