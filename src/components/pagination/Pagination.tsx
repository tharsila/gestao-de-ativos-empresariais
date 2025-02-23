import React from 'react';
import { Button } from '../ui/Button';
import { FlexBox } from '@/styles/FlexBox';

interface PaginationProps {
  page: number;
  perPage: number;
  totalRecords: number;
  nextPage: () => void;
  prevPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalRecords,
  perPage,
  nextPage,
  prevPage,
}) => {
  const totalPages = Math.ceil(totalRecords / perPage);
  const isLastPage = page === totalPages;

  return (
    <FlexBox
      $gap='10px'
      $marginTop='15px'
      $justifyContent='space-between'
      $alignItems='center'
      $responsive={true}
      $responsiveFlexDirection='column'
      $responsiveJustifyContent='center'
      $responsiveAlignItems='center'
    >
      <div>
        <Button variant='secondary' onClick={prevPage} disabled={page === 1}>
          Anterior
        </Button>
        <span style={{ padding: '16px' }}>Página {page}</span>
        <Button variant='secondary' onClick={nextPage} disabled={isLastPage}>
          Próxima
        </Button>
      </div>

      <div>
        <p>
          {`Exibindo ${Math.min(
            (page - 1) * perPage + 1,
            totalRecords
          )} a ${Math.min(
            page * perPage,
            totalRecords
          )} de ${totalRecords} registros`}
        </p>
      </div>
    </FlexBox>
  );
};
