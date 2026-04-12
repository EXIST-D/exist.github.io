function basePath() {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
}

export function withBase(path: string) {
  const normalizedPath = path.replace(/^\/+/, '');
  return normalizedPath ? `${basePath()}${normalizedPath}` : basePath();
}

export function withoutBase(pathname: string) {
  const base = basePath();
  if (pathname.startsWith(base)) {
    const stripped = pathname.slice(base.length);
    return stripped ? `/${stripped.replace(/\/+$/, '')}` : '/';
  }
  return pathname;
}

export function resolveInternalHref(href: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('#')) {
    return href;
  }
  return href.startsWith('/') ? withBase(href) : href;
}
