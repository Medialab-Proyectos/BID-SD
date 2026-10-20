import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/FAB',
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<button matFab>\` (56px) y \`<button matMiniFab>\` (40px). Círculo, mismo azul del
botón primario, sombra medium.

> **Nota:** el FAB existe en Figma pero hoy **no se usa en el código de Client Portal**.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:32px; padding:8px">
        <button matFab aria-label="Agregar"><mat-icon>add</mat-icon></button>
        <button matMiniFab aria-label="Agregar"><mat-icon>add</mat-icon></button>
      </div>`,
  }),
};
