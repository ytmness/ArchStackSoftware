import { createClient } from "@/lib/supabase/server";
import { caseStudies } from "@/lib/data/cases";
import type { Locale } from "@/lib/i18n/config";

export type PublicProject = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  challenge_html?: string | null;
  solution_html?: string | null;
  results_html?: string | null;
  stack: string[];
  metrics: Record<string, string>;
  featured: boolean;
};

function fallbackProjects(_locale: Locale): PublicProject[] {
  return caseStudies.map((item) => ({
    id: item.id,
    slug: item.id,
    title: item.title,
    excerpt: item.problem,
    challenge_html: item.problem,
    solution_html: item.result,
    results_html: item.result,
    stack: item.stack,
    metrics: { primary: item.metric },
    featured: item.id === "fintech-ops",
  }));
}

export async function getPublishedProjects(locale: Locale) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, featured, stack_json, metrics_json, project_translations!inner(slug, title, excerpt, challenge_html, solution_html, results_html, locale)"
      )
      .eq("status", "published")
      .eq("project_translations.locale", locale)
      .order("published_at", { ascending: false });

    if (error || !data?.length) return fallbackProjects(locale);

    return data.map((row) => {
      const translation = Array.isArray(row.project_translations)
        ? row.project_translations[0]
        : row.project_translations;
      return {
        id: row.id,
        slug: translation.slug,
        title: translation.title,
        excerpt: translation.excerpt ?? "",
        challenge_html: translation.challenge_html,
        solution_html: translation.solution_html,
        results_html: translation.results_html,
        stack: (row.stack_json as string[]) ?? [],
        metrics: (row.metrics_json as Record<string, string>) ?? {},
        featured: row.featured,
      } satisfies PublicProject;
    });
  } catch {
    return fallbackProjects(locale);
  }
}

export async function getProjectBySlug(locale: Locale, slug: string) {
  const projects = await getPublishedProjects(locale);
  return projects.find((p) => p.slug === slug) ?? null;
}
