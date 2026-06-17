import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPublishedProjects } from "@/lib/supabase/queries/projects";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: `${dict.projects.pageTitle} | ArchStack`,
    description: dict.projects.pageDescription,
    locale: raw,
    path: "/projects",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);
  const projects = await getPublishedProjects(raw);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.projects.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">
            {dict.projects.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {dict.projects.pageDescription}
          </p>
        </Reveal>

        <div className="mt-12 space-y-5">
          {projects.length === 0 ? (
            <p className="text-muted-foreground">{dict.projects.empty}</p>
          ) : (
            projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <Card className="bg-surface p-6 md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <div>
                      <p className="text-sm text-primary">{project.metrics.primary}</p>
                      <h2 className="mt-2 text-2xl font-semibold">{project.title}</h2>
                      <p className="mt-3 text-muted-foreground">{project.excerpt}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/${raw}/projects/${project.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {dict.projects.viewProject} →
                    </Link>
                  </div>
                </Card>
              </Reveal>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
