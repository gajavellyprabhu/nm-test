import type { Meta, StoryObj } from '@storybook/react';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    disabled: {
      description: 'Disables the button',
      control: 'boolean',
    },
    link: {
      description: 'Link configuration object for anchor rendering',
      control: 'object',
    },
    prefix: {
      description: 'Content to render before button text',
      control: 'text',
    },
    tabIndex: {
      description: 'Tab index for accessibility',
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    text: 'Primary Button',
    isButton: true,
    className: 'primary-button',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    isButton: true,
    className: 'button-hyperlink',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    isButton: true,
    className: 'primary-button',
    disabled: true,
  },
};

export const AsLink: Story = {
  args: {
    link: {
      value: {
        href: 'https://example.com',
        text: 'Link Button',
        target: '_blank',
      },
    },
    className: 'primary-button',
  },
};

export const WithPrefix: Story = {
  args: {
    text: 'Button with Prefix',
    isButton: true,
    className: 'primary-button',
    prefix: '→',
  },
};
