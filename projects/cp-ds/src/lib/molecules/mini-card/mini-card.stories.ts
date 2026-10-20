import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsMiniCard } from './mini-card.component';

const meta: Meta = {
  title: 'Moléculas/MiniCard',
  decorators: [moduleMetadata({ imports: [DsMiniCard, MatButtonModule, MatIconModule, MatChipsModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-mini-card>\` — Figma \`✅MiniCard\`, nodo \`6037:6934\`. Tarjeta compacta de 486px con sombra Shadow-xs.

- **Encabezado:** \`title\` (Title Medium SemiBold), \`subtitle\`, \`icon\` suelto o dentro de un contenedor (\`iconContainer\`), y acciones a la derecha (\`dsMiniCardActions\`).
- **Cuerpo:** contenido libre. Para una tabla de datos, filas \`.ds-mini-card__row\` (etiqueta SemiBold + valor).
- **Pie** (\`footer\`): \`brand\`, \`secondary\`, \`primary\`, \`success\`, \`warning\`, \`gray\`; metadatos con \`.ds-mini-card__meta\` (Label Small SemiBold).

Pendiente de confirmar con Diseño: la línea de acento del pie es un SVG que no se pudo leer (se infieren 2px del color de acento), y los pies
Tertiary, Rose y Aqua no se relevaron.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `
      <ds-mini-card title="Card title" footer="brand">
        <p style="margin:0">Texto de ejemplo del cuerpo de la tarjeta, con el contenido principal.</p>
        <span dsMiniCardFooter class="ds-mini-card__meta"><span class="ds-icon">insert_invitation</span>Año 2026</span>
        <span dsMiniCardFooter class="ds-mini-card__meta"><span class="ds-icon">folder</span>Responsable</span>
      </ds-mini-card>`,
  }),
};

export const ConTablaDeDatos: Story = {
  name: 'Con tabla de datos',
  render: () => ({
    template: `
      <ds-mini-card title="Préstamo 3881/OC-PE" subtitle="Operación activa" icon="payments" [iconContainer]="true" footer="success">
        <button dsMiniCardActions matIconButton aria-label="Copiar"><mat-icon>content_copy</mat-icon></button>
        <div class="ds-mini-card__row"><span>Monto</span><span>US$ 18.000.000</span></div>
        <div class="ds-mini-card__row"><span>Desembolsado</span><span>US$ 7.200.000</span></div>
        <div class="ds-mini-card__row"><span>País</span><span>Perú</span></div>
        <span dsMiniCardFooter class="ds-mini-card__meta"><span class="ds-icon">check_circle</span>En ejecución</span>
      </ds-mini-card>`,
  }),
};

export const ConChip: Story = {
  name: 'Con chip y acciones',
  render: () => ({
    template: `
      <ds-mini-card title="Matriz de riesgos" footer="warning">
        <mat-chip-set dsMiniCardActions aria-label="Estado"><mat-chip class="ds-chip ds-chip--sm ds-chip--cyan">Borrador</mat-chip></mat-chip-set>
        <p style="margin:0">Hay 2 riesgos pendientes de revisión.</p>
        <span dsMiniCardFooter class="ds-mini-card__meta"><span class="ds-icon">warning</span>Requiere atención</span>
      </ds-mini-card>`,
  }),
};
