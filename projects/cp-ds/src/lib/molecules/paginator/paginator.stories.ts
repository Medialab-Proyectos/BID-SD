import { MatPaginatorModule } from '@angular/material/paginator';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Moléculas/Paginator',
  decorators: [moduleMetadata({ imports: [MatPaginatorModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-paginator>\` de Angular Material. Texto Body Small 12px, select de 84px, íconos #535354.
Extendido (primera/última página): \`showFirstLastButtons\`.
Los textos en español vienen de \`provideCpDs()\` (ver Introducción).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Basico: Story = {
  name: 'Básico',
  render: () => ({
    template: `<mat-paginator [length]="100" [pageSize]="25" [pageSizeOptions]="[10, 25, 50, 100]" aria-label="Paginación" />`,
  }),
};

export const Extendido: Story = {
  render: () => ({
    template: `<mat-paginator [length]="100" [pageSize]="25" [pageIndex]="1" [pageSizeOptions]="[10, 25, 50, 100]" showFirstLastButtons aria-label="Paginación" />`,
  }),
};
