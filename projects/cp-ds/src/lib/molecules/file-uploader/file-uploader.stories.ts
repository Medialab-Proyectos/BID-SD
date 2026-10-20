import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DsFileUploader } from './file-uploader.component';

const meta: Meta<DsFileUploader> = {
  title: 'Moléculas/File Uploader',
  component: DsFileUploader,
  parameters: {
    docs: {
      description: {
        component: `\`<ds-file-uploader>\` — componente propio. Zona para elegir o arrastrar archivos y una fila
por archivo con su estado (subiendo · subido · error).

**El componente no sube archivos**: emite \`(filesSelected)\` con los \`File\` elegidos; la app hace la subida y
actualiza \`[files]\` con el estado de cada uno. \`(remove)\` avisa cuando el usuario elimina o descarta uno.
El error se anuncia solo (\`role="alert"\`).`,
      },
    },
  },
  args: { files: [], multiple: false, disabled: false, accept: '.pdf,.doc,.docx' },
};
export default meta;
type Story = StoryObj<DsFileUploader>;

export const Vacio: Story = { name: 'Vacío' };

export const ConArchivos: Story = {
  name: 'Con archivos',
  args: {
    multiple: true,
    files: [
      { name: 'contrato-firmado.pdf', state: 'done' },
      { name: 'anexo-tecnico.pdf', state: 'uploading' },
      { name: 'presupuesto.xlsx', state: 'error', error: 'El archivo supera los 25 MB.' },
    ],
  },
};

export const Deshabilitado: Story = { args: { disabled: true } };
