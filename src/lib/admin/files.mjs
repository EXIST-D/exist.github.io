const EDITABLE_ROOTS = ['src/content/notes/', 'src/content/projects/'];

function normalizePath(path) {
  return String(path).replace(/\\/g, '/').replace(/^\.?\//, '');
}

function collectionForPath(path) {
  const normalized = normalizePath(path);
  if (normalized.startsWith('src/content/notes/')) return 'notes';
  if (normalized.startsWith('src/content/projects/')) return 'projects';
  return null;
}

function titleFromPath(path) {
  const normalized = normalizePath(path);
  return normalized.split('/').pop().replace(/\.md$/i, '');
}

function sortByTitle(a, b) {
  return a.title.localeCompare(b.title, 'zh-Hans-CN');
}

export function isEditablePath(path) {
  const normalized = normalizePath(path);
  return EDITABLE_ROOTS.some((prefix) => normalized.startsWith(prefix)) && normalized.endsWith('.md');
}

export function groupEditableFiles(paths) {
  const grouped = {
    notes: [],
    projects: [],
  };

  for (const path of paths) {
    if (!isEditablePath(path)) continue;
    const collection = collectionForPath(path);
    if (!collection) continue;
    grouped[collection].push({
      path: normalizePath(path),
      title: titleFromPath(path),
    });
  }

  grouped.notes.sort(sortByTitle);
  grouped.projects.sort(sortByTitle);

  return grouped;
}

export function templateForCollection(collection, title, slug) {
  const safeTitle = title?.trim() || (collection === 'notes' ? '新笔记' : '新项目');
  const safeSlug = slug?.trim() || safeTitle.toLowerCase().replace(/\s+/g, '-');

  if (collection === 'projects') {
    return `---\ntitle: ${safeTitle}\ndescription: 请写一句项目简介\nperiod: 2026\nstack:\n  - Astro\nfeatured: false\norder: 99\nrole: 作者\noutcome: 说明项目结果\ndemo: \nrepo: \n---\n\n# ${safeTitle}\n\n在这里写项目正文。\n`;
  }

  return `---\ntitle: ${safeTitle}\ndescription: 请写一句笔记摘要\npublishedAt: ${new Date().toISOString().slice(0, 10)}\nupdatedAt: ${new Date().toISOString().slice(0, 10)}\ntags:\n  - 学习笔记\nfeatured: false\nminutes: 5\ndraft: true\n---\n\n# ${safeTitle}\n\n在这里写笔记正文。\n`;
}

export function inferCollectionFromPath(path) {
  return collectionForPath(path);
}

export function fileDisplayName(path) {
  const normalized = normalizePath(path);
  const collection = collectionForPath(normalized);
  const title = titleFromPath(normalized);
  return collection ? `${collection} / ${title}` : title;
}
