import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DsIconContainer } from '../../atoms/icon-container/icon-container.component';

export type DsMiniCardFooter = 'none' | 'brand' | 'secondary' | 'primary' | 'success' | 'warning' | 'gray';

/**
 * Tarjeta compacta (Figma `✅MiniCard`, nodo 6037:6934): 486px, sombra Shadow-xs.
 * - Encabezado: título (Title Medium SemiBold), subtítulo opcional, ícono suelto o dentro de un `ds-icon-container`,
 *   y acciones a la derecha (`[dsMiniCardActions]`).
 * - Cuerpo: contenido proyectado (texto, tabla de datos con `.ds-mini-card__row`, etc.).
 * - Pie opcional (`footer`): franja de color con metadatos (`[dsMiniCardFooter]`).
 */
@Component({
  selector: 'ds-mini-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsIconContainer],
  host: { class: 'ds-mini-card' },
  template: `
    <section class="ds-mini-card__card" [class.ds-mini-card__card--joined]="footer() !== 'none'">
      <header class="ds-mini-card__header">
        @if (icon()) {
          @if (iconContainer()) { <ds-icon-container [icon]="icon()" size="sm" /> }
          @else { <span class="ds-icon" aria-hidden="true">{{ icon() }}</span> }
        }
        <div class="ds-mini-card__titles">
          <h3 class="ds-mini-card__title">{{ title() }}</h3>
          @if (subtitle()) { <p class="ds-mini-card__subtitle">{{ subtitle() }}</p> }
        </div>
        <div class="ds-mini-card__actions"><ng-content select="[dsMiniCardActions]" /></div>
      </header>
      <div class="ds-mini-card__body"><ng-content /></div>
    </section>
    @if (footer() !== 'none') {
      <footer class="ds-mini-card__footer ds-mini-card__footer--{{ footer() }}"><ng-content select="[dsMiniCardFooter]" /></footer>
    }
  `,
})
export class DsMiniCard {
  readonly title = input.required<string>();
  readonly subtitle = input('');
  /** Nombre de un ícono de Material Symbols. */
  readonly icon = input('');
  /** `true` = el ícono va dentro de un `ds-icon-container` de 32px. */
  readonly iconContainer = input(false);
  readonly footer = input<DsMiniCardFooter>('none');
}
