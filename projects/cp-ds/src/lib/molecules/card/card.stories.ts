import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsIconContainer } from '../../atoms/icon-container/icon-container.component';

const meta: Meta = {
  title: 'Moléculas/Card',
  decorators: [moduleMetadata({ imports: [MatCardModule, MatButtonModule, MatIconModule, DsIconContainer] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-card appearance="outlined">\` (Figma \`✅Card\`, nodo \`1200:2904\`). Tarjeta blanca con borde 1px Border/Subtle, radio 8px,
**padding 24px**, gap 16px entre bloques y **sin sombra**. Título Headline Small Bold 24/32.

- El **ancho** lo define la grilla (Figma: 4, 6, 8, 10 y 12 columnas) — usar las utilidades \`ds-grid\`/\`u-*\`, no un ancho fijo en el componente.
- \`ContainerOnly\` (sin título): omitir \`mat-card-header\`.
- El **título con ícono** (Figma \`.CardTitle\`): \`ds-icon-container\` de 40px + título + descripción opcional (Body Medium); la variante
  acordeón lleva un chevron de 32px a la derecha (ver Moléculas/Accordion).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Basica: Story = {
  name: 'Básica',
  render: () => ({
    template: `
      <mat-card appearance="outlined" style="max-width:493px">
        <mat-card-header><mat-card-title>Título de la tarjeta</mat-card-title></mat-card-header>
        <mat-card-content><p class="ds-text ds-text--body-md" style="margin:0">Contenido de la tarjeta. Puede ser texto, una tabla, un formulario…</p></mat-card-content>
      </mat-card>`,
  }),
};

export const SoloContenedor: Story = {
  name: 'Solo contenedor (sin título)',
  render: () => ({
    template: `
      <mat-card appearance="outlined" style="max-width:493px">
        <mat-card-content><p class="ds-text ds-text--body-md" style="margin:0">Tarjeta sin título: solo el contenedor y su contenido.</p></mat-card-content>
      </mat-card>`,
  }),
};

export const TituloConIcono: Story = {
  name: 'Título con ícono y descripción',
  render: () => ({
    template: `
      <mat-card appearance="outlined" style="max-width:750px">
        <mat-card-header>
          <div style="display:flex; align-items:center; gap:8px; width:100%">
            <ds-icon-container icon="info" size="md" />
            <div>
              <mat-card-title>Información general</mat-card-title>
              <p class="ds-text ds-text--body-md" style="margin:0">Datos básicos de la operación.</p>
            </div>
          </div>
        </mat-card-header>
        <mat-card-content><p class="ds-text ds-text--body-md" style="margin:0">Contenido.</p></mat-card-content>
        <mat-card-actions align="end"><button matButton>Cancelar</button><button matButton="filled">Guardar</button></mat-card-actions>
      </mat-card>`,
  }),
};
