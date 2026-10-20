import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type DsIconContainerColor =
  | 'blue' | 'cyan' | 'rose' | 'violet' | 'aqua' | 'green' | 'orange' | 'disabled';

/**
 * Adorno cuadrado o redondo detrás de un ícono. Decorativo: no es clickeable (para eso está
 * `matIconButton`). 9 colores × contraste bajo/alto × forma × 4 tamaños, verificados en Figma.
 */
@Component({
  selector: 'ds-icon-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'ds-iconctr ds-iconctr--' + color()",
    '[class.ds-iconctr--contrast]': 'highContrast()',
    '[class.ds-iconctr--round]': "shape() === 'round'",
    '[class.ds-iconctr--xs]': "size() === 'xs'",
    '[class.ds-iconctr--sm]': "size() === 'sm'",
    '[class.ds-iconctr--lg]': "size() === 'lg'",
    'aria-hidden': 'true',
  },
  template: `<span class="ds-icon">{{ icon() }}</span>`,
})
export class DsIconContainer {
  /** Nombre del ícono de Material Symbols. */
  readonly icon = input.required<string>();
  readonly color = input<DsIconContainerColor>('blue');
  /** `true` = fondo saturado e ícono blanco (High-Contrast). */
  readonly highContrast = input(false);
  readonly shape = input<'square' | 'round'>('square');
  /** xs 20px · sm 32px · md 40px · lg 64px */
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
}
