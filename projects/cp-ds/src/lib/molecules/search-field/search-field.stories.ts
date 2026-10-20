import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Moléculas/Buscador',
  decorators: [moduleMetadata({ imports: [MatFormFieldModule, MatInputModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `Buscador (Figma \`Input-Search\`, nodo \`8128:1095\`). Es un \`mat-form-field\` con un ícono de búsqueda al final; no hay componente propio.

| Tipo | Código |
|---|---|
| **Default** | Campo normal (56px, o 40px con \`ds-field--sm\`) con \`<mat-icon matSuffix>search</mat-icon>\`; etiqueta arriba con \`ds-field-label\` |
| **Global** | \`ds-field--global\`: campo de **40px en píldora** (radio 80px), hover con borde #232222 |
| **Global sobre celeste** | \`ds-field--global ds-field--global-inverse\`: fondo Interaction/selected (#d9f4ff) |

El ícono de búsqueda va en #535354. El campo siempre necesita nombre accesible (\`aria-label\` si no lleva etiqueta visible).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; width:320px">
        <div>
          <label class="ds-field-label" for="b1">Buscar proyecto</label>
          <mat-form-field appearance="outline" style="width:100%">
            <input matInput id="b1" placeholder="Nombre o número" />
            <mat-icon matSuffix>search</mat-icon>
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline" class="ds-field--sm" style="width:100%">
          <input matInput aria-label="Buscar (pequeño)" placeholder="Buscar" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline" class="ds-field--global" style="width:100%">
          <input matInput aria-label="Buscar en el portal" placeholder="Buscar en el portal" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <mat-form-field appearance="outline" class="ds-field--global ds-field--global-inverse" style="width:100%">
          <input matInput aria-label="Buscar en el portal (celeste)" placeholder="Buscar en el portal" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>`,
  }),
};
