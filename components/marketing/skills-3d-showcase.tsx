"use client";

import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { getSkillCards } from "@/lib/data/skills";
import { Floating3DCard } from "@/components/ui/3d-card";
import { RecargaLoader } from "@/components/ui/loader-12";
import { Reveal } from "@/components/motion/reveal";

type Skills3DShowcaseProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Skills3DShowcase({ locale, dict }: Skills3DShowcaseProps) {
  const cards = getSkillCards(locale);

  return (
    <section className="border-b border-border py-24 md:py-32 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-4 md:mb-6">
                <RecargaLoader className="shrink-0 scale-90 sm:scale-100" />
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/80">
                  {dict.skills.eyebrow}
                </p>
              </div>
              <h2 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl lg:leading-[1.05]">
                {dict.skills.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {dict.skills.description}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.08}>
              <Floating3DCard
                title={card.title}
                description={card.description}
                image={card.image}
                imageAlt={card.imageAlt}
                tags={card.tags}
                href={`/${locale}/services`}
                ctaLabel={dict.skills.cta}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
