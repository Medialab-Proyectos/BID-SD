// Verifica que todo color usado en los estilos salga de la paleta de "CP — Visual Styles".
// Paleta = todo color literal declarado en _tokens.scss (paleta cruda + tokens MD3 de Figma).
// En el resto de los archivos los colores deben ir por token (var(--ds-*)); si aparece un literal,
// tiene que ser de la paleta. rgba(...) se acepta solo si su color base está en la paleta.
// Uso: npm run lint:paleta   (sale con código 1 si encuentra colores fuera de paleta)
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'projects/cp-ds/src/styles';
const TOKENS = '_tokens.scss';

const norm = (h) => {
  h = h.toLowerCase();
  return h.length === 4 ? '#' + [...h.slice(1)].map((c) => c + c).join('') : h.slice(0, 7);
};
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

const palette = new Set();
for (const m of stripComments(readFileSync(join(DIR, TOKENS), 'utf8')).matchAll(/:\s*(#[0-9a-fA-F]{3,6})\b/g)) {
  palette.add(norm(m[1]));
}

const toHex = (r, g, b) => '#' + [r, g, b].map((n) => (+n).toString(16).padStart(2, '0')).join('');
const problems = [];

for (const file of readdirSync(DIR).filter((f) => f.endsWith('.scss') && f !== TOKENS)) {
  stripComments(readFileSync(join(DIR, file), 'utf8'))
    .split('\n')
    .forEach((line, i) => {
      for (const m of line.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
        if (!palette.has(norm(m[0]))) problems.push(`${file}:${i + 1}  ${m[0]}`);
      }
      for (const m of line.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) {
        const hex = toHex(m[1], m[2], m[3]);
        if (!palette.has(hex)) problems.push(`${file}:${i + 1}  ${m[0]}…)  → base ${hex}`);
      }
    });
}

if (problems.length) {
  console.log(`Colores fuera de la paleta de Visual Styles (${problems.length}):\n` + problems.join('\n'));
  process.exit(1);
}
console.log(`OK: todos los colores salen de la paleta (${palette.size} colores).`);
