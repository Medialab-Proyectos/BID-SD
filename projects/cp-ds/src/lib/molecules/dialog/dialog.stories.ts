import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';
import { DS_DIALOG_WIDTHS } from './dialog-widths';

@Component({
  selector: 'demo-dialogo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      Eliminar documento
      <button matIconButton class="ds-icon-button--sm" mat-dialog-close aria-label="Cerrar"><mat-icon>close</mat-icon></button>
    </h2>
    <mat-dialog-content>
      <p class="ds-text ds-text--body-md" style="margin:0">
        Vas a eliminar «Informe de avance T3». Esta acción no se puede deshacer.
        @if (largo()) {
          @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
            <br /><br />Párrafo de relleno {{ i }} para mostrar el contenido con scroll cuando supera el alto disponible del diálogo.
          }
        }
      </p>
    </mat-dialog-content>
    @if (acciones()) {
      <mat-dialog-actions>
        <button matButton mat-dialog-close>Cancelar</button>
        <button matButton="filled" [mat-dialog-close]="true">Eliminar</button>
      </mat-dialog-actions>
    }
  `,
})
class DemoDialogo {
  readonly largo = input(false);
  readonly acciones = input(true);
}

@Component({
  selector: 'demo-dialogo-abrir',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  template: `<button matButton="filled" (click)="abrir()">Abrir diálogo ({{ ancho() }})</button>`,
})
class DemoDialogoAbrir {
  private readonly dialog = inject(MatDialog);
  readonly ancho = input<string>(DS_DIALOG_WIDTHS.xs);
  readonly largo = input(false);
  readonly acciones = input(true);

  protected abrir() {
    const ref = this.dialog.open(DemoDialogo, { width: this.ancho(), maxWidth: '100vw', maxHeight: this.largo() ? '320px' : undefined });
    ref.componentRef?.setInput('largo', this.largo());
    ref.componentRef?.setInput('acciones', this.acciones());
  }
}

const meta: Meta = {
  title: 'Moléculas/Dialog',
  decorators: [moduleMetadata({ imports: [DemoDialogoAbrir] })],
  parameters: {
    docs: {
      description: {
        component: `\`MatDialog\` de Angular Material con el tema del BID (Figma \`✅Dialog\`, nodo \`608:3504\`).
Superficie blanca, radio 8px, **Shadow-medium**.

| Parte | Spec |
|---|---|
| Título (\`mat-dialog-title\`) | Title Medium Bold 18/24, padding 12px × 24px, botón de cerrar (\`matIconButton\` + \`ds-icon-button--sm\`) a la derecha |
| Contenido (\`mat-dialog-content\`) | Body Medium 14/20, padding 8 / 24 / 16 |
| Acciones (\`mat-dialog-actions\`) | Alineadas a la derecha, gap 16px, padding 16 / 24 / 20. Cancelar = botón de texto, confirmar = \`filled\` |

**Anchos** (Figma \`Width\`): 400 / 700 / 900px — constante \`DS_DIALOG_WIDTHS\`:
\`dialog.open(Componente, { width: DS_DIALOG_WIDTHS.sm, maxWidth: '100vw' })\`.

Variantes de Figma: \`Content: Default | Scrollable\` (el contenido hace scroll solo; fijar \`maxHeight\`) y
\`Footer: Actions | None\` (omitir \`mat-dialog-actions\`).

Los diálogos de confirmación de acciones destructivas deben llevar el foco inicial en **Cancelar**.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const ExtraSmall: Story = {
  name: 'Extra Small (400px)',
  render: () => ({ template: `<demo-dialogo-abrir ancho="400px" />` }),
};
export const Small: Story = {
  name: 'Small (700px)',
  render: () => ({ template: `<demo-dialogo-abrir ancho="700px" />` }),
};
export const Medium: Story = {
  name: 'Medium (900px)',
  render: () => ({ template: `<demo-dialogo-abrir ancho="900px" />` }),
};
export const ConScroll: Story = {
  name: 'Contenido con scroll',
  render: () => ({ template: `<demo-dialogo-abrir ancho="400px" [largo]="true" />` }),
};
export const SinAcciones: Story = {
  name: 'Sin acciones',
  render: () => ({ template: `<demo-dialogo-abrir ancho="400px" [acciones]="false" />` }),
};
