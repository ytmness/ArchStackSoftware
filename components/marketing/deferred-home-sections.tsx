"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import type { PublicProject } from "@/lib/supabase/queries/projects";
import { LazySection } from "@/components/marketing/lazy-section";

const Skills3DShowcase = dynamic(
  () =>
    import("@/components/marketing/skills-3d-showcase").then(
      (m) => m.Skills3DShowcase,
    ),
  { ssr: false },
);

const ArchitectureBuilder = dynamic(
  () =>
    import("@/components/sections/architecture-builder").then(
      (m) => m.ArchitectureBuilder,
    ),
  { ssr: false },
);

const FeaturedProjects = dynamic(
  () =>
    import("@/components/marketing/featured-projects").then(
      (m) => m.FeaturedProjects,
    ),
  { ssr: false },
);

const ServicesHoverSlider = dynamic(
  () =>
    import("@/components/marketing/services-hover-slider").then(
      (m) => m.ServicesHoverSlider,
    ),
  { ssr: false },
);

const Testimonials = dynamic(
  () =>
    import("@/components/marketing/testimonials-section").then(
      (m) => m.TestimonialsSection,
    ),
  { ssr: false },
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
      <LazySection placeholderClassName="min-h-80">
        <Skills3DShowcase dict={dict} />
      </LazySection>
      <LazySection placeholderClassName="min-h-96">
        <ArchitectureBuilder dict={dict} />
      </LazySection>
      <LazySection placeholderClassName="min-h-72">
        <FeaturedProjects locale={locale} dict={dict} projects={projects} />
      </LazySection>
      <LazySection placeholderClassName="min-h-96">
        <ServicesHoverSlider dict={dict} />
      </LazySection>
      <LazySection placeholderClassName="min-h-80">
        <Testimonials dict={dict} />
      </LazySection>
    </>
  );
}
