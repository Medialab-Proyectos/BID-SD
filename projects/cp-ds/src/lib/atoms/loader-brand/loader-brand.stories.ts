import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsLoaderBrand } from './loader-brand.component';

const meta: Meta<DsLoaderBrand> = {
  title: 'Átomos/Loader de marca',
  component: DsLoaderBrand,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-loader-brand>\` — el isologo del BID se llena con dos olas. **Solo para la carga de
página completa**; para botones, tablas o secciones usar \`mat-progress-spinner\`.

- Anuncia "Cargando" con \`role="status"\` (configurable con \`label\`).
- Con \`prefers-reduced-motion\` activado se muestra la silueta llena, sin animación.
- Simplificación: Figma anima la forma de las olas cuadro a cuadro; acá se anima su posición.`,
      },
    },
  },
  args: { label: 'Cargando' },
};
export default meta;
type Story = StoryObj<DsLoaderBrand>;

export const Default: Story = {};
