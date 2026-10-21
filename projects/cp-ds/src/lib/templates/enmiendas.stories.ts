import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_LOCALE, type MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from '../atoms/avatar/avatar.component';
import { DsIconContainer } from '../atoms/icon-container/icon-container.component';
import { DsBreadcrumb, type DsBreadcrumbItem } from '../molecules/breadcrumb/breadcrumb.component';
import { DsLinkItem } from '../molecules/link-item/link-item.component';
import { DsLeftnav } from '../organisms/leftnav/leftnav.component';
import { DsStepList, type DsStep } from '../organisms/step-list/step-list.component';
import { type DsNavLink, DsTopnav } from '../organisms/topnav/topnav.component';

/** Figma muestra la fecha como 08/17/2023 (mes/día/año con ceros). */
const FORMATOS_FECHA: MatDateFormats = {
  parse: { dateInput: null },
  display: {
    dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

interface Moneda {
  codigo: 'USD' | 'COP';
  seleccionada: boolean;
}

interface CampoGarantia {
  id: number;
  campo: string;
  original: string;
  vigente: string;
  tipo: 'numero' | 'fecha';
  nuevo: string | Date;
}

/** Misma pantalla que la app de ejemplo (projects/enmiendas-app), para verla dentro de Storybook. */
@Component({
  selector: 'pantalla-enmiendas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatSelectModule, MatTableModule,
    DsAvatar, DsBreadcrumb, DsIconContainer, DsLeftnav, DsLinkItem, DsStepList, DsTopnav,
  ],
  // Fechas en formato inglés (08/17/2023), como el diseño; el resto de Storybook usa fechas en español.
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }, provideNativeDateAdapter(FORMATOS_FECHA)],
  template: `<div class="pagina">
  <ds-topnav productName="Fiduciary Processes" logoLang="eng" [links]="enlaces">
    <ng-container dsTopnavActions>
      <button matButton="outlined">Return to Client Portal</button>
      <button matIconButton aria-label="Notificaciones, 1 nueva"><mat-icon matBadge="1">notifications</mat-icon></button>
      <button matIconButton aria-label="Soporte"><mat-icon>headset_mic</mat-icon></button>
      <ds-avatar name="Federico Ruiz" initials="FR" />
    </ng-container>
  </ds-topnav>

  <div class="cuerpo">
    <ds-leftnav productName="Close" [slim]="slim()" (toggle)="slim.set(!slim())">
      <div class="menu">
        @for (item of menu; track item.label) {
          <a ds-link-item href="#" [icon]="item.icon" [selected]="item.selected" [trailingIcon]="item.trailing" [slim]="slim()"
             [label]="item.label">{{ item.label }}</a>
        }
      </div>
    </ds-leftnav>

    <main class="contenido">
      <ds-breadcrumb class="migas" [items]="migas" separator="chevron" />

      <mat-card appearance="outlined">
        <div class="operacion__titulo">
          <ds-icon-container icon="work" size="md" />
          <div>
            <p class="ds-text ds-text--title-md">Operation</p>
            <p class="ds-text operacion__codigo">4790/OC-PN</p>
          </div>
        </div>
        <div class="operacion__datos">
          @for (d of datosOperacion; track d.etiqueta) {
            <div [class.operacion__dato--angosto]="d.angosta">
              <p class="ds-text ds-text--body-lg subtle">{{ d.etiqueta }}</p>
              <p class="ds-text ds-text--body-lg">{{ d.valor }}</p>
            </div>
          }
        </div>
      </mat-card>

      <mat-card appearance="outlined">
        <ds-step-list orientation="horizontal" content="number" [steps]="pasos" [selected]="pasoActual()"
                      ariaLabel="Pasos de la enmienda" (stepClick)="pasoActual.set($event)" />
      </mat-card>

      <h1 class="ds-text ds-text--body-md-bold titulo-seccion">Enmiendas seleccionadas monto</h1>

      <!-- Registro de la enmienda de monto -->
      <mat-card appearance="outlined">
        <h2 class="ds-text ds-text--title-md-bold">Registro de la enmienda de monto</h2>
        <p class="ds-text ds-text--body-lg subtle">Selecciona el tipo de moneda del monto a ampliar, puedes seleccionar más de uno.</p>
        <div class="monedas">
          @for (m of monedas(); track m.codigo) {
            <mat-checkbox [checked]="m.seleccionada" (change)="alternarMoneda(m.codigo, $event.checked)">{{ m.codigo }}</mat-checkbox>
          }
        </div>
        <p class="ds-text ds-text--body-md-semibold acumulado">
          <span>Total acumulado equivalente</span><span>(USD)</span><span>0.00</span>
          <span>Porcentaje del monto original acumulado</span><span>0%</span>
        </p>

        @for (m of monedasActivas(); track m.codigo) {
          <div class="tabla-enmienda">
            <p class="ds-text ds-text--body-md fila fila--simple">Tipo de moneda</p>
            <div class="fila fila--moneda">
              <span class="ds-text ds-text--body-md">{{ m.codigo }}</span>
              <button matButton="outlined" class="ds-button--sm"><mat-icon>add</mat-icon>Añadir componente</button>
            </div>

            <table class="componentes">
              <caption class="cdk-visually-hidden">Componentes y productos de la enmienda en {{ m.codigo }}</caption>
              <colgroup><col /><col class="col-monto" /><col class="col-monto" /><col class="col-monto" /><col class="col-monto" /><col class="col-monto" /><col class="col-accion" /></colgroup>

              <!-- Componente existente -->
              <tbody>
                <tr class="grupo">
                  <th scope="col">Componente</th>
                  @for (c of columnasMonto; track c) { <th scope="col">{{ c }}</th> }
                  <td class="accion" rowspan="2">
                    <button matIconButton [attr.aria-label]="'Eliminar el componente 1.1 de ' + m.codigo"><mat-icon>delete</mat-icon></button>
                  </td>
                </tr>
                <tr class="grupo">
                  <td>Componente de compente 1.1</td>
                  @for (c of columnasMonto; track c) { <td>0.00</td> }
                </tr>
                @for (p of productos; track $index) {
                  <tr>
                    <td class="producto"><span class="ds-text ds-text--body-md">Producto<br />{{ p }}</span></td>
                    @for (c of columnasMonto.slice(0, 3); track c) {
                      <td>
                        <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                          <input matInput value="0.00" [attr.aria-label]="c.replace('\\n', ' ') + ' del producto ' + ($index + 1)" />
                        </mat-form-field>
                      </td>
                    }
                    <td>0.00</td>
                    <td>0.00</td>
                    <td class="accion">
                      <button matIconButton [attr.aria-label]="'Eliminar el producto ' + ($index + 1)"><mat-icon>delete</mat-icon></button>
                    </td>
                  </tr>
                }
                <tr>
                  <td colspan="7" class="anadir"><button matButton class="ds-button--sm"><mat-icon>add</mat-icon>Añadir Producto</button></td>
                </tr>
              </tbody>

              <!-- Componente nuevo, por seleccionar -->
              <tbody class="nuevo">
                <tr class="grupo">
                  <td rowspan="2" class="seleccion">
                    <label class="ds-field-label" for="comp-{{ m.codigo }}">Componente<span class="obligatorio" aria-hidden="true">*</span></label>
                    <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                      <mat-select id="comp-{{ m.codigo }}" placeholder="Seleccionar un componente" aria-required="true">
                        @for (o of opcionesComponente; track o) { <mat-option [value]="o">{{ o }}</mat-option> }
                      </mat-select>
                    </mat-form-field>
                  </td>
                  @for (c of columnasMonto; track c) { <th scope="col">{{ c }}</th> }
                  <td class="accion" rowspan="2">
                    <button matIconButton [attr.aria-label]="'Eliminar el componente nuevo de ' + m.codigo"><mat-icon>delete</mat-icon></button>
                  </td>
                </tr>
                <tr class="grupo">
                  @for (c of columnasMonto; track c) { <td>0.00</td> }
                </tr>
                <tr>
                  <td class="producto producto--seleccion">
                    <label class="ds-field-label" for="prod-{{ m.codigo }}">Producto<span class="obligatorio" aria-hidden="true">*</span></label>
                    <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                      <mat-select id="prod-{{ m.codigo }}" placeholder="Seleccionar producto" aria-required="true">
                        @for (o of opcionesProducto; track o) { <mat-option [value]="o">{{ o }}</mat-option> }
                      </mat-select>
                    </mat-form-field>
                  </td>
                  @for (c of columnasMonto.slice(0, 3); track c) {
                    <td>
                      <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                        <input matInput value="0.00" [attr.aria-label]="c.replace('\\n', ' ') + ' del producto nuevo'" />
                      </mat-form-field>
                    </td>
                  }
                  <td>0.00</td>
                  <td>0.00</td>
                  <td class="accion">
                    <button matIconButton aria-label="Eliminar el producto nuevo"><mat-icon>delete</mat-icon></button>
                  </td>
                </tr>
                <tr>
                  <td colspan="7" class="anadir"><button matButton class="ds-button--sm"><mat-icon>add</mat-icon>Añadir Producto</button></td>
                </tr>
              </tbody>
            </table>

            <p class="ds-text ds-text--body-md-semibold total-moneda">
              <span>Total acumulado en {{ m.codigo }}</span><span>0.00</span>
              <span>Total acumulado equivalente (USD)</span><span>0.00</span>
            </p>
          </div>
        }
      </mat-card>

      <!-- Garantía / Fianza -->
      <mat-card appearance="outlined">
        <h2 class="ds-text ds-text--title-md-bold">Garantía / Fianza</h2>
        <p class="ds-text ds-text--body-lg subtle">En caso sea necesario puedes modificar la garantía registrada o crear una nueva</p>
        <div class="garantia__datos">
          <div><p class="ds-text ds-text--body-lg subtle">Tipo de Garantía / Fianza</p><p class="ds-text ds-text--body-lg-semibold">Garantía de anticipo</p></div>
          <div><p class="ds-text ds-text--body-lg subtle">Tipo de moneda</p><p class="ds-text ds-text--body-lg-semibold">USD</p></div>
          <div><p class="ds-text ds-text--body-lg subtle">Total equivalente (USD)</p><p class="ds-text ds-text--body-lg-semibold">670,270</p></div>
        </div>

        <div class="ds-table-container ds-table--lc">
          <table mat-table [dataSource]="garantia" aria-label="Campos de la garantía">
            <ng-container matColumnDef="campo">
              <th mat-header-cell *matHeaderCellDef>Campos</th>
              <td mat-cell *matCellDef="let r">
                <mat-checkbox [checked]="marcados().has(r.id)" (change)="marcar(r.id, $event.checked)">{{ r.campo }}</mat-checkbox>
              </td>
            </ng-container>
            <ng-container matColumnDef="original">
              <th mat-header-cell *matHeaderCellDef>Valor original</th>
              <td mat-cell *matCellDef="let r">{{ r.original }}</td>
            </ng-container>
            <ng-container matColumnDef="vigente">
              <th mat-header-cell *matHeaderCellDef>Valor vigente</th>
              <td mat-cell *matCellDef="let r">{{ r.vigente }}</td>
            </ng-container>
            <ng-container matColumnDef="nuevo">
              <th mat-header-cell *matHeaderCellDef>Nuevo valor</th>
              <td mat-cell *matCellDef="let r">
                @if (r.tipo === 'fecha') {
                  <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                    <input matInput [matDatepicker]="selector" [value]="r.nuevo" [disabled]="!marcados().has(r.id)"
                           [attr.aria-label]="'Nuevo valor de ' + r.campo" />
                    <mat-datepicker-toggle matIconSuffix [for]="selector" />
                    <mat-datepicker #selector />
                  </mat-form-field>
                } @else {
                  <mat-form-field appearance="outline" class="ds-field--sm" subscriptSizing="dynamic">
                    <input matInput [value]="r.nuevo" [disabled]="!marcados().has(r.id)" [attr.aria-label]="'Nuevo valor de ' + r.campo" />
                  </mat-form-field>
                }
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columnasGarantia"></tr>
            <tr mat-row *matRowDef="let row; columns: columnasGarantia"></tr>
          </table>
          <div class="anadir anadir--tabla"><button matButton class="ds-button--sm"><mat-icon>add</mat-icon>Añade una garantia</button></div>
        </div>
      </mat-card>

      <!-- Justificación -->
      <mat-card appearance="outlined">
        <h2 class="ds-text ds-text--title-md-bold">Justificación de enmienda (Opcional)</h2>
        <p class="ds-text ds-text--body-lg subtle">En caso sea necesario puedes dar una descripción sobre el contexto, justificación y/o información extra de la enmienda.</p>
        <mat-form-field appearance="outline" class="justificacion__campo" subscriptSizing="dynamic">
          <textarea matInput rows="2" placeholder="Ingresa comentario" aria-label="Justificación de enmienda"></textarea>
        </mat-form-field>
      </mat-card>

      <div class="acciones">
        <button matButton><mat-icon>exit_to_app</mat-icon>Salir</button>
        <div class="acciones__derecha">
          <button matButton="outlined">Regresar</button>
          <button matButton="filled">Continuar</button>
        </div>
      </div>
    </main>
  </div>
</div>
`,
  styles: [`/* Solo layout de la pantalla. Todo el aspecto de los componentes (colores, tipografía, radios) viene de @bid/cp-ds. */
.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--ds-color-background);
}

.cuerpo {
  display: grid;
  grid-template-columns: auto 1fr;
  flex: 1;
  min-height: 0;
}

ds-leftnav { display: block; }
.menu { display: flex; flex-direction: column; gap: var(--ds-space-8); }

.contenido {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--ds-space-16);
  padding: 0 var(--ds-space-16) var(--ds-space-16); /* Figma: 16px a cada lado, pegado al LeftNav */
}

.migas { display: block; padding-top: var(--ds-space-16); margin-inline-start: calc(-1 * var(--ds-space-8)); } /* el primer tramo va a ras del borde; su padding de 8px es solo del hover */
.subtle { color: var(--ds-color-text-subtle); }
.obligatorio { color: var(--ds-color-text-danger); }
p, h1, h2 { margin: 0; }
.titulo-seccion { margin: 0; }

/* Datos de la operación */
.operacion__titulo { display: flex; align-items: center; gap: var(--ds-space-8); }
.operacion__codigo { font-weight: var(--ds-font-weight-bold); font-size: 24px; line-height: 32px; }
.operacion__datos { display: flex; align-items: center; gap: 10px; }
.operacion__datos > div { flex: 1 1 0; min-width: 0; }
.operacion__datos > .operacion__dato--angosto { flex: 0 0 112px; }

/* Registro de la enmienda de monto */
.monedas { display: flex; gap: var(--ds-space-8); }
.acumulado {
  display: flex; gap: var(--ds-space-8); padding: var(--ds-space-8); margin: 0;
  background: var(--ds-ocean-95); color: var(--ds-color-text-default);
}

.tabla-enmienda {
  border: 1px solid var(--ds-color-border-default);
  border-radius: var(--ds-radius-s);
  overflow: hidden;
  background: var(--ds-color-surface);
}
.fila { display: flex; align-items: center; min-height: 50px; padding: var(--ds-space-4) var(--ds-space-12); box-sizing: border-box; }
.fila--simple { padding-block: var(--ds-space-12); }
.fila--moneda { gap: var(--ds-space-12); }

.componentes { width: 100%; border-collapse: collapse; table-layout: fixed; }
.componentes .col-monto { width: 148px; }
.componentes .col-accion { width: 56px; }
.componentes th, .componentes td {
  height: 50px;
  padding: var(--ds-space-4) var(--ds-space-12);
  text-align: start;
  vertical-align: middle;
  font: inherit;
  font-size: var(--ds-body-md-size);
  line-height: var(--ds-body-md-lh);
  color: var(--ds-color-text-default);
  white-space: pre-line;
}
.componentes th { font-weight: var(--ds-font-weight-semibold); }
.componentes tr.grupo > * { background: var(--ds-color-background); }
.componentes .accion { text-align: center; padding-inline: 0; vertical-align: middle; }
.componentes .producto { padding-inline-start: var(--ds-space-40); white-space: normal; }
.componentes .seleccion, .componentes .producto--seleccion { white-space: normal; }
.componentes .seleccion { padding-block: var(--ds-space-8); }
.componentes .anadir { padding-inline-start: var(--ds-space-20); }
.componentes .nuevo tr:first-child > * { border-top: 0; }
.componentes mat-form-field { width: 100%; }

.total-moneda {
  display: flex; justify-content: flex-end; gap: var(--ds-space-24); align-items: center; margin: 0;
  padding: var(--ds-space-12) var(--ds-space-12); background: var(--ds-sky-99);
  border-top: 1px solid var(--ds-color-primary);
}
.total-moneda span:nth-child(2) { margin-inline-end: var(--ds-space-12); }

/* Garantía / Fianza */
.garantia__datos { display: flex; gap: 10px; }
.garantia__datos > div { flex: 1 1 0; min-width: 0; }
.ds-table--lc table { table-layout: fixed; }
.ds-table--lc .mat-mdc-header-cell, .ds-table--lc .mat-mdc-cell { width: 25%; }
.ds-table--lc td .mat-mdc-form-field { width: 100%; }
.anadir--tabla { padding: var(--ds-space-8) var(--ds-space-16); border-top: 1px solid var(--ds-color-border-default); }

/* Justificación */
.justificacion__campo { width: 100%; }
.justificacion__campo textarea { resize: none; min-height: 56px; }

/* Botones de pie */
.acciones { display: flex; align-items: center; justify-content: space-between; padding-block: var(--ds-space-12); }
.acciones__derecha { display: flex; gap: var(--ds-space-16); }
`],
})
class PantallaEnmiendas {
  /** LeftNav expandido (256px) o compacto (92px, solo íconos): las dos variantes que trae el diseño. */
  protected readonly slim = signal(false);

  protected readonly enlaces: DsNavLink[] = [
    { label: 'Activities', url: '#' },
    { label: 'Operation', url: '#' },
    { label: 'Form', url: '#' },
    { label: 'Notification', url: '#' },
  ];

  protected readonly menu = [
    { icon: 'home', label: 'General Procurement Notice', selected: true, trailing: '' },
    { icon: 'folder_managed', label: 'Procurement Management', selected: false, trailing: '' },
    { icon: 'calendar_today', label: 'Payment Schedule', selected: false, trailing: '' },
    { icon: 'payments', label: 'Payment Record', selected: false, trailing: '' },
    { icon: 'finance_chip', label: 'Financial management', selected: false, trailing: 'expand_more' },
    { icon: 'work', label: 'Workflow Management', selected: false, trailing: '' },
  ];

  protected readonly migas: DsBreadcrumbItem[] = [
    { label: 'Procurement Management', url: '#' },
    { label: 'Approved - Plans' },
  ];

  protected readonly datosOperacion = [
    { etiqueta: 'Project', valor: 'PN-L1155', angosta: true },
    { etiqueta: 'Project name', valor: 'Universal Energy Access Program', angosta: false },
    { etiqueta: 'Approved amount', valor: '$ 90,000,000.00', angosta: false },
    { etiqueta: 'Current approved amount', valor: '$ 35,000,000.00', angosta: false },
    { etiqueta: 'Institution', valor: 'Oficina de Electrificacion Rural', angosta: false },
  ];

  protected readonly pasoActual = signal(0);
  // En Figma los cinco pasos llevan el círculo azul (variante Active), no solo el actual.
  protected readonly pasos: DsStep[] = [
    { title: 'Registro\nde enmienda', state: 'active' },
    { title: 'Borrador\nde enmieda', state: 'active' },
    { title: 'Revisión y firma\nde coordinador', state: 'active' },
    { title: 'Solicitud de no objeción', state: 'active' },
    { title: 'Enmienda firmada', state: 'active' },
  ];

  protected readonly monedas = signal<Moneda[]>([
    { codigo: 'USD', seleccionada: true },
    { codigo: 'COP', seleccionada: false },
  ]);
  protected readonly monedasActivas = computed(() => this.monedas().filter((m) => m.seleccionada));

  protected readonly productos = ['Producto del componente 1.1.1', 'Producto del componente 1.1.1'];
  protected readonly opcionesComponente = ['Componente 1.2', 'Componente 1.3'];
  protected readonly opcionesProducto = ['Producto 1.2.1', 'Producto 1.2.2'];
  protected readonly columnasMonto = ['Monto BID', 'Monto aporte local', 'Monto\ncofinanciamiento', 'Total moneda', 'Total equivalente\n(USD)'];

  protected readonly columnasGarantia = ['campo', 'original', 'vigente', 'nuevo'];
  protected readonly garantia: CampoGarantia[] = [
    { id: 1, campo: 'Monto', original: '670,200', vigente: '670,200', tipo: 'numero', nuevo: '0' },
    { id: 2, campo: 'Fecha de emisión', original: 'Text in a cell', vigente: 'Text in a cell', tipo: 'fecha', nuevo: new Date(2023, 7, 17) },
    { id: 3, campo: 'Fecha de finalización', original: 'Text in a cell', vigente: 'Text in a cell', tipo: 'numero', nuevo: '0' },
  ];
  /** Un campo de la garantía solo se puede editar si está marcado. */
  protected readonly marcados = signal<ReadonlySet<number>>(new Set());

  protected alternarMoneda(codigo: Moneda['codigo'], seleccionada: boolean): void {
    this.monedas.update((l) => l.map((m) => (m.codigo === codigo ? { ...m, seleccionada } : m)));
  }

  protected marcar(id: number, marcado: boolean): void {
    this.marcados.update((s) => {
      const n = new Set(s);
      if (marcado) n.add(id); else n.delete(id);
      return n;
    });
  }
}


const meta: Meta = {
  title: 'Plantillas/Enmiendas',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({ template: '<pantalla-enmiendas />', moduleMetadata: { imports: [PantallaEnmiendas] } }),
};
