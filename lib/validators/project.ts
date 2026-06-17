import { z } from "zod";

export const projectSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
  featured: z.boolean().default(false),
  stack_json: z.array(z.string()).default([]),
  metrics_json: z.record(z.string(), z.string()).default({}),
  translations: z.array(
    z.object({
      locale: z.enum(["es", "en"]),
      slug: z.string().min(2).max(120),
      title: z.string().min(2).max(200),
      excerpt: z.string().max(500),
      challenge_html: z.string().optional(),
      solution_html: z.string().optional(),
      results_html: z.string().optional(),
      seo_title: z.string().max(120).optional(),
      seo_description: z.string().max(300).optional(),
    })
  ),
});

export const blogPostSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
  translations: z.array(
    z.object({
      locale: z.enum(["es", "en"]),
      slug: z.string().min(2).max(120),
      title: z.string().min(2).max(200),
      excerpt: z.string().max(500),
      content_json: z.record(z.string(), z.unknown()).optional(),
      content_html: z.string().optional(),
      seo_title: z.string().max(120).optional(),
      seo_description: z.string().max(300).optional(),
    })
  ),
});
