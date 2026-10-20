import { ChangeDetectionStrategy, Component, computed, forwardRef, input, model, signal } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Rating / Favorite Toggle del BID. Funciona con formularios de Angular (formControl / ngModel).
 * Mismo glifo "star" para ambos estados: cambia el color y el relleno (eje FILL), verificado en Figma.
 * Accesible como grupo de radio: flechas para cambiar, Tab para entrar y salir.
 */
@Component({
  selector: 'ds-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DsRating), multi: true }],
  host: { class: 'ds-rating', role: 'radiogroup', '[attr.aria-label]': 'label()' },
  template: `
    @for (n of stars(); track n) {
      <button type="button" role="radio" class="ds-rating__star" [class.is-filled]="n <= value()"
              [attr.aria-checked]="n === value()" [attr.aria-label]="n + (n === 1 ? ' estrella' : ' estrellas')"
              [tabindex]="n === (value() || 1) ? 0 : -1" [disabled]="disabled() || readonly()"
              (click)="select(n)" (keydown)="onKey($event, n)">
        <span class="ds-icon" aria-hidden="true">star</span>
      </button>
    }
  `,
})
export class DsRating implements ControlValueAccessor {
  readonly value = model(0);
  readonly max = input(5);
  readonly label = input('Calificación');
  readonly readonly = input(false);
  protected readonly disabled = signal(false);

  protected readonly stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  protected select(n: number) {
    this.value.set(n);
    this.onChange(n);
    this.onTouched();
  }

  protected onKey(e: KeyboardEvent, n: number) {
    const delta = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = Math.min(this.max(), Math.max(1, n + delta));
    this.select(next);
    const host = (e.target as HTMLElement).parentElement;
    (host?.querySelectorAll('button')[next - 1] as HTMLButtonElement | undefined)?.focus();
  }

  writeValue(v: number | null) { this.value.set(v ?? 0); }
  registerOnChange(fn: (v: number) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(d: boolean) { this.disabled.set(d); }
}
