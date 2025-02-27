'use client';
import React, { useState } from 'react';
import { Table } from '../ui/Table';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/AssetServices';
import { AssetFilters } from './AssetFilters';
import { Pagination } from '../pagination/Pagination';
import { FlexBox } from '@/styles/FlexBox';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { ConfirmModal } from '../ui/ConfirmModal';

export const AssetList: React.FC = () => {
  const router = useRouter();
  const { show } = useToast();
  const { isOpen, open, close, message, onConfirm } = useConfirmModal();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    sortBy: '',
    sortOrder: 'asc',
    page: 1,
    perPage: 5,
  });

  const [filterValues, setFilterValues] = useState(filters);

  const { data, isLoading, error } = useAssets(filters);

  const columns = [
    { key: 'name', label: 'Nome', sortable: true, width: '60%' },
    { key: 'category', label: 'Categoria', sortable: true, width: '15%' },
    { key: 'status', label: 'Status', sortable: true, width: '15%' },
    { key: 'action', label: 'Ação', sortable: false, width: '10%' },
  ];

  const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: assetService.removeAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });

      show('Ativo removido com sucesso', 'success');
    },
    onError: (error: Error) => {
      show(`Erro ao remover ativo: ${error.message}`, 'error');
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  const handleEdit = (id: string) => {
    router.push(`/assets/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    open('Tem certeza de que deseja excluir este ativo?', () =>
      mutationRemove.mutate(id)
    );
  };

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

  const handleApplyFilters = () => {
    setFilters(filterValues);
  };

  const handleSort = (columnKey: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: columnKey,
      sortOrder:
        prev.sortBy === columnKey && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const handlePreviousPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
  };

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
