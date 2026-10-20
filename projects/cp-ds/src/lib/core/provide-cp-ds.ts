import { type EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperIntl } from '@angular/material/stepper';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';

/** Textos del paginador en español (Material los trae en inglés). */
export class DsPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página:';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, size: number, length: number) => {
    if (length === 0 || size === 0) return `0 de ${length}`;
    const start = page * size;
    return `${start + 1} – ${Math.min(start + size, length)} de ${length}`;
  };
}

/** Textos del stepper en español. */
export class DsStepperIntl extends MatStepperIntl {
  override optionalLabel = 'Opcional';
  override completedLabel = 'Completo';
  override editableLabel = 'Editable';
}

/**
 * Configuración de Angular Material para el sistema del BID. Agregar una vez en app.config.ts:
 *   providers: [provideCpDs()]
 * - <mat-icon> usa Material Symbols Outlined.
 * - Textos de paginador y stepper en español.
 * - Fechas en español (días, meses, semana desde el lunes). Cambiar con `{ dateLocale: 'es-AR' }`.
 * - Pestañas sin estirar (en el BID ocupan el ancho de su texto; Material las estira por defecto).
 */
export function provideCpDs(options: { dateLocale?: string } = {}): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppInitializer(() => {
      inject(MatIconRegistry).setDefaultFontSetClass('material-symbols-outlined');
    }),
    { provide: MatPaginatorIntl, useClass: DsPaginatorIntl },
    { provide: MatStepperIntl, useClass: DsStepperIntl },
    { provide: MAT_DATE_LOCALE, useValue: options.dateLocale ?? 'es' },
    { provide: MAT_TABS_CONFIG, useValue: { stretchTabs: false } },
  ]);
}
