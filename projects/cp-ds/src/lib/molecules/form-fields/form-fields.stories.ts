import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, type MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular-vite';

const PAISES = ['Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador', 'Guatemala', 'México', 'Perú', 'Uruguay'];

/** Demo de autocomplete múltiple con chips (mat-chip-grid + matChipInput + mat-autocomplete). */
@Component({
  selector: 'demo-autocomplete-multiple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatChipsModule, MatAutocompleteModule, MatIconModule],
  template: `
    <label class="ds-field-label" for="paises">Países</label>
    <mat-form-field appearance="outline" style="width:360px">
      <mat-chip-grid #chips aria-label="Países seleccionados">
        @for (p of seleccionados(); track p) {
          <mat-chip-row (removed)="quitar(p)">
            {{ p }}
            <button matChipRemove [attr.aria-label]="'Quitar ' + p"><mat-icon>close</mat-icon></button>
          </mat-chip-row>
        }
        <input id="paises" placeholder="Buscar país" [matChipInputFor]="chips" [matAutocomplete]="auto"
               (input)="texto.set($any($event.target).value)" #input />
      </mat-chip-grid>
      <mat-autocomplete #auto (optionSelected)="agregar($event); input.value = ''; texto.set('')">
        @for (p of opciones(); track p) { <mat-option [value]="p">{{ p }}</mat-option> }
      </mat-autocomplete>
      <mat-hint>Puedes elegir varios.</mat-hint>
    </mat-form-field>
  `,
})
class DemoAutocompleteMultiple {
  protected readonly seleccionados = signal(['Chile', 'Perú']);
  protected readonly texto = signal('');
  protected readonly opciones = computed(() =>
    PAISES.filter((p) => !this.seleccionados().includes(p) && p.toLowerCase().includes(this.texto().toLowerCase())),
  );
  protected agregar(e: MatAutocompleteSelectedEvent) {
    this.seleccionados.update((s) => [...s, e.option.value]);
  }
  protected quitar(p: string) {
    this.seleccionados.update((s) => s.filter((x) => x !== p));
  }
}

const meta: Meta = {
  title: 'Moléculas/Campos de formulario',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule,
        MatDatepickerModule, MatIconModule, MatButtonModule, DemoAutocompleteMultiple,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `\`<mat-form-field appearance="outline">\` de Angular Material con el tema del BID.

**Patrón del BID:** la etiqueta va **arriba** del campo (Label Large SemiBold), no flotando en el borde:
\`<label class="ds-field-label" for="id">\` + \`mat-form-field\` **sin** \`<mat-label>\`. El \`for\`/\`id\` es lo
que asocia la etiqueta al campo para el lector de pantalla.

- Alto 56px · small 40px (clase \`ds-field--sm\` en el \`mat-form-field\`).
- Borde #919193 (ajustado por contraste, ver Huecos A3) · hover #67676a · foco azul 2px.
- Error: borde #d83a52 y texto #a60001 (\`mat-error\`). Ayuda: \`mat-hint\`.
- Deshabilitado: fondo #f3f3f3.
- DatePicker: \`provideCpDs()\` + \`provideNativeDateAdapter()\` en la app (fechas en español, semana desde el lunes).`,
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Input: Story = {
  render: () => ({
    props: {
      nombre: new FormControl(''),
      email: (() => {
        const c = new FormControl('correo-invalido', [Validators.email]);
        c.markAsTouched();
        return c;
      })(),
      deshabilitado: new FormControl({ value: 'No editable', disabled: true }),
    },
    template: `
      <div style="display:grid; grid-template-columns:repeat(2, 320px); gap:8px 32px">
        <div>
          <label class="ds-field-label" for="nombre">Nombre</label>
          <mat-form-field appearance="outline" style="width:100%">
            <input matInput id="nombre" [formControl]="nombre" placeholder="Ej. Olga Pérez" />
            <mat-hint>Como figura en el documento.</mat-hint>
          </mat-form-field>
        </div>
        <div>
          <label class="ds-field-label" for="buscar">Buscar</label>
          <mat-form-field appearance="outline" style="width:100%">
            <mat-icon matPrefix>search</mat-icon>
            <input matInput id="buscar" placeholder="Buscar proyecto" />
          </mat-form-field>
        </div>
        <div>
          <label class="ds-field-label" for="email">Correo</label>
          <mat-form-field appearance="outline" style="width:100%">
            <input matInput id="email" [formControl]="email" />
            <mat-error>Ingresa un correo válido.</mat-error>
          </mat-form-field>
        </div>
        <div>
          <label class="ds-field-label" for="deshab">Deshabilitado</label>
          <mat-form-field appearance="outline" style="width:100%">
            <input matInput id="deshab" [formControl]="deshabilitado" />
          </mat-form-field>
        </div>
        <div>
          <label class="ds-field-label" for="monto">Monto (small)</label>
          <mat-form-field appearance="outline" class="ds-field--sm" style="width:100%">
            <span matTextPrefix>US$&nbsp;</span>
            <input matInput id="monto" type="number" placeholder="0" />
          </mat-form-field>
        </div>
      </div>`,
  }),
};

export const Textarea: Story = {
  render: () => ({
    template: `
      <label class="ds-field-label" for="comentario">Comentario</label>
      <mat-form-field appearance="outline" style="width:420px">
        <textarea matInput id="comentario" #t maxlength="200" rows="4" placeholder="Escribe tu comentario"></textarea>
        <mat-hint>Opcional.</mat-hint>
        <mat-hint align="end">{{ t.value.length }}/200</mat-hint>
      </mat-form-field>`,
  }),
};

export const Select: Story = {
  render: () => ({
    props: { paises: PAISES },
    template: `
      <label class="ds-field-label" for="pais">País</label>
      <mat-form-field appearance="outline" style="width:320px">
        <mat-select id="pais" placeholder="Elige un país">
          @for (p of paises; track p) { <mat-option [value]="p">{{ p }}</mat-option> }
        </mat-select>
      </mat-form-field>`,
  }),
};

export const Autocomplete: Story = {
  render: () => ({
    props: { paises: PAISES },
    template: `
      <label class="ds-field-label" for="pais-ac">País</label>
      <mat-form-field appearance="outline" style="width:320px">
        <input matInput id="pais-ac" [matAutocomplete]="auto" placeholder="Escribe para buscar" />
        <mat-autocomplete #auto>
          @for (p of paises; track p) { <mat-option [value]="p">{{ p }}</mat-option> }
        </mat-autocomplete>
      </mat-form-field>`,
  }),
};

export const AutocompleteMultiple: Story = {
  name: 'Autocomplete múltiple (chips)',
  render: () => ({ template: `<demo-autocomplete-multiple />` }),
};

export const DatePicker: Story = {
  render: () => ({
    template: `
      <label class="ds-field-label" for="fecha">Fecha de inicio</label>
      <mat-form-field appearance="outline" style="width:320px">
        <input matInput id="fecha" [matDatepicker]="picker" placeholder="DD/MM/AAAA" />
        <mat-datepicker-toggle matIconSuffix [for]="picker" />
        <mat-datepicker #picker />
      </mat-form-field>`,
  }),
};
