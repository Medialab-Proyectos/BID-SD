import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Avatar del BID: iniciales, foto o ícono genérico. Angular Material no tiene equivalente.
 * Prioridad de contenido: `src` > `initials` > ícono `person`.
 */
@Component({
  selector: 'ds-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-avatar',
    '[class.ds-avatar--sm]': "size() === 'sm'",
    role: 'img',
    '[attr.aria-label]': 'label()',
  },
  template: `
    @if (src()) {
      <img class="ds-avatar__img" [src]="src()" alt="" />
    } @else if (initials()) {
      {{ initials() }}
    } @else {
      <span class="ds-icon" aria-hidden="true">person</span>
    }
    @if (online()) {
      <span class="ds-avatar__badge" aria-hidden="true"></span>
    }
  `,
})
export class DsAvatar {
  /** Nombre de la persona: se usa para el texto accesible. */
  readonly name = input<string>('');
  readonly initials = input<string>('');
  readonly src = input<string>('');
  /** `md` = 40px (confirmado en Figma); `sm` = 32px (pendiente de confirmar). */
  readonly size = input<'md' | 'sm'>('md');
  /** Indicador de estado "en línea" (punto verde arriba a la derecha). */
  readonly online = input(false);

  protected readonly label = computed(() =>
    this.name() ? `${this.name()}${this.online() ? ' (en línea)' : ''}` : null,
  );
}
