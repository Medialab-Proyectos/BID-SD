import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DsSnackbar, openDsSnackbar, type DsSnackbarColor } from './snackbar.component';

@Component({
  selector: 'demo-snackbar-abrir',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatSnackBarModule],
  template: `<button matButton="outlined" (click)="abrir()">Mostrar snackbar</button>`,
})
class DemoSnackbarAbrir {
  private readonly snackBar = inject(MatSnackBar);
  readonly color = input<DsSnackbarColor>('success');
  readonly contrast = input<'high' | 'low'>('high');

  protected abrir() {
    openDsSnackbar(this.snackBar, {
      message: 'Documento guardado', color: this.color(), contrast: this.contrast(), action: 'Deshacer', closable: true,
    }, 8000);
  }
}

const meta: Meta = {
  title: 'Moléculas/Snackbar',
  decorators: [moduleMetadata({ imports: [DsSnackbar, DemoSnackbarAbrir] })],
  parameters: {
    docs: {
      description: {
        component: `\`<ds-snackbar>\` dentro de \`MatSnackBar\` (Figma \`✅Snackbar\`, nodo \`478:7634\`). Mensaje breve y flotante que
informa el resultado de una acción. Material abre, posiciona y cierra; el contenido lo dibuja \`ds-snackbar\`.

\`\`\`ts
openDsSnackbar(inject(MatSnackBar), { message: 'Guardado', color: 'success', action: 'Deshacer', closable: true });
\`\`\`

| Estilo | Qué es |
|---|---|
| \`high\` (default) | Fondo saturado, texto blanco, Label Large **SemiBold**. \`default\` = #141414 sin ícono. \`success\` verde y \`error\` rojo con texto blanco; \`warning\` naranja claro con texto oscuro |
| \`low\` | Fondo claro (igual que Banner), texto oscuro Regular, ícono de estado de color |

Ancho 344px, radio 4px, **Shadow-medium**. Variantes de layout: solo texto, con acción, con cerrar, y \`stacked\`
(acción en una línea aparte, alineada a la derecha — Figma \`Text & longer action\`).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Galeria: Story = {
  name: 'Galería',
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, 360px); gap:16px 32px">
        @for (c of ['default','success','warning','error']; track c) {
          <ds-snackbar [color]="$any(c)" message="Snackbar supporting text" action="Acción" [closable]="true" />
          @if (c !== 'default') { <ds-snackbar [color]="$any(c)" contrast="low" message="Snackbar supporting text" action="Acción" [closable]="true" /> } @else { <span></span> }
        }
        <ds-snackbar color="success" message="Snackbar supporting text" action="Acción" [stacked]="true" />
        <ds-snackbar color="success" contrast="low" message="Snackbar supporting text" [closable]="true" />
      </div>`,
  }),
};

export const Interactivo: Story = {
  render: () => ({ template: `<demo-snackbar-abrir color="success" />` }),
};
