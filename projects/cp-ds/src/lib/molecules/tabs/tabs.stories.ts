import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Moléculas/Tabs',
  decorators: [moduleMetadata({ imports: [MatTabsModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-tab-group>\` (contenido en pestañas) o \`<nav mat-tab-nav-bar>\` (navegación entre rutas).
Alto 40px, Body Large. Activo: texto **bold** #0072a4 (ajustado por contraste) + línea 2px #007eb6.
Inactivo: SemiBold #232222. Divisor 1px #c7c7c9.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <mat-tab-group animationDuration="0ms" style="max-width:600px">
        <mat-tab label="Resumen"><p class="ds-text ds-text--body-md" style="padding:16px 0">Contenido de Resumen.</p></mat-tab>
        <mat-tab label="Documentos"><p class="ds-text ds-text--body-md" style="padding:16px 0">Contenido de Documentos.</p></mat-tab>
        <mat-tab label="Historial"><p class="ds-text ds-text--body-md" style="padding:16px 0">Contenido de Historial.</p></mat-tab>
        <mat-tab label="Deshabilitado" disabled></mat-tab>
      </mat-tab-group>`,
  }),
};

export const ConIcono: Story = {
  name: 'Con ícono',
  render: () => ({
    template: `
      <mat-tab-group animationDuration="0ms" style="max-width:600px">
        <mat-tab><ng-template mat-tab-label><mat-icon aria-hidden="true">home</mat-icon>&nbsp;Inicio</ng-template></mat-tab>
        <mat-tab label="Proyectos"></mat-tab>
        <mat-tab label="Reportes"></mat-tab>
      </mat-tab-group>`,
  }),
};
