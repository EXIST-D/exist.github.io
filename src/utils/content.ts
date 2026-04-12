import type { CollectionEntry } from 'astro:content';

export function slugifyTag(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '');
}

export function getAllTopics(entries: Array<CollectionEntry<'notes'>>) {
  const topicMap = new Map<string, { name: string; slug: string; count: number }>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      const slug = slugifyTag(tag);
      const existing = topicMap.get(slug);

      if (existing) {
        existing.count += 1;
      } else {
        topicMap.set(slug, { name: tag, slug, count: 1 });
      }
    }
  }

  return Array.from(topicMap.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getRelatedNotes(
  notes: Array<CollectionEntry<'notes'>>,
  current: CollectionEntry<'notes'>,
  limit = 2,
) {
  const currentTags = new Set(current.data.tags);

  return notes
    .filter((note) => note.slug !== current.slug)
    .map((note) => ({
      note,
      score: note.data.tags.reduce((count, tag) => count + (currentTags.has(tag) ? 1 : 0), 0),
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.note.data.publishedAt.getTime() - a.note.data.publishedAt.getTime(),
    )
    .slice(0, limit)
    .map((item) => item.note);
}
