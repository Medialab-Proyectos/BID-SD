# Huecos del sistema

> Documento interno de seguimiento — no se publica en Storybook. Registra lo que falta, es
> inconsistente o no cumple accesibilidad en el sistema de diseño, con la decisión aplicada en la
> librería `@bid/cp-ds`.

Lo que falta, es inconsistente o no cumple accesibilidad en el sistema de diseño, con la decisión
aplicada en esta librería. **Decisión aplicada** = lo que hace hoy el código; **Pendiente** = lo que
tiene que resolver Diseño (en Figma) o Programación.

Contrastes calculados con la fórmula de luminancia de WCAG 2.x.

## Alta prioridad

| # | Hueco | Evidencia | Decisión aplicada | Pendiente |
|---|---|---|---|---|
| A1 | Stack de Client Portal incompatible | Angular 21 con Angular Material/CDK 18.2 y TypeScript 5.4.5 (Angular 21 exige ≥ 5.9). La app no compila. | Esta librería usa Angular 21 + Material 21 + TS 5.9. | Programación: actualizar Material/CDK a 21 y TypeScript a 5.9 en CP. |
| A2 | El tema de Material de CP no usa el sistema del BID | `src/styles/settings/__ThemingAngularMaterial.scss`: paleta default índigo/rosa (M2). | Tema M3 conectado a los tokens `--ds-*` (`styles/_material-theme.scss`). | Programación: reemplazar ese archivo por `cp-ds.scss`. |
| A3 | Borde de inputs no cumple contraste | Figma: `--ds-color-border-control` #bcbcbe sobre blanco = **1.90:1**. WCAG 1.4.11 exige 3:1 para el contorno de controles. | **Corregido:** el token pasa a `--ds-neutral-variant-40` #919193 = 3.15:1. El hover (#67676a, 5.64:1) no cambia. | Diseño: actualizar Figma con #919193. |
| A4 | Links y texto azul sobre fondo no cumplen AA | Figma: `#007eb6` sobre el fondo `#f9f9fa` = **4.28:1**; mínimo AA 4.5:1. Afecta links y etiquetas de los botones Secondary y Link. | **Corregido:** `--ds-color-text-link` pasa a `--ds-sky-40` #0072a4 (5.06:1 sobre fondo, 5.33:1 sobre blanco) y lo usan links y botones Secondary/Link. El Primary relleno sigue en #007eb6 (blanco encima = 4.51:1, cumple). | Diseño: actualizar Figma con #0072a4 para texto azul. |
| A5 | Nombre de token engañoso: `text/brand` | En Figma `text/brand` = #004e70 (Tabs, LeftNav); en los tokens `--ds-color-text-brand` = #003b54. | Los componentes usan `--ds-ocean-50` (#004e70) directo. | Diseño: unificar el valor de `text/brand`. |
| A6 | Modo oscuro (inverse) solo definido para algunos componentes | Hay inverse en Button, IconButton, Icon, logos, TopNav y Footer. No en inputs, checkbox, radio, select ni tabs. | Scope `.ds-inverse` con los roles verificados; el resto de componentes hereda esos roles (no verificado). | Diseño: definir inverse para los controles de formulario, o declarar que no van sobre superficie de marca. |

## Media prioridad

| # | Hueco | Evidencia | Decisión aplicada | Pendiente |
|---|---|---|---|---|
| M1 | `surface-container*` no coincide con los componentes | Los tokens son tintes azules (#d9f3ff…), pero menús, selects y diálogos en Figma son blancos. | Los roles `surface-container*` de Material se mapean a blanco/gris. | Diseño: definir para qué sirven los surface-container azules. |
| M2 | Colores fuera de la paleta | Figma usa colores que no están en la paleta de Visual Styles: borde del botón Secondary #d8d8d9 y texto secundario del Link-Item `rgba(0,0,0,.6)`. | **Corregido:** borde → Neutral variant 80 #c7c7c9; texto secundario → `--ds-color-text-subtle` #555353. `npm run lint:paleta` falla si aparece un color fuera de paleta. | Diseño: actualizar Figma con los colores de paleta. |
| M8 | Texto azul sobre fondo seleccionado no cumple AA | Link-Item y Menu seleccionados: #007eb6 sobre #d9f4ff = **3.93:1**. | **Corregido:** usan `--ds-color-text-link` (Blue Sky 40 #0072a4) = 4.65:1. | Diseño: actualizar Figma. |
| M9 | Paso pendiente del Stepper no cumple AA | Número blanco sobre #a6a6a8 = **2.43:1**; título en #929090 = 3.17:1. Un paso pendiente es información, no un control deshabilitado (WCAG no lo exime). | **Corregido:** círculo → Neutral variant 30 #67676a (5.64:1); título → Neutral 70 #6d6b6b (5.30:1). | Diseño: actualizar Figma. |
| M3 | Deshabilitado inverse sin fondo definido | Solo existe el texto "Inverse Disabled" (#fff, 38%). | Fondo `rgba(255,255,255,.12)` inferido (espejo del 12% en claro). | Diseño: confirmar. |
| M4 | `inverse-surface` incompleto | Solo aparece `inverse-surface-darkblue` (#004e70). Tooltip y snackbar no tienen color definido. | `inverse-surface` = #004e70. | Diseño: confirmar color de tooltip y snackbar. |
| M5 | Opacidades de hover/pressed distintas por componente | Button 8% / 16%; IconButton 12% / 20%. | Se respeta cada componente. | Diseño: unificar la escala de estados. |
| M6 | Estado "loading" del botón | Existe en Figma; Angular Material no lo trae. | Pendiente de implementar como directiva. | — |
| M7 | Error apenas cumple AA | `#d83a52` sobre blanco = 4.52:1; sobre el fondo `#f9f9fa` = 4.30:1 (no cumple AA). | Se usa el valor de Figma. | Diseño: usar `--ds-color-text-danger` (#a60001, 8.01:1) para el texto de error. |

## Baja prioridad

| # | Hueco | Evidencia | Decisión aplicada | Pendiente |
|---|---|---|---|---|
| B1 | Pesos tipográficos incompletos (**corregido**) | Verificado contra Figma (nodo `1:23`): Title lg/md/sm solo tiene Regular; Headline Small y Label Medium no tienen Bold; Label Small solo Regular. La librería tenía **9 clases de más** (`title-lg/md/sm-semibold/bold`, `headline-sm-bold`, `label-md-bold`, `label-sm-semibold`) y una escala `label-xs` que **no tenía uso en ese momento**. | Se borraron las 9 clases. **Corrección posterior:** de esas, 4 sí existen como estilos de Figma usados por componentes — `title-md-bold` (Dialog, CardTitle y sub-header de Enmiendas), `title-lg-semibold` (Drawer-Header), `title-md-semibold` (MiniCard) y `title-sm-semibold` (cabecera de Table) — y se restauraron. Siguen borradas: `headline-sm-bold`, `title-lg-bold`, `title-md-bold`→(restaurada), `label-md-bold`, `label-sm-semibold`.  **Corrección posterior:** `label-xs` (10/16, solo SemiBold) **sí existe en Figma** (`fontsize/label/xs`, "Label/x-Small SemiBold") y lo usan los Status-Chips x-small: se restauró el token y `ds-text--label-xs-semibold`. El único uso real (`headline-sm-bold` en el template) pasó a `headline-sm-semibold`. Ver Fundamentos/Tipografía. | — |
| B2 | Stepper: Active y Completed se ven iguales | En el átomo "Step" ambos son círculo azul con número. Confirmado contra Figma: `Step` los declara como estados distintos (`State: Error | Inactive | Active | Completed | Incomplete`) aunque se dibujen igual. | Se respeta Figma. | Diseño: confirmar si Completed debería distinguirse. Ver F4. |
| B3 | DatePicker: sin estado "hoy" | No está en el ejemplo de Figma revisado. | Anillo primary inferido. | Diseño: confirmar. |
| B4 | Avatar 32px sin instancia | Solo aparece en la columna "Size" de Figma. | Se ofrece como tamaño small. | Diseño: confirmar. |
| B5 | Nombre de variable engañoso: `icon/hover` | El código exportado sugiere #535354 sólido, pero el render real del hover es gris claro. | Se usa el render real. | Diseño: renombrar la variable. |
| B6 | Warning como texto | `#e38a05` sobre blanco = 2.66:1. | Existe `--ds-color-text-warning-safe` (#804f02, 6.91:1) para texto. | — |
| B8 | Checkbox de 20px | Figma `Checkbox` tiene `Size: Small | XSmall`, no una medida en px. Material 21 no expone el tamaño de la caja como token (18px fijo). | Se respeta 18px; radio 4px como Figma. | Diseño confirma a qué px equivalen `Small` y `XSmall`. |
| B9 | Spinner con degradado | Figma `ProgressSpinner` tiene `Type: Indeterminate | Casual`; "Casual" es la variante con degradado. `mat-progress-spinner` dibuja un trazo sólido. | Color sólido azul (equivale a `Indeterminate`). Para la carga de marca existe `ds-loader-brand`. | Implementar `Casual` con SVG propio si se requiere. |
| B11 | Paso completado con ícono | `mat-stepper` muestra lápiz/check en pasos completados; el BID muestra el número. Figma lo confirma: `.Step-enable` tiene `Content: Icon | Number`. | Documentado: `matStepperIcon="edit"` y `"done"` con `index + 1` (ver Organismos/Stepper). | — |

## Reconciliación con Figma (19 oct 2026)

Con el acceso a los archivos de Figma resueltos (cuenta christianbe@iadb.org), se inventarió
**CP — UI Components**: **124 component sets** (141 assets publicados) en 47 páginas. Esta librería
cubre hoy **25 familias de componentes**. Lo que sigue es la diferencia medida, no estimada.

Dos huecos anteriores quedaron **corregidos por el inventario**:

- **B7 (retirado).** Decía que Table, Dialog, Snackbar, Tooltip, Chips y Accordion no tenían spec en
  Figma. **Es falso:** las seis tienen páginas y component sets propios (`✅Table`, `✅Dialog`,
  `✅Snackbar`, `✅Tooltip /Popover`, `✅Chips`, `✅Accordeon`). El hueco real es de implementación,
  no de diseño: ver F1 abajo.
- **B10 (corregido).** El logo blanco no está limitado a "IDB Group": el component set `IDB-logos`
  tiene `Brand: IDB | IDB-Group`, `Style: Color | Grey | White`, `Lang: Eng | Spa | Fre`,
  `Size`, `Dark Mode` y `ProductName`. El SVG "BID" en blanco **existe**; hay que exportarlo.

### F — Huecos de cobertura

| # | Hueco | Evidencia | Decisión aplicada | Pendiente |
|---|---|---|---|---|
| F1 | Familias de Figma sin construir (**reducido**) | Tras la integración de esta ronda quedan sin cubrir: `Brand (logo)` como componente, `Dialog-Feedback` (diálogo de calificación), `Badge with Component`, `Calendar [desktop]` con `Range`, `Static chip` con sus colores extra (green, blue, white), tabla **anidada** y **With Footer**, `Link-Item-Dark`, `Banner`/`Snackbar` con animación de entrada. | Ver sección "Integración de UI Components" más abajo para lo que ya está. | Priorizar y construir. |
| F2 | Logo como componente | `IDB-logos` es un component set con 6 propiedades (marca, idioma, estilo, tamaño, dark mode, nombre de producto). La librería solo trae 2 SVG sueltos y los arma a mano en TopNav/Footer. | `assetsPath` + nombre de archivo calculado. | Exportar las variantes que el CP use y hacer un `ds-brand` que las seleccione, o documentar qué combinación corresponde a cada contexto. |
| F3 | `Button` sin `Filter Badge` | `Button` tiene la propiedad booleana `Filter Badge#7425:0`, ausente en la librería. | No implementada. | Diseño indica su uso (parece un contador de filtros activos). |
| F4 | Estados de `Step` más ricos que los implementados | `Step` tiene `State: Error | Inactive | Active | Completed | Incomplete` y `Type: Default | Hover | Selected`. `ds-step-list` no cubre `Hover`/`Selected` como eje separado. Esto reemplaza el hueco B2. | `ds-step-list` implementa los cinco `State`. | Decidir si `Type` es un eje real o estados de interacción del mismo nodo. |
| F5 | Nombres de ejes distintos entre Figma y la librería | `Link-Item` usa `Height: Tall | Compact`; la librería usa el input `slim`. `Icon status` usa `Status: Active | Incomplete | Complete | Error`; `ds-status-icon` usa otros nombres. | Se mantienen los nombres actuales. | Alinear nomenclatura antes de publicar la v1, o dejar el mapeo documentado. |
| F6 | Erratas publicadas en Figma | Valores de variante con error tipográfico, ya publicados: `Tittle`, `12 Colunms`, `Multiple choise`, `Errot` (en `.Step-Elements`), `Hovere` (valor duplicado de `Hovered` en `.Calendar Cells`), `Icon Rigth`, `Accodion`, `End adorment`. También nombres duplicados: el componente de Footer se llama `TopNav-header`, igual que el de TopNav. | No afectan al código: la librería no lee nombres de Figma. | Diseño corrige antes de que alguien genere código desde esos nombres. |
| F7 | Los íconos no están en UI Components | En el inventario los íconos aparecen solo como dependencias externas (`add`, `star`, `search`, `close`, `arrow_drop_down`, `check_bold`, `open_in_new`, `first_page`…), no como componentes del archivo. Viven en `IDB-DS Icons`. | Se usa Material Symbols Outlined por fuente. | Verificar que cada ícono del CP exista en Material Symbols; los que no, exportarlos como SVG. |
| F8 | Tamaños de ícono: coinciden | `Icon_comp` → `Size: 12 | 16 | 24* | 32 | 64`. La librería: `ds-icon--xs/s/m/l/xl` = 12/16/24/32/64. | Coincide exactamente. | — |
| F9 | Píldora de página actual del breadcrumb: 3.47:1 | Nodo `1088:35139`: el último tramo usa `Button/Link/background-pressed` #007eb629 (16% de #007eb6) de fondo con texto `Button/Link/text` #007eb6 encima. Compuesto sobre #f9f9fa da **3.47:1**, por debajo de AA para texto de 14px. | Fondo Blue Sky 95 #d9f4ff (= `Interaction/selected`, tono real del sistema) con texto Blue Sky 40 #0072a4 = **4.65:1**. | Diseño valida el ajuste. Misma corrección que M8. |
| F11 | Faltaba el eje `Content: Icon | Number` del stepper | `.Step-enable` (nodo `12097:29288`) tiene `Content: Icon | Number`: son **dos modos**, no un detalle. En modo ícono el paso es un anillo (gris pendiente / azul actual) y cada estado trae su glifo; en modo número es una bolita numerada. Diseño confirma que **el modo ícono es el que más se usa**, porque sirve cuando los pasos no se recorren en orden y cada uno tiene que comunicar su estado. | `ds-step-list` ahora tiene `content`, con **`icon` por defecto**. En modo número, incompleto y error siguen mostrando ícono (así lo hace `Step`, `540:11813`). Se agregó el estado `inactive` (anillo gris) a `ds-status-icon`. | — |
| F13 | Stepper y Lista de pasos estaban separados en dos organismos | En Figma, "Stepper" (`540:11954`) y "Step" (`540:11813`) viven en la **misma página**: el primero compone al segundo en fila/columna con un conector. La librería los tenía como dos stories distintas (`Organismos/Stepper` con solo `mat-stepper`, `Organismos/Lista de pasos` con `ds-step-list`). | Se unificaron en un solo organismo `Organismos/Stepper`: `ds-step-list` ahora tiene `orientation: vertical | horizontal` y cubre los dos usos; `mat-stepper` queda documentado ahí mismo como sección aparte, para cuando se necesita contenido por paso (sin spec en Figma). | — |
| F12 | Anillo gris del paso pendiente: 2.41:1 | `.Step-enable` Content=Icon + Enable=No usa `Colors/Gray-variant/50` #a6a6a8. Sobre blanco da **2.41:1**, por debajo del 3:1 que pide WCAG 1.4.11 para gráficos que transmiten información. | Neutral variant 30 #67676a (5.64:1), el mismo tono que ya usaba la bolita numerada inactiva (M9). | Diseño valida. Es la misma corrección que M9, ahora también en el modo ícono. |
| F10 | `Completed` se dibuja distinto en dos component sets | `.Step-Elements` (`540:11802`) pinta `Completed` como un **check_circle azul**; `Step` (`540:11813`), que es el que usa el Stepper, lo pinta como **círculo azul con el número** — igual que `Active`. Los dos están publicados. | Se sigue a `Step`: círculo azul con número (es el que compone el Stepper). | Diseño unifica: o `Completed` lleva check, o no. Esto decide también B2. |
| F14 | Icon Button: ícono descentrado en `sm`/`outlined` | `icon-size` del override de Material solo define una variable CSS que nadie consume (el glifo se queda en 24px real pese al override a 18px); `border` del outline resta 2px al área de contenido sin recalcular el padding. Ambos desbordan el ícono hacia abajo-derecha (medido: offset +1,+1 / +3,+3 / +4,+4 según combinación). | **Corregido:** se fija `font-size/width/height:18px` en `.mat-icon` dentro de `.ds-icon-button--sm`; el borde del outline pasa de `border` a `outline` (no participa del box model). Offset verificado en 0,0 en las 4 combinaciones. | — |
| F15 | Switch pequeño: el punto queda pegado al borde | El margen del punto prendido (`selected-handle-horizontal-margin`) es un valor horneado por Material en el CSS del propio componente (`margin: var(--…, 0 24px)`), pensado para la pista mediana (52px: 52-24-16=12px de aire). `.ds-switch--sm` nunca lo redeclaraba, así que en la pista chica (36px) 24+12(punto)=36 = el ancho completo, cero aire. | Se agregan `selected-handle-horizontal-margin: 0 16px` y `unselected-handle-horizontal-margin: 0 6px` al override, escalados a la misma proporción que el resto de la pista chica (36/52 ≈ 0.69). Verificado: rightGap pasa de 0 a 8px. | — |
| F16 | DatePicker: celda "OCT" en vez de blanco/días del mes anterior | Angular Material rellena los días vacíos de la primera semana con una celda `mat-calendar-body-label` (el nombre del mes, `colspan` sobre los días faltantes) — comportamiento nativo de accesibilidad del CDK, no introducido por el tema. El component set `.Calendar Cells` de Figma tiene un `Type: Null` (celda vacía) y `Type: Prev/Next` (día real del mes adyacente), ninguno de los cuales es "mostrar el nombre del mes". | Se deja el comportamiento nativo de Material (es información útil, no se oculta sin confirmar). | Diseño confirma si el CP quiere celdas vacías (`Null`), días del mes adyacente (`Prev/Next`) o el label de mes de Material — y si vale la pena el esfuerzo de un calendario a medida para lograrlo. |

## Estado de la verificación contra Figma

| Archivo | Acceso | Verificado |
|---|---|---|
| CP — UI Components | Sí (cuenta christianbe@iadb.org) | **Inventario completo:** 124 component sets, 141 assets, 47 páginas. Ver sección F. |
| CP — Visual Styles | Parcial | Se leyeron los **nombres** de todas las variables: colección `Brand` (`Colors/Blue Sky/10…99`) y colección `Mapped` (semánticos: `Border/*`, `Text/*`, `Icon/*`, `Button/flat|stroke|Link/*`, `Interaction/*`, `Chip/*`, `Adorment/*`). Los **valores** se obtienen de a uno, pidiendo las variables de un nodo que las use (ver abajo). |
| IDB-DS Icons | Sí | Sin inventariar: solo se accedió a la portada. |

> **Nota sobre cuentas de Figma:** el inventario completo de 124 component sets se hizo con la
> cuenta christianbe@iadb.org, que tenía el seat Dev/Full de Organización necesario para el listado
> exhaustivo de componentes (Code Connect). La cuenta conectada después (morenosanchezlaurasofia@
> gmail.com, plan Student/Starter) puede abrir archivos puntuales por `node-id`, pero **no** puede
> correr el listado exhaustivo ni la búsqueda de design system contra la librería real "CP — UI
> Components" (la búsqueda genérica devuelve una librería distinta y no relacionada, "00. UI KIT
> Angular Material - Client Portal"). Para repetir una pasada exhaustiva de capas hay que reconectar
> con una cuenta que tenga acceso Dev/Full de Organización a esa librería.

Dos cosas que la lectura de nombres de `CP — Visual Styles` dejó en claro:

- La colección **`Mapped`** contiene exactamente los tokens de estado que en este registro figuran
  como inferidos (M3, M5): `Interaction/background-hover`, `Interaction/disabled`,
  `Button/flat/background-hover`, `Button/flat/disabled`, `Button/flat/Text-disabled`,
  `Button/flat/inverse- disabled text`, `Button/stroke/background-hover`,
  `Button/stroke/inverse- disabled text`, `Button/Link/background-hover`,
  `Button/Link/text-disabled`, `Button/Link/inverse- disabled text`, `Border/focus`,
  `Border/disabled`, `Adorment/disabled/bg`, `Adorment/disabled- on- inverse/bg`.
  **Cuando se obtengan sus valores, M3 y M5 dejan de ser inferencias.**
- La escala **Blue Sky** de Figma tiene tonos que esta librería no define:
  `20, 30, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99`. Los `87`, `92`, `94` y `96` no existen en
  `_tokens.scss`. Hay que confirmar si el CP los usa.

### Cómo se obtienen los valores (método que sí funciona)

El listado de páginas por API devuelve solo la portada en los tres archivos, pero **los nodeId del
inventario de componentes sirven de entrada**: pidiendo las variables de un nodo se obtienen los
valores de las que ese nodo usa. Así se verificaron el Breadcrumb (`1088:35139`) y el Step
(`540:11813`), y así se obtuvieron estos valores de la colección `Mapped`, todos presentes ya en la
paleta de esta librería:

| Variable de Figma | Valor | Token de la librería |
|---|---|---|
| `Interaction/background-hover` | `#eaeaea` | `--ds-neutral-variant-95` |
| `Interaction/selected` | `#d9f4ff` | `--ds-sky-95` |
| `Surface/primary` | `#007eb6` | `--ds-sky-50` |
| `Button/Link/text` | `#007eb6` | `--ds-sky-50` |
| `Button/Link/background-hover` | `#007eb614` (8%) | — (se usa `--ds-sky-99`) |
| `Button/Link/background-pressed` | `#007eb629` (16%) | — (se usa `--ds-sky-95`) |
| `Button/flat/inverse-background-hover` | `#ffffff24` (14%) | — |
| `Button/Link/inverse-background-pressed` | `#ffffff4a` (29%) | — |
| `Text/primary` | `#232222` | `--ds-color-text-default` |
| `Text/subtle` | `#555353` | `--ds-neutral-60` |
| `Text/disabled` | `#929090` | `--ds-neutral-80` |
| `Colors/Gray-variant/50` | `#a6a6a8` | `--ds-neutral-variant-50` |
| `MD3 Tokens/on-surface-variant` | `#535354` | `--ds-neutral-variant-20` |
| `Colors/Error/30 (Check)` | `#790001` | `--ds-error-30` |
| `Icon/danger` | `#a60001` | `--ds-error-40` |
| `Colors/Warning/50(Check)` | `#e38a05` | `--ds-warning-50` |

Los porcentajes de estado (`#007eb614`, `#007eb629`, `#ffffff24`, `#ffffff4a`) **confirman que M5
era correcto en la forma pero no en los números**: el sistema usa 8% / 16% para hover / pressed en
links, y 14% / 29% en inverse. Falta aplicarlos de forma consistente en todos los componentes.

Sigue pendiente un **link con `node-id`** a la página de colores de Visual Styles (para la escala
`Brand` completa, incluidos los tonos 87/92/94/96) y a la página de íconos de IDB-DS Icons.

## Integración de UI Components (20 oct 2026)

Se construyeron, con especificaciones leídas de Figma (nodos indicados en cada story), estas familias que antes tomaban solo el tema global:

| Familia | Cómo | Dónde en Storybook |
|---|---|---|
| Dialog (400/700/900px) | `MatDialog` + overrides + `DS_DIALOG_WIDTHS` | Moléculas/Dialog |
| Snackbar (high/low contraste × 4 colores) | `ds-snackbar` dentro de `MatSnackBar` (`openDsSnackbar`) | Moléculas/Snackbar |
| Banner (4 colores) | `ds-banner` (Material no tiene banner) | Moléculas/Banner |
| Chips: Tags, Status-Chips, Filter tag (3 tamaños) | `mat-chip` + clases `ds-chip--*` | Átomos/Chips |
| Tooltip / Popover | `matTooltip` + overrides; `ds-popover` dentro de `mat-menu` | Moléculas/Tooltip y Popover |
| Card, Accordion, Divider | `mat-card`, `mat-expansion-panel`, `mat-divider` + overrides | Moléculas/Card, Moléculas/Accordion, Átomos/Divider |
| MiniCard | `ds-mini-card` | Moléculas/MiniCard |
| Table (High/Low contrast, zebra, fila resaltada) | `mat-table` + overrides | Organismos/Table |
| Drawer (5 anchos) | `mat-drawer` + overrides | Organismos/Drawer |
| Favorite Toggle | `ds-favorite-toggle` | Átomos/Favorite Toggle |
| Buscador (Input-Search Default/Global) | `mat-form-field` + `ds-field--global` | Moléculas/Buscador |

### Ajustes de accesibilidad y decisiones tomadas

| # | Hueco | Evidencia | Decisión aplicada | Pendiente |
|---|---|---|---|---|
| G1 | Chip Rose: contraste 3.71:1 | Figma `Chip/Rose/fg` #ab6787 sobre #fbeef3. | Texto Rose 20 #8b546e = 5.19:1. | Diseño actualiza Figma. |
| G2 | Favorite Toggle: contorno 1.8:1 y naranja 2.66:1 | Contorno #bcbcbe y relleno #e38a05 no llegan a 3:1 (WCAG 1.4.11). | Contorno Neutral variant 40 #919193 (3.15:1); relleno Warning 40 #bd7304 (3.38:1). | Diseño valida. |
| G3 | Favorite Toggle: estrella "selected" gris en standard | Figma pinta la variante standard seleccionada en #535354 y en naranja al hacer hover; en la variante inverse la seleccionada es naranja. | Se usa naranja en los dos casos (se toma como error de diseño). | Diseño confirma. |
| G4 | Icon Button small: el glifo es de 16px | El Dialog (608:3505) usa `Icon-button` small de 32px con ícono de 16px; la librería tenía 18px (suposición). | **Corregido** a 16px. | — |
| G5 | Snackbar: cerrar y acción en línea aparte | `MatSnackBar` no trae botón de cerrar ni la acción larga. | `ds-snackbar` los incluye (`closable`, `stacked`). | — |
| G6 | MiniCard: línea de acento del pie | Es un SVG que no se pudo leer; los pies Tertiary, Rose y Aqua no se relevaron. | Se infieren 2px del color de acento; solo 6 colores de pie. | Diseño confirma. |
| G7 | Estados del Filter tag | Hover usa #eaeaea; focus y pressed no se inspeccionaron. | Focus y hover iguales (#eaeaea al 60%); pressed igual a hover. | Diseño confirma. |
| G8 | Tamaños small y x-small de chips | Solo se leyó el medium (padding 12×6). | Small 24px y x-small 20px, con padding inferido del ancho de los símbolos. | Diseño confirma. |
| G9 | Tooltip sin sombra | Figma no define sombra para `Plain Tooltip`; el `Popover` sí (Shadow-medium). | Tooltip sin sombra. | — |
| G10 | Rate limit de Figma | La cuenta conectada (plan Education) corta las consultas masivas al MCP. | Las specs se extrajeron con pausas; algunas variantes quedaron sin leer (Dots-Menu, DrawerCard medium/large, Input-Search Medium con estados). | Repetir con una cuenta Dev/Full si se necesita más detalle. |
