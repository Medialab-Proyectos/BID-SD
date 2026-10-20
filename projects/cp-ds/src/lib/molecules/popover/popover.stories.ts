import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsPopover } from './popover.component';

const meta: Meta = {
  title: 'Moléculas/Tooltip y Popover',
  decorators: [moduleMetadata({ imports: [DsPopover, MatButtonModule, MatMenuModule, MatTooltipModule] })],
  parameters: {
    docs: {
      description: {
        component: `**Tooltip** (\`matTooltip\`, Figma \`Plain Tooltip\` nodo \`1570:9063\`): fondo #141414, texto blanco Body Small 12/16, radio 4px,
padding 4×8, mínimo 24px de alto. Una línea no hace wrap; para varias líneas usar \`matTooltipClass="ds-tooltip--multi"\` (200px).
Solo texto corto y **no esencial**: no debe ser la única vía para entender algo.

**Popover** (\`<ds-popover>\`, Figma \`Popover\` nodo \`7113:8473\`, "Rich tooltip"): tarjeta de 312px, radio 4px, Shadow-medium, con título
Body Medium Bold, contenido libre y acciones opcionales (botones de texto, \`dsPopoverActions\`). El componente dibuja la tarjeta; para
abrirla junto a un elemento va dentro de un \`<mat-menu class="ds-popover-menu">\`, que resuelve overlay, foco, Escape y clic afuera.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Tooltip: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:24px; padding:48px 24px">
        <button matButton="outlined" matTooltip="Supporting text">Una línea</button>
        <button matButton="outlined" matTooltipClass="ds-tooltip--multi"
                matTooltip="Texto de apoyo más largo que se reparte en varias líneas dentro de 200px de ancho.">Varias líneas</button>
      </div>`,
  }),
};

export const Popover: Story = {
  render: () => ({
    template: `
      <button matButton="outlined" [matMenuTriggerFor]="pop">Abrir popover</button>
      <mat-menu #pop="matMenu" class="ds-popover-menu" xPosition="after">
        <ds-popover title="Estado de la operación" (click)="$event.stopPropagation()">
          Los desembolsos se actualizan una vez por día. La última sincronización fue hoy a las 04:00 UTC.
          <ng-container dsPopoverActions>
            <button matButton>Ver detalle</button>
            <button matButton>Cerrar</button>
          </ng-container>
        </ds-popover>
      </mat-menu>`,
  }),
};
