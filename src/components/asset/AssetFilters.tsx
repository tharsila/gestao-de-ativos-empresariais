'use client';
import React from 'react';
import { SelectFilter } from '../ui/SelectFilter';

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
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      {/* Campo de Busca */}
      <input
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
    </div>
  );
};
