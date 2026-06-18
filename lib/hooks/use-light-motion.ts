"use client";

import { useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

/** True on mobile or when the user prefers reduced motion — use simpler UI. */
export function useLightMotion() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  return Boolean(reduce || isMobile);
}
