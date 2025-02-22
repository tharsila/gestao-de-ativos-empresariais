'use client';

import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { DynamicFields } from './DynamicFields';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/AssetServices';

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  category: z.enum(['Equipamento', 'Veículo', 'Software'], {
    errorMap: () => ({ message: 'Categoria é obrigatória' }),
  }),
  status: z.enum(['Ativo', 'Em manutenção', 'Inativo'], {
    errorMap: () => ({ message: 'Status é obrigatório' }),
  }),
  acquisitionDate: z.string().min(1, 'Data de aquisição é obrigatória'),
});

type FormData = z.infer<typeof schema>;

interface AssetFormProps {
  initialData?: FormData;
  id: string;
}

const AssetForm: React.FC<AssetFormProps> = ({ initialData, id }) => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<string>('Equipamento');

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      category: 'Equipamento',
      status: 'Ativo',
      acquisitionDate: '',
    },
  });

  const mutation = useMutation({
    mutationFn: assetService.createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (data: { id: string; assetData: any }) =>
      assetService.updateAsset(data.id, data.assetData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (initialData) {
      mutationUpdate.mutate({
        id,
        assetData: data,
      });
    } else {
      mutation.mutate(data);
    }
  };

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category); // Ajuste a categoria com base nos dados iniciais
    }
  }, [initialData]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input label='Nome' name='name' />
        <Select
          label='Categoria'
          name='category'
          options={[
            { value: 'Equipamento', label: 'Equipamento' },
            { value: 'Veículo', label: 'Veículo' },
            { value: 'Software', label: 'Software' },
          ]}
          onChange={handleCategoryChange}
        />
        <Select
          label='Status'
          name='status'
          options={[
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Em manutenção', label: 'Em manutenção' },
            { value: 'Inativo', label: 'Inativo' },
          ]}
        />
        <Input label='Data de aquisição' name='acquisitionDate' type='date' />

        <DynamicFields category={category} />

        <Button type='submit'>Cadastrar Ativo</Button>
      </form>
    </FormProvider>
  );
};

export default AssetForm;
