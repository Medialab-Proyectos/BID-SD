import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

type Args = { icon: string; size: 'xs' | 's' | 'm' | 'l' | 'xl'; color: string; filled: boolean };

const meta: Meta<Args> = {
  title: 'Átomos/Icon',
  decorators: [moduleMetadata({ imports: [MatIconModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-icon>\` con **Material Symbols Outlined** (configurado en \`MatIconRegistry\`, ver Introducción).

- Tamaño: clase \`ds-icon--{xs|s|m|l|xl}\` = 12 · 16 · 24 · 32 · 64px. M (24px) es el default.
- Color: clase \`ds-icon--{color}\` (paleta del componente Icon de Figma).
- Relleno: clase \`ds-icon--filled\` (usa el eje FILL de la fuente variable).
- Ícono decorativo junto a texto: \`aria-hidden="true"\`. Ícono solo con significado: el botón que lo contiene necesita un \`aria-label\`.`,
      },
    },
  },
  argTypes: {
    icon: { name: 'ícono' },
    size: { name: 'tamaño', control: 'inline-radio', options: ['xs', 's', 'm', 'l', 'xl'] },
    color: {
      name: 'color',
      control: 'select',
      options: ['gray', 'black', 'cyan', 'blue', 'aqua', 'violet', 'rose', 'red', 'green', 'orange', 'disabled'],
    },
    filled: { name: 'relleno' },
  },
  args: { icon: 'account_circle', size: 'l', color: 'gray', filled: false },
  render: (args) => ({
    props: args,
    template: `<mat-icon aria-hidden="true" [class]="'ds-icon--' + size + ' ds-icon--' + color" [class.ds-icon--filled]="filled">{{ icon }}</mat-icon>`,
  }),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => ({
    template: `
      <div style="display:flex; align-items:end; gap:32px">
        @for (s of ['xs','s','m','l','xl']; track s) {
          <div style="text-align:center">
            <mat-icon aria-hidden="true" [class]="'ds-icon--' + s + ' ds-icon--cyan'">account_circle</mat-icon>
            <div class="ds-text ds-text--label-md">{{ s }}</div>
          </div>
        }
      </div>`,
  }),
};

export const Colores: Story = {
  render: () => ({
    props: { colors: ['gray', 'black', 'cyan', 'blue', 'aqua', 'violet', 'rose', 'red', 'green', 'orange', 'disabled'] },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap:24px">
        @for (c of colors; track c) {
          <div style="text-align:center; width:64px">
            <mat-icon aria-hidden="true" [class]="'ds-icon--l ds-icon--' + c">account_circle</mat-icon>
            <div class="ds-text ds-text--label-md">{{ c }}</div>
          </div>
        }
      </div>
      <div class="ds-inverse" style="display:inline-flex; gap:24px; padding:16px 24px; margin-top:24px; border-radius:8px">
        <mat-icon aria-hidden="true" class="ds-icon--l ds-icon--inverse">account_circle</mat-icon>
        <mat-icon aria-hidden="true" class="ds-icon--l ds-icon--inverse-disabled">account_circle</mat-icon>
        <span class="ds-text ds-text--label-md" style="color:#fff; align-self:center">inverse · inverse-disabled</span>
      </div>`,
  }),
};

export const Relleno: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:24px">
        <mat-icon aria-hidden="true" class="ds-icon--l ds-icon--cyan">star</mat-icon>
        <mat-icon aria-hidden="true" class="ds-icon--l ds-icon--cyan ds-icon--filled">star</mat-icon>
      </div>`,
  }),
};
