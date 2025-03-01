// src/app/assets/[id]/page.tsx
import AssetForm from '@/components/form/AssetForm';
import { Layout } from '@/components/layout/Layout';
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
    description: asset.description,
    acquisitionDate: asset.acquisitionDate,
    serialNumber: asset.serialNumber,
    supplier: asset.supplier,
    licensePlate: asset.licensePlate,
    licenseKey: asset.licenseKey,
    licenseValidity: asset.licenseValidity,
  };

  return (
    <Layout>
      <h2>Editar Ativo</h2>
      <AssetForm initialData={initialData} id={id} />
    </Layout>
  );
}
