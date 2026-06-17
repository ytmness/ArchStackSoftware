import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { ContactForm } from "@/components/marketing/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: `${dict.contact.pageTitle} | ArchStack`,
    description: dict.contact.pageDescription,
    locale: raw,
    path: "/contact",
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const dict = await getDictionary(raw);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            {dict.contact.eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold md:text-6xl">
            {dict.contact.pageTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {dict.contact.pageDescription}
          </p>
        </Reveal>
        <div className="mt-12">
          <ContactForm locale={raw} dict={dict} />
        </div>
      </Container>
    </section>
  );
}
