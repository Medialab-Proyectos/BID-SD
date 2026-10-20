import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

export interface DsNavLink {
  label: string;
  url: string;
  active?: boolean;
}

/**
 * Barra superior del BID (Figma `TopNav-header`, nodo 4278:8885): logo + links + zona de acciones.
 * `inverse` = estilo Blue (fondo de marca #004e70): todo componente de Material proyectado pasa
 * a su variante inverse automáticamente.
 * Logos: copiar `node_modules/@bid/cp-ds/assets` a los assets de la app (ver Introducción).
 *
 * Zona derecha, en el orden de Figma (`other elements`):
 * 1. **Idioma** (`languages`, `[(language)]`): botón de texto "ENG" con menú.
 * 2. **Workspace** (`workspaces`, `[(workspace)]`): botón azul relleno con el contexto activo (ej. "Procesos Financieros")
 *    y un menú para cambiarlo. Con una sola opción o sin lista, queda como botón simple.
 * 3. Todo lo demás se proyecta con `[dsTopnavActions]`: notificaciones, ayuda, soporte (headset), avatar…
 * Buscador: se proyecta con `[dsTopnavSearch]` (un `mat-form-field` con `ds-field--global`, 190px).
 */
@Component({
  selector: 'ds-topnav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <header class="ds-topnav" [class.ds-topnav--inverse]="inverse()" [class.ds-inverse]="inverse()">
      <a class="ds-topnav__logo" [href]="homeUrl()" [attr.aria-label]="brand() + ' — inicio'">
        <img [src]="logo()" alt="" height="32" />
        @if (productName()) { <span class="ds-topnav__product">{{ productName() }}</span> }
      </a>
      @if (links().length) {
        <nav class="ds-topnav__links" [attr.aria-label]="navLabel()">
          @for (l of links(); track l.url) {
            <a class="ds-topnav__link" [class.is-active]="l.active" [href]="l.url"
               [attr.aria-current]="l.active ? 'page' : null">{{ l.label }}</a>
          }
        </nav>
      } @else {
        <span style="flex:1"></span>
      }
      <div class="ds-topnav__search"><ng-content select="[dsTopnavSearch]" /></div>
      <div class="ds-topnav__actions">
        @if (languages().length) {
          <button matButton class="ds-topnav__small" [matMenuTriggerFor]="langMenu" [attr.aria-label]="'Idioma: ' + language()">
            {{ language() }}<mat-icon iconPositionEnd>expand_more</mat-icon>
          </button>
          <mat-menu #langMenu="matMenu">
            @for (l of languages(); track l) {
              <button mat-menu-item [class.ds-menu-item--selected]="l === language()" (click)="language.set(l)">{{ l }}</button>
            }
          </mat-menu>
        }
        @if (workspace()) {
          @if (workspaces().length > 1) {
            <button matButton="filled" class="ds-topnav__small ds-topnav__workspace" [matMenuTriggerFor]="wsMenu"
                    [attr.aria-label]="'Espacio de trabajo: ' + workspace()">
              {{ workspace() }}<mat-icon iconPositionEnd>expand_more</mat-icon>
            </button>
            <mat-menu #wsMenu="matMenu">
              @for (w of workspaces(); track w) {
                <button mat-menu-item [class.ds-menu-item--selected]="w === workspace()" (click)="workspace.set(w)">{{ w }}</button>
              }
            </mat-menu>
          } @else {
            <button matButton="filled" class="ds-topnav__small ds-topnav__workspace" type="button">{{ workspace() }}</button>
          }
        }
        <ng-content select="[dsTopnavActions]" />
      </div>
    </header>
  `,
})
export class DsTopnav {
  readonly productName = input('');
  readonly links = input<DsNavLink[]>([]);
  readonly inverse = input(false);
  readonly brand = input('BID');
  readonly homeUrl = input('/');
  readonly navLabel = input('Principal');
  readonly assetsPath = input('assets/logos');
  /** Idioma del logo a color: `spa` (BID, default) o `eng` (IDB). El blanco (inverse) es uno solo. */
  readonly logoLang = input<'spa' | 'eng'>('spa');

  /** Idiomas disponibles. Sin lista, no se muestra el selector. */
  readonly languages = input<string[]>([]);
  readonly language = model('ENG');
  /** Espacio de trabajo activo (texto del botón azul). Vacío = no se muestra. */
  readonly workspace = model('');
  /** Espacios entre los que se puede cambiar. Con más de uno, el botón abre un menú. */
  readonly workspaces = input<string[]>([]);

  protected readonly logo = computed(
    () => `${this.assetsPath()}/${this.inverse() ? 'idb-logo-white.svg' : 'idb-logo-color-' + this.logoLang() + '.svg'}`,
  );
}
