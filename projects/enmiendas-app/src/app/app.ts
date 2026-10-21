import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {
  DsAvatar, DsBreadcrumb, DsIconContainer, DsLeftnav, DsLinkItem, DsStepList, DsTopnav,
  type DsBreadcrumbItem, type DsNavLink, type DsStep,
} from '@bid/cp-ds';

interface Moneda {
  codigo: 'USD' | 'COP';
  seleccionada: boolean;
}

interface CampoGarantia {
  id: number;
  campo: string;
  original: string;
  vigente: string;
  tipo: 'numero' | 'fecha';
  nuevo: string | Date;
}

/**
 * Pantalla "Enmiendas" (Registro de enmienda de monto, paso 1 de 5). Figma CP - UI Components, sección "Enmiendas", nodo 12512:30548.
 * Armada solo con la librería `@bid/cp-ds` (componentes `ds-*`, estilos y `provideCpDs()`) y Angular Material.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatSelectModule, MatTableModule,
    DsAvatar, DsBreadcrumb, DsIconContainer, DsLeftnav, DsLinkItem, DsStepList, DsTopnav,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /** LeftNav expandido (256px) o compacto (92px, solo íconos): las dos variantes que trae el diseño. */
  protected readonly slim = signal(false);

  protected readonly enlaces: DsNavLink[] = [
    { label: 'Activities', url: '#' },
    { label: 'Operation', url: '#' },
    { label: 'Form', url: '#' },
    { label: 'Notification', url: '#' },
  ];

  protected readonly menu = [
    { icon: 'home', label: 'General Procurement Notice', selected: true, trailing: '' },
    { icon: 'folder_managed', label: 'Procurement Management', selected: false, trailing: '' },
    { icon: 'calendar_today', label: 'Payment Schedule', selected: false, trailing: '' },
    { icon: 'payments', label: 'Payment Record', selected: false, trailing: '' },
    { icon: 'finance_chip', label: 'Financial management', selected: false, trailing: 'expand_more' },
    { icon: 'work', label: 'Workflow Management', selected: false, trailing: '' },
  ];

  protected readonly migas: DsBreadcrumbItem[] = [
    { label: 'Procurement Management', url: '#' },
    { label: 'Approved - Plans' },
  ];

  protected readonly datosOperacion = [
    { etiqueta: 'Project', valor: 'PN-L1155', angosta: true },
    { etiqueta: 'Project name', valor: 'Universal Energy Access Program', angosta: false },
    { etiqueta: 'Approved amount', valor: '$ 90,000,000.00', angosta: false },
    { etiqueta: 'Current approved amount', valor: '$ 35,000,000.00', angosta: false },
    { etiqueta: 'Institution', valor: 'Oficina de Electrificacion Rural', angosta: false },
  ];

  protected readonly pasoActual = signal(0);
  // En Figma los cinco pasos llevan el círculo azul (variante Active), no solo el actual.
  protected readonly pasos: DsStep[] = [
    { title: 'Registro\nde enmienda', state: 'active' },
    { title: 'Borrador\nde enmieda', state: 'active' },
    { title: 'Revisión y firma\nde coordinador', state: 'active' },
    { title: 'Solicitud de no objeción', state: 'active' },
    { title: 'Enmienda firmada', state: 'active' },
  ];

  protected readonly monedas = signal<Moneda[]>([
    { codigo: 'USD', seleccionada: true },
    { codigo: 'COP', seleccionada: false },
  ]);
  protected readonly monedasActivas = computed(() => this.monedas().filter((m) => m.seleccionada));

  protected readonly productos = ['Producto del componente 1.1.1', 'Producto del componente 1.1.1'];
  protected readonly opcionesComponente = ['Componente 1.2', 'Componente 1.3'];
  protected readonly opcionesProducto = ['Producto 1.2.1', 'Producto 1.2.2'];
  protected readonly columnasMonto = ['Monto BID', 'Monto aporte local', 'Monto\ncofinanciamiento', 'Total moneda', 'Total equivalente\n(USD)'];

  protected readonly columnasGarantia = ['campo', 'original', 'vigente', 'nuevo'];
  protected readonly garantia: CampoGarantia[] = [
    { id: 1, campo: 'Monto', original: '670,200', vigente: '670,200', tipo: 'numero', nuevo: '0' },
    { id: 2, campo: 'Fecha de emisión', original: 'Text in a cell', vigente: 'Text in a cell', tipo: 'fecha', nuevo: new Date(2023, 7, 17) },
    { id: 3, campo: 'Fecha de finalización', original: 'Text in a cell', vigente: 'Text in a cell', tipo: 'numero', nuevo: '0' },
  ];
  /** Un campo de la garantía solo se puede editar si está marcado. */
  protected readonly marcados = signal<ReadonlySet<number>>(new Set());

  protected alternarMoneda(codigo: Moneda['codigo'], seleccionada: boolean): void {
    this.monedas.update((l) => l.map((m) => (m.codigo === codigo ? { ...m, seleccionada } : m)));
  }

  protected marcar(id: number, marcado: boolean): void {
    this.marcados.update((s) => {
      const n = new Set(s);
      if (marcado) n.add(id); else n.delete(id);
      return n;
    });
  }
}
