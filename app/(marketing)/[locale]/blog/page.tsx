import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPublishedPosts } from "@/lib/supabase/queries/blog";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: `${dict.blog.pageTitle} | ArchStack`,
    description: dict.blog.pageDescription,
    locale: raw,
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);
  const posts = await getPublishedPosts(raw);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.blog.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">
            {dict.blog.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {dict.blog.pageDescription}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <p className="text-muted-foreground">{dict.blog.empty}</p>
          ) : (
            posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.06}>
                <Card className="bg-surface p-6">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{post.excerpt}</p>
                  <Link
                    href={`/${raw}/blog/${post.slug}`}
                    className="mt-6 inline-block text-sm text-primary hover:underline"
                  >
                    {dict.blog.readMore} →
                  </Link>
                </Card>
              </Reveal>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
