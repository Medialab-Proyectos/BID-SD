import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsLinkItem } from '../../molecules/link-item/link-item.component';
import { DsStepList } from '../step-list/step-list.component';
import { DsLeftnav } from './leftnav.component';

const meta: Meta<DsLeftnav> = {
  title: 'Organismos/LeftNav',
  component: DsLeftnav,
  decorators: [moduleMetadata({ imports: [DsLinkItem, DsStepList] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `\`<ds-leftnav>\` — sidebar de navegación (componente propio). Default 256px / Slim 92px.
Proyectar \`<a ds-link-item>\` (con \`[slim]\` igual al del LeftNav). El botón del header emite \`(toggle)\`;
la app guarda el estado colapsado.

**LeftNav Stepper:** el mismo LeftNav con \`<ds-step-list>\` adentro en lugar de los ítems.`,
      },
    },
  },
  args: {
    productName: 'Client Portal',
    slim: false,
    version: 'Versión 1.2.1',
    user: { name: 'Joanna Díaz', initials: 'JD', eyebrow: 'Bienvenida' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:640px; display:flex">
        <ds-leftnav [productName]="productName" [slim]="slim" [version]="version" [user]="user" [language]="true" (toggle)="slim = !slim">
          @if (!slim) { <span class="ds-leftnav__subheader">Menú</span> }
          <a ds-link-item [slim]="slim" icon="home" href="#" label="Inicio" [selected]="true">Inicio</a>
          <a ds-link-item [slim]="slim" icon="folder" href="#" label="Operaciones">Operaciones</a>
          <a ds-link-item [slim]="slim" icon="description" href="#" label="Documentos">Documentos</a>
          <a ds-link-item [slim]="slim" icon="bar_chart" href="#" label="Reportes">Reportes</a>
          <button dsLeftnavLanguage ds-link-item [slim]="slim" icon="language" label="Idioma: Español">Español</button>
        </ds-leftnav>
      </div>`,
  }),
};
export default meta;
type Story = StoryObj<DsLeftnav>;

export const Default: Story = {};
export const Slim: Story = { args: { slim: true } };

export const Stepper: Story = {
  name: 'LeftNav Stepper',
  render: (args) => ({
    props: {
      ...args,
      steps: [
        { title: 'Datos personales', subtitle: 'Completo', state: 'completed' },
        { title: 'Documentación', subtitle: 'En curso', state: 'active' },
        { title: 'Revisión', subtitle: 'Falta un archivo', state: 'incomplete' },
        { title: 'Firma', subtitle: 'Pendiente', state: 'inactive' },
      ],
    },
    template: `
      <div style="height:640px; display:flex">
        <ds-leftnav [productName]="productName" [user]="user">
          <ds-step-list [steps]="steps" [selected]="1" ariaLabel="Pasos de la solicitud" />
        </ds-leftnav>
      </div>`,
  }),
};
