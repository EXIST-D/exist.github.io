import assert from 'node:assert/strict';
import test from 'node:test';
import { searchEntries } from '../src/utils/search.mjs';

const entries = [
  { title: '开发笔记', description: 'Agent RAG 的研究记录', tags: ['研究'], url: '/notes/research' },
  { title: 'WeiJin Agent', description: '文学检索与记忆管理', tags: ['Python', 'RAG'], url: '/projects/weijin' },
  { title: '数据整理', description: '增量采集公开面经', tags: ['Python'], url: '/projects/gleaner' },
  { title: 'Agent 内部草稿', tags: ['RAG'], draft: true, url: '/notes/draft' },
];

test('searches Chinese content and technology tags without case sensitivity', () => {
  assert.deepEqual(searchEntries(entries, '文学').map((item) => item.url), ['/projects/weijin']);
  assert.equal(searchEntries(entries, 'PYTHON').length, 2);
});

test('matches all query terms across title, description and tags', () => {
  assert.deepEqual(searchEntries(entries, 'agent python').map((item) => item.url), ['/projects/weijin']);
  assert.deepEqual(searchEntries(entries, 'agent kafka'), []);
});

test('prioritizes title matches and excludes drafts', () => {
  assert.deepEqual(searchEntries(entries, 'Agent').map((item) => item.url), ['/projects/weijin', '/notes/research']);
});

test('handles empty and unmatched queries and respects the result limit', () => {
  assert.deepEqual(searchEntries(entries, '   '), []);
  assert.deepEqual(searchEntries(entries, 'unmatched'), []);
  assert.equal(searchEntries(entries, 'python', 1).length, 1);
});
