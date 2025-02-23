import AssetForm from '@/components/form/AssetForm';
import { Layout } from '@/components/layout/Layout';

// src/app/assets/new/page.tsx
const NewAssetPage = () => {
  return (
    <Layout>
      <h2>Cadastrar Novo Ativo</h2>
      <AssetForm />
    </Layout>
  );
};

export default NewAssetPage;
