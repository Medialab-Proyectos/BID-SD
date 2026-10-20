import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export interface DsBreadcrumbItem {
  label: string;
  /** URL del tramo. El último ítem es la página actual y no lleva enlace. */
  url?: string;
}

/**
 * Breadcrumb del BID (nodo 1088:35139). Los tramos navegables van en texto oscuro semibold, no en
 * azul; el último (página actual) es una píldora celeste con texto azul.
 * Si hay más de `maxItems`, colapsa los del medio en "…".
 * Para navegar con el Router de Angular, escuchar `itemClick` y llamar `event.preventDefault()`.
 */
@Component({
  selector: 'ds-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-label]="ariaLabel()">
      <ol class="ds-breadcrumb" style="list-style:none; margin:0; padding:0">
        @for (item of visible(); track $index; let last = $last) {
          <li style="display:contents">
            @if (item === COLLAPSED) {
              <span class="ds-breadcrumb__collapse" aria-hidden="true"><span class="ds-icon">more_horiz</span></span>
            } @else if (last) {
              <span class="ds-breadcrumb__current" aria-current="page">{{ item.label }}</span>
            } @else {
              <a class="ds-breadcrumb__link" [href]="item.url ?? '#'" (click)="itemClick.emit({ item, event: $event })">{{ item.label }}</a>
            }
            @if (!last) {
              @if (separator() === 'chevron') {
                <span class="ds-breadcrumb__sep ds-icon" aria-hidden="true">chevron_right</span>
              } @else {
                <span class="ds-breadcrumb__sep" aria-hidden="true">/</span>
              }
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class DsBreadcrumb {
  readonly items = input.required<DsBreadcrumbItem[]>();
  readonly separator = input<'slash' | 'chevron'>('slash');
  /** Cantidad máxima de tramos visibles antes de colapsar los del medio. */
  readonly maxItems = input(4);
  readonly ariaLabel = input('Ruta de navegación');
  readonly itemClick = output<{ item: DsBreadcrumbItem; event: MouseEvent }>();

  protected readonly COLLAPSED: DsBreadcrumbItem = { label: '…' };
  protected readonly visible = computed(() => {
    const all = this.items();
    if (all.length <= this.maxItems()) return all;
    return [all[0], this.COLLAPSED, ...all.slice(-(this.maxItems() - 2))];
  });
}
