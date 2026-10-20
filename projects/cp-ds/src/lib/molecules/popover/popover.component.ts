import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Contenido de un popover (Figma `Popover`, nodo 7113:8473, "Rich tooltip"): tarjeta de 312px con título,
 * contenido libre y acciones opcionales.
 *
 * Este componente solo dibuja la tarjeta. Para abrirla y posicionarla junto a un elemento, ponerla dentro de un
 * `<mat-menu>` (Material resuelve overlay, foco, Escape y clic afuera) — ver la story.
 *
 * Acciones: `<button dsPopoverActions matButton>…</button>`.
 */
@Component({
  selector: 'ds-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-popover' },
  template: `
    @if (title()) { <p class="ds-popover__title">{{ title() }}</p> }
    <div class="ds-popover__body"><ng-content /></div>
    <div class="ds-popover__actions"><ng-content select="[dsPopoverActions]" /></div>
  `,
})
export class DsPopover {
  readonly title = input('');
}
