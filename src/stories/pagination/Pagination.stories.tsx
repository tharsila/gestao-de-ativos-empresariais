import { Pagination } from '@/components/pagination/Pagination';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const paginationMeta: Meta<typeof Pagination> = {
  title: 'Components/pagination/Pagination',
  component: Pagination,
  argTypes: {
    page: { control: { type: 'number', min: 1 }, description: 'Página atual' },
    perPage: {
      control: { type: 'number', min: 1 },
      description: 'Registros por página',
    },
    totalRecords: {
      control: { type: 'number', min: 0 },
      description: 'Total de registros',
    },
    nextPage: { action: 'nextPage', description: 'Vai para a próxima página' },
    prevPage: {
      action: 'prevPage',
      description: 'Volta para a página anterior',
    },
  },
};

export default paginationMeta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    page: 1,
    perPage: 10,
    totalRecords: 50,
    nextPage: () => console.log('Próxima página'),
    prevPage: () => console.log('Página anterior'),
  },
};
