import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsIconContainer } from '../../atoms/icon-container/icon-container.component';

const meta: Meta = {
  title: 'Moléculas/Accordion',
  decorators: [moduleMetadata({ imports: [MatExpansionModule, MatButtonModule, MatIconModule, DsIconContainer] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-expansion-panel>\` (Figma \`Accordeon/ header\`, nodo \`12323:7196\`). Está pensado para **secciones de página de ancho completo**
(en Figma mide 1472px): por eso el título es de nivel *Headline Small Bold* 24/32. En contenedores angostos conviene usarlo solo con el
título (sin ícono ni descripción) o preferir una Card.

| Estado | Cabecera |
|---|---|
| Default | Fondo blanco, borde 1px Border/Subtle, radio 8px; contenedor de ícono celeste (#e3eaef, ícono #003146) |
| Hover | Fondo #eaeaea; el contenedor de ícono se invierte (#003146 con ícono blanco) |
| Foco (teclado) | Fondo #eaeaea y borde de 1px azul (#007eb6) |
| Abierto | Cabecera celeste (Interaction/selected) con radio solo arriba; cuerpo blanco debajo, padding 24 |
| Deshabilitado | Texto en gris; no se abre |

**Estructura de la cabecera** (padding 24): contenedor de ícono de 40px (opcional) · columna de texto con **título** \`.ds-accordion__title\` (24/32 Bold) y
**descripción** \`.ds-accordion__desc\` (14/20), 8px entre ellos · acciones opcionales \`.ds-accordion__actions\` · chevron de 32px a la derecha.
El título **debe** estar dentro de un encabezado accesible según la jerarquía de la página.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <mat-accordion style="display:block; max-width:1040px">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title style="gap:8px; align-items:center">
              <ds-icon-container icon="info" size="md" />
              <span class="ds-accordion__text">
                <span class="ds-accordion__title">Title Accordion</span>
                <span class="ds-accordion__desc">Accordion description</span>
              </span>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <p class="ds-text ds-text--body-md" style="margin:0">Contenido del acordeón.</p>
        </mat-expansion-panel>
        <mat-expansion-panel [expanded]="true" style="margin-top:16px">
          <mat-expansion-panel-header>
            <mat-panel-title style="gap:8px; align-items:center">
              <ds-icon-container icon="info" size="md" />
              <span class="ds-accordion__text">
                <span class="ds-accordion__title">Title Accordion</span>
                <span class="ds-accordion__desc">Accordion description</span>
              </span>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <p class="ds-text ds-text--body-md" style="margin:0">Cuerpo visible: fondo blanco y padding de 24px.</p>
        </mat-expansion-panel>
      </mat-accordion>`,
  }),
};

export const SoloTitulo: Story = {
  name: 'Solo título (sin ícono ni descripción)',
  render: () => ({
    template: `
      <mat-accordion style="display:block; max-width:640px">
        <mat-expansion-panel>
          <mat-expansion-panel-header><mat-panel-title><span class="ds-accordion__title">Preguntas frecuentes</span></mat-panel-title></mat-expansion-panel-header>
          <p class="ds-text ds-text--body-md" style="margin:0">Respuesta.</p>
        </mat-expansion-panel>
        <mat-expansion-panel style="margin-top:16px">
          <mat-expansion-panel-header><mat-panel-title><span class="ds-accordion__title">Documentación requerida</span></mat-panel-title></mat-expansion-panel-header>
          <p class="ds-text ds-text--body-md" style="margin:0">Detalle.</p>
        </mat-expansion-panel>
      </mat-accordion>`,
  }),
};

export const ConAcciones: Story = {
  name: 'Con acciones en la cabecera',
  render: () => ({
    template: `
      <mat-accordion style="display:block; max-width:1040px">
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title style="gap:8px; align-items:center; flex:1">
              <ds-icon-container icon="folder" size="md" />
              <span class="ds-accordion__text">
                <span class="ds-accordion__title">Operación 3881/OC-PE</span>
                <span class="ds-accordion__desc">Última actualización: 22 Dic 2023</span>
              </span>
              <span class="ds-accordion__actions" (click)="$event.stopPropagation()" (keydown)="$event.stopPropagation()">
                <button matButton="outlined">Editar</button>
              </span>
            </mat-panel-title>
          </mat-expansion-panel-header>
          <p class="ds-text ds-text--body-md" style="margin:0">Contenido.</p>
        </mat-expansion-panel>
      </mat-accordion>`,
  }),
};

export const Deshabilitado: Story = {
  render: () => ({
    template: `
      <mat-accordion style="display:block; max-width:640px">
        <mat-expansion-panel [disabled]="true">
          <mat-expansion-panel-header>
            <mat-panel-title style="gap:8px; align-items:center">
              <ds-icon-container icon="lock" size="md" color="disabled" />
              <span class="ds-accordion__text">
                <span class="ds-accordion__title">Sección bloqueada</span>
                <span class="ds-accordion__desc">Completá el paso anterior para habilitarla.</span>
              </span>
            </mat-panel-title>
          </mat-expansion-panel-header>
        </mat-expansion-panel>
      </mat-accordion>`,
  }),
};

export const VariosAbiertos: Story = {
  name: 'Varios abiertos a la vez',
  render: () => ({
    template: `
      <mat-accordion [multi]="true" style="display:block; max-width:760px">
        @for (t of ['Información general', 'Presupuesto', 'Anexos']; track t) {
          <mat-expansion-panel [expanded]="t !== 'Anexos'" style="margin-top:16px">
            <mat-expansion-panel-header><mat-panel-title><span class="ds-accordion__title">{{ t }}</span></mat-panel-title></mat-expansion-panel-header>
            <p class="ds-text ds-text--body-md" style="margin:0">Contenido de {{ t }}.</p>
          </mat-expansion-panel>
        }
      </mat-accordion>`,
  }),
};
