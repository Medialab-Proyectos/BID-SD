import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/**
 * Botón de favorito (estrella) — Figma `✅Favorite Toggle`, nodo 5547:5437. 32px, estrella de 24px.
 * Es un botón de alternancia: expone `aria-pressed` y `[(selected)]`.
 *
 * `inverse` es la variante para superficies de marca (estrella blanca).
 */
@Component({
  selector: 'ds-favorite-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.ds-fav--inverse]': 'inverse()' },
  template: `
    <button type="button" class="ds-fav" [class.ds-fav--on]="selected()" [attr.aria-pressed]="selected()"
            [attr.aria-label]="label()" (click)="selected.set(!selected())">
      <span class="ds-icon" aria-hidden="true">star</span>
    </button>
  `,
})
export class DsFavoriteToggle {
  readonly selected = model(false);
  /** Nombre accesible. Conviene que diga de qué es favorito: "Marcar proyecto X como favorito". */
  readonly label = input('Favorito');
  readonly inverse = input(false);
}
