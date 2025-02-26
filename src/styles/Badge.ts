import styled from 'styled-components';

export const Badge = styled.span<{ $status?: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  text-transform: capitalize;

  ${({ $status }) =>
    $status === 'Em manutenção' &&
    `
    background-color: #ffcc00;
    color: #000;
  `}

  ${({ $status }) =>
    $status === 'Inativo' &&
    `
    background-color: #e74c3c;
    color: #fff;
  `}
`;
