import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export interface DsUploadedFile {
  name: string;
  /** uploading = subiendo · done = subido · error = falló */
  state: 'uploading' | 'done' | 'error';
  /** Mensaje de error (solo en state = 'error'). */
  error?: string;
}

let nextId = 0;

/**
 * File Uploader del BID: zona para arrastrar o elegir archivos + fila por archivo con su estado.
 * El componente no sube nada: emite los archivos elegidos (`filesSelected`) y la app maneja la subida
 * y actualiza `files` con el estado de cada uno.
 */
@Component({
  selector: 'ds-file-uploader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-upload', '[class.ds-upload--disabled]': 'disabled()', '[class.ds-upload--dragover]': 'dragOver()' },
  template: `
    <div class="ds-upload__card" (dragover)="onDragOver($event)" (dragleave)="dragOver.set(false)" (drop)="onDrop($event)">
      <span class="ds-upload__icon ds-icon" aria-hidden="true">upload_file</span>
      <p class="ds-upload__text">
        <label class="ds-upload__link" [for]="inputId" style="cursor:pointer">{{ selectLabel() }}</label>
        {{ dropLabel() }}
      </p>
      <span class="ds-upload__hint" [id]="hintId">{{ hint() }}</span>
      <input [id]="inputId" type="file" class="cdk-visually-hidden" [accept]="accept()" [multiple]="multiple()"
             [disabled]="disabled()" [attr.aria-describedby]="hintId" (change)="onPick($event)" />
    </div>

    @for (f of files(); track f.name) {
      <div class="ds-upload__file" [class.ds-upload__file--info]="f.state === 'done'"
           [class.ds-upload__file--uploading]="f.state === 'uploading'" [class.ds-upload__file--error]="f.state === 'error'"
           [attr.role]="f.state === 'error' ? 'alert' : null">
        <span class="ds-icon" aria-hidden="true">{{ f.state === 'error' ? 'error' : 'info' }}</span>
        <span class="ds-upload__file-name">{{ f.state === 'error' && f.error ? f.error : f.name }}</span>
        @if (f.state === 'uploading') {
          <span class="ds-iconbtn ds-iconbtn--sm" role="status" [attr.aria-label]="'Subiendo ' + f.name">
            <span class="ds-icon" aria-hidden="true">progress_activity</span>
          </span>
        } @else {
          <button type="button" class="ds-iconbtn ds-iconbtn--sm" (click)="remove.emit(f)"
                  [attr.aria-label]="(f.state === 'error' ? 'Descartar ' : 'Eliminar ') + f.name">
            <span class="ds-icon" aria-hidden="true">{{ f.state === 'error' ? 'close' : 'delete' }}</span>
          </button>
        }
      </div>
    }
  `,
})
export class DsFileUploader {
  readonly files = input<DsUploadedFile[]>([]);
  readonly accept = input('');
  readonly multiple = input(false);
  readonly disabled = input(false);
  readonly selectLabel = input('Haz clic para subir');
  readonly dropLabel = input('o arrastra los archivos aquí');
  readonly hint = input('Formatos aceptados: PDF, DOC (máx. 25 MB)');

  readonly filesSelected = output<File[]>();
  readonly remove = output<DsUploadedFile>();

  protected readonly dragOver = signal(false);
  protected readonly inputId = `ds-upload-${nextId++}`;
  protected readonly hintId = `${this.inputId}-hint`;

  protected onPick(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) this.filesSelected.emit(Array.from(input.files));
    input.value = ''; // permite volver a elegir el mismo archivo
  }

  protected onDragOver(e: DragEvent) {
    if (this.disabled()) return;
    e.preventDefault();
    this.dragOver.set(true);
  }

  protected onDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver.set(false);
    if (this.disabled() || !e.dataTransfer?.files.length) return;
    const files = Array.from(e.dataTransfer.files);
    this.filesSelected.emit(this.multiple() ? files : files.slice(0, 1));
  }
}
