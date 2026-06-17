"use client";

import { motion, useReducedMotion } from "motion/react";

type HeroHeadlineProps = {
  text: string;
  className?: string;
};

export function HeroHeadline({ text, className }: HeroHeadlineProps) {
  const words = text.split(" ");
  const reduce = useReducedMotion();

  return (
    <h1
      className={
        className ??
        "max-w-5xl text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-5xl md:text-6xl lg:text-7xl"
      }
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.35em] inline-block"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.72,
            delay: i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
