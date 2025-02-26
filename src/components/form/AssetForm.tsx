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
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório'),
    category: z.enum(['Equipamento', 'Veículo', 'Software'], {
      errorMap: () => ({ message: 'Categoria é obrigatória' }),
    }),
    status: z.enum(['Ativo', 'Em manutenção', 'Inativo'], {
      errorMap: () => ({ message: 'Status é obrigatório' }),
    }),
    description: z.string().optional(),
    acquisitionDate: z.string().min(1, 'Data de aquisição é obrigatória'),

    serialNumber: z.string().optional(),
    supplier: z.string().optional(),
    licensePlate: z.string().optional(),
    licenseKey: z.string().optional(),
    licenseValidity: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.category === 'Equipamento') {
      if (!data.serialNumber) {
        ctx.addIssue({
          path: ['serialNumber'],
          message: 'Número de série é obrigatório para Equipamento',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.supplier) {
        ctx.addIssue({
          path: ['supplier'],
          message: 'Fornecedor é obrigatório para Equipamento',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.category === 'Veículo') {
      if (!data.licensePlate) {
        ctx.addIssue({
          path: ['licensePlate'],
          message: 'Placa é obrigatória para Veículo',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.category === 'Software') {
      if (!data.licenseKey) {
        ctx.addIssue({
          path: ['licenseKey'],
          message: 'Chave de Licença é obrigatória para Software',
          code: z.ZodIssueCode.custom,
        });
      }
      if (!data.licenseValidity) {
        ctx.addIssue({
          path: ['licenseValidity'],
          message: 'Validade da Licença é obrigatória para Software',
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type FormData = z.infer<typeof schema>;

interface AssetFormProps {
  initialData?: FormData;
  id?: string;
}

const AssetForm: React.FC<AssetFormProps> = ({ initialData, id }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [category, setCategory] = useState<
    'Equipamento' | 'Veículo' | 'Software'
  >('Equipamento');

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {
      name: '',
      category: 'Equipamento',
      status: 'Ativo',
      description: '',
      acquisitionDate: '',
      serialNumber: '',
      supplier: '',
      licensePlate: '',
      licenseKey: '',
      licenseValidity: '',
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
    const selectedCategory = e.target.value as
      | 'Equipamento'
      | 'Veículo'
      | 'Software';

    setCategory(selectedCategory);

    methods.reset({
      ...methods.getValues(),
      category: selectedCategory,
      serialNumber: '',
      supplier: '',
      licensePlate: '',
      licenseKey: '',
      licenseValidity: '',
    });
  };

  const onSubmit = (data: FormData) => {
    if (initialData && id) {
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
      setCategory(initialData.category);
    }
  }, [initialData]);

  return (
    <FormProvider {...methods}>
      <Button
        $marginTop='16px'
        $marginBottom='16px'
        $variant='success'
        onClick={() => router.push('/assets')}
      >
        Voltar
      </Button>
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

        <Input label='Descrição' name='description' type='text' />

        <Input label='Data de aquisição' name='acquisitionDate' type='date' />

        <DynamicFields category={category} />

        <Button $marginBottom='16px' type='submit'>
          {id ? 'Atualizar Ativo' : 'Cadastrar Ativo'}
        </Button>
      </form>
    </FormProvider>
  );
};

export default AssetForm;
