import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
    onClick: { action: 'clicked' },
  },
};

export default buttonMeta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    onClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    onClick: fn(),
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
    onClick: fn(),
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
    onClick: fn(),
  },
};

export const CustomMargin: Story = {
  args: {
    variant: 'primary',
    $marginTop: '20px',
    $marginBottom: '10px',
    children: 'Custom Margin Button',
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};
