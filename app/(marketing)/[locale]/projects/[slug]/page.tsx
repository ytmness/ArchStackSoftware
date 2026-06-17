import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjectBySlug } from "@/lib/supabase/queries/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) return {};
  const project = await getProjectBySlug(raw, slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} | ArchStack`,
    description: project.excerpt,
    locale: raw,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectSlugPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);
  const project = await getProjectBySlug(raw, slug);
  if (!project) notFound();

  return (
    <article className="py-20 md:py-28">
      <Container className="max-w-4xl">
        <Link
          href={`/${raw}/projects`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← {dict.common.back}
        </Link>
        <p className="mt-8 text-sm text-primary">{project.metrics.primary}</p>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">{project.title}</h1>
        <p className="mt-6 text-lg text-muted-foreground">{project.excerpt}</p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-semibold">{dict.projects.challenge}</h2>
            <p className="mt-3 text-muted-foreground">{project.challenge_html}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">{dict.projects.solution}</h2>
            <p className="mt-3 text-muted-foreground">{project.solution_html}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">{dict.projects.results}</h2>
            <p className="mt-3 text-muted-foreground">{project.results_html}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">{dict.projects.stack}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </article>
  );
}
