import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";

type PageMeta = {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
};

export function buildMetadata({
  title,
  description,
  locale,
  path = "",
}: PageMeta): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://archstack.software";
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: `${siteUrl}/es${path}`,
        en: `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}
