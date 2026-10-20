import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from '../../atoms/avatar/avatar.component';
import { DsFavoriteToggle } from '../../atoms/favorite-toggle/favorite-toggle.component';
import { DsStatusIcon, type DsStatus } from '../../atoms/status-icon/status-icon.component';

interface Fila { nombre: string; pais: string; monto: number; responsable: string; iniciales: string; avance: number; estado: DsStatus }
const FILAS: Fila[] = [
  { nombre: 'Educación rural', pais: 'Perú', monto: 18000000, responsable: 'Ana Pérez', iniciales: 'AP', avance: 25, estado: 'complete' },
  { nombre: 'Agua y saneamiento', pais: 'Colombia', monto: 25500000, responsable: 'Luis Gómez', iniciales: 'LG', avance: 60, estado: 'active' },
  { nombre: 'Salud primaria', pais: 'Uruguay', monto: 9800000, responsable: 'Marta Díaz', iniciales: 'MD', avance: 90, estado: 'error' },
];

@Component({
  selector: 'demo-tabla-variantes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatSortModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, DsAvatar, DsFavoriteToggle, DsStatusIcon],
  template: `
    <div class="ds-table-container" [class.ds-table--lc]="lowContrast()" [class.ds-table--underline]="underline()" style="overflow-x:auto">
      <table mat-table [dataSource]="filas" matSort aria-label="Variantes de celdas" style="min-width:1320px">
        <ng-container matColumnDef="sel">
          <th mat-header-cell *matHeaderCellDef style="width:44px"><mat-checkbox aria-label="Seleccionar todo" /></th>
          <td mat-cell *matCellDef="let f"><mat-checkbox [aria-label]="'Seleccionar ' + f.nombre" /></td>
        </ng-container>
        <ng-container matColumnDef="texto">
          <th mat-header-cell *matHeaderCellDef>Texto</th>
          <td mat-cell *matCellDef="let f">{{ f.nombre }}</td>
        </ng-container>
        <ng-container matColumnDef="orden">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Ordenable</th>
          <td mat-cell *matCellDef="let f">{{ f.pais }}</td>
        </ng-container>
        <ng-container matColumnDef="ayuda">
          <th mat-header-cell *matHeaderCellDef><span class="ds-cell">Con ayuda <mat-icon class="ds-th-info" aria-label="Qué significa esta columna">help</mat-icon></span></th>
          <td mat-cell *matCellDef="let f">{{ f.monto.toLocaleString('es') }}</td>
        </ng-container>
        <ng-container matColumnDef="icono">
          <th mat-header-cell *matHeaderCellDef>Ícono y texto</th>
          <td mat-cell *matCellDef="let f"><span class="ds-cell"><mat-icon>folder</mat-icon>{{ f.pais }}</span></td>
        </ng-container>
        <ng-container matColumnDef="persona">
          <th mat-header-cell *matHeaderCellDef>Avatar y texto</th>
          <td mat-cell *matCellDef="let f"><span class="ds-cell"><ds-avatar [name]="f.responsable" [initials]="f.iniciales" size="sm" />{{ f.responsable }}</span></td>
        </ng-container>
        <ng-container matColumnDef="enlace">
          <th mat-header-cell *matHeaderCellDef>Enlace</th>
          <td mat-cell *matCellDef="let f"><a class="ds-link ds-link--sm" href="#">Ver informe</a></td>
        </ng-container>
        <ng-container matColumnDef="boton">
          <th mat-header-cell *matHeaderCellDef>Botón</th>
          <td mat-cell *matCellDef="let f"><button matButton class="ds-button--sm">Descargar</button></td>
        </ng-container>
        <ng-container matColumnDef="campo">
          <th mat-header-cell *matHeaderCellDef>Campo</th>
          <td mat-cell *matCellDef="let f">
            <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic" style="width:110px">
              <input matInput [attr.aria-label]="'Cantidad de ' + f.nombre" value="10" />
            </mat-form-field>
          </td>
        </ng-container>
        <ng-container matColumnDef="progreso">
          <th mat-header-cell *matHeaderCellDef>Progreso</th>
          <td mat-cell *matCellDef="let f"><span class="ds-progress-cell"><mat-progress-bar mode="determinate" [value]="f.avance" aria-label="Avance" />{{ f.avance }}%</span></td>
        </ng-container>
        <ng-container matColumnDef="estado">
          <th mat-header-cell *matHeaderCellDef style="width:64px"><span class="cdk-visually-hidden">Estado</span><mat-icon aria-hidden="true">circle</mat-icon></th>
          <td mat-cell *matCellDef="let f"><ds-status-icon [status]="f.estado" size="sm" /></td>
        </ng-container>
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef style="width:220px">
            <button matIconButton aria-label="Configurar columnas" style="color:inherit"><mat-icon>tune</mat-icon></button>
          </th>
          <td mat-cell *matCellDef="let f">
            <span class="ds-cell" style="gap:4px">
              <ds-favorite-toggle [label]="'Favorito: ' + f.nombre" />
              <button matIconButton [attr.aria-label]="'Editar ' + f.nombre"><mat-icon>edit</mat-icon></button>
              <button matIconButton [attr.aria-label]="'Eliminar ' + f.nombre"><mat-icon>delete</mat-icon></button>
              <button matIconButton [attr.aria-label]="'Más acciones de ' + f.nombre"><mat-icon>more_vert</mat-icon></button>
            </span>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnas"></tr>
        <tr mat-row *matRowDef="let row; columns: columnas"></tr>
      </table>
    </div>
  `,
})
class DemoTablaVariantes {
  readonly lowContrast = input(false);
  readonly underline = input(false);
  protected readonly filas = FILAS;
  protected readonly columnas = ['sel', 'texto', 'orden', 'ayuda', 'icono', 'persona', 'enlace', 'boton', 'campo', 'progreso', 'estado', 'acciones'];
}

const meta: Meta = {
  title: 'Organismos/Table (variantes)',
  decorators: [moduleMetadata({ imports: [DemoTablaVariantes] })],
  parameters: {
    docs: {
      description: {
        component: `Todas las variantes de **cabecera** y de **celda** de la tabla (Figma \`ColumnHeader\`, \`ColumnCells\`, \`ColumnActionCells\`).

**Cabeceras:** título · ordenable (\`mat-sort-header\`, flecha de 16px) · con ícono de ayuda (\`.ds-th-info\`, blanco en High-Contrast y azul en Low-Contrast) ·
checkbox (blanco en HC, gris en LC) · configuración (botón de ícono \`tune\`) · ícono de estado · vacía. Con subrayado en Low-Contrast: \`ds-table--underline\`.

**Celdas:** texto · ícono y texto · avatar y texto (\`ds-avatar\` small) · enlace (\`ds-link--sm\`) · botón (\`ds-button--sm\`) · campo de texto
(\`ds-field--sm\`) · barra de progreso (\`.ds-progress-cell\`, 125px) · chip (ver Organismos/Table) · checkbox.

**Celdas de acción:** favorito (\`ds-favorite-toggle\`) · editar · eliminar · más acciones (botón de ícono mediano: 40px, ícono de 24px) · estado (\`ds-status-icon\`).

Sin cubrir todavía: tabla anidada y \`With Footer\`; los íconos de chevron arriba/abajo y los menús horizontales de Figma no se inspeccionaron.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const HighContrast: Story = {
  name: 'High-Contrast',
  render: () => ({ template: `<demo-tabla-variantes />` }),
};
export const LowContrastConSubrayado: Story = {
  name: 'Low-Contrast con subrayado',
  render: () => ({ template: `<demo-tabla-variantes [lowContrast]="true" [underline]="true" />` }),
};
