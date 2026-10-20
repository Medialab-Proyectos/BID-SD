import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

interface Fila { id: number; nombre: string; pais: string; monto: number; estado: 'success' | 'warning' | 'error' | 'info'; texto: string }
const FILAS: Fila[] = [
  { id: 1, nombre: 'Educación rural', pais: 'Perú', monto: 18000000, estado: 'success', texto: 'En ejecución' },
  { id: 2, nombre: 'Agua y saneamiento', pais: 'Colombia', monto: 25500000, estado: 'warning', texto: 'Con observaciones' },
  { id: 3, nombre: 'Infraestructura escolar', pais: 'Argentina', monto: 12300000, estado: 'info', texto: 'En preparación' },
  { id: 4, nombre: 'Transporte urbano', pais: 'Chile', monto: 40000000, estado: 'error', texto: 'Suspendido' },
  { id: 5, nombre: 'Salud primaria', pais: 'Uruguay', monto: 9800000, estado: 'success', texto: 'En ejecución' },
];

@Component({
  selector: 'demo-tabla',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatSortModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  template: `
    <div class="ds-table-container" [class.ds-table--lc]="lowContrast()" [class.ds-table--zebra]="zebra()" style="max-width:960px">
      <table mat-table [dataSource]="filas" matSort aria-label="Proyectos">
        <ng-container matColumnDef="sel">
          <th mat-header-cell *matHeaderCellDef style="width:44px"><mat-checkbox aria-label="Seleccionar todo" /></th>
          <td mat-cell *matCellDef="let f"><mat-checkbox [aria-label]="'Seleccionar ' + f.nombre" /></td>
        </ng-container>
        <ng-container matColumnDef="nombre">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Proyecto</th>
          <td mat-cell *matCellDef="let f">{{ f.nombre }}</td>
        </ng-container>
        <ng-container matColumnDef="pais">
          <th mat-header-cell *matHeaderCellDef>País</th>
          <td mat-cell *matCellDef="let f">{{ f.pais }}</td>
        </ng-container>
        <ng-container matColumnDef="monto">
          <th mat-header-cell *matHeaderCellDef>Monto (US$)</th>
          <td mat-cell *matCellDef="let f">{{ f.monto.toLocaleString('es') }}</td>
        </ng-container>
        <ng-container matColumnDef="estado">
          <th mat-header-cell *matHeaderCellDef>Estado</th>
          <td mat-cell *matCellDef="let f"><mat-chip class="ds-chip ds-chip--sm ds-chip--{{ f.estado }}">{{ f.texto }}</mat-chip></td>
        </ng-container>
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef style="width:64px"><span class="cdk-visually-hidden">Acciones</span></th>
          <td mat-cell *matCellDef="let f"><button matIconButton [attr.aria-label]="'Ver ' + f.nombre"><mat-icon>visibility</mat-icon></button></td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnas"></tr>
        <tr mat-row *matRowDef="let row; columns: columnas" [class.ds-row--highlight]="resaltar() && row.id === 2"></tr>
      </table>
      @if (paginador()) { <mat-paginator [length]="100" [pageSize]="25" [pageSizeOptions]="[10, 25, 50]" aria-label="Paginación" /> }
    </div>
  `,
})
class DemoTabla {
  readonly lowContrast = input(false);
  readonly zebra = input(false);
  readonly resaltar = input(false);
  readonly paginador = input(false);
  protected readonly filas = FILAS;
  protected readonly columnas = ['sel', 'nombre', 'pais', 'monto', 'estado', 'acciones'];
}

const meta: Meta = {
  title: 'Organismos/Table',
  decorators: [moduleMetadata({ imports: [DemoTabla] })],
  parameters: {
    docs: {
      description: {
        component: `\`<table mat-table>\` (Figma \`✅Table\`, nodo \`713:3651\`) dentro de \`.ds-table-container\` (borde 1px Border/Default, radio 8px).

| Parte | Spec |
|---|---|
| Cabecera **High-Contrast** (default) | 50px, fondo #004e70, texto blanco Title Small SemiBold 14/20 |
| Cabecera **Low-Contrast** (\`ds-table--lc\` en el contenedor) | Fondo #e3eaef, texto #232222 |
| Fila | 50px, Body Medium, celdas con 12px de padding horizontal, borde inferior 1px Border/Default |
| **Zebra** (\`ds-table--zebra\`) | Filas pares en #f9f9fa |
| **Fila resaltada** (\`ds-row--highlight\`) | Fondo #f1fafd con borde superior e inferior de 1px azul (#007eb6) |
| Paginador | \`mat-paginator\` al pie del contenedor (ver Moléculas/Paginator) |

Columnas de acción: botón de ícono mediano (40px, ícono de 24px; cabe en la fila de 50px). Estado: chips de estado (\`ds-chip--success|warning|error|info\`).
Orden: \`matSort\` + \`mat-sort-header\`. Variantes de Figma sin cubrir todavía: tabla anidada y \`With Footer\`.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const HighContrast: Story = {
  name: 'Cabecera High-Contrast',
  render: () => ({ template: `<demo-tabla [paginador]="true" />` }),
};
export const LowContrast: Story = {
  name: 'Cabecera Low-Contrast',
  render: () => ({ template: `<demo-tabla [lowContrast]="true" />` }),
};
export const ZebraYResaltada: Story = {
  name: 'Zebra y fila resaltada',
  render: () => ({ template: `<demo-tabla [zebra]="true" [resaltar]="true" />` }),
};
