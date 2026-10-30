import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const sourceDirs = ['components'];
const exportRe = /export\s+\*\s+from\s+["'](.+?)["'];/g;
let failures = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name === 'index.ts') check(full);
  }
}

function existsModule(base) {
  return ['.ts', '.tsx', '.js', '.jsx'].some((ext) => fs.existsSync(`${base}${ext}`)) || fs.existsSync(path.join(base, 'index.ts')) || fs.existsSync(path.join(base, 'index.tsx'));
}

function check(file) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(exportRe)) {
    const target = match[1];
    if (!target.startsWith('.')) continue;
    const base = path.resolve(path.dirname(file), target);
    if (!existsModule(base)) {
      failures++;
      console.error(`BROKEN: ${path.relative(root, file)} -> ${target}`);
    }
  }
}

for (const dir of sourceDirs) walk(path.join(root, dir));
if (failures) process.exit(1);
console.log('OK: all local barrel exports resolve.');
