import React from 'react';
import { Input } from '../ui/Input';

interface DynamicFieldsProps {
  category: string;
}

export const DynamicFields: React.FC<DynamicFieldsProps> = ({ category }) => {
  if (category === 'Equipamento') {
    return (
      <>
        <Input label='Número de Série' name='serialNumber' />
        <Input label='Fornecedor' name='supplier' />
      </>
    );
  }

  if (category === 'Veículo') {
    return <Input label='Placa' name='licensePlate' />;
  }

  if (category === 'Software') {
    return (
      <>
        <Input label='Chave de Licença' name='licenseKey' />
        <Input label='Validade da Licença' name='licenseValidity' type='date' />
      </>
    );
  }

  return null;
};
