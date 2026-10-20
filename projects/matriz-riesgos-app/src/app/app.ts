import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { DsAvatar, DsBanner, DsIconContainer, DsLeftnav, DsStatusIcon, DsStepList, DsTopnav, type DsStep } from '@bid/cp-ds';

interface Riesgo {
  id: number;
  descripcion: string;
  nivel: 'Alto' | 'Medio alto';
  taxonomia: string;
}

/**
 * Pantalla "Matriz de riesgos" (paso 4 del informe). En Figma CP - UI Components el frame se llama "Enmiendas", nodo 12507:21861.
 * Armada solo con la librería `@bid/cp-ds` (componentes `ds-*`, estilos y `provideCpDs()`) y Angular Material.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatBadgeModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatTableModule, MatTabsModule,
    DsAvatar, DsBanner, DsIconContainer, DsLeftnav, DsStatusIcon, DsStepList, DsTopnav,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly enlaces = [
    { label: 'Proyectos', url: '#' },
    { label: 'Tareas', url: '#' },
    { label: 'Contactos', url: '#' },
    { label: 'Ayuda', url: '#' },
  ];

  protected readonly pasos: DsStep[] = [
    { title: 'Información general', subtitle: 'Revisa y agrega notas en las secciones de la ficha de operación.', state: 'completed' },
    { title: 'Asignación presupuestaria', subtitle: 'Informa y/o actualiza el presupuesto aprobado por el país para el año en curso.', state: 'completed' },
    { title: 'Matriz de resultados', subtitle: 'Actualiza y/o agrega notas sobre el avance de los componentes para el informe.', state: 'completed' },
    { title: 'Matriz de riesgos', subtitle: 'Comenta, actualiza o edita los riesgos del informe.', state: 'active' },
    { title: 'Lecciones aprendidas', subtitle: 'Deja los aprendizajes obtenidos durante la ejecución.', state: 'inactive' },
    { title: 'Enlaces de anexos', subtitle: 'Deja archivos anexos almacenados en la nube de tu preferencia.', state: 'inactive' },
    { title: 'Descarga y envío del Informe', subtitle: 'Descarga un respaldo en formato PDF y envía el informe para su aprobación.', state: 'inactive' },
  ];
  protected readonly pasoActual = signal(3);

  protected readonly columnas = ['seleccion', 'id', 'descripcion', 'nivel', 'taxonomia', 'accion'];
  protected readonly riesgos: Riesgo[] = [
    { id: 1, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro de los beneficiarios del programa, afectando el cumplimiento de la meta prevista para IVD 1.1, impactando en un desvío del 10% en el desembolso previsto para el año 3', nivel: 'Alto', taxonomia: 'Entorno Institucional' },
    { id: 2, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro.', nivel: 'Alto', taxonomia: 'Entorno Económico-Financiero' },
    { id: 3, descripcion: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
    { id: 4, descripcion: 'Si el Ministerio de Economía no asignara a la Dirección General de Cultura y Educación un crédito presupuestario equivalente a USD 18 millones en 2025, antes de diciembre de 2024, para la contratación de los recursos humanos requeridos para el funcionamiento de los CSC, no se podría alcanzar la meta del indicador 1.1 para ese año, generando un desvío de un 10% en el monto previsto a desembolsar en el año 3', nivel: 'Alto', taxonomia: 'Gestión y gobernanza públicas.' },
    { id: 5, descripcion: 'Si la implementación de la solución informática para la gestión y monitoreo de los Centros Socioeducativos y Comunitarios (CSC) se demora y no está disponible para el primer trimestre de 2025, se podría incurrir en un subregistro', nivel: 'Medio alto', taxonomia: 'Salvaguardias ambientales y sociales.' },
  ];
}
