import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Process } from "@/components/sections/process";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: `${dict.process.pageTitle} | ArchStack`,
    description: dict.process.pageDescription,
    locale: raw,
    path: "/process",
  });
}

export default async function ProcessPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);

  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
              {dict.process.eyebrow}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">
              {dict.process.pageTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {dict.process.pageDescription}
            </p>
          </Reveal>
        </Container>
      </section>
      <Process locale={raw} dict={dict} />
    </>
  );
}
