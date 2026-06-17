import Link from "next/link";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPublishedProjects } from "@/lib/supabase/queries/projects";
import { MarketingHero } from "@/components/marketing/hero-section";
import { TrustStripSection } from "@/components/marketing/trust-strip-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

const ServicesHoverSlider = dynamic(
  () =>
    import("@/components/marketing/services-hover-slider").then(
      (m) => m.ServicesHoverSlider,
    ),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> },
);

const ArchitectureBuilder = dynamic(
  () =>
    import("@/components/sections/architecture-builder").then(
      (m) => m.ArchitectureBuilder,
    ),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> },
);

const Skills3DShowcase = dynamic(
  () =>
    import("@/components/marketing/skills-3d-showcase").then(
      (m) => m.Skills3DShowcase,
    ),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> },
);

const FeatureShaderCards = dynamic(
  () =>
    import("@/components/ui/feature-shader-cards").then(
      (m) => m.FeatureShaderCards,
    ),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> },
);

const FeaturedProjects = dynamic(
  () =>
    import("@/components/marketing/featured-projects").then(
      (m) => m.FeaturedProjects,
    ),
  { loading: () => <div className="h-96 animate-pulse bg-surface" /> },
);

const Testimonials = dynamic(
  () =>
    import("@/components/marketing/testimonials-section").then(
      (m) => m.TestimonialsSection,
    ),
  { loading: () => <div className="h-80 animate-pulse bg-surface" /> },
);

const Process = dynamic(
  () => import("@/components/sections/process").then((m) => m.Process),
  { loading: () => <div className="h-64 animate-pulse bg-surface" /> },
);

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);
  const projects = await getPublishedProjects(raw);

  return (
    <>
      <MarketingHero locale={raw} dict={dict} />

      <TrustStripSection stackLabel={dict.stackTools.label} />

      <Skills3DShowcase locale={raw} dict={dict} />
      <FeatureShaderCards dict={dict} />
      <ArchitectureBuilder dict={dict} />

      <FeaturedProjects locale={raw} dict={dict} projects={projects} />

      <ServicesHoverSlider dict={dict} />
      <Testimonials dict={dict} />

      <Process locale={raw} dict={dict} />
      <section className="border-t border-border py-20">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-border bg-surface p-8 text-center md:p-12">
              <h2 className="text-3xl font-semibold md:text-4xl">
                {dict.contact.title}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                {dict.contact.description}
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href={`/${raw}/contact`}>{dict.nav.cta}</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
