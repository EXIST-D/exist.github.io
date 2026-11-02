export function searchEntries(entries, query, limit = 8) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return entries
    .filter((entry) => !entry.draft)
    .map((entry, index) => {
      const title = entry.title.toLocaleLowerCase();
      const text = `${title} ${entry.description ?? ''} ${(entry.tags ?? []).join(' ')}`.toLocaleLowerCase();
      return {
        entry,
        index,
        matches: terms.every((term) => text.includes(term)),
        score: terms.reduce((score, term) => score + (title.includes(term) ? 1 : 0), 0),
      };
    })
    .filter((item) => item.matches)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.entry);
}
