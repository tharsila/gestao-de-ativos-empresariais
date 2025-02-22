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
  ];

  return (
    <>
      <Button onClick={() => router.push('/assets/new')}>Cadastrar Ativo</Button>
      <Table columns={columns} data={data} />
    </> 
  );
};
