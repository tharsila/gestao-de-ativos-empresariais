import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { assetService } from '@/services/AssetServices';
import { useToast } from '@/hooks/useToast';
import { useConfirmModal } from '@/hooks/useConfirmModal';

export const useAssetActions = () => {
  const router = useRouter();
  const { show } = useToast();
  const { isOpen, open, close, message, onConfirm } = useConfirmModal();
  const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: assetService.removeAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
      show('Ativo removido com sucesso', 'success');
    },
    onError: (error: Error) => {
      show(`Erro ao remover ativo: ${error.message}`, 'error');
    },
  });

  const handleEdit = (id: string) => {
    router.push(`/assets/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    open('Tem certeza de que deseja excluir este ativo?', () =>
      mutationRemove.mutate(id)
    );
  };

  return {
    handleEdit,
    handleDelete,
    isOpen,
    message,
    onConfirm,
    close,
  };
};
