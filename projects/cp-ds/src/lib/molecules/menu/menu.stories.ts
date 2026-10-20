import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Moléculas/Menu',
  decorators: [moduleMetadata({ imports: [MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule, MatCheckboxModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-menu>\` de Angular Material. Panel blanco, radio 4px, sombra small; ítem Body Medium
14/20 de 32px de alto, ícono 20px #535354.

- Ítem actual / seleccionado: clase \`ds-menu-item--selected\` (fondo #d9f4ff, texto #0072a4) + \`aria-current="true"\`.
- Separador: \`<mat-divider>\`.
- Menú con checkbox: \`<mat-checkbox>\` dentro de cada ítem (selección múltiple).

Material maneja el foco y las flechas del teclado; no hace falta código extra.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <button matButton="outlined" [matMenuTriggerFor]="menu">Acciones <mat-icon iconPositionEnd>expand_more</mat-icon></button>
      <mat-menu #menu>
        <button mat-menu-item><mat-icon>visibility</mat-icon>Ver detalle</button>
        <button mat-menu-item class="ds-menu-item--selected" aria-current="true"><mat-icon>edit</mat-icon>Editar</button>
        <button mat-menu-item disabled><mat-icon>content_copy</mat-icon>Duplicar</button>
        <mat-divider />
        <button mat-menu-item><mat-icon>delete</mat-icon>Eliminar</button>
      </mat-menu>`,
  }),
};

export const ConCheckbox: Story = {
  name: 'Con checkbox',
  render: () => ({
    template: `
      <button matButton="outlined" [matMenuTriggerFor]="filtros">Filtrar <mat-icon iconPositionEnd>filter_list</mat-icon></button>
      <mat-menu #filtros>
        <div mat-menu-item (click)="$event.stopPropagation()"><mat-checkbox [checked]="true">En ejecución</mat-checkbox></div>
        <div mat-menu-item (click)="$event.stopPropagation()"><mat-checkbox>Aprobado</mat-checkbox></div>
        <div mat-menu-item (click)="$event.stopPropagation()"><mat-checkbox>Cerrado</mat-checkbox></div>
      </mat-menu>`,
  }),
};
