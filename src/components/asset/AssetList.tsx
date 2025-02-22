'use client';
import React from 'react';
import { Table } from '../ui/Table';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/AssetServices';

export const AssetList: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useAssets();

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'category', label: 'Categoria' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Ação' },
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

  return (
    <>
      <Button onClick={() => router.push('/assets/new')}>
        Cadastrar Ativo
      </Button>
      <Table
        columns={columns}
        data={data}
        renderActionColumn={actionColumnRenderer}
      />
    </>
  );
};
