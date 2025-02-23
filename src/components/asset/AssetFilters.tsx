'use client';
import React from 'react';
import { SelectFilter } from '../ui/SelectFilter';
import { FlexBox } from '@/styles/FlexBox';
import { InputFilter } from '../ui/InputFilter';

interface AssetFiltersProps {
  filters: {
    search: string;
    category: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

export const AssetFilters: React.FC<AssetFiltersProps> = ({
  filters,
  setFilters,
}) => {
  return (
    <FlexBox $gap='10px' $responsive={true} $responsiveFlexDirection='column'>
      <InputFilter
        name='search'
        type='text'
        placeholder='Buscar por nome...'
        value={filters.search}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, search: e.target.value }))
        }
      />

      <SelectFilter
        name='category'
        options={[
          { value: '', label: 'Todas Categorias' },
          { value: 'Equipamento', label: 'Equipamento' },
          { value: 'Veículo', label: 'Veículo' },
          { value: 'Software', label: 'Software' },
        ]}
        value={filters.category}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, category: e.target.value }))
        }
      />

      <SelectFilter
        name='status'
        options={[
          { value: '', label: 'Todos Status' },
          { value: 'Ativo', label: 'Ativo' },
          { value: 'Em manutenção', label: 'Em manutenção' },
          { value: 'Inativo', label: 'Inativo' },
        ]}
        value={filters.status}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, status: e.target.value }))
        }
      />
    </FlexBox>
  );
};
