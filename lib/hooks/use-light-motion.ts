"use client";

import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

/**
 * True on mobile or when the user prefers reduced motion.
 * Use only for expensive effects (gooey morph, per-char stagger, clip-path, canvas).
 * Layout, typography, fades, and CSS marquees should stay enabled on mobile.
 */
export function useLightMotion() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  return Boolean(reduce || isMobile);
}
