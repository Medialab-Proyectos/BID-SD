import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const ETIQUETAS = ['cyan', 'rose', 'violet', 'aqua', 'gray', 'red', 'yellow', 'orange', 'lime'];
const ESTADOS = ['info', 'success', 'error', 'warning', 'neutral'];
const TAMANOS = [['', 'medium 32px'], ['ds-chip--sm', 'small 24px'], ['ds-chip--xs', 'x-small 20px']];

const meta: Meta = {
  title: 'Átomos/Chips',
  decorators: [moduleMetadata({ imports: [MatChipsModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-chip>\` de Angular Material con las clases del BID (Figma \`✅Chips\`, nodo \`12229:877\`).
Tres familias:

| Familia | Uso | Código |
|---|---|---|
| **Tags** | Etiqueta estática de color | \`<mat-chip class="ds-chip ds-chip--cyan">\` |
| **Status-Chips** | Estado, con borde de 1px | \`<mat-chip class="ds-chip ds-chip--success">\` |
| **Filter tag** | Filtro que se puede quitar | \`<mat-chip-row class="ds-chip ds-chip--cyan">\` + \`<button matChipRemove>\` |

**Tamaños:** medium 32px (default) · \`ds-chip--sm\` 24px · \`ds-chip--xs\` 20px (Label x-Small 10/16). Radio 4px, Label Large SemiBold.
**Colores de etiqueta:** cyan, rose, violet, aqua, gray, red, yellow, orange, lime. **De estado:** info, success, error, warning, neutral.

Ajuste de accesibilidad: el texto del chip **rose** en Figma (#ab6787) da 3.71:1 sobre su fondo; se usa Rose 20 (#8b546e, 5.19:1).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Etiquetas: Story = {
  name: 'Tags (etiquetas)',
  render: () => ({
    props: { colores: ETIQUETAS, tamanos: TAMANOS },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px">
        @for (t of tamanos; track t[0]) {
          <div>
            <p class="ds-text ds-text--label-md" style="margin:0 0 8px">{{ t[1] }}</p>
            <mat-chip-set aria-label="Etiquetas">
              @for (c of colores; track c) { <mat-chip class="ds-chip ds-chip--{{c}} {{t[0]}}">{{ c }}</mat-chip> }
            </mat-chip-set>
          </div>
        }
        <div>
          <p class="ds-text ds-text--label-md" style="margin:0 0 8px">con ícono a la izquierda</p>
          <mat-chip-set aria-label="Con ícono">
            <mat-chip class="ds-chip ds-chip--cyan"><mat-icon matChipAvatar>fiber_manual_record</mat-icon>Tag</mat-chip>
            <mat-chip class="ds-chip ds-chip--lime"><mat-icon matChipAvatar>fiber_manual_record</mat-icon>Tag</mat-chip>
          </mat-chip-set>
        </div>
      </div>`,
  }),
};

export const Estado: Story = {
  name: 'Status-Chips (estado)',
  render: () => ({
    props: { estados: ESTADOS, tamanos: TAMANOS },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px">
        @for (t of tamanos; track t[0]) {
          <div>
            <p class="ds-text ds-text--label-md" style="margin:0 0 8px">{{ t[1] }}</p>
            <mat-chip-set aria-label="Estados">
              @for (c of estados; track c) { <mat-chip class="ds-chip ds-chip--{{c}} {{t[0]}}"><mat-icon matChipAvatar>fiber_manual_record</mat-icon>{{ c }}</mat-chip> }
            </mat-chip-set>
          </div>
        }
      </div>`,
  }),
};

export const Filtro: Story = {
  name: 'Filter tag (quitable)',
  render: () => ({
    template: `
      <mat-chip-grid aria-label="Filtros activos">
        <mat-chip-row class="ds-chip ds-chip--cyan">Proyectos activos<button matChipRemove aria-label="Quitar Proyectos activos"><mat-icon>cancel</mat-icon></button></mat-chip-row>
        <mat-chip-row class="ds-chip ds-chip--gray">Argentina<button matChipRemove aria-label="Quitar Argentina"><mat-icon>cancel</mat-icon></button></mat-chip-row>
      </mat-chip-grid>`,
  }),
};
