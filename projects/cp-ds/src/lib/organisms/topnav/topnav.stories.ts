import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsAvatar } from '../../atoms/avatar/avatar.component';
import { DsTopnav } from './topnav.component';

const LINKS = [
  { label: 'Inicio', url: '#', active: true },
  { label: 'Operaciones', url: '#' },
  { label: 'Reportes', url: '#' },
];

const ACCIONES = `
  <ng-container dsTopnavActions>
    <button matIconButton aria-label="Notificaciones, 1 nueva"><mat-icon matBadge="1">notifications</mat-icon></button>
    <button matIconButton aria-label="Ayuda"><mat-icon>help_outline</mat-icon></button>
    <ds-avatar name="Federico Ruiz" initials="FR" />
  </ng-container>`;

const meta: Meta<DsTopnav> = {
  title: 'Organismos/TopNav',
  component: DsTopnav,
  decorators: [moduleMetadata({ imports: [MatButtonModule, MatIconModule, MatBadgeModule, MatFormFieldModule, MatInputModule, DsAvatar] })],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `\`<ds-topnav>\` — barra superior (componente propio). Logo + links + acciones proyectadas
con el atributo \`dsTopnavActions\`. Link activo con \`aria-current="page"\`.
\`[inverse]="true"\` = estilo Blue (#004e70): los botones de Material proyectados pasan solos a su variante inverse.`,
      },
    },
  },
  args: { productName: 'Client Portal', links: LINKS, inverse: false },
  render: (args) => ({ props: args, template: `<ds-topnav [productName]="productName" [links]="links" [inverse]="inverse">${ACCIONES}</ds-topnav>` }),
};
export default meta;
type Story = StoryObj<DsTopnav>;

export const White: Story = {};
export const Blue: Story = { name: 'Blue (inverse)', args: { inverse: true } };

export const Completo: Story = {
  name: 'Completo (idioma, workspace, buscador)',
  parameters: {
    docs: {
      description: {
        story: `Todos los elementos del \`TopNav-header\` de Figma: **idioma** (\`languages\` + \`[(language)]\`), **workspace** (botón azul relleno con el
contexto activo; \`workspaces\` + \`[(workspace)]\` abren un menú para cambiarlo), buscador proyectado con \`dsTopnavSearch\`, notificaciones con
contador, ayuda, soporte y avatar.`,
      },
    },
  },
  render: (args) => ({
    props: { ...args, workspaces: ['Procesos Financieros', 'Adquisiciones', 'Gestión de proyectos'] },
    template: `
      <ds-topnav productName="Portal de Clientes" [links]="links" [inverse]="inverse"
                  [languages]="['ENG', 'ESP', 'POR']" workspace="Procesos Financieros" [workspaces]="workspaces">
        <mat-form-field dsTopnavSearch appearance="outline" class="ds-field--global" subscriptSizing="dynamic" style="width:100%">
          <input matInput aria-label="Buscar en el portal" placeholder="Buscar" />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        <ng-container dsTopnavActions>
          <button matIconButton aria-label="Notificaciones, 1 nueva"><mat-icon matBadge="1">notifications</mat-icon></button>
          <button matIconButton aria-label="Ayuda"><mat-icon>help_outline</mat-icon></button>
          <button matIconButton aria-label="Soporte"><mat-icon>headset_mic</mat-icon></button>
          <ds-avatar name="Federico Ruiz" initials="FR" />
        </ng-container>
      </ds-topnav>`,
  }),
};
