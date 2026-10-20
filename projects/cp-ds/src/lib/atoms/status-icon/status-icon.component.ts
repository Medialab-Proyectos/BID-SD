import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type DsStatus = 'inactive' | 'active' | 'incomplete' | 'complete' | 'error';

/** Glifo real de Figma por estado (verificado con los SVG exportados). */
const GLYPH: Record<DsStatus, string> = {
  inactive: 'circle',      // contorno gris — `.Step-enable` Content=Icon con Enable=No
  active: 'circle',        // contorno, sin relleno
  incomplete: 'error',     // relleno, naranja
  complete: 'check_circle', // relleno, azul
  error: 'warning',        // relleno, rojo
};

const LABEL: Record<DsStatus, string> = {
  inactive: 'Pendiente',
  active: 'Activo',
  incomplete: 'Incompleto',
  complete: 'Completo',
  error: 'Error',
};

/** Ícono de estado (Activo / Incompleto / Completo / Error). */
@Component({
  selector: 'ds-status-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'ds-status-icon ds-status-icon--' + status()",
    '[class.ds-status-icon--sm]': "size() === 'sm'",
    '[class.ds-status-icon--disabled]': 'disabled()',
    role: 'img',
    '[attr.aria-label]': 'label()',
  },
  template: `<span class="ds-icon" aria-hidden="true">{{ glyph() }}</span>`,
})
export class DsStatusIcon {
  readonly status = input<DsStatus>('active');
  /** md 40px (glifo 32) · sm 24px (glifo 20) */
  readonly size = input<'md' | 'sm'>('md');
  readonly disabled = input(false);

  protected readonly glyph = computed(() => GLYPH[this.status()]);
  protected readonly label = computed(() => LABEL[this.status()]);
}
