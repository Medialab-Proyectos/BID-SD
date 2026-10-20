import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsFavoriteToggle } from './favorite-toggle.component';

const meta: Meta<DsFavoriteToggle> = {
  title: 'Átomos/Favorite Toggle',
  component: DsFavoriteToggle,
  decorators: [moduleMetadata({ imports: [DsFavoriteToggle] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-favorite-toggle [(selected)]="…">\` — Figma \`✅Favorite Toggle\`, nodo \`5547:5437\`. Botón de 32px con estrella de 24px;
es un botón de alternancia (\`aria-pressed\`). Hover 8% y pressed 12% en un círculo. \`inverse\` es para superficies de marca.

Ajustes frente a Figma (ver \`HUECOS-DEL-SISTEMA.md\`): el contorno #bcbcbe (1.8:1) pasa a #919193 (3.15:1) y el naranja #e38a05
(2.66:1) a #bd7304 (3.38:1) para cumplir 3:1 en gráficos. Además, Figma pinta la estrella **seleccionada** de la variante
standard en gris #535354 (y naranja en hover): se toma como error de diseño y se usa naranja.`,
      },
    },
  },
  args: { selected: false, inverse: false, label: 'Marcar como favorito' },
};
export default meta;
type Story = StoryObj<DsFavoriteToggle>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px">
        <div style="display:flex; gap:16px; align-items:center">
          <ds-favorite-toggle label="No seleccionado" />
          <ds-favorite-toggle [selected]="true" label="Seleccionado" />
        </div>
        <div class="ds-inverse" style="display:flex; gap:16px; align-items:center; padding:16px; border-radius:8px">
          <ds-favorite-toggle [inverse]="true" label="No seleccionado" />
          <ds-favorite-toggle [inverse]="true" [selected]="true" label="Seleccionado" />
        </div>
      </div>`,
  }),
};
