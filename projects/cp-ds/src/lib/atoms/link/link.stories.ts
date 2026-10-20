import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/Link',
  decorators: [moduleMetadata({ imports: [MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `Clase \`ds-link\` sobre un \`<a href>\` nativo (no hay componente: el elemento nativo ya
da navegación por teclado y semántica). Tamaños: \`ds-link--lg\` 16px · default 14px · \`ds-link--sm\` 12px.
Estilo \`ds-link--subtle\`: texto oscuro, subraya en hover.

Color: Blue Sky 40 #0072a4 (Figma usa #007eb6, que no cumple AA sobre el fondo de página; ver Huecos A4).
Link externo: agregar el ícono \`open_in_new\` y avisar en el texto accesible que abre otra pestaña.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:32px; flex-wrap:wrap">
        <a class="ds-link ds-link--lg" href="#">Link large</a>
        <a class="ds-link" href="#">Link medium</a>
        <a class="ds-link ds-link--sm" href="#">Link small</a>
        <a class="ds-link ds-link--subtle" href="#">Link subtle</a>
        <a class="ds-link" href="https://www.iadb.org" target="_blank" rel="noopener">
          iadb.org <mat-icon aria-hidden="true" class="ds-icon--s">open_in_new</mat-icon>
          <span class="cdk-visually-hidden">(abre en una pestaña nueva)</span>
        </a>
      </div>`,
  }),
};
