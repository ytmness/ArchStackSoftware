import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPostBySlug } from "@/lib/supabase/queries/blog";
import { Container } from "@/components/ui/container";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) return {};
  const post = await getPostBySlug(raw, slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | ArchStack`,
    description: post.excerpt,
    locale: raw,
    path: `/blog/${slug}`,
  });
}

export default async function BlogSlugPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);
  const post = await getPostBySlug(raw, slug);
  if (!post) notFound();

  return (
    <article className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Link
          href={`/${raw}/blog`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {dict.common.back}
        </Link>
        <h1 className="mt-8 text-4xl font-semibold md:text-5xl">{post.title}</h1>
        {post.reading_time_minutes && (
          <p className="mt-4 text-sm text-muted-foreground">
            {post.reading_time_minutes} {dict.blog.readingTime}
          </p>
        )}
        <div
          className="prose prose-invert mt-10 max-w-none text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: post.content_html ?? `<p>${post.excerpt}</p>` }}
        />
      </Container>
    </article>
  );
}
