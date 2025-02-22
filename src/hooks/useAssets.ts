import { assetService } from '@/services/AssetServices';
import { useQuery } from '@tanstack/react-query';

export const useAssets = () => {
  return useQuery({queryKey: ['assets'], queryFn: assetService.getAssets});
};

