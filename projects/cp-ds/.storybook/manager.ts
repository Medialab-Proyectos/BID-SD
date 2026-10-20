import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Nombre del sitio (barra lateral y pestaña del navegador).
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Client Portal — Sistema de diseño BID',
  }),
});
