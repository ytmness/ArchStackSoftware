"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduce ? 0.35 : 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
