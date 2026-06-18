import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getPublishedProjects } from "@/lib/supabase/queries/projects";
import { MarketingHero } from "@/components/marketing/hero-section";
import { TrustStripSection } from "@/components/marketing/trust-strip-section";
import { DeferredHomeSections } from "@/components/marketing/deferred-home-sections";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

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

      <DeferredHomeSections locale={raw} dict={dict} projects={projects} />

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
