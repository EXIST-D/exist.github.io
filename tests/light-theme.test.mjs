import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');

test('uses the warm-white visual foundation', () => {
  assert.match(css, /--bg:\s*#f6f7f5;/i);
  assert.match(css, /--surface:\s*rgba\(255, 255, 255, 0\.82\);/i);
  assert.match(css, /--text:\s*#16232e;/i);
  assert.match(css, /--accent:\s*#167b73;/i);
});

test('exposes the light theme color to the browser', () => {
  assert.match(layout, /<meta name="theme-color" content="#f6f7f5"\s*\/>/i);
});
