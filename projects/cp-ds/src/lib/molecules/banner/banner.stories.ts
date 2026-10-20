import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsBanner } from './banner.component';

const meta: Meta<DsBanner> = {
  title: 'Moléculas/Banner',
  component: DsBanner,
  decorators: [moduleMetadata({ imports: [DsBanner] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-banner>\` — componente propio (Material no tiene banner). Figma \`✅Banners\`, nodo \`709:15227\`.
Para mensajes importantes pero **no disruptivos**: avisos del sistema, información o advertencias.

- **Colores:** \`info\` (default), \`success\`, \`warning\`, \`error\`. Fondo claro, borde izquierdo de 4px, ícono de estado relleno de 24px.
- **Texto:** contenido proyectado (Label Large). **Acción:** \`<button dsBannerAction>\`. **Cerrar:** \`closable\` + evento \`closed\`.
- \`warning\` y \`error\` se anuncian como \`role="alert"\`; \`info\` y \`success\` como \`role="status"\`.
- Contraste texto/fondo ≥ 9.8:1 en los cuatro colores.`,
      },
    },
  },
  args: { color: 'info', closable: false },
  render: (args) => ({
    props: args,
    template: `<ds-banner [color]="color" [closable]="closable">Banner supporting text <button dsBannerAction>Acción</button></ds-banner>`,
  }),
};
export default meta;
type Story = StoryObj<DsBanner>;

export const Playground: Story = {};

export const Variantes: Story = {
  parameters: { docs: { description: { story: 'Los cuatro colores × (solo texto · texto y acción · con cerrar).' } } },
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:700px">
        @for (c of ['info','success','warning','error']; track c) {
          <ds-banner [color]="$any(c)">Banner supporting text</ds-banner>
          <ds-banner [color]="$any(c)">Banner supporting text <button dsBannerAction>Acción</button></ds-banner>
          <ds-banner [color]="$any(c)" [closable]="true">Banner supporting text <button dsBannerAction>Acción</button></ds-banner>
          <ds-banner [color]="$any(c)" [closable]="true">Banner supporting text</ds-banner>
        }
      </div>`,
  }),
};
