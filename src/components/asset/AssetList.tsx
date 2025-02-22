'use client';
import React from 'react';
import { Table } from '../ui/Table';
import { useAssets } from '@/hooks/useAssets';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';


export const AssetList: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useAssets();

  if (isLoading) return <p>Carregando...</p>;
  if (error instanceof Error) return <p>Erro: {error.message}</p>;

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'category', label: 'Categoria' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Ação' },
  ];

  const handleEdit = (id: string) => {
    router.push(`/assets/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir este ativo?')) {
      console.log(`Ativo ${id} deletado`);
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
      <Table columns={columns} data={data} renderActionColumn={actionColumnRenderer}/>
    </>
  );
};
