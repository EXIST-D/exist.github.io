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

test('uses concise project and personal-section copy', () => {
  assert.match(settings, /"role":\s+"AI应用开发\/大模型开发\/数据工程方向求职者"/);
  assert.match(homeData, /"title": "项目案例展示"/);
  assert.match(homeData, /"eyebrow": "关于我"/);
  assert.match(homeData, /"title": "关于我的更多信息"/);
  assert.doesNotMatch(homeData, /每个项目页都强调目标、技术方案/);
  assert.doesNotMatch(homeData, /你可以把简历里写不下的内容展开在这里/);
});
