import { getCollection } from 'astro:content';
import { siteConfig } from '../site.config';
import { xmlEscape } from '../utils/format';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

export async function GET(context: { site?: URL }) {
  const notes = (await getCollection('notes', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  const site = context.site ?? new URL(siteConfig.site);
  const items = notes
    .map((note) => {
      const url = new URL(withBase(`notes/${note.slug}`), site).toString();

      return `
        <item>
          <title>${xmlEscape(note.data.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${note.data.publishedAt.toUTCString()}</pubDate>
          <description>${xmlEscape(note.data.description)}</description>
        </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(siteConfig.title)}</title>
    <link>${site.toString()}</link>
    <description>${xmlEscape(siteConfig.description)}</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
