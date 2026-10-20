/*
 * API pública de @bid/cp-ds.
 * Solo componentes propios del BID: para todo lo que Angular Material ya trae, se usa Material directo
 * con el tema (styles/cp-ds.scss).
 */

// Configuración (provideCpDs en app.config.ts)
export * from './lib/core/provide-cp-ds';

// Átomos
export * from './lib/atoms/avatar/avatar.component';
export * from './lib/atoms/icon-container/icon-container.component';
export * from './lib/atoms/status-icon/status-icon.component';
export * from './lib/atoms/loader-brand/loader-brand.component';
export * from './lib/atoms/favorite-toggle/favorite-toggle.component';

// Moléculas
export * from './lib/molecules/breadcrumb/breadcrumb.component';
export * from './lib/molecules/rating/rating.component';
export * from './lib/molecules/file-uploader/file-uploader.component';
export * from './lib/molecules/link-item/link-item.component';
export * from './lib/molecules/banner/banner.component';
export * from './lib/molecules/snackbar/snackbar.component';
export * from './lib/molecules/dialog/dialog-widths';
export * from './lib/molecules/popover/popover.component';
export * from './lib/molecules/mini-card/mini-card.component';

// Organismos
export * from './lib/organisms/topnav/topnav.component';
export * from './lib/organisms/footer/footer.component';
export * from './lib/organisms/leftnav/leftnav.component';
export * from './lib/organisms/step-list/step-list.component';
