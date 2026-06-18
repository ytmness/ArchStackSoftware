"use client";

import dynamic from "next/dynamic";
import type { Dictionary } from "@/content/dictionaries/es";

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

type DeferredServicesSectionsProps = {
  dict: Dictionary;
};

export function DeferredServicesSections({ dict }: DeferredServicesSectionsProps) {
  return (
    <>
      <Skills3DShowcase dict={dict} />
      <ServicesHoverSlider dict={dict} />
      <ArchitectureBuilder dict={dict} />
    </>
  );
}
