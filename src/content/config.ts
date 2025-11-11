import { defineCollection, z } from 'astro:content';

const detections = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    id: z.string(),
    status: z.enum(['experimental', 'test', 'stable']).optional(),
    description: z.string(),
    author: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    logsource: z.object({
      category: z.string().optional(),
      product: z.string().optional(),
      service: z.string().optional(),
    }).optional(),
    detection: z.any(),
    falsepositives: z.array(z.string()).optional(),
    level: z.enum(['low', 'medium', 'high', 'critical']),
    references: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().optional(),
    link: z.string().optional(),
  }),
});

export const collections = {
  detections,
  blog,
  work,
};
