import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsLinkItem } from './link-item.component';

const meta: Meta = {
  title: 'Moléculas/Link-Item',
  decorators: [moduleMetadata({ imports: [DsLinkItem] })],
  parameters: {
    docs: {
      description: {
        component: `\`<a ds-link-item>\` o \`<button ds-link-item>\` — ítem de navegación del LeftNav (componente propio).
Usar \`<a>\` cuando navega y \`<button>\` cuando ejecuta una acción. Seleccionado: fondo #d9f4ff y texto
#0072a4 bold (ajustado por contraste, ver Huecos M8), con \`aria-current="page"\`.
\`slim\`: solo ícono (48×36) para el LeftNav colapsado; requiere \`label\`.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Estados: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:4px; width:240px">
        <a ds-link-item icon="home" href="#">Inicio</a>
        <a ds-link-item icon="folder" href="#" [selected]="true">Proyectos</a>
        <a ds-link-item icon="description" href="#" secondary="12 pendientes">Documentos</a>
        <button ds-link-item icon="settings" disabled>Configuración</button>
      </div>`,
  }),
};

export const Slim: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:4px; width:64px; align-items:center">
        <a ds-link-item [slim]="true" icon="home" href="#" label="Inicio"></a>
        <a ds-link-item [slim]="true" icon="folder" href="#" label="Proyectos" [selected]="true"></a>
        <a ds-link-item [slim]="true" icon="description" href="#" label="Documentos"></a>
      </div>`,
  }),
};
