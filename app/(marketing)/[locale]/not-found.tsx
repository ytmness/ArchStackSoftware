"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dictionary as es } from "@/content/dictionaries/es";
import { dictionary as en } from "@/content/dictionaries/en";
import { isValidLocale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function MarketingNotFound() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1];
  const locale = isValidLocale(segment) ? segment : "es";
  const dict = locale === "en" ? en : es;

  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold">{dict.notFound.title}</h1>
        <p className="mt-4 text-muted-foreground">{dict.notFound.description}</p>
        <Button asChild className="mt-8">
          <Link href={`/${locale}`}>{dict.notFound.backHome}</Link>
        </Button>
      </Container>
    </section>
  );
}
