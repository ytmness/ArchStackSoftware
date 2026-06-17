import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) return {};
  const dict = await getDictionary(raw);
  return buildMetadata({
    title: dict.meta.siteName,
    description: dict.meta.description,
    locale: raw,
  });
}

export default async function MarketingLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isValidLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <MarketingHeader locale={locale} dict={dict} />
      <main id="main-content" className="flex-1 pt-16">
        {children}
      </main>
      <MarketingFooter locale={locale} dict={dict} />
    </>
  );
}
