"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import type { PublicProject } from "@/lib/supabase/queries/projects";

const Skills3DShowcase = dynamic(
  () =>
    import("@/components/marketing/skills-3d-showcase").then(
      (m) => m.Skills3DShowcase,
    ),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-surface" />,
  },
);

const ArchitectureBuilder = dynamic(
  () =>
    import("@/components/sections/architecture-builder").then(
      (m) => m.ArchitectureBuilder,
    ),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-surface" />,
  },
);

const FeaturedProjects = dynamic(
  () =>
    import("@/components/marketing/featured-projects").then(
      (m) => m.FeaturedProjects,
    ),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-surface" />,
  },
);

const ServicesHoverSlider = dynamic(
  () =>
    import("@/components/marketing/services-hover-slider").then(
      (m) => m.ServicesHoverSlider,
    ),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-surface" />,
  },
);

const Testimonials = dynamic(
  () =>
    import("@/components/marketing/testimonials-section").then(
      (m) => m.TestimonialsSection,
    ),
  {
    ssr: false,
    loading: () => <div className="h-80 animate-pulse bg-surface" />,
  },
);

type DeferredHomeSectionsProps = {
  locale: Locale;
  dict: Dictionary;
  projects: PublicProject[];
};

export function DeferredHomeSections({
  locale,
  dict,
  projects,
}: DeferredHomeSectionsProps) {
  return (
    <>
      <Skills3DShowcase dict={dict} />
      <ArchitectureBuilder dict={dict} />
      <FeaturedProjects locale={locale} dict={dict} projects={projects} />
      <ServicesHoverSlider dict={dict} />
      <Testimonials dict={dict} />
    </>
  );
}
