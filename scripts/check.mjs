import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../docs/', import.meta.url));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const value = match[1];
  if (value.startsWith('#')) { if (value.length > 1) assert.ok(ids.includes(value.slice(1)), `Missing anchor ${value}`); continue; }
  if (/^(https?:|mailto:)/.test(value)) continue;
  assert.ok(fs.existsSync(path.join(root, value)), `Missing asset ${value}`);
}
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) assert.ok(fs.existsSync(path.join(root, match[1])), `Missing CSS asset ${match[1]}`);
assert.equal((html.match(/<h1\b/g) || []).length, 1, 'Use one H1');
assert.ok(!/\b(?:password|api[_-]?key|whatsapp|net profit|24\/7|guaranteed)\b/i.test(html + js + css), 'Unexpected confidential/unsupported content');
assert.ok(html.includes('mailto:vectorvendingsg@gmail.com'), 'Verified business email required');
assert.ok(css.includes('prefers-reduced-motion'), 'Reduced motion required');
assert.ok(html.includes('Woodleigh Hawker launch'), 'Sales scope required');
assert.ok(html.includes('REVEAL COMING SOON'), 'Unscheduled teaser required');
assert.ok(!html.includes('<form'), 'Do not publish nonfunctional form');
assert.ok(html.includes('Manrope') || css.includes('Manrope'), 'Local font missing');
const files = fs.readdirSync(path.join(root, 'assets')).map(name => ({name,bytes:fs.statSync(path.join(root,'assets',name)).size}));
const bytes = files.reduce((sum,f)=>sum+f.bytes,0)+Buffer.byteLength(html+css+js);
assert.ok(bytes < 1_500_000, `Page budget exceeded: ${bytes}`);
console.log(JSON.stringify({result:'PASS',checks:11,localAssets:files,totalBytes:bytes},null,2));
