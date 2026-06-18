"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/content/dictionaries/es";
import { LazySection } from "@/components/marketing/lazy-section";

const Skills3DShowcase = dynamic(
  () =>
    import("@/components/marketing/skills-3d-showcase").then(
      (m) => m.Skills3DShowcase,
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

const ArchitectureBuilder = dynamic(
  () =>
    import("@/components/sections/architecture-builder").then(
      (m) => m.ArchitectureBuilder,
    ),
  { ssr: false },
);

type DeferredServicesSectionsProps = {
  dict: Dictionary;
};

export function DeferredServicesSections({ dict }: DeferredServicesSectionsProps) {
  return (
    <>
      <LazySection placeholderClassName="min-h-80">
        <Skills3DShowcase dict={dict} />
      </LazySection>
      <LazySection placeholderClassName="min-h-96">
        <ServicesHoverSlider dict={dict} />
      </LazySection>
      <LazySection placeholderClassName="min-h-96">
        <ArchitectureBuilder dict={dict} />
      </LazySection>
    </>
  );
}
