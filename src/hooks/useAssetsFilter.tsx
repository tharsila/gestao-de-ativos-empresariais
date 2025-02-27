import { useState } from 'react';

export const useAssetFilters = () => {
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

  return {
    filters,
    filterValues,
    setFilterValues,
    handleApplyFilters,
    handleSort,
    handleNextPage,
    handlePreviousPage,
  };
};
