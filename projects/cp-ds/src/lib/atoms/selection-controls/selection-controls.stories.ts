import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const meta: Meta = {
  title: 'Átomos/Controles de selección',
  decorators: [moduleMetadata({ imports: [MatCheckboxModule, MatRadioModule, MatSlideToggleModule] })],
  parameters: {
    docs: {
      description: {
        component: `Angular Material: \`<mat-checkbox>\`, \`<mat-radio-group>\` + \`<mat-radio-button>\` y
\`<mat-slide-toggle>\`. Etiqueta Body Medium 14/20; borde sin marcar #535354.

- **Checkbox:** Material dibuja la caja en 18px (= tamaño XSmall del BID). El Small de 20px no se
  replica sin reescribir su estructura interna (ver Huecos).
- **Switch:** 52×32 (small 36×22 con clase \`ds-switch--sm\`). Usar \`hideIcon\`.
  Hoy **no se usa en el código de Client Portal**.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Checkbox: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:8px">
        <mat-checkbox>Sin marcar</mat-checkbox>
        <mat-checkbox [checked]="true">Marcado</mat-checkbox>
        <mat-checkbox [indeterminate]="true">Indeterminado</mat-checkbox>
        <mat-checkbox disabled>Deshabilitado</mat-checkbox>
        <mat-checkbox disabled [checked]="true">Marcado y deshabilitado</mat-checkbox>
      </div>`,
  }),
};

export const Radio: Story = {
  render: () => ({
    template: `
      <mat-radio-group aria-label="Tipo de documento" style="display:flex; flex-direction:column; gap:8px" value="pasaporte">
        <mat-radio-button value="dni">DNI</mat-radio-button>
        <mat-radio-button value="pasaporte">Pasaporte</mat-radio-button>
        <mat-radio-button value="otro" disabled>Deshabilitado</mat-radio-button>
      </mat-radio-group>`,
  }),
};

export const Switch: Story = {
  render: () => ({
    template: `
      <div style="display:flex; flex-direction:column; gap:16px">
        <mat-slide-toggle hideIcon>Apagado</mat-slide-toggle>
        <mat-slide-toggle hideIcon [checked]="true">Encendido</mat-slide-toggle>
        <mat-slide-toggle hideIcon disabled>Deshabilitado</mat-slide-toggle>
        <mat-slide-toggle hideIcon disabled [checked]="true">Encendido y deshabilitado</mat-slide-toggle>
        <mat-slide-toggle hideIcon class="ds-switch--sm" [checked]="true">Small</mat-slide-toggle>
      </div>`,
  }),
};
