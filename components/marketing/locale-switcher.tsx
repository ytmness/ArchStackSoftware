"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { stripLocale, withLocale } from "@/lib/i18n/detect-locale";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const other = locale === "es" ? "en" : "es";
  const href = withLocale(other, stripLocale(pathname));

  return (
    <Link
      href={href}
      className="rounded-full border border-border px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      aria-label={`${dict.common.locale}: ${other.toUpperCase()}`}
    >
      {other.toUpperCase()}
    </Link>
  );
}

export function LocaleSwitcherInline({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div className={cn("flex gap-2", className)}>
      {(["es", "en"] as const).map((item) => (
        <Link
          key={item}
          href={withLocale(item, stripLocale(pathname))}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs uppercase tracking-wider",
            item === locale
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
