import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

type Args = {
  label: string;
  variant: 'filled' | 'outlined' | '';
  size: 'lg' | 'sm';
  icon: string;
  disabled: boolean;
};

const meta: Meta<Args> = {
  title: 'Átomos/Button',
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `Angular Material \`matButton\` con el tema del BID — **no hay componente propio**.

| BID (Figma) | Angular Material |
|---|---|
| Primary | \`<button matButton="filled">\` |
| Secondary | \`<button matButton="outlined">\` |
| Link | \`<button matButton>\` |
| Large (40px) | por defecto |
| Small (32px) | clase \`ds-button--sm\` |

Spec: alto 40px, padding 8/24, etiqueta Body Large Bold (16/24, 700), forma pill. El hover del
Primary es un azul sólido más oscuro (\`--ds-color-primary-hover\`), no una capa translúcida.`,
      },
    },
  },
  argTypes: {
    variant: {
      name: 'variante',
      control: 'select',
      options: ['filled', 'outlined', ''],
      labels: { filled: 'Primary (filled)', outlined: 'Secondary (outlined)', '': 'Link (texto)' },
    },
    size: { name: 'tamaño', control: 'inline-radio', options: ['lg', 'sm'], labels: { lg: 'Large 40px', sm: 'Small 32px' } },
    icon: { name: 'ícono (Material Symbols)', control: 'text' },
    label: { name: 'texto' },
    disabled: { name: 'deshabilitado' },
  },
  args: { label: 'Button', variant: 'filled', size: 'lg', icon: '', disabled: false },
  render: (args) => ({
    props: args,
    template: `
      <button [matButton]="variant" [class.ds-button--sm]="size === 'sm'" [disabled]="disabled">
        @if (icon) { <mat-icon>{{ icon }}</mat-icon> }
        {{ label }}
      </button>`,
  }),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(3, max-content); gap:24px 32px; align-items:center">
        <button matButton="filled">Primary</button>
        <button matButton="outlined">Secondary</button>
        <button matButton>Link</button>
        <button matButton="filled" class="ds-button--sm">Primary sm</button>
        <button matButton="outlined" class="ds-button--sm">Secondary sm</button>
        <button matButton class="ds-button--sm">Link sm</button>
        <button matButton="filled" disabled>Disabled</button>
        <button matButton="outlined" disabled>Disabled</button>
        <button matButton disabled>Disabled</button>
      </div>`,
  }),
};

export const ConIcono: Story = {
  name: 'Con ícono',
  render: () => ({
    template: `
      <div style="display:flex; gap:24px">
        <button matButton="filled"><mat-icon>add</mat-icon>Agregar</button>
        <button matButton="outlined"><mat-icon>download</mat-icon>Descargar</button>
        <button matButton>Ver más<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
      </div>`,
  }),
};

export const Inverse: Story = {
  name: 'Inverse (modo oscuro)',
  parameters: {
    docs: { description: { story: 'Dentro de un contenedor `.ds-inverse` los botones toman su variante inverse automáticamente.' } },
  },
  render: () => ({
    template: `
      <div class="ds-inverse" style="display:flex; gap:24px; padding:32px; border-radius:8px">
        <button matButton="filled">Primary</button>
        <button matButton="outlined">Secondary</button>
        <button matButton>Link</button>
        <button matButton="filled" disabled>Disabled</button>
      </div>`,
  }),
};
