import { readFileSync, writeFileSync } from 'node:fs';
let src = readFileSync('src/data/todayInHistory.final.cleaned.ts', 'utf8');
let count = 0;
const lines = src.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^(\s+(?:title|description): ')(.*)',$/);
  if (m) {
    const val = m[2];
    if (val.endsWith(',')) {
      lines[i] = m[1] + val.slice(0, -1).trimEnd() + "',";
      count++;
    }
  }
}
writeFileSync('src/data/todayInHistory.final.cleaned.ts', lines.join('\n'));
console.log('Fixed trailing commas:', count);
