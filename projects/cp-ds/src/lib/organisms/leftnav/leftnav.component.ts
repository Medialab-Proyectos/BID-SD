import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DsAvatar } from '../../atoms/avatar/avatar.component';

export interface DsLeftnavUser {
  name: string;
  initials?: string;
  /** Texto chico arriba del nombre (Figma: "Welcome back"). */
  eyebrow?: string;
}

/**
 * Sidebar de navegación del BID. Default 256px / Slim 92px (solo íconos).
 * Contenido: proyectar `<a ds-link-item>` (o `<ds-step-list>` para la variante Stepper).
 * Subtítulo de grupo: `<span class="ds-leftnav__subheader">`.
 * El botón del header emite `toggle` para colapsar/expandir; la app decide el estado `slim`.
 */
@Component({
  selector: 'ds-leftnav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DsAvatar],
  template: `
    <aside class="ds-leftnav" [class.ds-leftnav--slim]="slim()" style="height:100%">
      <div class="ds-leftnav__header">
        <button type="button" class="ds-iconbtn ds-iconbtn--sm" (click)="toggle.emit()"
                [attr.aria-label]="slim() ? 'Expandir menú' : 'Colapsar menú'" [attr.aria-expanded]="!slim()">
          <span class="ds-icon" aria-hidden="true">{{ slim() ? 'arrow_forward' : 'arrow_back' }}</span>
        </button>
        @if (!slim()) { <span>{{ productName() }}</span> }
      </div>

      <nav class="ds-leftnav__content" [attr.aria-label]="navLabel()">
        <ng-content />
        @if (language() || version()) {
          <div class="ds-leftnav__lang">
            <ng-content select="[dsLeftnavLanguage]" />
            @if (version() && !slim()) { <span class="ds-leftnav__version">{{ version() }}</span> }
          </div>
        }
      </nav>

      @if (user(); as u) {
        <button type="button" class="ds-leftnav__footer" style="background:none; border:none; border-top:1px solid var(--ds-color-border-subtle); width:100%; text-align:left; font:inherit"
                (click)="userClick.emit()" [attr.aria-label]="slim() ? 'Cuenta de ' + u.name : null">
          <ds-avatar [name]="u.name" [initials]="u.initials ?? ''" />
          @if (!slim()) {
            <span class="ds-leftnav__footer-text">
              @if (u.eyebrow) { <span class="ds-leftnav__footer-eyebrow">{{ u.eyebrow }}</span> }
              <span class="ds-leftnav__footer-name">{{ u.name }}</span>
            </span>
            <span class="ds-icon" aria-hidden="true">unfold_more</span>
          }
        </button>
      }
    </aside>
  `,
})
export class DsLeftnav {
  readonly productName = input('');
  readonly slim = input(false);
  readonly user = input<DsLeftnavUser | null>(null);
  readonly version = input('');
  /** true si se proyecta un selector de idioma con el atributo dsLeftnavLanguage. */
  readonly language = input(false);
  readonly navLabel = input('Navegación principal');

  readonly toggle = output<void>();
  readonly userClick = output<void>();
}
