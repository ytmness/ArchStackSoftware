import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Services } from "@/components/sections/services";
import { Reveal } from "@/components/motion/reveal";
import { DeferredServicesSections } from "@/components/marketing/deferred-services-sections";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: `${dict.services.pageTitle} | ArchStack`,
    description: dict.services.pageDescription,
    locale: raw,
    path: "/services",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);

  return (
    <>
      <section className="border-b border-border py-24 md:py-32 lg:py-40">
        <Container>
          <Reveal>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-primary/80 md:mb-5">
              {dict.services.eyebrow}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl lg:leading-[1.02]">
              {dict.services.pageTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-xl text-muted-foreground md:mt-8 md:text-2xl">
              {dict.services.pageDescription}
            </p>
          </Reveal>
        </Container>
      </section>

      <DeferredServicesSections dict={dict} />
      <Services />
    </>
  );
}
