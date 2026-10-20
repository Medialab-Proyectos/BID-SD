// Genera projects/cp-ds/src/foundations/Colores.mdx desde styles/_tokens.scss.
// Correr después de cambiar un color: npm run docs:colores
import { readFileSync, writeFileSync } from 'node:fs';

const TOKENS = 'projects/cp-ds/src/styles/_tokens.scss';
const OUT = 'projects/cp-ds/src/foundations/Colores.mdx';
const src = readFileSync(TOKENS, 'utf8');

const raw = {};
for (const m of src.matchAll(/--ds-([a-z-]+?)-(\d+)\s*:\s*(#[0-9a-fA-F]{3,8})/g)) {
  (raw[m[1]] ??= {})[m[2]] = m[3];
}
const resolve = (v) => {
  const r = v.match(/var\(--ds-([a-z-]+?)-(\d+)\)/);
  return r && raw[r[1]] ? raw[r[1]][r[2]] : v;
};

const families = {
  sky: 'Primary — Blue Sky', ocean: 'Secondary — Blue Ocean', error: 'Error', warning: 'Warning',
  success: 'Success', neutral: 'Neutral', 'neutral-variant': 'Neutral variant (bordes)',
  tertiary: 'Tertiary — Violeta', rose: 'Rose', aqua: 'Aqua',
  yellow: 'Yellow (sin uso semántico asignado)', lime: 'Lime (sin uso semántico asignado)',
};

const groups = {};
for (const m of src.matchAll(/--ds-color-([a-z-]+)\s*:\s*([^;]+);/g)) {
  const [name, value] = [m[1], m[2].trim()];
  const group = name.startsWith('on-') ? 'texto sobre color (on-*)' : name.split('-')[0];
  const hex = resolve(value);
  if (/^#/.test(hex)) (groups[group] ??= {})[`--ds-color-${name}`] = hex;
}

const item = (title, subtitle, colors) =>
  `  <ColorItem title="${title}" subtitle="${subtitle}" colors={${JSON.stringify(colors)}} />\n`;

let out = `import { Meta, ColorPalette, ColorItem } from '@storybook/addon-docs/blocks';

{/* Archivo generado por scripts/generar-colores-mdx.mjs — no editar a mano. */}

<Meta title="Fundamentos/Colores" />

# Colores

En el código usar siempre el **token semántico** (\`--ds-color-*\`); la paleta cruda es la base de la que salen.

> **Accesibilidad:** \`--ds-color-text-warning-raw\` (#e38a05) da 2.66:1 sobre blanco y no cumple AA. Para texto de
> advertencia usar \`--ds-color-text-warning-safe\`. \`--ds-color-text-link\` y \`--ds-color-border-control\` están
> ajustados por contraste respecto de Figma (ver Huecos del sistema A3 y A4).

## Tokens semánticos

<ColorPalette>
`;
for (const [g, colors] of Object.entries(groups)) {
  out += item(g, g.startsWith('texto sobre') ? '--ds-color-on-*' : `--ds-color-${g}-*`, colors);
}
out += `</ColorPalette>

## Paleta cruda

<ColorPalette>
`;
for (const [k, label] of Object.entries(families)) {
  if (!raw[k]) continue;
  const sorted = Object.fromEntries(Object.entries(raw[k]).sort((a, b) => a[0] - b[0]));
  out += item(label, `--ds-${k}-{tono}`, sorted);
}
out += '</ColorPalette>\n';

writeFileSync(OUT, out);
console.log(`Colores.mdx generado: ${Object.keys(groups).length} grupos semánticos, ${Object.keys(raw).length} familias.`);
