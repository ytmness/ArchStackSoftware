"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { AetherFlowBackground } from "@/components/ui/aether-flow-background";
import { Button } from "@/components/ui/button";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

type MarketingHeroProps = {
  locale: Locale;
  dict: Dictionary;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.35,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function MarketingHero({ locale, dict }: MarketingHeroProps) {
  return (
    <section className="relative flex min-h-[88vh] w-full flex-col items-center justify-center overflow-hidden md:min-h-screen">
      <div className="absolute inset-0 z-0">
        <AetherFlowBackground />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center md:py-28">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-5 flex justify-center md:mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-primary" aria-hidden />
            <div className="h-5 overflow-hidden md:h-6">
              <p className="sr-only">{dict.hero.eyebrow}</p>
              <GooeyText
                texts={dict.hero.gooeyEyebrowTexts}
                morphTime={1.2}
                cooldownTime={0.35}
                textClassName="text-xs font-medium uppercase tracking-[0.2em] text-primary/95 md:text-sm"
              />
            </div>
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          <span className="sr-only">{dict.hero.title}</span>
          <div className="overflow-hidden py-1 [contain:paint]">
            <GooeyText
              texts={dict.hero.gooeyTitleTexts}
              morphTime={1.4}
              cooldownTime={0.4}
              textClassName="text-4xl font-bold leading-[1.06] tracking-tighter text-foreground sm:text-5xl md:text-7xl lg:text-[4.5rem]"
            />
          </div>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="gap-2 shadow-[var(--shadow-glow)]">
            <Link href={`/${locale}/contact`}>
              {dict.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={`/${locale}#builder`}>{dict.hero.ctaSecondary}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
