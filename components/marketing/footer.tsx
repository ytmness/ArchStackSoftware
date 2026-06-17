import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { Container } from "@/components/ui/container";

const links = [
  "services",
  "projects",
  "process",
  "blog",
  "contact",
] as const;

export function MarketingFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Arch<span className="text-primary">Stack</span> Software
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {dict.footer.tagline}
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {links.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key}`}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {year} ArchStack Software. {dict.footer.rights}
          </p>
          <p>{dict.footer.pillars}</p>
        </div>
      </Container>
    </footer>
  );
}
