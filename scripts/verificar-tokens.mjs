// Verifica que todo token --ds-* usado con var() esté definido en algún archivo de estilos.
// Un var() con un token inexistente falla en silencio en el navegador (el estilo simplemente no se aplica).
// Uso: npm run lint:tokens
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'projects/cp-ds/src/styles';
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
const files = readdirSync(DIR).filter((f) => f.endsWith('.scss'));
const sources = Object.fromEntries(files.map((f) => [f, strip(readFileSync(join(DIR, f), 'utf8'))]));

const defined = new Set();
for (const src of Object.values(sources)) {
  for (const m of src.matchAll(/(--ds-[a-z0-9-]+)\s*:/g)) defined.add(m[1]);
}

const problems = [];
for (const [file, src] of Object.entries(sources)) {
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/var\((--ds-[a-z0-9#{}$-]+)/g)) {
      const t = m[1];
      // Interpolación de Sass (--ds-chip-#{$c}-bg): vale si algún token definido encaja con el patrón.
      if (t.includes('#{')) {
        const re = new RegExp('^' + t.replace(/#\{[^}]*\}/g, '[a-z0-9-]+') + '$');
        if (![...defined].some((d) => re.test(d))) problems.push(`${file}:${i + 1}  ${t}`);
      } else if (!defined.has(t)) problems.push(`${file}:${i + 1}  ${t}`);
    }
  });
}

if (problems.length) {
  console.log(`Tokens usados pero no definidos (${problems.length}):\n` + problems.join('\n'));
  process.exit(1);
}
console.log(`OK: los ${defined.size} tokens usados están definidos.`);
