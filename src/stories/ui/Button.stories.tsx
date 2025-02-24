import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/ui/Button';

const buttonMeta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger', 'success'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    
  },
};

export default buttonMeta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const CustomMargin: Story = {
  args: {
    variant: 'primary',
    $marginTop: '20px',
    $marginBottom: '10px',
    children: 'Custom Margin Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
