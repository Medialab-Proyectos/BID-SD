import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideCpDs } from '@bid/cp-ds';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Íconos Material Symbols, textos en español (paginador, stepper), fechas en español y pestañas sin estirar.
    provideCpDs(),
    provideNativeDateAdapter(),
  ],
};
