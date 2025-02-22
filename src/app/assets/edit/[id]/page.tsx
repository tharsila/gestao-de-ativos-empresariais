// src/app/assets/[id]/page.tsx
import AssetForm from '@/components/form/AssetForm';
import { assetService } from '@/services/AssetServices';
import { notFound } from 'next/navigation';

type EditAssetPageParams = {
  params: {
    id: string;
  };
};

export default async function EditAssetPage({ params }: EditAssetPageParams) {
  const id = params.id;
  const asset = await assetService.getAssetById(id);

  if (!asset) return notFound();

  const initialData = {
    name: asset.name,
    category: asset.category,
    status: asset.status,
    acquisitionDate: asset.acquisitionDate,
  };

  return (
    <div>
      <h1>Editar Ativo</h1>
      <AssetForm initialData={initialData} id={id} />
    </div>
  );
}
