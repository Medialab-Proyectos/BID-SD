import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { DsNavLink } from '../topnav/topnav.component';

/** Pie de página del BID: links + logo. `inverse` = estilo Blue (fondo de marca). */
@Component({
  selector: 'ds-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="ds-footer" [class.ds-footer--inverse]="inverse()" [class.ds-inverse]="inverse()">
      <nav class="ds-footer__links" [attr.aria-label]="navLabel()">
        @for (l of links(); track l.url) { <a [href]="l.url">{{ l.label }}</a> }
      </nav>
      <img class="ds-footer__logo" [src]="logo()" [alt]="brand()" />
    </footer>
  `,
})
export class DsFooter {
  readonly links = input<DsNavLink[]>([]);
  readonly inverse = input(false);
  readonly brand = input('Banco Interamericano de Desarrollo');
  readonly navLabel = input('Pie de página');
  readonly assetsPath = input('assets/logos');

  protected readonly logo = computed(
    () => `${this.assetsPath()}/${this.inverse() ? 'idb-logo-white.svg' : 'idb-logo-color-spa.svg'}`,
  );
}
