"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocaleSwitcher } from "@/components/marketing/locale-switcher";
import { cn } from "@/lib/utils";

const links = [
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "process", href: "/process" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export function MarketingHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
      <Container as="nav" className="flex h-16 items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Arch<span className="text-primary">Stack</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={`/${locale}${link.href}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {dict.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher locale={locale} dict={dict} />
          <Button asChild size="sm">
            <Link href={`/${locale}/contact`}>{dict.nav.cta}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? dict.common.menuClose : dict.common.menuOpen}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-bg md:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <Container className="space-y-1 py-4">
          {links.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}${link.href}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            >
              {dict.nav[link.key]}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2">
            <LocaleSwitcher locale={locale} dict={dict} />
            <Button asChild size="sm" className="flex-1">
              <Link href={`/${locale}/contact`}>{dict.nav.cta}</Link>
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
