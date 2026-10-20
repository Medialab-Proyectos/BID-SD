import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DsStatusIcon, type DsStatus } from '../../atoms/status-icon/status-icon.component';

export interface DsStep {
  title: string;
  subtitle?: string;
  state: 'inactive' | 'active' | 'completed' | 'incomplete' | 'error';
}

const STATE_LABEL: Record<DsStep['state'], string> = {
  inactive: 'pendiente', active: 'actual', completed: 'completo', incomplete: 'incompleto', error: 'con error',
};

/** `DsStep['state']` → estado del átomo Status Icon (que usa "complete", no "completed"). */
const STATE_ICON: Record<DsStep['state'], DsStatus> = {
  inactive: 'inactive', active: 'active', completed: 'complete', incomplete: 'incomplete', error: 'error',
};

/**
 * Stepper del BID. En Figma "Stepper" y "Step" viven en la misma página (nodo `540:11954` y
 * `540:11813`): el primero es una fila/columna del segundo con un conector entre pasos — no son
 * dos componentes separados, y acá tampoco: este componente cubre los dos usos.
 *
 * - `orientation="vertical"` (default): lista de navegación entre secciones de un flujo largo,
 *   proyectada dentro del LeftNav.
 * - `orientation="horizontal"`: barra de progreso arriba de un flujo (el "Stepper" de Figma).
 *
 * Dos modos de contenido, el eje `Content: Icon | Number` de `.Step-enable` (nodo `12097:29288`):
 *
 * - `content="icon"` (**por defecto, es el que más se usa**): cada paso comunica su estado con su
 *   propio ícono — anillo gris (pendiente), anillo azul (actual), check azul (completo), "!" naranja
 *   (incompleto), triángulo rojo (error). Se usa cuando los pasos no se recorren en orden.
 * - `content="number"`: stepper numerado. La bolita lleva el número y solo cambia de color
 *   (gris pendiente / azul actual y completo). Incompleto y error siguen mostrando su ícono, porque
 *   el número no alcanza para comunicarlos — así lo hace `Step` en Figma.
 *
 * Para un asistente con **contenido por paso** (paneles que cambian, botones Anterior/Siguiente)
 * usar `mat-stepper`: ese comportamiento no tiene spec propia en Figma. Sus íconos de paso están
 * alineados visualmente a este mismo componente (ver Organismos/Stepper, sección "con contenido").
 */
@Component({
  selector: 'ds-step-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsStatusIcon],
  template: `
    <ol class="ds-stepper" [class.ds-stepper--h]="orientation() === 'horizontal'"
        [attr.aria-label]="ariaLabel()" style="list-style:none; margin:0; padding:0">
      @for (s of steps(); track $index; let i = $index, last = $last) {
        <li [style.display]="orientation() === 'horizontal' ? 'contents' : 'block'">
          <button type="button" class="ds-step" [class]="'ds-step--' + s.state" [class.ds-step--selected]="i === selected()"
                  [attr.aria-current]="i === selected() ? 'step' : null" (click)="stepClick.emit(i)">
            @if (content() === 'icon' || s.state === 'incomplete' || s.state === 'error') {
              <ds-status-icon [status]="stateIcon[s.state]" size="sm" />
            } @else {
              <span class="ds-step__dot" aria-hidden="true">{{ i + 1 }}</span>
            }
            <span class="ds-step__content">
              <span class="ds-step__title">@if (numbered()) { {{ i + 1 }}. }{{ s.title }}</span>
              @if (s.subtitle) { <span class="ds-step__subtitle">{{ s.subtitle }}</span> }
              <span class="cdk-visually-hidden">Paso {{ i + 1 }}, {{ stateLabel[s.state] }}</span>
            </span>
          </button>
          @if (!last) {
            <div [class]="orientation() === 'horizontal' ? 'ds-stepper__connector--h' : 'ds-stepper__connector'" aria-hidden="true"></div>
          }
        </li>
      }
    </ol>
  `,
})
export class DsStepList {
  readonly steps = input.required<DsStep[]>();
  readonly selected = input(0);
  readonly ariaLabel = input('Pasos');
  /** `icon` = cada paso muestra su estado (lo más usado) · `number` = stepper numerado. */
  readonly content = input<'icon' | 'number'>('icon');
  /** `vertical` (default, LeftNav) · `horizontal` (barra de progreso de un flujo). */
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  /** Antepone el número de paso al título ("1. Información general"), como en el LeftNav Stepper de Figma. */
  readonly numbered = input(false);
  readonly stepClick = output<number>();
  protected readonly stateLabel = STATE_LABEL;
  protected readonly stateIcon = STATE_ICON;
}
