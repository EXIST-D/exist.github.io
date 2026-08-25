import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

const homeData = readFileSync(new URL('../src/content/site/home.json', import.meta.url), 'utf8');
const settings = readFileSync(new URL('../src/content/site/settings.json', import.meta.url), 'utf8');
const homePage = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('replaces the template hero copy with a personal profile', () => {
  assert.doesNotMatch(homeData, /"heroEyebrow"/);
  assert.match(homeData, /"heroProfile"/);
  assert.match(homeData, /中国地质大学（北京）应用统计专业硕士研究生/);
  assert.match(homePage, /class="hero-profile"/);
});

test('presents the supplied technical stack and compact project statistics', () => {
  assert.match(settings, /"techHighlights"/);
  assert.match(settings, /"Agent 应用开发"/);
  assert.match(settings, /"向量检索和 RAG"/);
  assert.match(homePage, /class="tech-stack-grid"/);
  assert.match(homePage, /stat-grid-compact/);
  assert.match(styles, /\.stat-grid-compact/);
});

test('uses a single-column technical ledger and exposes the GitHub profile', () => {
  assert.match(homePage, /class="hero-github"/);
  assert.match(homePage, /href=\{siteConfig\.github\}/);
  assert.match(styles, /\.tech-stack-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr;/);
  assert.match(styles, /\.tech-stack-grid li\s*\{[\s\S]*?grid-template-columns:\s*7\.3rem minmax\(0, 1fr\);/);
  assert.match(styles, /\.hero-grid\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0, 1\.25fr\) minmax\(0, 1\.15fr\);/);
});
