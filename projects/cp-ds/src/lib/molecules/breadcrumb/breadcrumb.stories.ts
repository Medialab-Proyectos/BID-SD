import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsBreadcrumb } from './breadcrumb.component';

const ITEMS = [
  { label: 'Inicio', url: '#' },
  { label: 'Operaciones', url: '#' },
  { label: 'Préstamos', url: '#' },
  { label: 'AR-L1234', url: '#' },
  { label: 'Desembolsos' },
];

const meta: Meta<DsBreadcrumb> = {
  title: 'Moléculas/Breadcrumb',
  component: DsBreadcrumb,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-breadcrumb [items]="…">\` — componente propio. Separador "/" o chevron.
Verificado contra el nodo \`1088:35139\`:

- Los tramos navegables van en **texto oscuro semibold** (#232222), **no en azul**. En hover toman
  una píldora celeste y subrayado.
- El último tramo (página actual) es una **píldora celeste con texto azul**, con \`aria-current="page"\`.
  Figma la pinta con el 16% de #007eb6 y texto #007eb6 encima (3.47:1, no pasa AA); acá se usa
  Blue Sky 95 de fondo y Blue Sky 40 de texto = 4.65:1 (ver Huecos M8).

Con más de \`maxItems\` tramos colapsa los del medio en "…".

Con el Router de Angular: escuchar \`(itemClick)\`, llamar \`event.preventDefault()\` y navegar con \`router.navigateByUrl\`.`,
      },
    },
  },
  argTypes: { separator: { control: 'inline-radio', options: ['slash', 'chevron'] } },
  args: { items: ITEMS.slice(0, 3), separator: 'slash', maxItems: 4 },
};
export default meta;
type Story = StoryObj<DsBreadcrumb>;

export const Playground: Story = {};

export const Variantes: Story = {
  render: () => ({
    props: { corto: ITEMS.slice(0, 3), largo: ITEMS },
    template: `
      <div style="display:grid; gap:24px">
        <ds-breadcrumb [items]="corto" />
        <ds-breadcrumb [items]="corto" separator="chevron" />
        <ds-breadcrumb [items]="largo" [maxItems]="3" />
      </div>`,
  }),
};
