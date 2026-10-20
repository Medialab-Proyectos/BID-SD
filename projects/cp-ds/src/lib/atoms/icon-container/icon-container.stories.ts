import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsIconContainer } from './icon-container.component';

const meta: Meta<DsIconContainer> = {
  title: 'Átomos/Icon Container',
  component: DsIconContainer,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-icon-container>\` — adorno detrás de un ícono (componente propio). **Decorativo, no
clickeable**: para una acción usar \`matIconButton\`. 9 colores × contraste bajo/alto × cuadrado/redondo ×
4 tamaños (xs 20 · sm 32 · md 40 · lg 64px), verificados en Figma.`,
      },
    },
  },
  argTypes: {
    color: { control: 'select', options: ['blue', 'cyan', 'rose', 'violet', 'aqua', 'green', 'orange', 'disabled'] },
    shape: { control: 'inline-radio', options: ['square', 'round'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: { icon: 'info', color: 'cyan', highContrast: false, shape: 'square', size: 'md' },
};
export default meta;
type Story = StoryObj<DsIconContainer>;

export const Playground: Story = {};

const COLORS = ['blue', 'cyan', 'rose', 'violet', 'aqua', 'green', 'orange', 'disabled'];

export const Colores: Story = {
  render: () => ({
    props: { colors: COLORS },
    template: `
      <div style="display:grid; grid-template-columns:repeat(8, max-content); gap:16px 24px; align-items:center">
        @for (c of colors; track c) { <ds-icon-container icon="info" [color]="$any(c)" /> }
        @for (c of colors; track c) { <ds-icon-container icon="info" [color]="$any(c)" [highContrast]="true" /> }
        @for (c of colors; track c) { <span class="ds-text ds-text--label-md">{{ c }}</span> }
      </div>`,
  }),
};

export const FormasYTamanos: Story = {
  name: 'Formas y tamaños',
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:24px">
        <ds-icon-container icon="info" size="xs" />
        <ds-icon-container icon="info" size="sm" />
        <ds-icon-container icon="info" size="md" />
        <ds-icon-container icon="info" size="lg" />
        <ds-icon-container icon="info" size="md" shape="round" />
        <ds-icon-container icon="info" size="lg" shape="round" [highContrast]="true" />
      </div>`,
  }),
};
