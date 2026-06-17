import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/config";

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html?: string | null;
  reading_time_minutes?: number | null;
  published_at?: string | null;
};

const fallbackPosts: PublicBlogPost[] = [];

export async function getPublishedPosts(locale: Locale) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(
        "id, published_at, reading_time_minutes, blog_post_translations!inner(slug, title, excerpt, content_html, locale)"
      )
      .eq("status", "published")
      .eq("blog_post_translations.locale", locale)
      .order("published_at", { ascending: false });

    if (error || !data?.length) return fallbackPosts;

    return data.map((row) => {
      const translation = Array.isArray(row.blog_post_translations)
        ? row.blog_post_translations[0]
        : row.blog_post_translations;
      return {
        id: row.id,
        slug: translation.slug,
        title: translation.title,
        excerpt: translation.excerpt ?? "",
        content_html: translation.content_html,
        reading_time_minutes: row.reading_time_minutes,
        published_at: row.published_at,
      } satisfies PublicBlogPost;
    });
  } catch {
    return fallbackPosts;
  }
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const posts = await getPublishedPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}
