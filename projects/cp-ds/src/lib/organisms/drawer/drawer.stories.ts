import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Organismos/Drawer',
  decorators: [moduleMetadata({ imports: [MatSidenavModule, MatButtonModule, MatIconModule] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `\`<mat-drawer>\` dentro de \`<mat-drawer-container>\` (Figma \`✅Drawer / Backdrop\`, nodo \`1742:4948\`). Panel lateral a alto completo
sobre un velo (\`rgba(0,0,0,.32)\`), blanco, con sombra Shadow-xs.

- **Posición:** \`position="start"\` (izquierda) o \`"end"\` (derecha). **Modo:** \`mode="over"\` con velo.
- **Ancho** (Figma \`DrawerCard\`): clases \`ds-drawer--sm\` 480 · \`--md\` 640 · \`--lg\` 900 · \`--xl\` 1011 · \`--xxl\` 1305.
- **Estructura interna:** \`.ds-drawer__header\` (80px, título Title Large SemiBold 22/28 + botones de ícono de 40px), \`.ds-drawer__content\`
  (padding 24, hace scroll) y \`.ds-drawer__footer\` (80px, acciones alineadas a la derecha con gap 24: cancelar = outlined, guardar = filled).
- Un drawer modal debe llevar el foco dentro y cerrarse con Escape (Material lo resuelve).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Derecha: Story = {
  name: 'Derecha (480px)',
  render: () => ({
    template: `
      <mat-drawer-container style="height:560px" [hasBackdrop]="true">
        <mat-drawer class="ds-drawer--sm" mode="over" position="end" [opened]="true" aria-label="Detalle del proyecto">
          <div class="ds-drawer__header">
            <h2 class="ds-drawer__title">Detalle del proyecto</h2>
            <button matIconButton aria-label="Más opciones"><mat-icon>more_vert</mat-icon></button>
            <button matIconButton aria-label="Cerrar"><mat-icon>close</mat-icon></button>
          </div>
          <div class="ds-drawer__content"><p class="ds-text ds-text--body-lg" style="margin:0">Contenido del panel. Hace scroll si supera el alto disponible.</p></div>
          <div class="ds-drawer__footer">
            <button matButton="outlined">Cancelar</button>
            <button matButton="filled">Guardar</button>
          </div>
        </mat-drawer>
        <mat-drawer-content style="padding:24px"><p class="ds-text ds-text--body-md">Contenido de la página.</p></mat-drawer-content>
      </mat-drawer-container>`,
  }),
};

export const Izquierda: Story = {
  name: 'Izquierda (640px)',
  render: () => ({
    template: `
      <mat-drawer-container style="height:560px" [hasBackdrop]="true">
        <mat-drawer class="ds-drawer--md" mode="over" position="start" [opened]="true" aria-label="Filtros">
          <div class="ds-drawer__header"><h2 class="ds-drawer__title">Filtros</h2><button matIconButton aria-label="Cerrar"><mat-icon>close</mat-icon></button></div>
          <div class="ds-drawer__content"><p class="ds-text ds-text--body-lg" style="margin:0">Contenido del panel.</p></div>
        </mat-drawer>
        <mat-drawer-content style="padding:24px"><p class="ds-text ds-text--body-md">Contenido de la página.</p></mat-drawer-content>
      </mat-drawer-container>`,
  }),
};
