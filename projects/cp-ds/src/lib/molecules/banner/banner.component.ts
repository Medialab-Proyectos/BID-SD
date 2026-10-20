import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type DsAlertColor = 'info' | 'success' | 'warning' | 'error';

const ICON: Record<DsAlertColor, string> = {
  info: 'info', success: 'check_circle', warning: 'warning', error: 'error',
};

/**
 * Banner del BID (Figma `✅Banners`, nodo 709:15227): mensaje no disruptivo, de ancho completo, con
 * borde de color a la izquierda. Sirve para avisos del sistema, información o advertencias.
 *
 * - Texto: contenido proyectado.
 * - Acción opcional: `<button dsBannerAction>Acción</button>`.
 * - `closable` muestra el botón de cerrar; la app decide qué hacer con `closed`.
 * - `warning` y `error` se anuncian como `role="alert"`; `info` y `success` como `role="status"`.
 */
@Component({
  selector: 'ds-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'ds-banner ds-banner--' + color()",
    '[class.ds-banner--multiline]': 'multiline()',
    '[attr.role]': "color() === 'error' || color() === 'warning' ? 'alert' : 'status'",
  },
  template: `
    <span class="ds-icon ds-banner__icon" aria-hidden="true">{{ icon() }}</span>
    <span class="ds-banner__text"><ng-content /></span>
    <span class="ds-banner__actions"><ng-content select="[dsBannerAction]" /></span>
    @if (closable()) {
      <button type="button" class="ds-iconbtn ds-banner__close" [attr.aria-label]="closeLabel()" (click)="closed.emit()">
        <span class="ds-icon" aria-hidden="true">close</span>
      </button>
    }
  `,
})
export class DsBanner {
  readonly color = input<DsAlertColor>('info');
  /** Muestra el botón de cerrar (Figma: `Show close`). */
  readonly closable = input(false);
  readonly closeLabel = input('Cerrar aviso');
  /** Texto largo (varias líneas o lista): el ícono y las acciones se alinean arriba en vez de al centro. */
  readonly multiline = input(false);
  readonly closed = output<void>();

  protected readonly icon = computed(() => ICON[this.color()]);
}
