'use client';
import React, { useState } from 'react';
import { Table } from '../ui/Table';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/AssetServices';
import { AssetFilters } from './AssetFilters';

export const AssetList: React.FC = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    sortBy: '',
    sortOrder: 'asc',
    page: 1,
    per_page: 5,
  });

  const [filterValues, setFilterValues] = useState(filters);

  const { data, isLoading, error } = useAssets(filters);

  const columns = [
    { key: 'name', label: 'Nome', sortable: true },
    { key: 'category', label: 'Categoria', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'action', label: 'Ação', sortable: false },
  ];

  const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: assetService.removeAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      alert('Ativo removido com sucesso');
    },
    onError: (error: any) => {
      alert(`Erro ao remover ativo: ${error.message}`);
    },
  });

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  const handleEdit = (id: string) => {
    router.push(`/assets/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este ativo?')) {
      mutationRemove.mutate(id);
    }
  };

  const actionColumnRenderer = (id: string) => (
    <div>
      <Button
        variant='secondary'
        onClick={() => handleEdit(id)}
        style={{ marginRight: '10px' }}
      >
        Editar
      </Button>
      <Button variant='danger' onClick={() => handleDelete(id)}>
        Remover
      </Button>
    </div>
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

  return (
    <>
      <Button onClick={() => router.push('/assets/new')}>
        Cadastrar Ativo
      </Button>
      <AssetFilters filters={filterValues} setFilters={setFilterValues} />
      <Button onClick={handleApplyFilters} style={{ marginLeft: '10px' }}>
        Filtrar
      </Button>
      <Table
        columns={columns}
        data={data}
        renderActionColumn={actionColumnRenderer}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSort={handleSort}
      />
    </>
  );
};
