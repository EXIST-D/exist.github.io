import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    minutes: z.number().int().positive().default(5),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string(),
    stack: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().int().default(99),
    role: z.string(),
    outcome: z.string(),
    demo: z.string().url().optional(),
    repo: z.string().url().optional(),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({}).passthrough(),
});

export const collections = {
  notes,
  projects,
  site,
};
