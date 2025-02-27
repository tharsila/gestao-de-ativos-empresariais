'use client';
import React from 'react';
import { Table } from '../ui/Table';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { AssetFilters } from './AssetFilters';
import { Pagination } from '../pagination/Pagination';
import { FlexBox } from '@/styles/FlexBox';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ConfirmModal } from '../ui/ConfirmModal';
import { useAssetActions } from '@/hooks/useAssetsActions';
import { useAssetFilters } from '@/hooks/useAssetsFilter';

export const AssetList: React.FC = () => {
  const router = useRouter();
  const {
    filters,
    filterValues,
    setFilterValues,
    handleApplyFilters,
    handleSort,
    handleNextPage,
    handlePreviousPage,
  } = useAssetFilters();

  const { handleEdit, handleDelete, isOpen, message, onConfirm, close } =
    useAssetActions();

  const { data, isLoading, error } = useAssets(filters);

  const columns = [
    { key: 'name', label: 'Nome', sortable: true, width: '60%' },
    { key: 'category', label: 'Categoria', sortable: true, width: '15%' },
    { key: 'status', label: 'Status', sortable: true, width: '15%' },
    { key: 'action', label: 'Ação', sortable: false, width: '10%' },
  ];

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  const actionColumnRenderer = (id: string) => (
    <FlexBox $gap='4px'>
      <Button
        $variant='secondary'
        onClick={() => handleEdit(id)}
        aria-label={`Editar ${id}`}
      >
        <FaEdit />
      </Button>
      <Button
        $variant='danger'
        onClick={() => handleDelete(id)}
        aria-label={`Remover ${id}`}
      >
        <FaTrash />
      </Button>
    </FlexBox>
  );

  return (
    <>
      <FlexBox $justifyContent='center' $marginTop='16px' $marginBottom='16px'>
        <Button onClick={() => router.push('/assets/new')}>
          Cadastrar Ativo
        </Button>
      </FlexBox>
      <FlexBox
        $justifyContent='center'
        $gap='16px'
        $alignItems='center'
        $responsive={true}
        $responsiveFlexDirection='column'
      >
        <AssetFilters filters={filterValues} setFilters={setFilterValues} />
        <Button onClick={handleApplyFilters}>Filtrar</Button>
      </FlexBox>
      <Table
        columns={columns}
        data={data?.response}
        renderActionColumn={actionColumnRenderer}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSort={handleSort}
      />
      <Pagination
        page={filters.page}
        perPage={filters.perPage}
        totalRecords={Number(data?.total)}
        nextPage={handleNextPage}
        prevPage={handlePreviousPage}
      />
      <ConfirmModal
        isOpen={isOpen}
        message={message}
        onConfirm={onConfirm}
        onCancel={close}
      />
    </>
  );
};
