import test from 'node:test';
import assert from 'node:assert/strict';
import { groupEditableFiles } from '../../src/lib/admin/files.mjs';
import { renderMarkdownPreview } from '../../src/lib/admin/markdown.mjs';
import { canEditRepository } from '../../src/lib/admin/github.mjs';

test('groupEditableFiles separates notes and projects', () => {
  const grouped = groupEditableFiles([
    'src/content/notes/a.md',
    'src/content/projects/b.md',
    'src/content/site/home.json',
  ]);

  assert.equal(grouped.notes.length, 1);
  assert.equal(grouped.projects.length, 1);
});

test('renderMarkdownPreview supports bold and katex', () => {
  const html = renderMarkdownPreview('**bold**\n\n$E=mc^2$');

  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /katex/);
});

test('canEditRepository only allows the configured owner login', () => {
  assert.equal(canEditRepository({ login: 'EXIST-D' }, 'EXIST-D'), true);
  assert.equal(canEditRepository({ login: 'someone-else' }, 'EXIST-D'), false);
});
