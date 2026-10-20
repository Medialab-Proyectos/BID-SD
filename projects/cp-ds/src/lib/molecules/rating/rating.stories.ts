import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsRating } from './rating.component';

const meta: Meta<DsRating> = {
  title: 'Moléculas/Rating',
  component: DsRating,
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-rating>\` — componente propio, funciona con \`formControl\` / \`ngModel\`.
Estrella vacía gris #a6a6a8 y llena azul #007eb6: mismo glifo "star", cambia el relleno (verificado en Figma).
Accesible como grupo de radio: Tab entra al grupo y las flechas cambian el valor.`,
      },
    },
  },
  args: { value: 3, max: 5, label: 'Calificación', readonly: false },
};
export default meta;
type Story = StoryObj<DsRating>;

export const Playground: Story = {};

export const EnFormulario: Story = {
  name: 'En un formulario',
  render: () => {
    const control = new FormControl(4);
    return {
      props: { control },
      template: `
        <ds-rating [formControl]="control" label="Calificación del servicio" />
        <p class="ds-text ds-text--body-sm">Valor del control: {{ control.value }}</p>`,
    };
  },
};

export const SoloLectura: Story = {
  name: 'Solo lectura',
  args: { value: 4, readonly: true, label: 'Calificación promedio: 4 de 5' },
};
