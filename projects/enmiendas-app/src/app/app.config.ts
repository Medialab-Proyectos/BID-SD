import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { MatDateFormats, provideNativeDateAdapter } from '@angular/material/core';
import { provideCpDs } from '@bid/cp-ds';

/** Figma muestra la fecha como 08/17/2023 (mes/día/año con ceros). */
const FORMATOS_FECHA: MatDateFormats = {
  parse: { dateInput: null },
  display: {
    dateInput: { year: 'numeric', month: '2-digit', day: '2-digit' },
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Íconos Material Symbols, textos en español (paginador, stepper) y pestañas sin estirar.
    // Esta pantalla muestra fechas en formato inglés (08/17/2023), como el diseño.
    provideCpDs({ dateLocale: 'en-US' }),
    provideNativeDateAdapter(FORMATOS_FECHA),
  ],
};
