import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Ítem de navegación del LeftNav. Se aplica sobre un `<a>` (navega) o un `<button>` (acción):
 *   <a ds-link-item icon="home" href="/inicio" [selected]="true">Inicio</a>
 * `slim` = solo ícono (48×36), para el LeftNav colapsado: en ese caso `label` es obligatorio,
 * porque es el único texto accesible.
 * Seleccionado: fondo #d9f4ff y texto #0072a4 bold, con aria-current="page".
 */
@Component({
  selector: 'a[ds-link-item], button[ds-link-item]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ds-link-item]': '!slim()',
    '[class.ds-link-item-slim]': 'slim()',
    '[class.is-selected]': 'selected()',
    '[attr.aria-current]': "selected() ? 'page' : null",
    '[attr.aria-label]': 'slim() ? label() : null',
    '[attr.title]': 'slim() ? label() : null',
  },
  template: `
    @if (icon()) { <span class="ds-icon" aria-hidden="true">{{ icon() }}</span> }
    @if (!slim()) {
      <span class="ds-link-item__text">
        <ng-content />
        @if (secondary()) { <span class="ds-link-item__secondary">{{ secondary() }}</span> }
      </span>
      @if (trailingIcon()) { <span class="ds-icon" aria-hidden="true">{{ trailingIcon() }}</span> }
    }
  `,
})
export class DsLinkItem {
  readonly icon = input('');
  readonly selected = input(false);
  readonly secondary = input('');
  /** Ícono al final de la fila (Figma `.right-action`), p. ej. `expand_more` en un ítem que despliega un submenú. */
  readonly trailingIcon = input('');
  readonly slim = input(false);
  /** Texto accesible en modo slim (solo ícono). */
  readonly label = input('');
}
