import Link from "next/link";
import type { PublicProject } from "@/lib/supabase/queries/projects";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function FeaturedProjects({
  locale,
  dict,
  projects,
}: {
  locale: Locale;
  dict: Dictionary;
  projects: PublicProject[];
}) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const items = featured.length ? featured : projects.slice(0, 3);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.projects.eyebrow}
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-5xl">
            {dict.projects.title}
          </h2>
        </Reveal>

        <div className="mt-10 space-y-5">
          {items.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <Card className="bg-surface p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm text-primary">
                      {project.metrics.primary}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                      {project.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {dict.projects.viewProject} →
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
