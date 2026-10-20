import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from '../atoms/avatar/avatar.component';
import { DsIconContainer } from '../atoms/icon-container/icon-container.component';
import { DsStatusIcon } from '../atoms/status-icon/status-icon.component';
import { DsStepList, type DsStep } from '../organisms/step-list/step-list.component';
import { DsLeftnav } from '../organisms/leftnav/leftnav.component';
import { DsTopnav } from '../organisms/topnav/topnav.component';

const PASOS: DsStep[] = [
  { title: 'Información general', subtitle: 'Revisa y agrega notas en las secciones de la ficha de operación.', state: 'completed' },
  { title: 'Asignación presupuestaria', subtitle: 'Informa y/o actualiza el presupuesto aprobado por el país para el año en curso.', state: 'completed' },
  { title: 'Matriz de resultados', subtitle: 'Actualiza y/o agrega notas sobre el avance de los componentes para el informe.', state: 'completed' },
  { title: 'Matriz de riesgos', subtitle: 'Comenta, actualiza o edita los riesgos del informe.', state: 'active' },
  { title: 'Lecciones aprendidas', subtitle: 'Deja los aprendizajes obtenidos durante la ejecución.', state: 'inactive' },
  { title: 'Enlaces de anexos', subtitle: 'Deja archivos anexos almacenados en la nube de tu preferencia.', state: 'inactive' },
  { title: 'Descarga y envío del Informe', subtitle: 'Descarga un respaldo en formato PDF y envía el informe para su aprobación.', state: 'inactive' },
];

const RIESGOS = [
  { id: 1, desc: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro de los beneficiarios del programa, afectando el cumplimiento de la meta prevista para IVD 1.1, impactando en un desvío del 10% en el desembolso previsto para el año 3', nivel: 'Alto', taxonomia: 'Entorno Institucional' },
  { id: 2, desc: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro.', nivel: 'Alto', taxonomia: 'Entorno Económico-Financiero' },
  { id: 3, desc: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
  { id: 4, desc: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Gestión y gobernanza públicas.' },
  { id: 5, desc: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro', nivel: 'Medio alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
];

const meta: Meta = {
  title: 'Plantillas/Matriz de riesgos',
  decorators: [
    moduleMetadata({
      imports: [
        MatButtonModule, MatChipsModule, MatIconModule, MatBadgeModule, MatTabsModule,
        DsTopnav, DsLeftnav, DsStepList, DsAvatar, DsIconContainer, DsStatusIcon,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    props: { pasos: PASOS, riesgos: RIESGOS },
    template: `
      <div style="display:grid; grid-template-rows:auto auto auto 1fr; height:100vh; min-height:900px; background:var(--ds-color-background)">
        <ds-topnav productName="Portal de Clientes" logoLang="eng" workspace="Procesos Financieros"
                    [links]="[{ label: 'Proyectos', url: '#' }, { label: 'Tareas', url: '#' }, { label: 'Contactos', url: '#' }, { label: 'Ayuda', url: '#' }]">
          <ng-container dsTopnavActions>
            <button matIconButton matBadge="1" matBadgeColor="warn" matBadgeSize="small" aria-label="Notificaciones">
              <mat-icon>notifications</mat-icon>
            </button>
            <ds-avatar name="Federico Ruiz" initials="FR" />
          </ng-container>
        </ds-topnav>

        <div style="padding:12px 32px; border-bottom:1px solid var(--ds-color-border-subtle)">
          <button matButton="outlined"><mat-icon>arrow_back</mat-icon>Volver a tareas</button>
        </div>

        <!-- Franja con los datos de la operación: no hay componente "Page Header" propio, se arma con
             ds-icon-container-like token de superficie + tipografía (mismo criterio que TopNav Blue). -->
        <div class="ds-inverse" style="box-sizing:border-box; height:72px; background:var(--ds-color-secondary); display:flex; align-items:center; justify-content:space-between; padding:16px; margin:0 16px 16px; gap:24px">
          <div style="display:flex; align-items:center; gap:16px">
            <ds-icon-container icon="source_environment" size="md" />
            <div>
              <p class="ds-text ds-text--body-sm" style="margin:0; color:inherit">Operación 3881/OC-PE</p>
              <p class="ds-text ds-text--body-lg" style="margin:0; color:inherit">Periodo julio a diciembre del 2026</p>
            </div>
          </div>
          <div style="text-align:right; padding:10px 16px">
            <p class="ds-text ds-text--body-lg" style="margin:0; color:inherit">Última modificación del informe: 22 Dic 2023, 04:00 PM UTC</p>
            <p class="ds-text ds-text--body-lg" style="margin:0; color:inherit">Responsable: Javier Gómez - Jefe de equipo UE</p>
          </div>
        </div>

        <div style="display:flex; min-height:0">
          <ds-leftnav productName="Contenido">
            <div style="padding:16px 12px">
              <ds-step-list [steps]="pasos" [selected]="3" content="icon" [numbered]="true" ariaLabel="Pasos de la enmienda" />
            </div>
          </ds-leftnav>

          <main style="flex:1; overflow:auto; display:flex; flex-direction:column">
            <h1 class="ds-text ds-text--title-md-bold" style="margin:0; box-sizing:border-box; height:72px; flex-shrink:0; display:flex; align-items:center; padding:16px; background:var(--ds-color-surface); border-bottom:1px solid var(--ds-neutral-99)">Innovación en infraestructura escolar</h1>
            <div style="display:flex; flex-direction:column; gap:16px; padding:24px 24px 16px 40px; flex:1">
            <h2 class="ds-text ds-text--title-md-bold" style="margin:0">3. Matriz de riesgos</h2>
            <p class="ds-text ds-text--body-md" style="margin:0">
              A continuación se debe revisar los riesgos activos de la operación. Es obligatorio
              visualizar todos los riesgos activos, sus detalles y acciones de respuesta. Es posible
              editar los riesgos existentes y actualizar sus detalles y acciones de respuesta.
            </p>
            <p class="ds-text ds-text--body-md" style="margin:0">
              En la subsección/pestaña nuevos riesgos identificados, se puede informar nuevos riesgos
              identificados para revisión por parte del BID.
            </p>

            <!-- "Recordatorio": aproximado con fundamentos — Banner no está construido (Huecos F1). -->
            <div style="display:flex; gap:12px; background:var(--ds-sky-99); border-left:4px solid var(--ds-color-primary); border-radius:var(--ds-radius-xs); padding:16px">
              <mat-icon style="color:var(--ds-color-primary)" aria-hidden="true">info</mat-icon>
              <div>
                <p class="ds-text ds-text--body-md" style="margin:0 0 4px; font-weight:var(--ds-font-weight-bold)">Recordatorio:</p>
                <ul class="ds-text ds-text--body-sm" style="margin:0; padding-left:20px">
                  <li>Debe haber al menos un riesgo activo para cada operación. Si su operación no tiene un riesgo activo, es mandatorio identificar un nuevo riesgo en la subsección nuevos riesgos identificados.</li>
                  <li>Nuevos riesgos identificados deben seguir la siguiente estructura: si existe una CAUSA, puede ocurrir un EVENTO que cause un IMPACTO.</li>
                  <li>Riesgos editados y/o identificados están sujetos al análisis y validación por parte del BID.</li>
                  <li>Los riesgos se presentan ordenados por nivel de riesgo, mostrando primero los de mayor nivel.</li>
                </ul>
              </div>
            </div>

            <mat-tab-group animationDuration="0ms">
              <mat-tab>
                <ng-template mat-tab-label><ds-status-icon status="incomplete" size="sm" />&nbsp;Riesgos activos *</ng-template>

                <!-- Tabla de riesgos: aproximada con fundamentos — Table y Chip no están construidos
                     (Huecos F1). Estructura semántica <table> real, estilada solo con tokens. -->
                <table style="width:100%; border-collapse:collapse; margin-top:16px">
                  <thead>
                    <tr style="border-bottom:1px solid var(--ds-color-border-default)">
                      <th class="ds-text ds-text--label-md" style="text-align:left; padding:12px 8px; width:48px">ID</th>
                      <th class="ds-text ds-text--label-md" style="text-align:left; padding:12px 8px">Description</th>
                      <th class="ds-text ds-text--label-md" style="text-align:left; padding:12px 8px; width:120px">Nivel del riesgo</th>
                      <th class="ds-text ds-text--label-md" style="text-align:left; padding:12px 8px; width:220px">Taxonomía</th>
                      <th class="ds-text ds-text--label-md" style="text-align:left; padding:12px 8px; width:72px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (r of riesgos; track r.id) {
                      <tr style="border-bottom:1px solid var(--ds-color-border-subtle)">
                        <td style="padding:12px 8px; vertical-align:top">
                          <ds-status-icon status="active" size="sm" />
                        </td>
                        <td class="ds-text ds-text--body-sm" style="padding:12px 8px; vertical-align:top">{{ r.desc }}</td>
                        <td style="padding:12px 8px; vertical-align:top">
                          <mat-chip class="ds-chip ds-chip--sm" [class.ds-chip--red]="r.nivel === 'Alto'" [class.ds-chip--yellow]="r.nivel !== 'Alto'">{{ r.nivel }}</mat-chip>
                        </td>
                        <td class="ds-text ds-text--body-sm" style="padding:12px 8px; vertical-align:top">{{ r.taxonomia }}</td>
                        <td style="padding:12px 8px; vertical-align:top">
                          <button matIconButton [attr.aria-label]="'Ver riesgo ' + r.id"><mat-icon>visibility</mat-icon></button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </mat-tab>
              <mat-tab label="Nuevos riesgos identificados"></mat-tab>
            </mat-tab-group>

            <p class="ds-text ds-text--body-sm" style="margin:0; color:var(--ds-color-text-subtle)">Sub-secciones y campos obligatorios*</p>

            <div style="display:flex; justify-content:space-between; margin-top:auto; padding-top:16px">
              <button matButton="outlined"><mat-icon>arrow_back</mat-icon>Anterior</button>
              <button matButton="filled">Siguiente<mat-icon iconPositionEnd>arrow_forward</mat-icon></button>
            </div>
            </div>
          </main>
        </div>
      </div>`,
  }),
};
