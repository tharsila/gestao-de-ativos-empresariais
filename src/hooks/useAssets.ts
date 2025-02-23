import { assetService } from '@/services/AssetServices';
import { useQuery } from '@tanstack/react-query';

export const useAssets = (filters: {
  search?: string;
  category?: string;
  status?: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  perPage?: number;
}) => {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => assetService.getAssets(filters),

  });
};
