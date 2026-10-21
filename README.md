# Client Portal — Sistema de diseño (`@bid/cp-ds`)

Librería Angular + Storybook del sistema de diseño del Client Portal del BID. Angular 21, Angular Material 21, Storybook 10.
Organizada con Atomic Design: Fundamentos, Átomos, Moléculas, Organismos y Plantillas.

**Regla principal:** si Angular Material tiene el componente, se usa `mat-*` directo con el tema del BID. Solo existen componentes `ds-*`
cuando Material no tiene equivalente (Banner, Snackbar, Avatar, TopNav, LeftNav, Stepper…).

## Qué hay en este repositorio

| Carpeta | Contenido |
|---|---|
| `projects/cp-ds/` | La librería: componentes `ds-*`, tema de Material, tokens y estilos. Se empaqueta con ng-packagr como `@bid/cp-ds`. |
| `projects/cp-ds/.storybook/` | Configuración de Storybook. |
| `projects/matriz-riesgos-app/` | App de ejemplo (pantalla "Matriz de riesgos") que consume la librería empaquetada, como lo haría un proyecto real. |
| `projects/enmiendas-app/` | Segunda app de ejemplo (pantalla "Enmiendas": registro de enmienda de monto), también armada solo con la librería. |
| `scripts/` | Verificaciones: `lint:paleta` (todo color sale de la paleta) y `lint:tokens` (todo `--ds-*` usado está definido). |
| `HUECOS-DEL-SISTEMA.md` | Registro interno de huecos, inconsistencias y decisiones frente a Figma. |

## Comandos

```bash
npm ci                    # instalar dependencias
npm run storybook         # Storybook en http://localhost:6006
npm run build-storybook   # sitio estático en storybook-static/
npm run build:lib         # empaquetar la librería en dist/cp-ds
npm run matriz-riesgos    # compilar la librería y levantar la app de ejemplo en http://localhost:4200
npm run enmiendas         # compilar la librería y levantar la app Enmiendas en http://localhost:4201
npm run lint:estilos      # paleta + tokens
```

## Usar la librería en una app Angular

1. En `angular.json` → `styles`: `node_modules/@bid/cp-ds/styles/cp-ds.scss`, y en `assets` copiar `node_modules/@bid/cp-ds/assets` a `assets`.
2. En `index.html`: Open Sans (400/600/700) y Material Symbols Outlined **con rangos de ejes**
   (`opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`); con valores fijos los íconos rellenos no funcionan.
3. En `app.config.ts`: `providers: [provideCpDs(), provideNativeDateAdapter()]`.
4. Importar los componentes: `import { DsTopnav, DsBanner } from '@bid/cp-ds'`.

El modo oscuro del sistema es el contexto **inverse**: la clase `.ds-inverse` sobre un contenedor lo activa para todo lo que tenga adentro.

## Reglas del sistema

- **Colores:** todos salen de la paleta de Visual Styles. Si un color de Figma no cumple WCAG 2.1 AA, se reemplaza por otro tono de la misma paleta.
- **Tokens:** se usan siempre los `--ds-*`; nunca valores sueltos.
- **Accesibilidad:** objetivo WCAG 2.1 AA.
