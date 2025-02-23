// src/app/assets/page.tsx


import { AssetList } from '@/components/asset/AssetList';
import { Layout } from '@/components/layout/Layout';


export default function AssetsPage (){
  return (
    <main>
       <Layout>
          <h1>Lista de Ativos</h1>
          <AssetList />
       </Layout>
    </main>
  );
};

