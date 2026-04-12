import { getCollection } from 'astro:content';
import { siteConfig } from '../site.config';
import { getAllTopics } from '../utils/content';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

function xmlEscape(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET(context: { site?: URL }) {
  const site = context.site ?? new URL(siteConfig.site);
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const projects = await getCollection('projects');
  const topics = getAllTopics(notes);

  const routes = [
    withBase(''),
    withBase('about'),
    withBase('notes'),
    withBase('projects'),
    withBase('topics'),
    ...notes.map((entry) => withBase(`notes/${entry.slug}`)),
    ...projects.map((entry) => withBase(`projects/${entry.slug}`)),
    ...topics.map((topic) => withBase(`topics/${topic.slug}`)),
  ];

  const body = routes
    .map((path) => {
      const url = new URL(path, site).toString();
      return `<url><loc>${xmlEscape(url)}</loc></url>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${body}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
