import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://exist-d.github.io',
  base: '/exist.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
