import { MatDividerModule } from '@angular/material/divider';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/Divider',
  decorators: [moduleMetadata({ imports: [MatDividerModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-divider>\` (Figma \`✅Divider\`, nodo \`769:7015\`). Línea de 1px en Border/Default (#c7c7c9).

- **Horizontal** (por defecto) y **vertical** (\`[vertical]="true"\`, dentro de un contenedor con alto).
- **Punteado** (solo horizontal): clase \`ds-divider--dotted\`.
- **Modo oscuro:** dentro de \`.ds-inverse\` la línea pasa a #f3f3f3.
- Es decorativo: Material le pone \`role="separator"\`; si solo separa visualmente, agregar \`aria-hidden="true"\`.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:24px; max-width:480px">
        <div><p class="ds-text ds-text--label-md" style="margin:0 0 8px">Horizontal</p><mat-divider /></div>
        <div><p class="ds-text ds-text--label-md" style="margin:0 0 8px">Punteado</p><mat-divider class="ds-divider--dotted" /></div>
        <div style="display:flex; align-items:center; gap:16px; height:48px">
          <span class="ds-text ds-text--body-md">Izquierda</span><mat-divider [vertical]="true" style="align-self:stretch" /><span class="ds-text ds-text--body-md">Derecha</span>
        </div>
        <div class="ds-inverse" style="padding:16px; border-radius:8px">
          <p class="ds-text ds-text--label-md" style="margin:0 0 8px; color:inherit">Modo oscuro (inverse)</p><mat-divider />
        </div>
      </div>`,
  }),
};
