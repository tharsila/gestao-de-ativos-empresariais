'use client';
import React from 'react';
import { SelectFilter } from '../ui/SelectFilter';
import { FlexBox } from '@/styles/FlexBox';
import { InputFilter } from '../ui/InputFilter';

interface Filters {
  search: string;
  category: string;
  status: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  perPage: number;
}

interface AssetFiltersProps {
  filters: Filters;

  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
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
          setFilters((prev) => ({ ...prev, search: e.target.value }))
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
          setFilters((prev) => ({ ...prev, category: e.target.value }))
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
          setFilters((prev) => ({ ...prev, status: e.target.value }))
        }
      />
    </FlexBox>
  );
};
