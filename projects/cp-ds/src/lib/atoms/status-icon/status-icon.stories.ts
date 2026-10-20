import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsStatusIcon } from './status-icon.component';

const meta: Meta<DsStatusIcon> = {
  title: 'Átomos/Status Icon',
  component: DsStatusIcon,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-status-icon>\` — estado Activo / Incompleto / Completo / Error (componente propio).
Cada estado es **un solo glifo** de Material Symbols relleno (confirmado con los SVG de Figma): \`circle\`
(contorno), \`error\`, \`check_circle\` y \`warning\`. Expone \`role="img"\` con el nombre del estado.`,
      },
    },
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['active', 'incomplete', 'complete', 'error'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  args: { status: 'complete', size: 'md', disabled: false },
};
export default meta;
type Story = StoryObj<DsStatusIcon>;

export const Playground: Story = {};

export const Estados: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(4, 96px); gap:12px; text-align:center">
        <ds-status-icon status="active" /><ds-status-icon status="incomplete" />
        <ds-status-icon status="complete" /><ds-status-icon status="error" />
        <ds-status-icon status="active" size="sm" /><ds-status-icon status="incomplete" size="sm" />
        <ds-status-icon status="complete" size="sm" /><ds-status-icon status="error" size="sm" />
        <span class="ds-text ds-text--label-md">Activo</span><span class="ds-text ds-text--label-md">Incompleto</span>
        <span class="ds-text ds-text--label-md">Completo</span><span class="ds-text ds-text--label-md">Error</span>
      </div>`,
  }),
};
