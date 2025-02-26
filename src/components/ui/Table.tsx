'use client';

import styled from 'styled-components';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Badge } from '@/styles/Badge';

interface Column {
  key: string;
  label: string;
  sortable: boolean;
  width: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  sortBy: string;
  sortOrder: string;
  renderActionColumn?: (id: string) => JSX.Element;
  onSort?: (columnKey: string) => void;
}

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 400px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  @media (max-width: 505px) {
    width: 475px;
  }
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

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  renderActionColumn,
  sortBy,
  sortOrder,
  onSort,
}) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSorted = sortBy === col.key;
              const icon =
                isSorted && sortOrder === 'asc' ? (
                  <FaSortUp />
                ) : isSorted && sortOrder === 'desc' ? (
                  <FaSortDown />
                ) : (
                  <FaSort />
                );

              return (
                <Th
                  key={col.key}
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                  style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  {col.label} {col.sortable && icon}
                </Th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={col.key}>
                  {col.key === 'status' ? (
                    <Badge $status={row[col.key]}>{row[col.key]}</Badge>
                  ) : col.key === 'action' && renderActionColumn ? (
                    renderActionColumn(row.id)
                  ) : (
                    row[col.key]
                  )}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};
