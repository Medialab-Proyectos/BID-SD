import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsStepList, type DsStep } from './step-list.component';

const PASOS: DsStep[] = [
  { title: 'Datos personales', subtitle: 'Completo', state: 'completed' },
  { title: 'Documentación', subtitle: 'En curso', state: 'active' },
  { title: 'Revisión', subtitle: 'Falta un archivo', state: 'incomplete' },
  { title: 'Garantías', subtitle: 'Revisar montos', state: 'error' },
  { title: 'Firma', subtitle: 'Pendiente', state: 'inactive' },
];

const meta: Meta<DsStepList> = {
  title: 'Organismos/Stepper',
  component: DsStepList,
  decorators: [moduleMetadata({ imports: [DsStepList, MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-step-list [steps]="…">\` — en Figma, "Stepper" y "Step" viven en la **misma página**
(nodos \`540:11954\` y \`540:11813\`): el primero es una fila/columna del segundo con un conector entre
pasos. Acá es un solo componente, no dos:

- \`orientation="vertical"\` **(por defecto)** — navegación entre secciones de un flujo largo, proyectada
  dentro del LeftNav.
- \`orientation="horizontal"\` — barra de progreso arriba de un flujo.

Dos modos de contenido, el eje \`Content: Icon | Number\` de \`.Step-enable\` (nodo \`12097:29288\`):

| Modo | Cuándo | Qué muestra |
|---|---|---|
| \`content="icon"\` **(por defecto)** | Los pasos **no** se recorren en orden y cada uno tiene que comunicar en qué estado está. **Es el que más se usa.** | Anillo gris (pendiente), anillo azul (actual), check azul (completo), "!" naranja (incompleto), triángulo rojo (error). |
| \`content="number"\` | Stepper normal: se avanza en orden y lo que importa es la posición. | Bolita con el número; gris si está pendiente, azul si es el actual o ya se completó. |

En modo numerado, **incompleto y error siguen mostrando su ícono**: el número no alcanza para
comunicar que algo salió mal. Así lo resuelve \`Step\` (nodo \`540:11813\`).

El paso seleccionado lleva fondo Blue Sky 95 (= \`Interaction/selected\`) y el hover Neutral variant 95
(= \`Interaction/background-hover\`). El conector es 1px Neutral variant 50 (= \`md3-tokens/outline\`
en Figma), verificado.

Para un asistente con **contenido por paso** (paneles que cambian, botones Anterior/Siguiente) usar
\`mat-stepper\` — ver la sección "Con contenido por paso" más abajo. Ese comportamiento no tiene spec
propia en Figma (solo la apariencia del ícono de paso, que está alineada a este mismo componente).`,
      },
    },
  },
  args: { steps: PASOS, selected: 1 },
};
export default meta;
type Story = StoryObj<DsStepList>;

export const Vertical: Story = {
  name: 'Vertical (LeftNav)',
  args: { orientation: 'vertical' },
};

export const Horizontal: Story = {
  name: 'Horizontal',
  args: { orientation: 'horizontal' },
};

export const Iconos: Story = {
  name: 'Íconos (por defecto)',
  args: { content: 'icon' },
};

export const Numeros: Story = {
  name: 'Números',
  args: { content: 'number' },
};

export const Comparacion: Story = {
  name: 'Comparación',
  parameters: { docs: { description: { story: 'Los mismos cinco estados en los dos modos de contenido.' } } },
  render: (args) => ({
    props: args,
    template: `
      <div style="display:flex; gap:48px">
        <div>
          <p class="ds-text ds-text--label-lg" style="margin:0 0 8px">content="icon"</p>
          <ds-step-list [steps]="steps" [selected]="selected" content="icon" ariaLabel="Pasos, modo ícono" />
        </div>
        <div>
          <p class="ds-text ds-text--label-lg" style="margin:0 0 8px">content="number"</p>
          <ds-step-list [steps]="steps" [selected]="selected" content="number" ariaLabel="Pasos, modo número" />
        </div>
      </div>`,
  }),
};

/* ==========================================================
   CON CONTENIDO POR PASO — mat-stepper de Angular Material.
   Sin spec propia en Figma (ver Huecos del sistema); el ícono de paso está alineado al de
   ds-step-list arriba (mismo azul, mismo gris, mismo conector).
   ========================================================== */

const CONTENIDO = `
  <ng-template matStepperIcon="edit" let-index="index">{{ index + 1 }}</ng-template>
  <ng-template matStepperIcon="done" let-index="index">{{ index + 1 }}</ng-template>
  <mat-step label="Datos personales" [completed]="true">
    <p class="ds-text ds-text--body-md">Contenido del paso 1.</p>
    <button matButton="filled" matStepperNext>Siguiente</button>
  </mat-step>
  <mat-step label="Documentación" optional>
    <p class="ds-text ds-text--body-md">Contenido del paso 2.</p>
    <button matButton="outlined" matStepperPrevious>Anterior</button>
    <button matButton="filled" matStepperNext>Siguiente</button>
  </mat-step>
  <mat-step label="Firma">
    <p class="ds-text ds-text--body-md">Contenido del paso 3.</p>
  </mat-step>`;

export const ConContenidoHorizontal: Story = {
  name: 'Con contenido por paso (horizontal)',
  parameters: {
    docs: {
      description: {
        story: `\`<mat-stepper>\`: para asistentes con **contenido por paso** (paneles, Anterior/Siguiente).
**El paso completado muestra el número, no un ícono** — Material pone lápiz/check por defecto; se
corrige con \`matStepperIcon="edit"\` y \`"done"\` devolviendo \`index + 1\` (ya incluido en esta story).`,
      },
    },
  },
  render: () => ({ template: `<mat-stepper [selectedIndex]="1" animationDuration="0">${CONTENIDO}</mat-stepper>` }),
};

export const ConContenidoVertical: Story = {
  name: 'Con contenido por paso (vertical)',
  render: () => ({ template: `<mat-stepper orientation="vertical" [selectedIndex]="1" animationDuration="0">${CONTENIDO}</mat-stepper>` }),
};
