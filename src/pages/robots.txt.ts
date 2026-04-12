import { siteConfig } from '../site.config';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.replace(/^\/+/, '');
  return `${normalizedBase}${normalizedPath}`;
}

export async function GET(context: { site?: URL }) {
  const site = context.site ?? new URL(siteConfig.site);
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL(withBase('sitemap.xml'), site).toString()}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
