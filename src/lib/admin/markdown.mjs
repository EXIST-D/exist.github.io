import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';

const renderer = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
  typographer: true,
});

renderer.use(markdownItKatex);

export function renderMarkdownPreview(markdown) {
  return renderer.render(markdown ?? '');
}

export function extractHeadingsFromHtml(html) {
  const matches = [...String(html).matchAll(/<h([2-4])[^>]*>(.*?)<\/h\1>/gi)];
  return matches.map(([, level, rawText]) => ({
    level: Number(level),
    text: rawText.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&'),
  }));
}
