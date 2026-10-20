import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let nextId = 0;

/**
 * Loader de marca: el isologo del BID se llena con dos olas. Solo para la carga de página
 * completa; para botones, tablas o secciones usar mat-progress-spinner.
 * Simplificación documentada: Figma anima la FORMA de las olas cuadro a cuadro; acá se anima
 * solo su posición vertical.
 */
@Component({
  selector: 'ds-loader-brand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-loader-brand', role: 'status', '[attr.aria-label]': 'label()' },
  template: `
    <svg viewBox="0 0 122.812 113" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path class="ds-loader-brand__silhouette" [attr.d]="silhouette" />
      <defs>
        <mask [attr.id]="maskId"><path [attr.d]="silhouette" fill="#ffffff" /></mask>
      </defs>
      <g [attr.mask]="'url(#' + maskId + ')'">
        <g class="ds-loader-brand__wave">
          <path class="ds-loader-brand__blob ds-loader-brand__blob--1" [attr.d]="wave1" />
          <path class="ds-loader-brand__blob ds-loader-brand__blob--2" [attr.d]="wave2" />
        </g>
      </g>
    </svg>
  `,
})
export class DsLoaderBrand {
  /** Texto que anuncia el lector de pantalla. */
  readonly label = input('Cargando');

  /** id único por instancia: con dos loaders en pantalla un id fijo rompería la máscara. */
  protected readonly maskId = `ds-loader-mask-${nextId++}`;
  protected readonly silhouette = 'M10.754 16.6289C9.18748 52.1381 73.5827 52.0994 64.5382 66.7783L64.3146 67.1475C55.3333 82.5137 85.8461 82.9722 71.5675 112.128C71.1469 112.198 70.7263 112.28 70.298 112.343C36.7426 117.267 5.56357 93.9827 0.653419 60.334C-1.67298 44.3771 2.33298 28.959 10.754 16.6289ZM95.171 0C109.281 9.32479 119.518 24.4103 122.156 42.501C126.669 73.4102 107.434 102.295 78.2628 110.615C81.579 104.429 88.7957 95.4086 104.227 77.2285C127.304 50.032 58.9192 59.1649 47.1974 38.5811C37.5449 21.6237 73.4657 9.43421 95.171 0ZM89.5128 44.9043C86.8824 44.7949 86.4149 46.3853 90.3624 47.2217C95.9345 48.4018 92.1431 45.0138 89.5128 44.9043ZM81.2667 38.6943C73.3682 36.1269 78.5669 42.4695 82.3272 42.8877C86.0835 43.3018 86.8663 40.5116 81.2667 38.6943ZM70.3595 39.8242C80.9042 40.1173 67.3125 28.0564 58.003 32.957C55.7 34.1685 59.8227 39.5349 70.3595 39.8242Z';
  protected readonly wave1 = 'M15.426 -22.187C-27.2317 -34.2307 -28.3846 -10.4522 -41.3549 -5.51121C-51.731 -3.34955 -74.501 116.778 -62.6837 149.513C-50.8663 182.247 98.1472 170.821 158.099 149.513C218.05 128.204 172.51 -2.7319 171.357 -12.305C170.204 -21.8782 157.522 -28.9809 146.858 -28.9809C136.193 -28.9809 128.699 -18.4813 113.135 -18.4813C97.5708 -18.4813 87.4828 -28.3633 67.5951 -28.9809C47.7074 -29.5985 41.0008 -14.9664 15.426 -22.187Z';
  protected readonly wave2 = 'M15.426 -37.187C-27.2317 -49.2307 -28.3846 -25.4522 -41.3549 -20.5112C-51.731 -18.3495 -74.501 101.778 -62.6837 134.513C-50.8663 167.247 98.1472 155.821 158.099 134.513C218.05 113.204 172.51 -17.7319 171.357 -27.305C170.204 -36.8782 157.522 -43.9809 146.858 -43.9809C136.193 -43.9809 128.699 -33.4813 113.135 -33.4813C97.5708 -33.4813 87.4828 -43.3633 67.5951 -43.9809C47.7074 -44.5985 41.0008 -29.9664 15.426 -37.187Z';
}
