import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Moléculas/Button Toggle',
  decorators: [moduleMetadata({ imports: [MatButtonToggleModule, MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-button-toggle-group>\` de Angular Material. Densidad 0 = alto 48px, forma pill,
texto Label Large SemiBold #555353; seleccionado = azul con texto blanco.
Para elegir **una** opción que cambia la vista (ej. Tarjetas / Tabla). Para formularios usar Radio.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; align-items:flex-start">
        <mat-button-toggle-group value="cards" aria-label="Vista" hideSingleSelectionIndicator>
          <mat-button-toggle value="cards"><mat-icon>grid_view</mat-icon> Tarjetas</mat-button-toggle>
          <mat-button-toggle value="table"><mat-icon>table_rows</mat-icon> Tabla</mat-button-toggle>
        </mat-button-toggle-group>
        <mat-button-toggle-group value="mes" aria-label="Período" hideSingleSelectionIndicator>
          <mat-button-toggle value="semana">Semana</mat-button-toggle>
          <mat-button-toggle value="mes">Mes</mat-button-toggle>
          <mat-button-toggle value="anio">Año</mat-button-toggle>
          <mat-button-toggle value="otro" disabled>Otro</mat-button-toggle>
        </mat-button-toggle-group>
      </div>`,
  }),
};
