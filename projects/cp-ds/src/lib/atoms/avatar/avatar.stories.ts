import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from './avatar.component';

const meta: Meta<DsAvatar> = {
  title: 'Átomos/Avatar',
  component: DsAvatar,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-avatar>\` — componente propio (Angular Material no tiene avatar).
Iniciales, foto o ícono genérico. 40px confirmado en Figma; 32px (\`size="sm"\`) pendiente de confirmar.
El punto "en línea" va **arriba a la derecha** (confirmado en Figma, no abajo como en otros sistemas).
\`name\` es obligatorio en la práctica: es el texto que anuncia el lector de pantalla.`,
      },
    },
  },
  argTypes: { size: { control: 'inline-radio', options: ['md', 'sm'] } },
  args: { name: 'Olga Pérez', initials: 'OP', src: '', size: 'md', online: false },
};
export default meta;
type Story = StoryObj<DsAvatar>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; align-items:center; gap:24px">
        <ds-avatar name="Olga Pérez" initials="OP" />
        <ds-avatar name="Usuario sin foto" />
        <ds-avatar name="Olga Pérez" initials="OP" [online]="true" />
        <ds-avatar name="Olga Pérez" initials="OP" size="sm" />
      </div>`,
  }),
};
