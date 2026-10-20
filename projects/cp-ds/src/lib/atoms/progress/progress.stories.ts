import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/Progreso y Badge',
  decorators: [
    moduleMetadata({
      imports: [MatProgressBarModule, MatProgressSpinnerModule, MatBadgeModule, MatButtonModule, MatIconModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `- **Progress bar:** \`<mat-progress-bar>\`. 8px, pista #e3eaef, radio 16px. Éxito: clase \`ds-progress--success\`.
- **Progress spinner:** \`<mat-progress-spinner>\` con los diámetros del BID: Large 64 (trazo 8), Medium 32 (4),
  Small 24 (3), XSmall 16 (2). En Figma el anillo tiene un degradé; Material usa trazo sólido.
- **Badge:** directiva \`matBadge\`. 20px, fondo azul, texto 11px semibold.

Para la pantalla de carga completa usar el **Loader de marca** (\`ds-loader-brand\`).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const ProgressBar: Story = {
  name: 'Progress bar',
  render: () => ({
    template: `
      <div style="display:grid; gap:20px; max-width:320px">
        <mat-progress-bar mode="determinate" value="25" aria-label="Carga 25%"></mat-progress-bar>
        <mat-progress-bar mode="determinate" value="60" aria-label="Carga 60%"></mat-progress-bar>
        <mat-progress-bar mode="determinate" value="100" class="ds-progress--success" aria-label="Completo"></mat-progress-bar>
        <mat-progress-bar mode="indeterminate" aria-label="Cargando"></mat-progress-bar>
      </div>`,
  }),
};

export const ProgressSpinner: Story = {
  name: 'Progress spinner',
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:32px">
        <mat-progress-spinner mode="indeterminate" diameter="64" strokeWidth="8" aria-label="Cargando"></mat-progress-spinner>
        <mat-progress-spinner mode="indeterminate" diameter="32" strokeWidth="4" aria-label="Cargando"></mat-progress-spinner>
        <mat-progress-spinner mode="indeterminate" diameter="24" strokeWidth="3" aria-label="Cargando"></mat-progress-spinner>
        <mat-progress-spinner mode="indeterminate" diameter="16" strokeWidth="2" aria-label="Cargando"></mat-progress-spinner>
      </div>`,
  }),
};

export const Badge: Story = {
  render: () => ({
    template: `
      <button matIconButton aria-label="Notificaciones, 3 nuevas">
        <mat-icon matBadge="3">notifications</mat-icon>
      </button>`,
  }),
};
