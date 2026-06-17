"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type RevealBlockProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function RevealBlock({ children, className, delay = 0 }: RevealBlockProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
