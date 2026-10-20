import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsFooter } from './footer.component';

const meta: Meta<DsFooter> = {
  title: 'Organismos/Footer',
  component: DsFooter,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: '`<ds-footer>` — pie de página (componente propio). Links + logo del BID. `[inverse]="true"` = estilo Blue.' } },
  },
  args: {
    links: [
      { label: 'Términos de uso', url: '#' },
      { label: 'Privacidad', url: '#' },
      { label: 'Contacto', url: '#' },
    ],
    inverse: false,
  },
};
export default meta;
type Story = StoryObj<DsFooter>;

export const White: Story = {};
export const Blue: Story = { name: 'Blue (inverse)', args: { inverse: true } };
