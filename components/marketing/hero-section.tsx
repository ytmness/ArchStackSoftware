"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Dictionary } from "@/content/dictionaries/es";
import type { Locale } from "@/lib/i18n/config";
import { AetherFlowBackground } from "@/components/ui/aether-flow-background";
import { Button } from "@/components/ui/button";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { useLightMotion } from "@/lib/hooks/use-light-motion";
import { useViewportAnimation } from "@/lib/hooks/use-viewport-animation";

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
  const reduce = useReducedMotion();
  const { ref, shouldAnimate, isPaused } = useViewportAnimation({
    rootMargin: "0px",
    unloadDelayMs: 2000,
  });
  const lightMotion = useLightMotion(shouldAnimate);
  const variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : fadeUp;

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden md:min-h-screen"
    >
      <div className="absolute inset-0 z-0">
        <AetherFlowBackground />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-6 md:py-28">
        <motion.div
          custom={0}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mb-6 flex justify-center md:mb-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-primary" aria-hidden />
            <div className="h-5 overflow-hidden md:h-6">
              <p className="sr-only">{dict.hero.eyebrow}</p>
              {lightMotion ? (
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary/95 transition-opacity duration-500 md:text-sm">
                  {dict.hero.eyebrow}
                </span>
              ) : (
                <GooeyText
                  texts={dict.hero.gooeyEyebrowTexts}
                  morphTime={1.2}
                  cooldownTime={0.35}
                  paused={isPaused}
                  textClassName="text-xs font-medium uppercase tracking-[0.2em] text-primary/95 md:text-sm"
                />
              )}
            </div>
          </div>
        </motion.div>

        <motion.h1
          custom={1}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          <span className="sr-only">{dict.hero.title}</span>
          <div className="overflow-hidden py-1 [contain:paint]">
            {lightMotion ? (
              <span className="text-5xl font-bold leading-[1.04] tracking-tighter text-foreground transition-opacity duration-500 sm:text-6xl md:text-7xl lg:text-[4.5rem]">
                {dict.hero.title}
              </span>
            ) : (
              <GooeyText
                texts={dict.hero.gooeyTitleTexts}
                morphTime={1.4}
                cooldownTime={0.4}
                paused={isPaused}
                textClassName="text-5xl font-bold leading-[1.04] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-[4.5rem]"
              />
            )}
          </div>
        </motion.h1>

        <motion.p
          custom={2}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-6 md:text-xl"
        >
          {dict.hero.subtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={variants}
          initial="hidden"
          animate="visible"
          className="pointer-events-auto mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg">
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
