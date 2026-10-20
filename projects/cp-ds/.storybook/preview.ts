import { provideNativeDateAdapter } from '@angular/material/core';
import { applicationConfig, type Preview } from '@storybook/angular-vite';
import { provideCpDs } from '../src/lib/core/provide-cp-ds';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    // Lo mismo que tiene que hacer la app consumidora en app.config.ts.
    applicationConfig({ providers: [provideCpDs(), provideNativeDateAdapter()] }),
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introducción',
          'Fundamentos',
          'Átomos',
          'Moléculas',
          'Organismos',
          'Plantillas',
        ],
      },
    },
  },
};

export default preview;
