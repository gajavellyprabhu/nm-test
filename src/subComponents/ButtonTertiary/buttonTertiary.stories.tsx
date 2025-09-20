import type { Meta, StoryObj } from '@storybook/react';
import ButtonTertiary from './index';

const meta: Meta<typeof ButtonTertiary> = {
  title: 'Components/ButtonTertiary',
  component: ButtonTertiary,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Button text content',
      control: 'text',
    },
    isButton: {
      description: 'Determines if component renders as button or link',
      control: 'boolean',
    },
    href: {
      description: 'URL for link variant',
      control: 'text',
    },
    target: {
      description: 'Target attribute for link variant',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    disabled: {
      description: 'Disables the button/link',
      control: 'boolean',
    },
    tabIndex: {
      description: 'Tab index for accessibility',
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonTertiary>;

export const AsButton: Story = {
  args: {
    text: 'Tertiary Button',
    isButton: true,
  },
};

export const AsLink: Story = {
  args: {
    text: 'Tertiary Link',
    href: 'https://example.com',
    target: '_blank',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Tertiary',
    isButton: true,
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    text: 'Custom Class Button',
    isButton: true,
    className: 'custom-tertiary',
  },
};
