import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from '../atoms/avatar/avatar.component';
import { DsIconContainer } from '../atoms/icon-container/icon-container.component';
import { DsStatusIcon } from '../atoms/status-icon/status-icon.component';
import { DsBanner } from '../molecules/banner/banner.component';
import { DsLeftnav } from '../organisms/leftnav/leftnav.component';
import { DsStepList, type DsStep } from '../organisms/step-list/step-list.component';
import { DsTopnav } from '../organisms/topnav/topnav.component';

interface Riesgo {
  id: number;
  descripcion: string;
  nivel: 'Alto' | 'Medio alto';
  taxonomia: string;
}

/** Misma pantalla que la app de ejemplo (projects/matriz-riesgos-app), para verla dentro de Storybook. */
@Component({
  selector: 'pantalla-matriz-riesgos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatBadgeModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatTableModule, MatTabsModule,
    DsAvatar, DsBanner, DsIconContainer, DsLeftnav, DsStatusIcon, DsStepList, DsTopnav,
  ],
  template: `<div class="pagina">
  <ds-topnav productName="Portal de Clientes" logoLang="eng" [links]="enlaces" workspace="Procesos Financieros">
    <ng-container dsTopnavActions>
      <button matIconButton aria-label="Notificaciones, 1 nueva"><mat-icon matBadge="1">notifications</mat-icon></button>
      <button matIconButton aria-label="Soporte"><mat-icon>headset_mic</mat-icon></button>
      <ds-avatar name="Federico Ruiz" initials="FR" />
    </ng-container>
  </ds-topnav>

  <div class="volver">
    <button matButton="outlined"><mat-icon>arrow_back</mat-icon>Volver a tareas</button>
  </div>

  <!-- Franja con los datos de la operación. No hay componente de esta variante de TopNav (Type=Simple, Blue):
       se arma con la superficie blanca y la tipografía del sistema. -->
  <section class="operacion" aria-label="Datos de la operación">
    <div class="operacion__titulo">
      <ds-icon-container icon="source_environment" size="md" />
      <div>
        <p class="ds-text ds-text--body-sm">Operación 3881/OC-PE</p>
        <p class="ds-text ds-text--body-lg">Periodo julio a diciembre del 2026</p>
      </div>
    </div>
    <div class="operacion__meta">
      <p class="ds-text ds-text--body-lg">Última modificación del informe: 22 Dic 2023, 04:00 PM UTC</p>
      <p class="ds-text ds-text--body-lg">Responsable: Javier Gómez - Jefe de equipo UE</p>
    </div>
  </section>

  <div class="cuerpo">
    <ds-leftnav productName="Contenido" [collapsible]="false">
      <div class="pasos">
        <ds-step-list [steps]="pasos" [selected]="pasoActual()" content="icon" [numbered]="true" ariaLabel="Pasos del informe"
                      (stepClick)="pasoActual.set($event)" />
      </div>
    </ds-leftnav>

    <main class="contenido">
      <h1 class="ds-text ds-text--title-md-bold proyecto">Innovación en infraestructura escolar</h1>

      <div class="seccion">
        <h2 class="ds-text ds-text--title-md-bold">3. Matriz de riesgos</h2>
        <p class="ds-text ds-text--body-lg texto">
          A continuación se debe revisar los riesgos activos de la operación. Es obligatorio visualizar todos los riesgos activos,
          sus detalles y acciones de respuesta. Es posible editar los riesgos existentes y actualizar sus detalles y acciones de
          respuesta, según corresponda.
        </p>
        <p class="ds-text ds-text--body-lg texto">
          En la subsección/pestaña nuevos riesgos identificados, se puede informar nuevos riesgos identificados para revisión por
          parte del BID.
        </p>

        <ds-banner color="info" [multiline]="true">
          <strong>Recordatorio:</strong>
          <ul class="recordatorio">
            <li>Debe haber al menos un riesgo activo para cada operación. Si su operación no tiene un riesgo activo, es mandatorio identificar un nuevo riesgo en la subsección nuevos riesgos identificados.</li>
            <li>Nuevos riesgos identificados deben seguir la siguiente estructura: si existe una CAUSA, puede ocurrir un EVENTO que cause un IMPACTO.</li>
            <li>Riesgos editados y/o identificados están sujetos al análisis y validación por parte del BID.</li>
            <li>Los riesgos se presentan ordenados por nivel de riesgo, mostrando primero los de mayor nivel.</li>
          </ul>
        </ds-banner>

        <mat-card appearance="outlined">
          <mat-tab-group animationDuration="0ms">
            <mat-tab>
              <ng-template mat-tab-label><ds-status-icon status="incomplete" size="sm" />&nbsp;Riesgos activos <span class="obligatorio" aria-label="obligatorio">*</span></ng-template>

              <div class="ds-table-container ds-table--lc tabla">
                <table mat-table [dataSource]="riesgos" aria-label="Riesgos activos">
                  <ng-container matColumnDef="seleccion">
                    <th mat-header-cell *matHeaderCellDef style="width:73px"><span class="cdk-visually-hidden">Estado</span></th>
                    <td mat-cell *matCellDef="let r"><ds-status-icon status="active" size="sm" /></td>
                  </ng-container>
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef style="width:55px">ID</th>
                    <td mat-cell *matCellDef="let r">{{ r.id }}</td>
                  </ng-container>
                  <ng-container matColumnDef="descripcion">
                    <th mat-header-cell *matHeaderCellDef>Description</th>
                    <td mat-cell *matCellDef="let r" class="descripcion">{{ r.descripcion }}</td>
                  </ng-container>
                  <ng-container matColumnDef="nivel">
                    <th mat-header-cell *matHeaderCellDef style="width:128px">Nivel del riesgo</th>
                    <td mat-cell *matCellDef="let r">
                      <mat-chip class="ds-chip ds-chip--sm" [class.ds-chip--red]="r.nivel === 'Alto'" [class.ds-chip--yellow]="r.nivel !== 'Alto'">{{ r.nivel }}</mat-chip>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="taxonomia">
                    <th mat-header-cell *matHeaderCellDef style="width:247px">Taxonomía</th>
                    <td mat-cell *matCellDef="let r">{{ r.taxonomia }}</td>
                  </ng-container>
                  <ng-container matColumnDef="accion">
                    <th mat-header-cell *matHeaderCellDef style="width:68px">Action</th>
                    <td mat-cell *matCellDef="let r">
                      <button matIconButton [attr.aria-label]="'Ver el riesgo ' + r.id"><mat-icon>visibility</mat-icon></button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="columnas"></tr>
                  <tr mat-row *matRowDef="let row; columns: columnas"></tr>
                </table>
              </div>
            </mat-tab>
            <mat-tab label="Nuevos riesgos identificados"></mat-tab>
          </mat-tab-group>
        </mat-card>

        <p class="ds-text ds-text--body-md pie-tabla">Sub-secciones y campos obligatorios<span class="obligatorio" aria-hidden="true">*</span></p>
      </div>

      <footer class="ds-drawer__footer navegacion">
        <button matButton="outlined"><mat-icon>arrow_back</mat-icon>Anterior</button>
        <button matButton="outlined">Siguiente<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
      </footer>
    </main>
  </div>

</div>
`,
  styles: [`
.pagina { display: grid; grid-template-rows: auto auto auto 1fr; min-height: 100vh; background: var(--ds-color-background); }
.volver { padding: var(--ds-space-16); }
.operacion { display: flex; align-items: center; justify-content: space-between; gap: var(--ds-space-24); box-sizing: border-box; height: 72px;
  margin: 0 var(--ds-space-16) var(--ds-space-16); padding: var(--ds-space-16); background: var(--ds-color-surface); color: var(--ds-color-text-default); }
.operacion p { margin: 0; color: inherit; }
.operacion__titulo { display: flex; align-items: center; gap: var(--ds-space-16); }
.operacion__meta { text-align: end; padding: 10px var(--ds-space-16); }
.cuerpo { display: grid; grid-template-columns: 256px 1fr; gap: 0; padding: 0 var(--ds-space-16) var(--ds-space-16); min-height: 0; }
.pasos { padding: var(--ds-space-24) var(--ds-space-12); }
.contenido { min-width: 0; display: flex; flex-direction: column; }
.proyecto { margin: 0; box-sizing: border-box; height: 72px; display: flex; align-items: center; padding: var(--ds-space-16); background: var(--ds-color-surface); border-bottom: 1px solid var(--ds-neutral-99); }
.seccion { display: flex; flex-direction: column; gap: var(--ds-space-16); padding: var(--ds-space-24) var(--ds-space-24) var(--ds-space-16) var(--ds-space-40); }
.seccion h2 { margin: 0; }
.seccion .texto { margin: 0; color: var(--ds-color-text-subtle); }
.recordatorio { margin: var(--ds-space-4) 0 0; padding-inline-start: var(--ds-space-24); font-size: var(--ds-body-md-size); line-height: var(--ds-body-md-lh); }
.tabla { margin-top: var(--ds-space-16); }
.descripcion { padding-block: var(--ds-space-12); }
.obligatorio { color: var(--ds-color-text-danger); }
.pie-tabla { margin: 0; color: var(--ds-color-text-default); }
.navegacion { justify-content: space-between; margin-top: auto; background: var(--ds-color-surface); }
`],
})
class PantallaMatrizRiesgos {
  protected readonly enlaces = [
    { label: 'Proyectos', url: '#' },
    { label: 'Tareas', url: '#' },
    { label: 'Contactos', url: '#' },
    { label: 'Ayuda', url: '#' },
  ];

  protected readonly pasos: DsStep[] = [
    { title: 'Información general', subtitle: 'Revisa y agrega notas en las secciones de la ficha de operación.', state: 'completed' },
    { title: 'Asignación presupuestaria', subtitle: 'Informa y/o actualiza el presupuesto aprobado por el país para el año en curso.', state: 'completed' },
    { title: 'Matriz de resultados', subtitle: 'Actualiza y/o agrega notas sobre el avance de los componentes para el informe.', state: 'completed' },
    { title: 'Matriz de riesgos', subtitle: 'Comenta, actualiza o edita los riesgos del informe.', state: 'active' },
    { title: 'Lecciones aprendidas', subtitle: 'Deja los aprendizajes obtenidos durante la ejecución.', state: 'inactive' },
    { title: 'Enlaces de anexos', subtitle: 'Deja archivos anexos almacenados en la nube de tu preferencia.', state: 'inactive' },
    { title: 'Descarga y envío del Informe', subtitle: 'Descarga un respaldo en formato PDF y envía el informe para su aprobación.', state: 'inactive' },
  ];
  protected readonly pasoActual = signal(3);

  protected readonly columnas = ['seleccion', 'id', 'descripcion', 'nivel', 'taxonomia', 'accion'];
  protected readonly riesgos: Riesgo[] = [
    { id: 1, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro de los beneficiarios del programa, afectando el cumplimiento de la meta prevista para IVD 1.1, impactando en un desvío del 10% en el desembolso previsto para el año 3', nivel: 'Alto', taxonomia: 'Entorno Institucional' },
    { id: 2, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro.', nivel: 'Alto', taxonomia: 'Entorno Económico-Financiero' },
    { id: 3, descripcion: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
    { id: 4, descripcion: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Gestión y gobernanza públicas.' },
    { id: 5, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro', nivel: 'Medio alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
  ];
}


const meta: Meta = {
  title: 'Plantillas/Matriz de riesgos',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({ template: '<pantalla-matriz-riesgos />', moduleMetadata: { imports: [PantallaMatrizRiesgos] } }),
};
