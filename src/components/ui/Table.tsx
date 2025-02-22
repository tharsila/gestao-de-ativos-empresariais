'use client'

import styled from 'styled-components';

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background: #f4f4f4;
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Table: React.FC<TableProps> = ({ data, columns }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => (
              <Th key={col.key}>{col.label}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={col.key}>{row[col.key]}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

