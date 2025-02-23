import { assetService } from '@/services/AssetServices';
import { useQuery } from '@tanstack/react-query';

export const useAssets = (filters: {
  search?: string;
  category?: string;
  status?: string;
  sortby: string;
  page: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ['assets', filters],
    queryFn: () => assetService.getAssets(filters),
    
  });
};
