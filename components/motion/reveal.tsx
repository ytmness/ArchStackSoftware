"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLightMotion } from "@/lib/hooks/use-light-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  const lightMotion = useLightMotion();
  const simple = reduce || lightMotion;

  return (
    <motion.div
      className={className}
      initial={simple ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={simple ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: simple ? 0.35 : 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
