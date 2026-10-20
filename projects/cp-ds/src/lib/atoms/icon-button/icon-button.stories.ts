import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/Icon Button',
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<button matIconButton>\` de Angular Material.

| BID (Figma) | Angular Material |
|---|---|
| Standard medium (40px) | \`<button matIconButton aria-label="…">\` |
| Small (32px) | + clase \`ds-icon-button--sm\` |
| Outlined | + clase \`ds-icon-button--outlined\` |
| Inverse | dentro de \`.ds-inverse\` |

Ícono #535354; hover 8%, pressed 16% (inverse: 12% / 20%).
**Siempre** con \`aria-label\`: el ícono solo no le dice nada a un lector de pantalla.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:24px">
        <button matIconButton aria-label="Buscar"><mat-icon>search</mat-icon></button>
        <button matIconButton class="ds-icon-button--outlined" aria-label="Editar"><mat-icon>edit</mat-icon></button>
        <button matIconButton class="ds-icon-button--sm" aria-label="Cerrar"><mat-icon>close</mat-icon></button>
        <button matIconButton class="ds-icon-button--sm ds-icon-button--outlined" aria-label="Agregar"><mat-icon>add</mat-icon></button>
        <button matIconButton disabled aria-label="Eliminar"><mat-icon>delete</mat-icon></button>
      </div>`,
  }),
};

export const Inverse: Story = {
  name: 'Inverse (modo oscuro)',
  render: () => ({
    template: `
      <div class="ds-inverse" style="display:flex; align-items:center; gap:24px; padding:24px; border-radius:8px">
        <button matIconButton aria-label="Buscar"><mat-icon>search</mat-icon></button>
        <button matIconButton class="ds-icon-button--outlined" aria-label="Editar"><mat-icon>edit</mat-icon></button>
        <button matIconButton disabled aria-label="Eliminar"><mat-icon>delete</mat-icon></button>
      </div>`,
  }),
};
