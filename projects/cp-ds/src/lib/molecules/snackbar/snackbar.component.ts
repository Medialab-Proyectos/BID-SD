import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

export type DsSnackbarColor = 'default' | 'success' | 'warning' | 'error';

export interface DsSnackbarData {
  message: string;
  color?: DsSnackbarColor;
  /** `high` (default): fondo saturado. `low`: fondo claro con texto oscuro. */
  contrast?: 'high' | 'low';
  /** Texto del botón de acción. Sin valor, no hay botón. */
  action?: string;
  closable?: boolean;
  /** Acción en una línea aparte, alineada a la derecha (Figma: `Text & longer action`). */
  stacked?: boolean;
}

const ICON: Record<DsSnackbarColor, string> = {
  default: '', success: 'check_circle', warning: 'warning', error: 'error',
};

/**
 * Snackbar del BID (Figma `✅Snackbar`, nodo 478:7634): mensaje breve y no intrusivo que informa el
 * resultado de una acción. Dos estilos (`high` / `low` contraste) × cuatro colores.
 *
 * Se usa dentro de `MatSnackBar`, que se ocupa de abrirlo, posicionarlo y cerrarlo solo:
 *
 *     openDsSnackbar(inject(MatSnackBar), { message: 'Guardado', color: 'success', action: 'Deshacer' });
 *
 * También sirve suelto, con inputs, para mostrarlo en una página.
 */
@Component({
  selector: 'ds-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'ds-snackbar ds-snackbar--' + contrast() + ' ds-snackbar--' + color()",
    '[class.ds-snackbar--stacked]': 'stacked()',
    role: 'status',
  },
  template: `
    <span class="ds-snackbar__body">
      @if (icon()) { <span class="ds-icon ds-snackbar__icon" aria-hidden="true">{{ icon() }}</span> }
      <span class="ds-snackbar__text">{{ message() }}</span>
    </span>
    <span class="ds-snackbar__controls">
      @if (action()) {
        <button type="button" class="ds-snackbar__action" (click)="onAction()">{{ action() }}</button>
      }
      @if (closable()) {
        <button type="button" class="ds-iconbtn ds-snackbar__close" aria-label="Cerrar" (click)="onClose()">
          <span class="ds-icon" aria-hidden="true">close</span>
        </button>
      }
    </span>
  `,
})
export class DsSnackbar {
  private readonly data = inject<DsSnackbarData | null>(MAT_SNACK_BAR_DATA, { optional: true });
  private readonly ref = inject<MatSnackBarRef<DsSnackbar> | null>(MatSnackBarRef, { optional: true });

  readonly message = input(this.data?.message ?? '');
  readonly color = input<DsSnackbarColor>(this.data?.color ?? 'default');
  readonly contrast = input<'high' | 'low'>(this.data?.contrast ?? 'high');
  readonly action = input<string | null>(this.data?.action ?? null);
  readonly closable = input(this.data?.closable ?? false);
  readonly stacked = input(this.data?.stacked ?? false);

  readonly actionClicked = output<void>();
  readonly closed = output<void>();

  protected readonly icon = computed(() => ICON[this.color()]);

  protected onAction() {
    this.actionClicked.emit();
    this.ref?.dismissWithAction();
  }

  protected onClose() {
    this.closed.emit();
    this.ref?.dismiss();
  }
}

/** Abre un `ds-snackbar` dentro de `MatSnackBar` (duración por defecto: 5 s). */
export function openDsSnackbar(snackBar: MatSnackBar, data: DsSnackbarData, duration = 5000) {
  return snackBar.openFromComponent(DsSnackbar, { data, duration, panelClass: 'ds-snackbar-panel' });
}
