const API = process.env.NEXT_PUBLIC_API_URL;

export const assetService = {
  getAssets: async ({
    search = '',
    category = '',
    status = '',
    sortBy = '',
    page = 1,
    per_page = 1,
  }) => {

    const queryParams = new URLSearchParams();

    if (search) queryParams.append('name_like', search);
    if (category) queryParams.append('category', category);
    if (status) queryParams.append('status', status);
    if (sortBy) queryParams.append('sortBy', sortBy);
    queryParams.append('page', page.toString());
    queryParams.append('_limit', per_page.toString());

    const response = await fetch(`${API}/assets?${queryParams.toString()}`);
    return response.json();
  },

  createAsset: async (data: any) => {
    const res = await fetch(`${API}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erro ao criar ativo');
    return res.json();
  },

  getAssetById: async (id: string) => {
    const res = await fetch(`${API}/assets/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  updateAsset: async (id: string, data: any) => {
    const res = await fetch(`${API}/assets/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao atualizar ativo');
    return res.json();
  },

  removeAsset: async (id: string) => {
    const res = await fetch(`${API}/assets/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error('Erro ao remover ativo');
    }

    if (res.status === 204) {
      return { success: true };
    }
    return res.json();
  },
};
